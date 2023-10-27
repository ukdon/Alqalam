const User = require('../models/User');
const bcrypt = require("bcryptjs");
const jwt = require('jsonwebtoken');
const signup = async (req, res, next) => {
    const { name, email, userName, password } = req.body;
    let existingUser;
    try {
        existingUser = await User.findOne({ email: email });
    } catch (err) {
        console.log(err);
    }
     if (existingUser) {
         return res
         .status(400).
         json({message: "Ka Riga Kayi Rijista! Kana Iya Shiga"})
     }
    const hashedPassword = bcrypt.hashSync(password);
    const user = new User({
        name,
        email,
        userName,
        password: hashedPassword,
    });

    try {
        await user.save();
    } catch (err) {
        console.log(err);
    }
    return res.status(201).json({message: user})
};

const login = async (req, res, next) => {
   const { email, password } = req.body;

   let existingUser;
   try {
       existingUser = await User.findOne({ email: email });
   } catch (err) {
       return new Error(err);
   }
   if (!existingUser) {
       return res.status(400).json({message: "Ba'a Samu Mai Wannan Ba! Kayi Rijista"});
   }
   const isPasswordCorrect = bcrypt.compareSync(password, existingUser.password);
   if (!isPasswordCorrect) {
       return res.status(400).json({message: "Email Ko Makullan Sirri Wani Ba Daidai Yakeba"});
   }
   const token = jwt.sign({id: existingUser._id}, process.env.JWT_SECRET_KEY, {
       expiresIn: "35s",
   });

   console.log("Generated Token\n", token);

   if (req.cookies[`${existingUser._id}`]) {
       req.cookies[`${existingUser}`] = ""
   }

   res.cookie(String(existingUser._id), token, {
       path: '/',
       expires: new Date(Date.now() + 1000 * 30),
       httpOnly: true,
       sameSite: 'lax',
   });

   return res.status(200).json({message: "Kashiga LafiLau", user: existingUser, token});
};

const verifyToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    const token = cookies.split("=")[1];
    console.log(token);
    if (!token) {
        res.status(404).json({message: "Ba'a Samu Wata Alama Ba"});
    }
    jwt.verify(String(token), process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
          return res.status(400).json({message: "Alamar Ba Daidai Takeba"});
        }
       console.log(user.id);
       req.id = user.id;
    });
   next();
};

const getUser = async (req, res, next) => {
   const userId = req.id;
   let user;
   try {
       user = await User.findById(userId, "-password");
   } catch (err) {
       return new Error(err)
   }
   if (!user) {
       return res.status(404).json({message: "Ba'a Samu Mai Wannan Ba"});
   }
   return res.status(200).json({user});
};

const refreshToken = (req, res, next) => {
    const cookies = req.headers.cookie;
    const prevToken = cookies.split("=")[1];
    if (!prevToken) {
        return res.status(400).json({message: "Alamar Bata Ganuwa"});
    }
    jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
        if (err) {
            console.log(err);
            return res.status(403).json({message: "Ba Zamu Iya Tantanceka Ba"});
        }
        res.clearCookie(`${user.id}`);
        req.cookies[`${user.id}`] = "";

        const token = jwt.sign({id: user.id}, process.env.JWT_SECRET_KEY, {
            expiresIn: "35s",
        });
        console.log("Regenerated Token\n", token);

        res.cookie(String(user.id), token, {
            path: '/',
            expires: new Date(Date.now() + 1000 * 30),
            httpOnly: true,
            sameSite: 'lax',
        });

        req.id = user.id;
        next();
    });
};

const logout = (req, res, next) => {
  const cookies = req.headers.cookie;
  const prevToken = cookies.split("=")[1];
  if (!prevToken) {
    return res.status(400).json({message: "Alamar Bata Ganuwa"});
   }
   jwt.verify(String(prevToken), process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
        console.log(err);
        return res.status(403).json({message: "Ba Zamu Iya Tantanceka Ba"});
    }
    res.clearCookie(`${user.id}`);
    req.cookies[`${user.id}`] = "";
    return res.status(200).json({message: "Kafita LafiyaLau"});

});
}

exports.logout = logout;
exports.signup = signup;
exports.login = login;
exports.verifyToken = verifyToken;
exports.getUser = getUser;
exports.refreshToken = refreshToken;
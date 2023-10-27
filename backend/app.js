const express = require('express')
const cors = require('cors');
const { db } = require('./db/db');
const {readdirSync} = require('fs')
const app = express();
const router = require("./routes/user-routes");
const cookieParser = require('cookie-parser');


require('dotenv').config();

const PORT = process.env.PORT

//middlewares
// app.use('/api/v1', router);
app.use(cookieParser());
app.use(express.json());
app.use(cors({credentials: true, origin: "http://localhost:3000"}));

//routes
readdirSync('./routes').map((route) => app.use('/api/v1', require('./routes/' + route)))

// app.get('/', (req, res) => {
//     res.send('HELLO UK')
// })

const server = () => {
    db()
   app.listen(PORT, () => {
       console.log('listenning to port:', PORT)
   })
}

server()
const IncomeSchema = require("../models/incomeModel")


exports.addIncome = async (req, res) => {
    const {title, amount, category, description, date} = req.body

    const income = IncomeSchema({
        title,
        amount,
        category,
        description,
        date
    })

    try {
         //validation
         if(!title || !category || !description || !date){
             return res.status(400).json({message: 'sai ka cike duka filayen!'})
         }
         if(amount <= 0 || !amount === 'number'){
             return res.status(400).json({message: 'kudin ba daidai suke ba!'})
         }
         await income.save()
         res.status(200).json({message: 'ka kara abinda ka samu'})
        } catch (error) {
            res.status(500).json({message: 'Matsala daga cibiyar sadarwa'})
        }
    
    console.log(income)
}

exports.getIncomes = async (req, res) => {
    try {
        const incomes = await IncomeSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Matsala daga cibiyar sadarwa'})
    }
}

exports.deleteIncome = async (req, res) => {
 const {id} = req.params;
 IncomeSchema.findByIdAndDelete(id)
 .then((income) =>{
    res.status(200).json({message: 'Ka goge abinda ka samu'})
 })
  .catch((err) =>{
    res.status(500).json({message: 'Matsala daga cibiyar sadarwa'})
  })
}
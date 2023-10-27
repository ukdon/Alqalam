const ExpenseSchema = require("../models/ExpenseModel")


exports.addExpense = async (req, res) => {
    const {title, amount, category, description, date} = req.body

    const income = ExpenseSchema({
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
         res.status(200).json({message: 'ka kara abinda ka kashe'})
        } catch (error) {
            res.status(500).json({message: 'Matsala daga cibiyar sadarwa'})
        }
    
    console.log(income)
}

exports.getExpense = async (req, res) => {
    try {
        const incomes = await ExpenseSchema.find().sort({createdAt: -1})
        res.status(200).json(incomes)
    } catch (error) {
        res.status(500).json({message: 'Matsala daga cibiyar sadarwa'})
    }
}

exports.deleteExpense = async (req, res) => {
 const {id} = req.params;
 ExpenseSchema.findByIdAndDelete(id)
 .then((income) =>{
    res.status(200).json({message: 'Ka goge abinda ka kashe'})
 })
  .catch((err) =>{
    res.status(500).json({message: 'Matsala daga cibiyar sadarwa'})
  })
}
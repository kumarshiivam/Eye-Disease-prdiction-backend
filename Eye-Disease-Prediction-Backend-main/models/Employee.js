const mongoose = require('mongoose')


const EmployeeSchema = new mongoose.Schema({
    name:String,
    email:String,
    password:String
    
},
{

    collection: "login"
})

const EmployeeModel = mongoose.model("employees",EmployeeSchema)
module.exports = EmployeeModel
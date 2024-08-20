const mongoose = require("mongoose")

const PatientSchema = new mongoose.Schema({
    name:String,
    age:String,
    email:String,
    MobNo:String,
    Date:String,
    docEmail:String,
    result:String

},
{
    collection:"Patients"
})

const PatientModel = mongoose.model("patients",PatientSchema)
module.exports = PatientModel;
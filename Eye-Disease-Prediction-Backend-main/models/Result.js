const mongoose = require("mongoose")


const ResultSchema = new mongoose.Schema(

    {
        Pname:String,
        Dname:String,
        Result:String

    },

    {
        collection:"results"
    }

)

const ResultModel = mongoose.model("results",ResultSchema);
module.exports = ResultModel;
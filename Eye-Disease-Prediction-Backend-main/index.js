const express = require("express")
const mongoose = require("mongoose")
const cors = require("cors")
const EmployeeModel = require('./models/Employee')
const PatientModel = require('./models/Patient')
const ResultModel = require('./models/Result')
const app = express()
app.use(express.json())
app.use(cors())

mongoose.connect("mongodb+srv://annishjosh:1234567890@cluster0.icyhbwp.mongodb.net/logindb")

var db = mongoose.connection;
mongoose.set('strictQuery', true);

db.on("open" , ()=> console.log("Connected to DB"));
db.on("error", () => console.log("Error occurred"));

app.post("/login", (req,res) =>{
    const {name, email,password} = req.body;
    EmployeeModel.findOne({email:email})
    .then(user =>
        {if(user){
            if(user.password === password)
            {
                res.json("Success")
            }
            else
            {
                res.json("The password is incorrect")
            }
        }
        else
        {
            res.json("No record exists")
        }
    })
})


app.get("/custom/:email", (req,res)=>{

    EmployeeModel.findOne({email:req.params.email})
    .then((data) =>{
        if(data)
        {
            res.json(data);
        }
    })
    
})


app.get("/record", async(req,res) =>{

    try{
        const Data = await EmployeeModel.find();
        res.send(Data);
    }
    catch{
        res.send(e);
    }
})

app.post('/register',(req,res) =>{
    EmployeeModel.create(req.body)
    .then(employees => res.json(employees))
    .catch(err => res.json(err))
})
app.listen(3000, ()=>{
    console.log("Server is running")
})

app.post('/newPatient',(req,res) =>{
    PatientModel.create(req.body)
    .then(patient => res.json(patient))
    .catch(err => res.json(err))
})

app.post('/findPatient', (req, res) =>{

    var {docEmail} = req.body;

    PatientModel.find({docEmail:docEmail})
    .then((data) =>{
        if(data)
        {
            res.json(data);
        }
    })
    .catch()
})

app.post('/newResult', (req,res) =>{
    ResultModel.create(req.body)
    .then(result => res.json(result))
    .catch(err => res.json(err))
})

app.get('/pastResults' , (req,res)=>{
    var Dname = req.body;
    ResultModel.find(Dname)
    .then((data) =>{
        if(data)
            res.json(data)
    })
    .catch((err) =>res.json(err))
})

app.post('/changeResult', (req, res) =>{

    var pname = req.body.PName;
    var res = req.body.result;
    PatientModel.updateOne(
        {
            name:pname
        },
        {
            $set: {
                result:res
            }
        }   
    )
    .then((data) => {
        if(data)
        {
            
        }
    })
    .catch((err) =>console.log(err))
})

app.post("/deletePatient/:id", (req, res) =>{

    var id = req.params.id;

    PatientModel.findOneAndDelete(
        {
            _id:id
        }
    )
    .then((data) =>{
        if(data)
            res.json(data)
        else
            res.json("No data found")
    })
    .catch((err) => res.json(err))
})

app.get('/getPatient/:id', (req,res)=>{

    var id = req.params.id;

    PatientModel.find({_id:id})
    .then((data) =>{
        if(data)
            res.json(data);
        else    
            res.json("no data")

    })
    .catch((err) => res.json(err))
})

app.put('/update-patient/:id', (req, res)=>{

    var id = req.params.id;

    PatientModel.updateOne(
        {
            _id:id
        },
        {
            $set:req.body
        }
    )
    .then((data) => {
        if(data)
        {
            res.json(data)
        }
    })
    .catch((err) =>console.log(err))
})
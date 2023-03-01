const express = require('express')
const cors = require('cors')
const connectdDb=require('./config/config')
const User= require('./Model/User')
const jwt = require('jsonwebtoken')
connectdDb();
const app = express();
app.use(express.json());
app.use(cors());
const PORT=process.env.PORT || 8000;
const SECRET_KEY="123456789mnbvcxlkjhgfdspoiuytrew098765432_)(*&^%$#@";


app.post('/signup',(req,res)=>{
    const {fname,mname,lname,email,dateOfBirth,mobile,city,pincode, gender}=req.body;
           User.findOne({email : email,mobile : mobile}).then(async(user)=>{
            if(user){
                res.send({message : "User Already exists"})
            }else{
                const user = new User(req.body);
                const result = await user.save();
                res.send({message : "Registration Successfull",result});
            }
           }).catch((err)=>{
            res.send(err);
           })
})

app.post('/login',(req,res)=>{
    const {email,mobile}=req.body;
    User.findOne({email : email}).then((user)=>{
        if(String(user.mobile) === mobile){
            res.send({message : "You are now LoggedIn",user});
        }else{
            res.send({message : "User not exists"})
        }
    })
})
app.post('/userData',(req,res)=>{
    const {_id}=req.body;
    User.find({_id : _id}).then((user)=>{
        res.send(user);
    }).catch((err)=>{
        res.send(err);
    })
})
app.get('/alldata',(req,res)=>{
    User.find({}).then((user)=>{
        res.send(user);
    }).catch((err)=>{
        res.send(err);
    })
})
app.post('/delete',(req,res)=>{
    const {email}=req.body;
    User.deleteOne({email : email }).then(()=>{
        res.send("deleted");
    })
})
app.post('/update',async(req,res)=>{
    const {_id,firstName,middleName,lastName,email,mobile,city,pincode,dateOfBirth}=req.body;
    const result =  User.updateOne({_id},{
        $set:{
            firstName : firstName,
            middleName : middleName,
            lastName : lastName,
            email : email,
            mobile : mobile,
            city : city,
            pincode : pincode,
            dateOfBirth : dateOfBirth
        }
    }).then(()=>{
        res.send(result)
    }).catch((err)=>{
        res.send(err)
    })

})


app.listen(PORT,()=>{
    console.log('Server Connected')
})
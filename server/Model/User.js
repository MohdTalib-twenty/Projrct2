const mongoose = require('mongoose')



const userSchema= new mongoose.Schema({
    firstName:{
        type: String,
        required : true
    },
    middleName:{
        type: String,
        required : true
    },
    lastName:{
        type: String,
        required : true
    },
    email:{
        type : String,
        required: true
    },
    dateOfBirth:{
        type : String,
        required : true
    },
    mobile:{
        type : Number,
        required : true
    },
    city:{
        type: String,
        required : true
    },
    pincode:{
        type: Number,
        required : true
    },
    gender:{
        type: String,
        required : true
    },
    role:{
        type : String,
        required : true
    }
    
},
{timestamps : true}
)

module.exports= new mongoose.model('User',userSchema);
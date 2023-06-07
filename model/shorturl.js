const mongoose= require('mongoose')
const shortid=require('shortid')

 const  shortschema =   new mongoose.Schema({
    full:{
        type:String,
        required:true
    },
    short:{
        type:String,
        required:true,
        default:shortid.generate 
    },
    clicks:{
        type:String,
        required:true,
        default:0
    }
})
module.exports=mongoose.model('Shorturl',shortschema)
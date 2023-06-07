const express =require('express');
const mongoose =require('mongoose')
const app = express();
const Shorturl = require('./model/shorturl');
//database connectivity

mongoose.connect('mongodb://0.0.0.0:27017/EmployeeDB',{useNewurlparser:true,useUnifiedTopology:true},).then(()=>{
    console.log('database connected')
})


app.set('view engine','ejs')
app.use(express.urlencoded({extended:false}))


app.get('/', async (req,res)=>{
   const shorturls= await Shorturl.find()
    res.render('index',{shorturls:shorturls})
})


app.post('/shorturl', async(req,res)=>{
   await Shorturl.create({full:req.body.url})
   res.redirect('/')
})

app.get('/:shorturl', async(req,res)=>{
    const shorturl=  await Shorturl.findOne({short:req.params.shorturl})
   if(shorturl==null)return res.sendStatus(404)

   shorturl.clicks++
   shorturl.save()
   res.redirect(shorturl.full)
})

app.listen(8000 ,()=>{console.log('server started')})
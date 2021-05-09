const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('../../weather-app/utils/geocode')
const app = express()
const port = process.env.PORT || 3000

const publicpath  = path.join(__dirname,'../public')
const viewpath = path.join(__dirname,'../templates/views')
const partialpath   = path.join(__dirname,'../templates/partials')
app.set('view engine','hbs')
app.set('views',viewpath)
hbs.registerPartials(partialpath)
app.use(express.static(publicpath))
app.get('',(req,res) =>{
    res.render('index',{
        title:'Weather App',
        name:'Aryan Sharma'
    })
})

app.get('/about',(req,res)=>{
    res.render('about',{
        title:'Weather App',
        name:'Aryan Sharma'
    })
})

app.get('/help',(req,res)=>{
    res.render('help',{
        message:'If you nedd any assistance I am here to help',
        title:'Help',
        name:'Aryan Sharma'
    })
})
 app.get('/weather',(req,res)=>{
    if(!req.query.address){
        res.send({
            error: 'Please enter the address'
        })
    }
    geocode(req.query.address,(error,data={})=>{
        if(error){
            return res.send({error})
        }else{
            return res.send({data})
        }
    })
 })
app.get('/help/*',(req,res)=>{
  res.render('404',{
      title:'404',
      name:'Aryan Sharma',
      errorMessage:'Help Page not found!!'
  })
})

app.get('*',(req,res)=>{
    res.render('404',{
        title:'404',
        name:'Aryan Sharma',
        errorMessage:'Page not found!'    
    })
})
app.listen(port,()=>{
    console.log('Server is up and runnng at port '+port)
})


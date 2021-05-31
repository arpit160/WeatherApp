var express = require('express');
var router = express.Router();
var fetch=require("node-fetch")
var date=require("date-and-time")
require('dotenv').config();



router.get('/',(req,res)=>
{
  res.render('home',{matter:undefined,error:undefined});
})

router.post('/weather', async function(req, res){
  let city=req.body.city;
  array=city.split(' ')
  city='';
  array.forEach(x=>
  {
    x=x.charAt(0).toUpperCase() + x.slice(1);
    city=city+x+' ';
  })
  let apiKey = process.env.apiKey;
  let data=await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}`)
  data=await data.json();

  if(data.cod!='200')return res.render("home",{matter:undefined,error:"No Such City Exists"})

  let now=new Date();
  time=date.format(now, 'hh:mm');         

  let matter={
    city:city,
    temprature:Math.round(data.main.temp-273),
    pressure:data.main.pressure,
    humidity:data.main.humidity,
    windSpeed:data.wind.speed,
    mainCondition:data.weather[0].main,
    time:time,
    icon:data.weather[0].icon
  };

  res.render("home",{matter:matter,error:undefined})
});


module.exports = router;
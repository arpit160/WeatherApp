var express = require('express');
var path = require('path');
var bodyParser=require('body-parser')
require('dotenv').config();

var app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));

app.use(express.static(path.join(__dirname, 'public')));

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');


var index = require('./routes/index');

app.use('/', index);


let PORT=process.env.PORT||3000;

app.listen(PORT, function(req,res)
{
  console.log(`Listening on post ${PORT}`);
})


var createError = require('http-errors');
var express = require('express');
var path = require('path');
var bodyparser = require('body-parser');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
var User = require('./models/User');
var Ad = require('./models/Ad');
var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
var cors= require('cors');
var app = express();




app.use(cors({
  origin:['http://localhost:4200','http://127.0.0.1:4200'],
  credentials:true
}));

var mongoose =require('mongoose');

var db = mongoose.connect('mongodb://localhost:27017/mydb',function(err,response){
    if(err) console.log("Error in connecting to database");
    console.log("Connection is added");
});

app.set('port',process.env.port || 3000);

app.use(bodyparser.json());
app.use(bodyparser.urlencoded({    
    extended: true
  }));

app.get('/',(req,res)=>{
    res.send("hello");
})


app.post('/register',(req,res)=>{
    var name=req.body.name;
    var email=req.body.email;
    var password=req.body.password1;

    var user = new User();
    user.name = name;
    user.email = email;
    user.password1 = password;
    
    user.save((err,result) => {
        if(err){
            console.log("User was not added in the database");
            res.send({success : "Failed to add the user",status: 500});
        }
        res.send({success : "Successfully added the user",status: 200});;
    })
})

app.post('/postit',(req,res)=>{
  var title=req.body.title;
  var category=req.body.category;
  var addesc=req.body.addesc;
  var price=req.body.price;
  var name=req.body.name;
  var city=req.body.city;

  var ad = new Ad();
  ad.title = title;
  ad.category = category;
  ad.addesc = addesc;
  ad.price = price;
  ad.name = name;
  ad.city = city;
  
 
  
  ad.save((err,result) => {
      if(err){
          console.log("Ad was not added in the database");
          res.send({success : "Failed to add the ad",status: 500});
      }
      res.send({success : "Successfully added the ad",status: 200});;
  })
})

//passport
var passport = require('passport');
var session = require('express-session');
app.use(session({
  name:'mysess',
  resave:false,
  saveUninitialized:false,
  secret:'secret',
  cookie:{
      maxAge:36000000,
      httpOnly:false,
      secure:false
  }
}));
require('./passport-config');
app.use(passport.initialize());
app.use(passport.session());


// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);


app.post('/searchter',(req,res)=>{
    console.log("hi1")
    var term = req.body.message;
    console.log(term)
    Ad.find({category:term},function(err,data){
        if(err){
            res.send(err);
        }
        console.log(data)
        res.json(data)
    })

})

app.get('/getads',(req,res)=>{
    Ad.find({},function(err,data){
        if(err){
            res.send(err);
        }
        console.log(data)
        res.json(data)
    })

})
// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});
app.listen(app.get('port'),function(err,response){
  console.log("Server is running on port ",app.get('port'));
})

module.exports = app;

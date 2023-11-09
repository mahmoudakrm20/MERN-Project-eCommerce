var createError = require('http-errors');
var express = require('express');
const mongoose = require('mongoose');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
require("dotenv").config();
const apiApp = express();
const bodyParser = require("body-parser");
// routes

const apiRoutes = require('./API/API');
var indexRouter = require('./routes/index');
var registerRouter = require('./routes/register');
var cartRouter = require('./routes/cart');
var loginRouter = require('./routes/login');
var addprodRouter = require('./routes/addproducts');
var productsRouter = require('./routes/products');
var app = express();

// use 

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));


let port = process.env.PORT || 3002;
let apiPort = process.env.APIPORT || 4000;


mongoose.connect(process.env.DB)
.then (()=>{
  app.listen(port,()=>{
    console.log(`Server Wokring Port ${port}`)
  })
})
.catch(error=>{
  console.log('DB Problem'+error);
})



apiApp.use('/',apiRoutes);
apiApp.listen(apiPort, () => {
  console.log(`API is listening on port ${apiPort}`);
});

app.use(bodyParser.json());


app.use('/', indexRouter);
app.use('/Cart',cartRouter);
app.use('/register',registerRouter);
app.use('/login',loginRouter);
app.use('/singleproduct/:id',productsRouter);
app.use('/addproducts',addprodRouter);
app.use('*', (req, res) => {
  res.redirect('/');
});
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

module.exports = app;

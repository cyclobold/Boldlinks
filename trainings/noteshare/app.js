var createError = require('http-errors');
var express = require('express');
var path = require('path');
var cookieParser = require('cookie-parser');
var logger = require('morgan');
const session = require("express-session");
const mongoDBStore = require("connect-mongodb-session")(session);
const mongodb = require("mongodb");
require("dotenv").config();

const client = new mongodb.MongoClient(process.env.DB_URL);
//const database = client.db(process.env.DB_NAME)

var store = new mongoDBStore({
  uri: process.env.DB_URL,
  databaseName:process.env.SESSION_DB_NAME,
  collection: 'sessions'
});

var indexRouter = require('./routes/index');
var usersRouter = require('./routes/users');
const createPostRouter = require("./routes/create_post");
const signUpRouter = require("./routes/signup");
const loginRouter = require("./routes/login");
const userRouter = require("./routes/user");

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

app.use(session({
  secret: process.env.SECRET,
  resave: false,
  saveUninitialized: false,
  store: store

}))

app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'node_modules')));


//Endpoints
app.post("/register-user", async function(request, response){
  const firstname = request.body.firstname;
  const lastname = request.body.lastname;
  const email = request.body.email;
  const username = request.body.username;
  const password = request.body.password;

  const feedback = await client.db(process.env.DB_NAME).collection("users").insertOne({
    firstname: firstname,
    lastname: lastname,
    email: email,
    username: username,
    password: password
  });

  if(feedback){
      response.send({
        message: "User registered successfully",
        code: "success",
        data: null,
        type: "register-user"
      })


  }


})

//Logout
app.post("/logout-user", async function(request, response){
    const feedback = await request.session.destroy();
    if(feedback){
      response.redirect("/login");
    } 
    

})

//Login user
app.post("/login-user", async function(request, response){
  const username = request.body.username;
  const password = request.body.password;

  const feedback = await client.db(process.env.DB_NAME).collection("users").findOne({username: username, password: password});

  if(feedback){
    //save current user to the session
    request.session.user = feedback;


      response.send({
          message: "User authenticated",
          code: "authenticated",
          data: {
            userdata: feedback
          },
          type: "login-user"
      })
  }else{
    response.send({
      message: "User not authenticated",
      code: "not-authenticated",
      data: null,
      type: "login-user"
  })
  }
})



app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use("/create-post", createPostRouter);
app.use("/signup", signUpRouter);
app.use("/login", loginRouter);
app.use("/user", userRouter);


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

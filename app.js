const express = require('express');
const bodyParser = require('body-parser');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const session = require('express-session');
const MongoStore = require('connect-mongo')(session);
const path = require('path');
const mongoose = require('mongoose');
const flash = require('connect-flash');
const expressValidator = require('express-validator');
const User = require('./models/user.js');
const app= express();
app.use(expressValidator({
  errorFormatter: function(param, msg, value) {
      var namespace = param.split('.')
      , root    = namespace.shift()
      , formParam = root;

    while(namespace.length) {
      formParam += '[' + namespace.shift() + ']';
    }
    return {
      param : formParam,
      msg   : msg,
      value : value
    };
  }
}));
app.use(flash());
app.use(function (req, res, next) {
  res.locals.messages = require('express-messages')(req, res);
  res.locals.userClient =null;
  res.locals.giohang = [];
  next();
});
app.use(session({
  secret: 'ngoclam',
  resave: false,
  saveUninitialized: true,
  store: new MongoStore({ mongooseConnection: mongoose.connection })
}))
app.use(function(req, res, next) {
  if (req.session && req.session.userClient&&req.session.giohang) {
    res.locals.giohang = req.session.giohang;
    //Tồn Tại user thì mới hiên thị giỏ hàng người đó
  }
  if (req.session && req.session.userClient) {
    User.findOne({ email: req.session.userClient.email }, function(err, user) {
      if (user) {
        req.userClient = user;
        delete req.userClient.password; // delete the password from the session
        req.session.userClient = user;  //refresh the session value
        res.locals.userClient = user;
      }
      // finishing processing the middleware and run the route
      next();
    });
  } else {
    next();
  }
});
app.use(passport.initialize());
app.use(passport.session());
mongoose.connect('mongodb://localhost/soping', { useNewUrlParser: true } );
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.set('view engine','ejs');
app.set('views','./views')
app.use(express.static(path.join(__dirname,'public')));
app.use('/uploads',express.static(path.join(__dirname,'uploads')));

const index = require('./Router/index/index.js');
const admin = require('./Router/admin/index.js');
const account = require('./Router/admin/account.js');
const user = require('./Router/user/login.js');
app.use('/',index);
app.use('/admin',admin);
app.use('/admin',account);
app.use('/user',user);

app.listen(3000,()=>{console.log('OK!')})

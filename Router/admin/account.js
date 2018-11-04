const express = require('express');
const Admin = require('./../../models/admin.js');
const bcrypt = require('bcrypt');
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const router = express.Router();

router.get('/login',(req,res)=>{
  res.render('admin/login');
})

router.get('/sign',(req,res)=>{
  res.render('admin/sign',{errors:null});
})

router.get('/logout',checkLogin,(req,res,next)=>{
  req.logout();
  res.redirect('/admin/login');
})

router.post('/sign',(req,res,next)=>{
  const username=req.body.username;
  const email=req.body.email;
  const password=req.body.password;
  const check=req.body.check;
  req.checkBody('username','Không Được Để Trống UserName!').notEmpty();
  req.checkBody('email','Không Được Để Trống Email!').notEmpty();
  // req.checkBody('email','Không Đúng Định Dạng Email !').isEmail();
  req.checkBody('password','Không Được Để Trống Password!').notEmpty();
  req.checkBody('check','Xác Nhận Không Đúng Mật Khẩu !').equals(req.body.password);

  const errors = req.validationErrors();
  if(errors){
    res.render('admin/sign',{errors:errors})
  }else{
    const dulieu = {username:username,email:email,password:password,phanquyen:'admin'};
    const newUser = new Admin(dulieu);
    Admin.findOne({email:email},(err,data)=>{
      if(err) return err;
      if(data) {
        req.flash('danger','Email đã được đăng kí !');
        return res.redirect('/admin/sign');
      }
      bcrypt.hash(newUser.password,10,(err,hash)=>{
        newUser.password = hash;
        newUser.save(err=>err);
        req.flash('success','Đăng Kí Tài Khoản Thành Công !');
        return res.redirect('/admin/login');
      })
    })
  }
})

router.post('/login',passport.authenticate('local',{
  successRedirect:'/admin',
  failureRedirect:'/admin/login',
  failureFlash: true
}));
passport.serializeUser(function(user, done) {
  done(null, user.id);
});

passport.deserializeUser(function(id, done) {
  Admin.findById(id, function(err, user) {
    done(err, user);
  });
});

passport.use(new LocalStrategy(
  {usernameField: 'email',passwordField: 'password'},
  (email,password,done)=>{
      Admin.findOne({email:email},(err,user)=>{
        if(err) return done(err,null);
        Admin.findOne({phanquyen:'admin'},(err,dulieu)=>{
          if(err) return done(err,null);
          if(!user) return done(null,false,{messages:'Sai Tài Khoản !'});
          if(user&&dulieu){
            bcrypt.compare(password,user.password,(err,matkhau)=>{
              if(err) return done(err,null);
              if(!matkhau) return done(null,false,{messages:'mật khẩu không đúng !'});
              return done(null,user);
            })
          }
        })
      })
  }
));

function checkLogin (req,res,next){
  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect('/admin/login');
  }
}
module.exports = router;

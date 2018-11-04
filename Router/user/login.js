const express = require('express');
const bcrypt = require('bcrypt');
const User = require('./../../models/user.js');
const router = express.Router();

router.get('/login',(req,res)=>{
  res.render('user/login');
})
router.get('/sign',(req,res)=>{
  res.render('user/sign',{errors:null});
})
// check riêng mình thẻ email
router.post('/sign/check',(req,res,next)=>{
  const taikhoan = req.body.taikhoan;
  User.findOne({email:taikhoan},(err,data)=>{
    console.log(data);
    if(data){
      return res.json({trangthai:false});
    }else{
      return res.json({trangthai:true});
    }
  });
});
router.post('/sign',(req,res)=>{
  const username = req.body.username;
  const email = req.body.email;
  const check = req.body.check;
  const password = req.body.password;
  const errors = req.validationErrors();
  if(errors){
    res.render('user/sign',{errors:errors});
  }else{
    const dulieu ={username:username,email:email,password:password,phanquyen:'client'};
    const newUser = new User(dulieu);
    User.findOne({email:email},(err,user)=>{
      if(err) return err;
      if(user){
        console.log('da ton tai email');
      }else{
        bcrypt.hash(newUser.password,10,(err,hash)=>{
          newUser.password = hash;
          newUser.save(err=>{
            if(err) return err;
          });
          return res.redirect('/user/login');
        })
      }
    })
  }
})
router.post('/login',(req,res,next)=>{
  const email= req.body.username;
  const password = req.body.password;
  User.findOne({email:email},(err,user)=>{
    if(err)return err;
    if(!user){
      req.flash('danger','Tài Khoản Không Đúng');
      return res.redirect('/user/login');
    }
    if(user){
      bcrypt.compare(password,user.password,(err,data)=>{
        if(err){return err;}
        if(!data){
          req.flash('danger','Mật Khẩu Không Đúng');
          return res.redirect('/user/login');
        }
        if(data){
          req.session.userClient = user;
          return res.redirect('/');
        }
      })
    }
  })
})

router.get('/logout', function(req, res) {
  req.session.userClient=null;
  res.redirect('/');
});

module.exports = router;

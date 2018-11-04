const express = require('express');
const SanPham = require('./../../models/sanpham.js');
const router = express.Router();

router.get('/',(req,res)=>{
  SanPham.find({},(err,data)=>{
    res.render('index/index',{sanpham:data.slice(0,6)})
  })
})

router.post('/giohang/:id',(req,res)=>{
  const id =req.params.id;
  const giohang = req.session.giohang;
  for(let i=0;i<giohang.length;i++){
    if(giohang[i]['id']==id){
        giohang[i].qty=req.body.giatri;
    }
  }
  res.redirect('back');
})

router.get('/thongtin',checkLogin,(req,res)=>{
  res.render('index/thongtinkhachhang')
})
router.get('/giohang',checkLogin,(req,res)=>{
  res.render('index/giohang')
})
router.get('/chitiet/*.:id',(req,res)=>{
  const id = req.params.id;
  SanPham.findById(id,(err,data)=>{
    res.render('index/chitiet',{sanpham:data});
  })
})

router.get('/danhsach',(req,res)=>{
  const page = parseInt(req.query.page) || 1;
  const perpage = 12;
  const start = (page-1)*perpage;
  const end = page*perpage;
  SanPham.find({},(err,data)=>{
    var pages = Math.ceil(data.length/12);
    res.render('index/danhsach',{sanpham:data.slice(start,end),pages:pages,page:page})
  })
});

router.get('/add/giohang/:id',checkLogin,(req,res)=>{
  SanPham.findById(req.params.id,(err,data)=>{
    if(!req.session.giohang){
      req.session.giohang=[];
      req.session.giohang.push({tensp:data.tensp,gia:data.gia,qty:1,id:data._id,img:data.img});
    }else{
      var newItem = true;
      var giohang = req.session.giohang;
      for(let i=0;i<giohang.length;i++){
        if(giohang[i].id == data._id){
          giohang[i].qty++;
          newItem=false;
          break;
        }
      }
      if(newItem){
        giohang.push({tensp:data.tensp,gia:data.gia,qty:1,id:data._id,img:data.img});
      }
    }
    res.redirect('back');
  })
});

router.get('/update/:id',checkLogin,(req,res)=>{
  const id = req.params.id;
  const action = req.query.action;
  const giohang = req.session.giohang;
  for(let i=0;i<giohang.length;i++){
    if(giohang[i].id == id){
      switch (action) {
        case 'up':
          giohang[i].qty++;
          break;
        case 'dow':
          giohang[i].qty--;
          break;
        case 'clear':
          giohang.splice(i,1);
          if(giohang.length==0){
            delete req.session.giohang;
          }
        default:
          console.log('fuck');
          break;
      }
    }
  }
  res.redirect('back');
})


function checkLogin(req,res,next){
  if(!req.session.userClient){
    res.redirect('/user/login');
  }else{
    next();
  }
}

module.exports = router;

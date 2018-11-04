const express = require('express');
const multer = require('multer');
const SanPham = require('./../../models/sanpham.js');
const ChuyenMuc = require('./../../models/chuyenmuc.js');
const router = express.Router();
var storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, './uploads')
  },
  filename: function (req, file, cb) {
    cb(null,Date.now()+ '-' +file.originalname  )
  }
})
const upload = multer({ storage: storage })
router.post('/upload', upload.single('avatar'), function (req, res, next) {
  const dulieu = {
    img:req.file.filename,
    tensp:req.body.tensp,
    gia:req.body.gia,
    theloai:req.body.theloai,
    mota:req.body.mota
  }
  const newSanpham = new SanPham(dulieu);
  newSanpham.save(err=>err);
  res.redirect('back');
})

router.get('/',checkLogin,(req,res)=>{
  SanPham.find({},(err,data)=>{
    if(err) return err;
    ChuyenMuc.find({},(err,dulieu)=>{
      res.render('admin/index',{dulieu:data,data:dulieu,user:req.user});
    })
  })
})

router.get('/xoa/:id',(req,res)=>{
  const id=req.params.id;
  SanPham.findOneAndDelete(id).exec();
  res.redirect('back');
})

router.get('/edit/:id',checkLogin,(req,res)=>{
  const id=req.params.id;
  SanPham.findById(id,(err,data)=>{
    ChuyenMuc.find({},(err,dulieu)=>{
      res.render('admin/edit',{data:data,dulieu:dulieu,user:req.user});
    })
  })
})

router.post('/edit/:id', upload.single('avatar'),(req,res)=>{
  const id=req.params.id;
  SanPham.findById(id,(err,data)=>{
    if (err) return handlError(err);
    data.tensp=req.body.tensp,
    data.gia=req.body.gia,
    data.img=req.file.filename,
    data.mota=req.body.mota,
    data.theloai=req.body.theloai
    data.save();
  })
  res.redirect('back');
})
// Hết Phần UpLoad Sản Phẩm
router.get('/chuyenmuc',checkLogin,(req,res)=>{
  ChuyenMuc.find({},(err,data)=>{
    res.render('admin/chuyenmuc',{data:data,user:req.user});
  })
})

router.post('/chuyenmuc',(req,res)=>{
  const chuyenmuc = {chuyenmuc:req.body.chuyenmuc};
  const newChuyenMuc = new ChuyenMuc(chuyenmuc);
  newChuyenMuc.save(err=>err);
  res.redirect('back');
})

router.get('/chuyenmuc/xoa/:id',(req,res)=>{
  const id=req.params.id;
  ChuyenMuc.findOneAndDelete(id).exec();
  res.redirect('back');
})

router.get('/chuyenmuc/edit/:id',checkLogin,(req,res)=>{
  const id=req.params.id;
  ChuyenMuc.findById(id,(err,data)=>{
    res.render('admin/editChuyenMuc',{data:data,user:req.user});
  })
})

router.post('/chuyenmuc/edit/:id', (req,res)=>{
  const id=req.params.id;
  ChuyenMuc.findById(id,(err,data)=>{
    if (err) return handlError(err);
    data.chuyenmuc=req.body.chuyenmuc;
    data.save();
  })
  res.redirect('back');
})
function checkLogin (req,res,next){
  if(req.isAuthenticated()){
    next();
  }else{
    res.redirect('/admin/login');
  }
}
module.exports = router;

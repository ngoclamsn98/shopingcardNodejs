const mongoose = require('mongoose');
const Sanpham = new mongoose.Schema({
  tensp:{type:String},
  gia:{type:Number},
  theloai:{type:String},
  mota:{type:String},
  img:{type:String}
},{collection:'sanpham'});
module.exports = mongoose.model('sanpham',Sanpham);

const mongoose = require('mongoose');
const ChuyenMuc = new mongoose.Schema({
  chuyenmuc:{type:String}
},{collection:'chuyenmuc'});
module.exports = mongoose.model('chuyenmuc',ChuyenMuc);

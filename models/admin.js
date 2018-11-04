const mongoose = require('mongoose');
const Admin = new mongoose.Schema({
  username:{type:String},
  email:{type:String},
  password:{type:String},
  phanquyen:{type:String}
},{collection:'admin'});

module.exports = mongoose.model('admin',Admin);

const mongoose = require('mongoose');
const User = new mongoose.Schema({
  username:{type:String},
  email:{type:String},
  password:{type:String},
  phanquyen:{type:String}
},{collection:'user'});

module.exports = mongoose.model('user',User);

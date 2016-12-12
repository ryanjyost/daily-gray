var mongoose = require('mongoose');


let id = `p_${Date.now()}`;
// Define schema
var graySchema   = new mongoose.Schema({
  post_id: {type: String, default: id},
  black: String,
  blackImage:String,
  white: String,
  whiteImage:String,
  title: String,
  content:String,
  author:String,
  created_at:{ type: Date, default: Date.now }
});

// Export the Mongoose model
module.exports = mongoose.model('Gray', graySchema);
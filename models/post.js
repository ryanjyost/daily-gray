var mongoose = require('mongoose');

let id = `p_${Date.now()}`;

// Define schema
var postSchema   = new mongoose.Schema({
  post_id: {type: String, default: id},
  image: String,
  content:String,
  author:String,
  title:String,
  created_at:{ type: Date, default: Date.now }
});

// Export the Mongoose model
module.exports = mongoose.model('Post', postSchema);
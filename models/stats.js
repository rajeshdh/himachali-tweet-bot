var mongoose = require('mongoose');

var twitterStatsSchema = new mongoose.Schema({
 
  tweetId: String,
  user: [],
  hashtags: [],
  urls: [],
  created_at: Date,
  mentions: []
});

module.exports = mongoose.model('TwitterStats', twitterStatsSchema);
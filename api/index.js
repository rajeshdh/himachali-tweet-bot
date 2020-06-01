var Twitter = require("twitter");

require('dotenv').config()

var client = new Twitter({
  consumer_key: process.env.TWITTER_CONSUMER_KEY,
  consumer_secret: process.env.TWITTER_CONSUMER_SECRET,
  access_token_key: process.env.TWITTER_ACCESS_TOKEN,
  access_token_secret: process.env.TWITTER_ACCESS_TOKEN_SECRET
});
/**
 * attach a listener to new tweets with hashtags to watch
 */
module.exports.startBot = function(io) {
  var WATCH_HASHTAGS =
    "#himachal, #himachalpradesh, #Himachal, #HimachalPradesh, #हिमाचल, #shimla, #manali, #dharamshala, #spiti, #dhauladhar, #devbhoomi, #birbilling";
  /*
     *
     * filter the twitter public stream by the hashtags.
     */
  client.stream("statuses/filter", { track: WATCH_HASHTAGS }, function(stream) {
    stream.on("data", function(tweet) {
    //   console.log(tweet);
      var tweetId = tweet.id_str;
      if (tweet.user.screen_name != 'RT_Himachal') {
        if (haveProfanity(tweet.text)) {
          // do not retweet block user:: todo
        } else {
          retweet(io, tweetId);
        }
      }
    });

    stream.on("error", function(error) {
    //   console.log(error);
    });
  });
};

function retweet(io, tweetId) {
  client.post("statuses/retweet/" + tweetId, function(error, tweet, response) {
    if (error) {
    //   console.log(error);
    } 
  });
}
/**
 * 
 * @param {*} tweetText
 * Check if tweetText have some bad bords then don't retweet 
 */
function haveProfanity(tweetText) {
  var filters = [
    "escort",
    "escorts",
    "nude",
    "asshole",
    "looser",
    "wildgirl",
    "wildgirls",
    "wildgirls.",
    "wildgirls1",
    "Pulse Rate",
    "chutia",
    "chutiye",
    "gasti",
    "fuck",
    "lesbian",
    "gay",
    "sex",
    "porn",
    "pornography",
    "nude",
    "nudist"
  ];

  if (
    filters.some(function(v) {
      return tweetText.indexOf(v) >= 0;
    })
  ) {
    // There's at least one do not retweet
    return true;
  } else {
    return false;
  }
}

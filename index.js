/*!
 * index.js : A twitter bot that keeps a watch on hashtags and retweets them
 * Version 1.0.0
 * Created by Rajesh Dhiman @paharihacker
 */

/* Configure the Twitter API */
/* Configure the Twitter API */
var TWITTER_CONSUMER_KEY = '';
var TWITTER_CONSUMER_SECRET = '';
var TWITTER_ACCESS_TOKEN = '';
var TWITTER_ACCESS_TOKEN_SECRET = '';

/* set Twitter search phrase */

var Twit = require('twit');

var TwitBot = new Twit({
	consumer_key: TWITTER_CONSUMER_KEY,
	consumer_secret: TWITTER_CONSUMER_SECRET,
	access_token: TWITTER_ACCESS_TOKEN, 
	access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
});

console.log("The bot is running...");


var WATCH_HASHTAGS = '#himachal, #himachalpradesh, #Himachal, #HimachalPradesh';

// 
//  filter the twitter public stream by the hashtags. 
//
var stream = TwitBot.stream('statuses/filter', { track: WATCH_HASHTAGS })
 
stream.on('tweet', function (tweet) {  
	console.log(tweet.id);
  TwitBot.post('statuses/retweet/:id', {id: tweet.id_str }, function(error, data, response) {
	if (error){
		console.warn("Error:" + error);
		return;
		}
	});
});


	
		


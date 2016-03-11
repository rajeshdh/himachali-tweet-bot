/*!
 * index.js : A twitter bot that keeps a watch on hashtags and retweets them
 * Version 1.0.0
 * Created by Rajesh Dhiman @paharihacker
 */

var http = require("http"),
  Twit = require('twit'),
  moment = require('moment'),
  _ = require('underscore');


/* Configure the Twitter API */
var TWITTER_CONSUMER_KEY = 'KMW8P8UmGZuyRYn6L1edJf5nY';
var TWITTER_CONSUMER_SECRET = 'ofICw83yRRg7hwEnIDazaX5jEmK4XNPI9RGkocksgo24uYC3MF';
var TWITTER_ACCESS_TOKEN = '2992259190-nUmT9PRXlZnSOXSyGFqlXqeQC71mHtoDJ2E809I';
var TWITTER_ACCESS_TOKEN_SECRET = '343Me1xqXHk7V4hJsLxz4I6UXEArc54NJ8OPMFgARSOw1';



var TwitBot = new Twit({
	consumer_key: TWITTER_CONSUMER_KEY,
	consumer_secret: TWITTER_CONSUMER_SECRET,
	access_token: TWITTER_ACCESS_TOKEN, 
	access_token_secret: TWITTER_ACCESS_TOKEN_SECRET
});

console.log("The bot is running...");


var WATCH_HASHTAGS = '#himachal, #himachalpradesh, #Himachal, #HimachalPradesh, #हिमाचल';


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

// heroku server gets to sleep after 30 minutes of inactivity so I have to go to the link to activate
// the bot again. The tweets posted in between are not retweeted by the bot
// so whenever I will open the link it will search for the tweets from the time I last retweeted and retweets them

TwitBot.get('statuses/user_timeline', { screen_name: 'RT_Himachal', count: 1 }, function(err, data, response) {
  //console.log(data);
  var created = moment(new Date(data[0].created_at)).format('MM/DD/YYYY');
  TwitBot.get('search/tweets', { q:'#himachal since:'+created, count: 100 }, function(err, tweets, response) {
    
    _.each(tweets.statuses, function(tweet){
   
      TwitBot.post('statuses/retweet/:id', {id: tweet.id_str }, function(error, data, response) {
        if (error){
          console.warn("Error:" + error);
          return;
          }
        });
      });
  }); 
});

var server = http.createServer(function(request, response) {
  response.writeHead(200, {"Content-Type": "text/html"});
  response.write("<!DOCTYPE html>");
  response.write("<html>");
  response.write("<head>");
  response.write("<title>himachali Bot Page</title>");
  response.write("</head>");
  response.write("<body>");
  response.write("Hello Humans!!    ");
  response.write("</body>");
  response.write("</html>");
  response.end();
});
var PORT = process.env.PORT || 5000;
server.listen(PORT);
console.log("Server is listening at localhost:" + PORT);

// var Page_Counter = 1;
// setInterval(function() {

// TwitBot.get('users/search', { q: 'followback', page: Page_Counter },  function (error, data, response) {
//  if (error){
// 		console.warn("Error:" + error);
// 		return;
// 		}
		
// 		//console.log(data);
// 		data.map(followUser);
//  		Page_Counter++;
// })

// function followUser(user) {
//    console.log(user.screen_name);
//    if(user.following == false && user.follow_request_sent == false)
//    {
// 	   console.log('following: ' +user.screen_name);
//    		TwitBot.post('friendships/create', {id: user.id }, function(error,data) {
// 	  		if(error)
// 	  		{
// 		  		console.warn(error);
// 		  		return;
// 	  		} 
//    		});
//    }
// }
// }, 20000);


// TwitBot.get('followers/ids', function(err, reply) {
//       if(err) { return callback(err); }
      
//       var followers = reply.ids
//         , randFollower  = randIndex(followers);
        
//       self.twit.get('friends/ids', { user_id: randFollower }, function(err, reply) {
//           if(err) { return callback(err); }
          
//           var friends = reply.ids
//             , target  = randIndex(friends);
            
//           self.twit.post('friendships/create', { id: target }, callback); 
//         })
//     })
	
		


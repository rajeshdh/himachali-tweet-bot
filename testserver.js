var Twit = require('twit');
var config = require('./config');


var TwitBot = new Twit({
  consumer_key: config.TWITTER_CONSUMER_KEY,
  consumer_secret: config.TWITTER_CONSUMER_SECRET,
  access_token: config.TWITTER_ACCESS_TOKEN,
  access_token_secret: config.TWITTER_ACCESS_TOKEN_SECRET
});

var WATCH_HASHTAGS = '#himachal, #himachalpradesh, #Himachal, #HimachalPradesh, #हिमाचल, #shimla, #manali, #dharamshala, #spiti, #dhauladhar, #himalayas, #devbhoomi, #birbilling, #kasol, #parvativalley, #malana';
/*
 *
 * filter the twitter public stream by the hashtags.
 */
var stream = TwitBot.stream('statuses/filter', {
  track: WATCH_HASHTAGS
});


// stream.on('connected', function (response) {
//   console.log(response);
// })

stream.on('tweet', function(tweet) {
  console.log(tweet);
});

stream.on('tweet', (tweet) => (
      console.log(tweet)
        .catch((err) => {
          const tweetUrl = `https://twitter.com/statuses/${tweet.id_str}`
          console.error(`Error while processing ${tweetUrl}`)
          console.error(err.stack)
        })
    ))
    stream.on('connect', () => {
      console.log('Connecting to Twitter stream')
    })
    stream.on('connected', () => {
      console.log('Connected to Twitter stream')
    })
    stream.on('disconnect', () => {
      console.log('Disconnected from Twitter stream')
    })
stream.on('error', function (error, response) {
  console.log(error);
  console.log(response);
})

// /**
//  * get tweets and retweet
//  */
// function getAndRetweet(hashtag, created) {
//
//   TwitBot.get('search/tweets', {
//     q: hashtag + 'since:' + created,
//     count: 100
//   }, function(err, tweets, response) {
//
//     _.each(tweets.statuses, function(tweet) {
//
//       saveTweetEntities(tweet);
//
//       TwitBot.post('statuses/retweet/:id', {
//         id: tweet.id_str
//       }, function(error, data, response) {
//         if (error) {
//           console.warn("Error:" + error);
//           return;
//         }
//
//       });
//
//     });
//   });
// }

// /***
//  * get tweets for all hashtags
//  */
// function retweetMissedTweets(created) {
//
//   getAndRetweet('#himachal', created);
//
//   getAndRetweet('#himachalpradesh', created);
//
//   getAndRetweet('#Himachal', created);
//
//   getAndRetweet('#HimachalPradesh', created);
//
//   getAndRetweet('#हिमाचल', created);
//
// }

// /**
//  * Save tweet entities for the stats
//  */
// function saveTweetEntities(tweet) {
//   var twitterStats = new TwitterStats({
//     tweetId: tweet.id_str,
//     user: tweet.retweeteduser,
//     hashtags: tweet.entities.hashtags,
//     urls: tweet.entities.urls,
//     created_at: tweet.created_at,
//     mentions: tweet.entities.mentions
//   });
//
//   twitterStats.save(function(err) {
//     if (err) {
//       console.warn("Error:" + err);
//       return;
//     }
//   });
// }

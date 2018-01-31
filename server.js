// Babel ES6/JSX Compiler
require('babel-register');

var path = require('path');
var express = require('express');
var bodyParser = require('body-parser');
var compression = require('compression');
var favicon = require('serve-favicon');
var logger = require('morgan');
var async = require('async');
var colors = require('colors');
var mongoose = require('mongoose');
var request = require('request');
var React = require('react');
var ReactDOM = require('react-dom/server');
var Router = require('react-router');
var swig = require('swig');
var _ = require('underscore');

var moment = require('moment');

var config = require('./config');
var routes = require('./app/routes');
var TwitterStats = require('./models/stats');

var app = express();
var newTweets = 0;
var Last_Tweeted = [];

var Twitter = require('twitter');
var client = new Twitter({
  consumer_key: config.TWITTER_CONSUMER_KEY,
  consumer_secret: config.TWITTER_CONSUMER_SECRET,
  access_token_key: config.TWITTER_ACCESS_TOKEN,
  access_token_secret: config.TWITTER_ACCESS_TOKEN_SECRET
});

//
// mongoose.connect(config.database);
// mongoose.connection.on('error', function() {
//   console.info('Error: Could not connect to MongoDB. Did you forget to run `mongod`?');
// });

app.set('port', process.env.PORT || 1337);
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: false
}));
app.use(express.static(path.join(__dirname, 'public')));


/**
 * GET /api/getTweets
 * gets tweets
 */
app.get('/api/getTweets', function(req, res, next) {

  newTweets = 0;
  client.get('statuses/user_timeline', {
      screen_name: 'RT_Himachal',
      count: 30
    },
    function(err, data, response) {
      if (err) return next(err);
      res.send(data);
    });
});


app.use(function(req, res) {
  Router.match({
    routes: routes.default,
    location: req.url
  }, function(err, redirectLocation, renderProps) {
    if (err) {
      res.status(500).send(err.message)
    } else if (redirectLocation) {
      res.status(302).redirect(redirectLocation.pathname + redirectLocation.search)
    } else if (renderProps) {
      var html = ReactDOM.renderToString(React.createElement(Router.RoutingContext, renderProps));
      var page = swig.renderFile('views/index.html', {
        html: html
      });
      res.status(200).send(page);
    } else {
      res.status(404).send('Page Not Found')
    }
  });
});

app.use(function(err, req, res, next) {
  // console.log(err.stack.red);
  res.status(err.status || 500);
  res.send({
    message: err.message
  });
});



/**
 * Socket.io stuff.
 */
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var onlineUsers = 0;

// Sockets

io.sockets.on('connection', function(socket) {
  onlineUsers++;
 getNewTweets();
  io.sockets.emit('onlineUsers', {
    onlineUsers: onlineUsers
  });

  socket.on('disconnect', function() {
    onlineUsers--;
    io.sockets.emit('onlineUsers', {
      onlineUsers: onlineUsers
    });
  });

});

server.listen(app.get('port'), function() {
  console.log('Express server listening on port ' + app.get('port'));
});

/**
 * attach a listener to new tweets with hashtags to watch
 */
function getNewTweets() {
  var WATCH_HASHTAGS = '#himachal, #himachalpradesh, #Himachal, #HimachalPradesh, #हिमाचल, #shimla, #manali, #dharamshala, #spiti, #dhauladhar, #himalayas, #devbhoomi, #birbilling, #kasol, #parvativalley, #malana';
  /*
   *
   * filter the twitter public stream by the hashtags.
   */
   client.stream('statuses/filter', {track: WATCH_HASHTAGS},  function(stream) {
     stream.on('data', function(tweet) {
       var tweetId = tweet.id_str;
       if(Last_Tweeted.indexOf(tweetId) > -1) {
         // already exist do not retweet
         if(Last_Tweeted.length >= 10) {
           Last_Tweeted = [];
         }
       } else if (haveProfanity(tweet.text)) {
         // do not retweet block user:: todo
     } else {
          retweet(tweetId);
     }
     });

     stream.on('error', function(error) {
       console.log(error);
     });
   });
  // var stream = TwitBot.stream('statuses/filter', {
  //   track: WATCH_HASHTAGS
  // })
  //
  // stream.on('tweet', function(tweet) {
  //   if(checkProfanity(tweet.text)) {
  //   TwitBot.post('statuses/retweet/:id', {
  //     id: tweet.id_str
  //   }, function(error, data, response) {
  //     if (error) {
  //       console.warn("Error:" + error);
  //       return;
  //     }
  //     // increase new tweets count and emit new event
  //     newTweets++;
  //     io.sockets.emit('newTweet', {
  //       newTweets: newTweets
  //     });
  //   });
  // }
  // });
}


function retweet(tweetId){
  client.post('statuses/retweet/' + tweetId, function(error, tweet, response) {
  if (error) {
    console.log(error);
  } else {
  //  increase new tweets count and emit new event
    newTweets++;
    io.sockets.emit('newTweet', {
      newTweets: newTweets
    });
    Last_Tweeted.push(tweet.id_str);
  }

});
}






function haveProfanity(tweetText) {
  var filters = ['escort', 'nude', 'asshole', 'looser', 'wildgirl', 'wildgirls', 'wildgirls.', 'wildgirls1', 'Pulse Rate', 'chutia', 'chutiye', 'gasti', 'fuck', 'lesbian', 'gay', 'sex', 'porn', 'pornography'];

  if (filters.some(function(v) { return tweetText.indexOf(v) >= 0; })) {
    // There's at least one do not retweet
    return true;
  } else {
    return false;
  }
}

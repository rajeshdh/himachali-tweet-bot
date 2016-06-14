
An implementation of basic **twitter bot** functionality and **react application with a gulp based build system**. 

A twitter bot that keeps a watch on specified hashtags and retweets them. 
Also displays latest tweets and new tweet notifications from the twitter bot account on home screen.
Checkout the [live demo](https://rthimachal.herokuapp.com/)
Powered by **Node.js, MongoDB, socket.io and React  with Flux architecture and server-side rendering**.


### How to Install

##### Clone the [repo](https://github.com/rajeshdh/himachali-tweet-bot.git)

and run 
```javascript
npm install && bower install
```

##### Get your twitter api keys. [Here's how](http://stackoverflow.com/a/12335636/2165143)
##### Add them to `config.js`

```javascript

  TWITTER_CONSUMER_KEY : '***********************************',
  TWITTER_CONSUMER_SECRET : '***********************************',
  TWITTER_ACCESS_TOKEN : '***********************************',
  TWITTER_ACCESS_TOKEN_SECRET : '***********************************'
```  
 
##### Add hashtags you want to keep a watch on in `server.js` 
 
 ```javascript
   
   var WATCH_HASHTAGS = '#himachal, #himachalpradesh, #Himachal, #HimachalPradesh, #हिमाचल';
 ```
 
 Open two Terminal tabs. 
 In one tab run `gulp` to build the app, concatenate vendor files, compile LESS stylesheets and watch for file changes.
 Or just run `gulp build` if you don't want to watch for file changes.
   
 In another tab, run `npm run watch` to start the Node.js server and automatically restart the process on file changes.

sdfsfsff

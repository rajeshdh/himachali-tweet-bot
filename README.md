
A **twitter bot** that keeps a watch on specified hashtags and retweets them. 
Also displays latest tweets and new tweet notifications from the twitter bot account on home screen.

Powered by **Node.js, MongoDB, socket.io and React**.


### How to Install

##### Clone the [repo](https://github.com/rajeshdh/himachali-tweet-bot.git)

and run 
```javascript
npm install 
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

##### To run the application in development mode run
```javascript
npm start
```

#### Changes for version 3

- [ ] Get most used hashtags
- [ ] Profanity filter




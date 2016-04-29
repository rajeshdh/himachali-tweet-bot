import alt from '../alt';
import NavbarActions from '../actions/NavbarActions';

class NavbarStore {
  constructor() {
    this.bindActions(NavbarActions);    
    this.onlineUsers = 0;    
    this.newTweets = 0;
    this.ajaxAnimationClass = '';
  }  

  onUpdateNewTweets(data) {
    this.newTweets = data.newTweets;
  }
  onUpdateOnlineUsers(data) {
    this.onlineUsers = data.onlineUsers;
  }

  onUpdateAjaxAnimation(className) {
    this.ajaxAnimationClass = className; //fadein or fadeout
  }
 
}

export default alt.createStore(NavbarStore);

import alt from '../alt';
import {assign} from 'underscore';

class NavbarActions {
  constructor() {
    this.generateActions(
      'updateOnlineUsers',
      'updateNewTweets',
      'updateAjaxAnimation'
    );
  }

 
}

export default alt.createActions(NavbarActions);
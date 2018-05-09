import alt from '../alt';
import HomeListActions from '../actions/HomeActions';

class HomeListStore {
  constructor() {
    this.bindActions(HomeListActions);
    this.Tweets = [];
  }

  onGetTweetsSuccess(data) {
    this.Tweets = data;    
    
  }

  onGetTweetsFail(jqXhr) {
    toastr.error(jqXhr.responseJSON.message);
  }
}

export default alt.createStore(HomeListStore);

import alt from '../alt';

class HomeListActions {
  constructor() {
    this.generateActions(
      'getTweetsSuccess',
      'getTweetsFail'
    );
  }

  getTweets(payload) {
    let url = '/api/getTweets/';
    
    $.ajax({ url: url })
      .done((data) => {
        this.actions.getTweetsSuccess(data);
      })
      .fail((jqXhr) => {
        this.actions.getTweetsFail(jqXhr);
      });
  }
}
export default alt.createActions(HomeListActions);

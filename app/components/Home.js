import React from 'react';
import {Link} from 'react-router';
import {isEqual} from 'underscore';
import Tweet from 'react-tweet'

import HomeListStore from '../stores/HomeStore';
import HomeListActions from '../actions/HomeActions';

class HomeList extends React.Component {
  constructor(props) {
    super(props);
    this.state = HomeListStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    HomeListStore.listen(this.onChange);
    HomeListActions.getTweets(this.props.params);
  }

  componentWillUnmount() {
    HomeListStore.unlisten(this.onChange);
  }

  componentDidUpdate(prevProps) {
    if (!isEqual(prevProps.params, this.props.params)) {
      HomeListActions.getTweets(this.props.params);
    }
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    
    let tweetList = this.state.Tweets.map((tweet, index) => {
      return (
        <div key={index} className='list-group-item animated fadeIn'>
          <div className='media'>
            <span className='position pull-left'>{index + 1}</span>
    
            <div className='media-body'>
             <Tweet data={tweet} />                    
            
            </div>
          </div>
        </div>
      );
    });

    return (
      <div className='container'>
        <div className='list-group'>
          {tweetList}
        </div>
      </div>
    );
  }
}

export default HomeList;
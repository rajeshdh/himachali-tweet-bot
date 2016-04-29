import React from 'react';
import {Link} from 'react-router';
import FooterStore from '../stores/FooterStore'
import FooterActions from '../actions/FooterActions';

class Footer extends React.Component {
  constructor(props) {
    super(props);
    this.state = FooterStore.getState();
    this.onChange = this.onChange.bind(this);
  }

  componentDidMount() {
    FooterStore.listen(this.onChange);
    
  }

  componentWillUnmount() {
    FooterStore.unlisten(this.onChange);
  }

  onChange(state) {
    this.setState(state);
  }

  render() {
    
    return (
      <footer>
        <div className='container'>
          <div className='row'>
            <div className='col-sm-12'>
              <h3 className='lead'><strong>Information</strong> and <strong>Copyright</strong></h3>
              <p>Powered by <strong>Node.js</strong>, <strong>MongoDB</strong> and <strong>React</strong> with Flux architecture and server-side rendering.</p>
              <p>You may view the <a href='https://github.com/rajeshdh/himachali-tweet-bot'>Source Code</a> behind this project on GitHub.</p>
              <p>© 2016 <a href='http://rajeshdh.github.io/aboutme/'>Rajesh Dhiman.</a></p>
            </div>            
          </div>
        </div>
      </footer>
    );
  }
}

export default Footer;

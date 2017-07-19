import React, {
  Component,
  PropTypes
} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import pathHelper from '../../utils/pathHelper';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';
import { geoFindMe } from '../../utils/geolocation';
import * as yelp from '../../actions/yelp.actions';
import * as auth from '../../actions/auth.actions';

class App extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
  }

  componentDidMount() {
    const { getCurrentLocation } = this.props.actions.yelp;

    // Check browser's location
    geoFindMe()
      .then(coords => {
        getCurrentLocation(coords);
      })
      .catch(err => {
        console.log(err); // eslint-disable-line no-console
      });
  }

  handleFacebookLogin(response) {
    const { facebookLogin } = this.props.actions.auth;

    facebookLogin(response);
  }

  render() {
    const path = pathHelper.getBasePath(this.props.location.pathname);
    const { authenticated } = this.props;

    return (
      <div className="app">
        <Header pathname={path} authenticated={authenticated} handleClick={this.handleFacebookLogin}/>
        <div className="content-wrapper">
          {this.props.children}
        </div>
        <Footer pathname={path} authenticated={authenticated}/>
      </div>
    );
  }
}

App.propTypes = {
  children: PropTypes.element,
  location: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    location: ownProps.location,
    user: state.auth.user,
    authenticated: state.auth.authenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      yelp: bindActionCreators(yelp, dispatch),
      auth: bindActionCreators(auth, dispatch)
    }
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

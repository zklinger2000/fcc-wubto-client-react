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
import * as actions from '../../actions/yelp.actions';

class App extends Component {
  componentDidMount() {
    const { getCurrentLocation } = this.props.actions;

    // Check browser's location
    geoFindMe()
      .then(coords => {
        getCurrentLocation(coords);
      })
      .catch(err => {
        console.log(err); // eslint-disable-line no-console
      });
  }

  render() {
    const path = pathHelper.getBasePath(this.props.location.pathname);
    const { authenticated } = this.props;

    return (
      <div className="app">
        <Header pathname={path} authenticated={authenticated}/>
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
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(App);

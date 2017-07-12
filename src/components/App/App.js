import React, {
  Component,
  PropTypes
} from 'react';
import { connect } from 'react-redux';
import pathHelper from '../../utils/pathHelper';
import Header from '../Header/Header';
import Footer from '../Footer/Footer';

class App extends Component {
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
  authenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state, ownProps) {
  return {
    location: ownProps.location,
    user: state.auth.user,
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(App);

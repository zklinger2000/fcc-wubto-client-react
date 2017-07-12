import React, {
  Component,
  PropTypes
} from 'react';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import './HomePage.scss';
import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';

class HomePage extends Component {
  render() {
    return (
      <section className="home-page">
        <ScrollToTopOnMount/>
        <Helmet
          title="FCC Facebook Client React"
          titleTemplate="%s | A Full Stack React application with Facebook Login"
        />
        <header>
          <h1>FCC Facebook Client React</h1>
          <p>A Full Stack React application with Facebook Login</p>
        </header>
        {this.props.authenticated && this.props.user && this.props.user.displayName && (
          <section className="container">
            <p className="jumbotron">
              Hello there, {this.props.user.displayName}.
              You have been authenticated with Facebook.<br/>
              There is now a link to the page "Private" in the Header and Footer navigation.
            </p>
          </section>
        )}
     </section>
    );
  }
}

HomePage.propTypes = {
  user: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    authenticated: state.auth.authenticated
  };
}

export default connect(mapStateToProps)(HomePage);

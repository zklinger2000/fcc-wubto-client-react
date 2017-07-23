import React, {
  Component,
  PropTypes
} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import Helmet from 'react-helmet';
import './HomePage.scss';
import * as actions from '../../actions/auth.actions';
import FacebookLogin from 'react-facebook-login';
import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';

class HomePage extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
  }

  handleFacebookLogin(response) {
    const { facebookLogin } = this.props.actions;

    facebookLogin(response);
  }

  render() {
    const { current } = this.props;
    return (
      <section className="home-page">
        <ScrollToTopOnMount/>
        <Helmet
          title="Wubto"
          titleTemplate="%s | Choose a new hangout. Let your friends know you'll be there."
        />
        <header>
          <h1>Wubto</h1>
          <h2>Choose a new hangout.<br/> Let your friends know you'll be there.</h2>
        </header>
        <section className="location">
          <p>Current Location: {current.display_address && current.display_address[1] || 'Not set'}</p>
        </section>

        <section>
          <Link to="/places"><button className="btn btn-primary">Find</button></Link> a new place
        </section>

        {!this.props.authenticated && (
          <section>
            <FacebookLogin
              appId="875935382564043"
              autoLoad={false}
              fields="name, friends, picture"
              scope="public_profile,user_friends"
              callback={this.handleFacebookLogin}
              icon=""
              cssClass="btn btn-primary"
              textButton="Login"
              tag="a"
            /> to see where your friends will be
          </section>
        )}

        {this.props.authenticated && this.props.user && this.props.user.displayName && (
          <section>
            See where your <Link to="/friends"><button className="btn btn-primary">friends</button></Link> will be
          </section>
        )}
     </section>
    );
  }
}

HomePage.propTypes = {
  user: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  search: PropTypes.object.isRequired,
  current: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    authenticated: state.auth.authenticated,
    search: state.yelp.search,
    current: state.yelp.current
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);

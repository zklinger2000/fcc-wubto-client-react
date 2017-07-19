import React, {
  PropTypes,
  Component
} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/auth.actions';
import FacebookLogin from 'react-facebook-login';

class Login extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleFacebookLogin = this.handleFacebookLogin.bind(this);
  }

  handleFacebookLogin(response) {
    const { facebookLogin } = this.props.actions;

    facebookLogin(response);
  }

  render() {
    return (
      <section className="login-page">
        <h2>You must be logged in to confirm any locations...</h2>
        <div>
          <FacebookLogin
            appId="875935382564043"
            autoLoad={false}
            fields="name, friends"
            scope="public_profile,user_friends"
            callback={this.handleFacebookLogin}
            icon="fa-facebook-official fa-2x"
            cssClass="btn btn-primary"
          />
        </div>
      </section>
    );
  }
}

Login.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};
Login.defaultProps = {};

function mapStateToProps(state) {
  return {
    authenticated: state.auth.authenticated
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Login);

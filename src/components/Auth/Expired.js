import React, {
  PropTypes,
  Component
} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/auth.actions';
import FacebookLogin from 'react-facebook-login';
import './Expired.scss';

class Expired extends Component {
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
      <section className="expired-page">
        <h2>Your session expired.</h2>
        <div>
          <FacebookLogin
            appId="875935382564043"
            autoLoad={false}
            fields="name, friends"
            scope="public_profile,user_friends"
            callback={this.handleFacebookLogin}
            icon="fa-facebook-official fa-2x"
            cssClass="btn btn-facebook"
            textButton=" Log back in"
            tag="a"
          />
        </div>
      </section>
    );
  }
}

Expired.propTypes = {
  authenticated: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired
};
Expired.defaultProps = {};

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

export default connect(mapStateToProps, mapDispatchToProps)(Expired);

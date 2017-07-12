import React, {
  Component,
  PropTypes,
} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/auth.actions';

class LoginReturn extends Component {
  componentDidMount() {
    localStorage.setItem('user_token', this.props.location.query.token);
    this.props.actions.tokenLogin();
  }

  render() {
    return (
      <h1>Login Return</h1>
    );
  }
}

LoginReturn.propTypes = {
  location: PropTypes.object,
  actions: PropTypes.object.isRequired
};
LoginReturn.defaultProps = {};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(LoginReturn);

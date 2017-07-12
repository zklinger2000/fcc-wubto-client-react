import React, {
  Component,
  PropTypes,
} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/auth.actions';

class Logout extends Component {
  componentDidMount() {
    this.props.actions.logoutUser();
  }

  render() {
    return (
      <section className="container">
        <h1 className="jumbotron">You are now logged out.</h1>
      </section>
    );
  }
}

Logout.propTypes = {
  actions: PropTypes.object.isRequired
};
Logout.defaultProps = {};

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(null, mapDispatchToProps)(Logout);

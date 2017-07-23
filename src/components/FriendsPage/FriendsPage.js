import React, {
  Component,
  PropTypes,
} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/yelp.actions';
import Confirm from '../Places/Confirm';
import Helmet from 'react-helmet';
import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';
import './FriendsPage.scss';

class FriendsPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleConfirmLocation = this.handleConfirmLocation.bind(this);
  }

  handleConfirmLocation(place, isConfirming) {
    this.props.actions.toggleConfirmPlace(place, isConfirming);
  }

  render() {
    const { user, confirm, authenticated } = this.props;

    return (
      <section className="friends-page">
        <ScrollToTopOnMount/>
        <Helmet
          title="Wubto"
          titleTemplate="%s | Friends List"
        />
        <h2>Where your friends are going...</h2>
        <section className="friends-list">
          {user.friends && user.friends.filter(friend =>
            (friend.place.expiresAt && new Date(friend.place.expiresAt).toISOString() > new Date().toISOString())
          ).length === 0 && <h1>None of your friends have any plans yet :-(</h1>}
        {user.friends && user.friends.filter(friend =>
            (friend.place.expiresAt && new Date(friend.place.expiresAt).toISOString() > new Date().toISOString())
        ).map((friend, index) =>
          <article key={index}>
            <Link to={`/places/id/${friend.place.id}`}>
              <div className="image-wrapper profile">
                <img src={friend.facebook.picture} alt={friend.facebook.displayName}/>
              </div>
              <div className="info">
                <h4>{friend.facebook.displayName}</h4>
                <label>Plans: </label> {friend.place.name}
              </div>
              <div className="image-wrapper">
                <img src={friend.place.image_url} alt={friend.place.name}/>
              </div>
            </Link>
            <Confirm authenticated={authenticated} handleClick={this.handleConfirmLocation} place={friend.place} user={user} confirm={confirm}/>
          </article>)}
        </section>
      </section>
    );
  }
}

FriendsPage.propTypes = {
  user: PropTypes.object,
  authenticated: PropTypes.bool.isRequired,
  actions: PropTypes.object.isRequired,
  confirm: PropTypes.object.isRequired,
};
FriendsPage.defaultProps = {};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    authenticated: state.auth.authenticated,
    confirm: state.yelp.confirm
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(FriendsPage);

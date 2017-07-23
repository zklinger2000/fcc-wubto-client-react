import React, {
  Component,
  PropTypes,
} from 'react';
// import { Link } from 'react-router';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/yelp.actions';
import Helmet from 'react-helmet';
import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';
import Confirm from './Confirm';
import EmbedMap from '../EmbedMap/EmbedMap';
import './PlacePage.scss';

class PlacePage extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleConfirmLocation = this.handleConfirmLocation.bind(this);
  }

  componentDidMount() {
    const { getPlaceById } = this.props.actions;

    getPlaceById(this.props.params.id);
  }

  handleConfirmLocation(place, isConfirming) {
    this.props.actions.toggleConfirmPlace(place, isConfirming);
  }

  render() {
    const { place, user, authenticated, confirm } = this.props;

    return (
      <section className="place-page">
        <ScrollToTopOnMount/>
        <Helmet
          title="Wubto"
          titleTemplate="%s | Choose a new hangout. Let your friends know you'll be there."
        />
        {place.isLoading && <section className="loading">
          <i className="fa fa-spinner fa-pulse fa-5x fa-fw"/><span className="sr-only">Loading...</span>
        </section>}
        {!place.isLoading && <section className="place">
          <h2>{place.name}</h2>
          <div className="image-wrapper">
            <img src={place.image_url} alt={place.name}/>
          </div>
          <section className="info">
            <label>Currently:</label> {place.is_closed ? 'Closed' : 'Open'}<br/>
            <label>Price:</label> {place.price}<br/>
            <label>Stars:</label> {place.rating || 'not available'}<br/>
            <label>Phone:</label> {place.display_phone || 'not available'}<br/>
            <label>Categories:</label> {place.categories && place.categories.map(c => c.title).join(', ')}<br/>
          </section>
          <Confirm authenticated={authenticated} handleClick={this.handleConfirmLocation} place={place} user={user} confirm={confirm}/>
          <address>
            <label>Address:</label><br/>
            {place.location && place.location.display_address && place.location.display_address.map((line, index) => <p key={index}>{line}</p>)}
          </address>
          <EmbedMap place={place}/>
          <section className="friends-going">
            <h3>Friends Going</h3>
            <hr/>
            {user.friends && user.friends.length && user.friends.filter(friend => {
              return (friend.place.id === place.id) &&
              (friend.place.expiresAt && new Date(friend.place.expiresAt).toISOString() > new Date().toISOString());
            }).map((friend, index) =>
              <p key={index}>{friend.facebook.displayName}</p>)}
            {!user.friends || user.friends.filter(friend => {
              return (friend.place.id === place.id) &&
                (friend.place.expiresAt && new Date(friend.place.expiresAt).toISOString() > new Date().toISOString());
            }).length === 0 &&
              <p>No friends going yet...</p>
            }
          </section>
          {place.photos && <section className="photos">
            <h3>Photos</h3>
            {place.photos.length && place.photos.slice(1).map((photo, index) => {
              return (
                <div className="image-wrapper" key={index}>
                  <img src={photo} alt={place.name}/>
                </div>
              );
            })}
          </section>}
        </section>}
      </section>
    );
  }
}

PlacePage.propTypes = {
  params: PropTypes.object.isRequired,
  user: PropTypes.object,
  authenticated: PropTypes.bool.isRequired,
  place: PropTypes.object.isRequired,
  actions: PropTypes.object.isRequired,
  confirm: PropTypes.object
};
PlacePage.defaultProps = {};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    authenticated: state.auth.authenticated,
    place: state.yelp.place,
    confirm: state.yelp.confirm
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlacePage);

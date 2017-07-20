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
import './PlacePage.scss';

class PlacePage extends Component {
  componentDidMount() {
    const { getPlaceById } = this.props.actions;

    getPlaceById(this.props.params.id);
  }

  render() {
    const { place, user } = this.props;

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
          <h3>Friends Going</h3>
          <hr/>
          {user.friends.filter(friend => {
            return (friend.place.id === place.id) &&
            (new Date(friend.place.expiresAt).toISOString() > new Date().toISOString());
          }).map((friend, index) =>
            <p key={index}>{friend.facebook.displayName}</p>)}
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
  actions: PropTypes.object.isRequired
};
PlacePage.defaultProps = {};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    authenticated: state.auth.authenticated,
    place: state.yelp.place
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlacePage);

import React, {
  PropTypes,
} from 'react';
import { Link } from 'react-router';

const Confirm = (props) => {
  const { place, handleClick, authenticated, confirm, user } = props;

  return (
    <section className="confirmation">
      {!authenticated && confirm && !(confirm.isConfirming && confirm.id === place.id) && (
        <Link to="/login">
          <div className="btn btn-info">
            <h4>Be there</h4>
            <i className="fa fa-circle-o"/>
          </div>
        </Link>
      )}
      {authenticated && confirm && place && !(confirm.isConfirming && confirm.id === place.id) && (user.place && user.place.id !== place.id) && (
        <div className="btn btn-info" onClick={() => handleClick(place, confirm.isConfirming)}>
          <h4>Be there</h4>
          <i className="fa fa-circle-o"/>
        </div>
      )}
      {authenticated && confirm && place &&
      !(confirm.isConfirming && confirm.id === place.id) &&
      (user.place && user.place.id === place.id) &&
      (new Date(user.place.expiresAt).toISOString() > new Date().toISOString()) &&
      (
        <div className="btn btn-success" onClick={() => handleClick(place, confirm.isConfirming)}>
          <h4>Going</h4>
          <i className="fa fa-check-circle-o"/>
        </div>
      )}
      {authenticated && confirm && place &&
      !(confirm.isConfirming && confirm.id === place.id) &&
      (user.place && user.place.id === place.id) &&
      (new Date(user.place.expiresAt).toISOString() < new Date().toISOString()) &&
      (
        <div className="btn btn-danger" onClick={() => handleClick(place, confirm.isConfirming)}>
          <h4>Expired</h4>
          <i className="fa fa-check-circle-o"/>
        </div>
      )}
      {confirm && (confirm.isConfirming && confirm.id === place.id) &&
      <div className="btn btn-info">
        <h4>Be there</h4>
        <i className="fa fa-cog fa-spin"/>
      </div>
      }
      { authenticated &&
      user.friends && place && user.place &&
      !!user.friends.filter(friend => {
        return (friend.place.id === place.id && (new Date(friend.place.expiresAt).toISOString() > new Date().toISOString()));
      }).length &&
      (
        <div>
          <p className="alert-success">{user.friends && user.friends.filter(friend => {
            return (friend.place.id === place.id && (new Date(friend.place.expiresAt).toISOString() > new Date().toISOString()));
          }).length + (user.place.id === place.id ? 1 : 0)} Going</p>
        </div>
      )}
    </section>
  );
};

Confirm.propTypes = {
  place: PropTypes.object,
  confirm: PropTypes.object,
  user: PropTypes.object,
  authenticated: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};
Confirm.defaultProps = {};

export default Confirm;

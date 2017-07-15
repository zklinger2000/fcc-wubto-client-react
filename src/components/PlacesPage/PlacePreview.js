import React, {
  PropTypes,
} from 'react';
import { Link } from 'react-router';
import './PlacePreview.scss';

const PlacePreview = (props) => {
  const { place, handleClick, authenticated, confirm, user } = props;

  return (
    <article className="place-preview">
      <Link to={"places/id/" + place.id}>
        <div className="image-wrapper">
          <img src={place.image_url}/>
        </div>
        <div className="info">
          <h4><strong>{place.name}</strong></h4>
          <label>categories:</label><text>{place.categories.map(c => c.title).join(', ')}</text><br/>
          <label>price:</label><text>{place.price}</text>
          { place.location.display_address.map((line, index) =>
              <p key={index}>{line}</p>)}
        </div>
      </Link>
      <section className="confirmation">
        {!authenticated && !(confirm.isConfirming && confirm.id === place.id) && (
          <a href={`${process.env.NODE_ENV === 'production' ? 'https://fcc-wubto-rest-api.herokuapp.com' : 'http://localhost:8050'}/login/facebook`} target="_self">
            <div className="btn btn-info" onClick={() => handleClick(place.id)}>
              <h4>Be there</h4>
              <i className="fa fa-circle-o"/>
            </div>
          </a>
        )}
        {authenticated && !(confirm.isConfirming && confirm.id === place.id) && (user.place !== place.id) && (
          <div className="btn btn-info" onClick={() => handleClick(place.id, confirm.isConfirming)}>
            <h4>Be there</h4>
            <i className="fa fa-circle-o"/>
          </div>
        )}
        {authenticated && !(confirm.isConfirming && confirm.id === place.id) && (user.place === place.id) && (
          <div className="btn btn-success" onClick={() => handleClick(place.id, confirm.isConfirming)}>
            <h4>Going</h4>
            <i className="fa fa-check-circle-o"/>
          </div>
        )}
        {(confirm.isConfirming && confirm.id === place.id) &&
        <div className="btn btn-info">
          <h4>Confirming</h4>
          <i className="fa fa-cog fa-spin"/>
        </div>
        }
      </section>
    </article>
  );
};

PlacePreview.propTypes = {
  place: PropTypes.object.isRequired,
  handleClick: PropTypes.func.isRequired,
  authenticated: PropTypes.bool.isRequired,
  confirm: PropTypes.object.isRequired,
  user: PropTypes.object.isRequired
};
PlacePreview.defaultProps = {};

export default PlacePreview;

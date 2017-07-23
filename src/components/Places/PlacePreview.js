import React, {
  PropTypes,
} from 'react';
import { Link } from 'react-router';
import Confirm from './Confirm';
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
      <Confirm authenticated={authenticated} handleClick={handleClick} place={place} user={user} confirm={confirm}/>
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

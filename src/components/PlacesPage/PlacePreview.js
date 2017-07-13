import React, {
  PropTypes,
} from 'react';
import { Link } from 'react-router';
import './PlacePreview.scss';

const PlacePreview = (props) => {
  const { place } = props;

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
        <div>
          <h4>Be there</h4>
          <i className="fa fa-circle-o"/>
        </div>
      </section>
    </article>
  );
};

PlacePreview.propTypes = {
  place: PropTypes.object.isRequired
};
PlacePreview.defaultProps = {};

export default PlacePreview;

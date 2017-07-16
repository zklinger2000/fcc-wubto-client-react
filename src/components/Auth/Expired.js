import React from 'react';
import './Expired.scss';

const Expired = () => {
  return (
    <section className="expired-page">
      <h2>Your session expired.</h2>
      <a className="btn btn-default" href={`${process.env.NODE_ENV === 'production' ? 'https://fcc-wubto-rest-api.herokuapp.com' : 'http://localhost:8050'}/login/facebook`} target="_self"><i className="fa fa-facebook-official fa-2x"/><text>Log back in</text></a>
    </section>
  );
};

export default Expired;

import React from 'react';
import { Link } from 'react-router';
import './NotFoundPage.scss';

const NotFoundPage = () => {
  return (
    <div className="page">
      <div className="not-found-page">
        <i className="fa fa-warning fa-5x" aria-hidden="true" />
        <h4>
          404 Page Not Found
        </h4>
        <Link to="/"> Go back to homepage </Link>
      </div>
    </div>
  );
};

export default NotFoundPage;

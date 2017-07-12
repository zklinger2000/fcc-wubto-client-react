import React from 'react';
import './PublicPage.scss';

const PublicPage = () => {
  return (
    <section className="public-page">
      <div className="container">
        <h1>Public Page</h1>
        <p className="jumbotron">This page is visible to anyone.<br/>
          Notice how the Footer links change.<br/>
          Login with Facebook to see more...
        </p>
      </div>
    </section>
  );
};

export default PublicPage;

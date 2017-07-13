import React, {
  Component,
  PropTypes
} from 'react';
import { Link } from 'react-router';
import { connect } from 'react-redux';
import Helmet from 'react-helmet';
import './HomePage.scss';
import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';

class HomePage extends Component {
  render() {
    const { current } = this.props;
    return (
      <section className="home-page">
        <ScrollToTopOnMount/>
        <Helmet
          title="Wubto"
          titleTemplate="%s | Choose a new hangout. Let your friends know you'll be there."
        />
        <header>
          <h1>Wubto</h1>
          <h2>Choose a new hangout.<br/> Let your friends know you'll be there.</h2>
        </header>
        <section className="location">
          <p>Current Location: {current.display_address && current.display_address[1] || ''}</p>
        </section>

        <section>
          <Link to="/search"><button className="btn btn-primary">Find</button></Link> a new place
        </section>

        {!this.props.authenticated && (
          <section>
            <a href={`${process.env.NODE_ENV === 'production' ? 'https://fcc-heroku-wubto-rest-api.herokuapp.com' : 'http://localhost:8050'}/login/facebook`} target="_self"><button className="btn btn-primary">Login</button></a> to see where your friends will be
          </section>
        )}

        {this.props.authenticated && this.props.user && this.props.user.displayName && (
          <section>
            See where your <Link to="/friends"><button className="btn btn-primary">friends</button></Link> will be
          </section>
        )}
     </section>
    );
  }
}

HomePage.propTypes = {
  user: PropTypes.object.isRequired,
  authenticated: PropTypes.bool.isRequired,
  search: PropTypes.object.isRequired,
  current: PropTypes.object.isRequired,
};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    authenticated: state.auth.authenticated,
    search: state.yelp.search,
    current: state.yelp.current
  };
}

export default connect(mapStateToProps)(HomePage);

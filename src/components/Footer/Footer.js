import React, {
  PropTypes,
  Component,
} from 'react';
import { Link, IndexLink } from 'react-router';
import './Footer.scss';

class Footer extends Component {
  render() {
    const { pathname, authenticated } = this.props;
    return (
      <footer className="footer">
        <section className="links">
          {pathname !== 'home' && <IndexLink to="/">Home</IndexLink>}
          {pathname !== 'places' && <Link to="/places">Places</Link>}
          {authenticated && pathname !== 'friends' && <Link to="/friends">Friends</Link>}
          {pathname !== 'about' && <Link to="/about">About</Link>}
        </section>
        <h5>Powered by Yelp and Facebook</h5>
      </footer>
    );
  }
}

Footer.propTypes = {
  pathname: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
};

export default Footer;

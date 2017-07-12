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
          {pathname !== 'about' && <Link to="/about">About</Link>}
          {pathname !== 'public' && <Link to="/public">Public</Link>}
          {authenticated && pathname !== 'private' && <Link to="/private">Private</Link>}
        </section>
        <h5>© Fancy Legal Stuff</h5>
      </footer>
    );
  }
}

Footer.propTypes = {
  pathname: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
};

export default Footer;

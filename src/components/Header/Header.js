import React, {
  PropTypes,
} from 'react';
import { IndexLink, Link } from 'react-router';
import './Header.scss';

const Header = (props) => {
  return (
    <nav>
      <ul>
        <li className={props.pathname === 'home' ? 'active' : null}>
          <IndexLink to="/">Home</IndexLink>
        </li>
        <li className={props.pathname === 'about' ? 'active' : null}>
          <Link to="/about">About</Link>
        </li>
        <li className={props.pathname === 'public' ? 'active' : null}>
          <Link to="/public">Public</Link>
        </li>
        {props.authenticated && <li className={props.pathname === 'private' ? 'active' : null}>
          <Link to="/private">Private</Link>
        </li>}
        {!props.authenticated && <li className="pull-right">
          <a href={`${process.env.NODE_ENV === 'production' ? 'https://fcc-heroku-rest-api.herokuapp.com' : 'http://localhost:8050'}/login/facebook`} target="_self"><i className="fa fa-facebook-official fa-2x"/> Login</a>
        </li>}
        {props.authenticated && <li className="pull-right">
          <Link to="/logout">Logout</Link>
        </li>}
      </ul>
    </nav>
  );
};

Header.propTypes = {
  pathname: PropTypes.string.isRequired,
  authenticated: PropTypes.bool.isRequired
};

export default Header;

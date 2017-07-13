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
        <li className={props.pathname === 'places' ? 'active' : null}>
          <Link to="/places"><i className="fa fa-search"/><text> Places</text></Link>
        </li>
        {props.authenticated && <li className={props.pathname === 'friends' ? 'active' : null}>
          <Link to="/friends"><i className="fa fa-users"/><text> Friends</text></Link>
        </li>}
        {!props.authenticated && <li className="pull-right">
          <a href={`${process.env.NODE_ENV === 'production' ? 'https://fcc-heroku-wubto-rest-api.herokuapp.com' : 'http://localhost:8050'}/login/facebook`} target="_self"><i className="fa fa-facebook-official fa-2x"/> Login</a>
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

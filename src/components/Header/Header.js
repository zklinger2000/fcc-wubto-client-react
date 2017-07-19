import React, {
  PropTypes,
} from 'react';
import { IndexLink, Link } from 'react-router';
import './Header.scss';
import FacebookLogin from 'react-facebook-login';

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
          <FacebookLogin
            appId="875935382564043"
            autoLoad={false}
            fields="name, friends"
            scope="public_profile,user_friends"
            callback={props.handleClick}
            icon="fa-facebook-official fa-2x"
            textButton="Login"
            tag="a"
            />
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
  authenticated: PropTypes.bool.isRequired,
  handleClick: PropTypes.func.isRequired
};

export default Header;

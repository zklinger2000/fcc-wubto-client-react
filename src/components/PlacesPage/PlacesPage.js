import React, {
  Component,
  PropTypes,
} from 'react';
import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';
import * as actions from '../../actions/yelp.actions';
import Helmet from 'react-helmet';
import './PlacesPage.scss';
import ScrollToTopOnMount from '../ScrollToTopOnMount/ScrollToTopOnMount';

class PlacesPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSearch = this.handleSearch.bind(this);
  }

  handleSearch() {
    this.props.actions.searchDefault(this.props.current);
  }

  render() {
    return (
      <section className="search-page">
        <ScrollToTopOnMount/>
        <Helmet
          title="Wubto"
          titleTemplate="%s | Choose a new hangout. Let your friends know you'll be there."
        />
        <section className="search">
          <button onClick={this.handleSearch} className="btn btn-primary">Search</button>
        </section>
      </section>
    );
  }
}

PlacesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  current: PropTypes.object.isRequired
};
PlacesPage.defaultProps = {};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    search: state.yelp.search,
    current: state.yelp.current
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlacesPage);

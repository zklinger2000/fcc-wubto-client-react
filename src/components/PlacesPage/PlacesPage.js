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
import PlacePreview from './PlacePreview';
import SearchForm from './SearchForm';

class PlacesPage extends Component {
  constructor(props, context) {
    super(props, context);

    this.handleSearch = this.handleSearch.bind(this);
  }

  componentDidMount() {
    this.props.actions.searchDefault(this.props.current);
  }

  handleSearch(formData) {
    this.props.actions.searchSubmit(formData);
  }

  render() {
    const { places } = this.props;

    return (
      <section className="places-page">
        <ScrollToTopOnMount/>
        <Helmet
          title="Wubto"
          titleTemplate="%s | Places"
        />
        <section className="search">
          <SearchForm onSubmit={this.handleSearch}/>
        </section>
        <section className="places-list">
          { places.map(place => <PlacePreview key={place.id} place={place} />) }
        </section>
      </section>
    );
  }
}

PlacesPage.propTypes = {
  actions: PropTypes.object.isRequired,
  search: PropTypes.object.isRequired,
  current: PropTypes.object.isRequired,
  places: PropTypes.array.isRequired
};
PlacesPage.defaultProps = {};

function mapStateToProps(state) {
  return {
    user: state.auth.user,
    search: state.yelp.search,
    current: state.yelp.current,
    places: state.yelp.places || []
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(actions, dispatch)
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(PlacesPage);

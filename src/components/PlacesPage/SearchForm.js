"use strict";
import React, {
  PropTypes,
} from 'react';
import {connect} from 'react-redux';
import {Field, reduxForm} from 'redux-form';
import * as actions from '../../actions/yelp.actions';

let SearchForm = props => {
  const {handleSubmit, pristine, submitting} = props;

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>Location</label>
        <div>
          <Field
            name="location"
            component="input"
            type="text"
            placeholder="city, state OR zip"
            required="true"
          />
        </div>
      </div>
      <div>
        <label>Categories</label>
        <div>
          <Field
            name="categories"
            component="input"
            type="text"
            placeholder="...bakeries, museums, parks..."
            required="true"
          />
        </div>
      </div>
      <div>
        <label>Keyword</label>
        <div>
          <Field
            name="term"
            component="input"
            type="text"
            placeholder="search term for a specific place"
          />
        </div>
      </div>
      <div>
        <button type="submit" className="btn btn-success" disabled={pristine || submitting}>Search</button>
      </div>
    </form>
  );
};

SearchForm = reduxForm({
  form: 'yelpSearchForm' // a unique identifier for this form
})(SearchForm);

function formatInitialValues(location) {
  return !location.city ? {} : { location: `${location.city}, ${location.state}`};
}

// You have to connect() to any reducers that you wish to connect to yourself
SearchForm = connect(
  state => ({
    initialValues: formatInitialValues(state.yelp.current)
  }),
  { actions } // bind action creators
)(SearchForm);

SearchForm.propTypes = {
  handleSubmit: PropTypes.func,
  pristine: PropTypes.bool,
  reset: PropTypes.func,
  submitting: PropTypes.bool
};
SearchForm.defaultProps = {};

export default SearchForm;

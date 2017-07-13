export default {
  auth: {
    authenticated: false,
    error: null,
    user: {},
    token: ''
  },
  yelp: {
    search: {
      term: '',
      categories: [],
      location: '',
      latitude: undefined,
      longitude: undefined
    },
    current: {
      address1: '',
      city: '',
      state: '',
      zip_code: '',
      country: '',
      display_address: ['', 'San Francisco, CA 94117'],
      latitude: undefined,
      longitude: undefined
    }
  }
};

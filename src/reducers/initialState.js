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
      categories: '',
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
      display_address: [],
      latitude: undefined,
      longitude: undefined
    },
    places: [],
    place: {},
    confirm: {
      isConfirming: false,
      id: ''
    }
  }
};

import { createStore } from 'vuex'

export default createStore({
  state: {
    user: {
      token: "",
      username: "",
      id: 0,
      isAuthenticated: false,
      profile_slug: "",
    }
  },
  mutations: {
    initializeStore(state) {
      if (localStorage.getItem('token')) {
        state.user.token = localStorage.getItem('token')
        state.user.username = localStorage.getItem('username')
        state.user.isAuthenticated = true
        state.user.profile_slug = localStorage.getItem('profile_slug')
        state.user.id = localStorage.getItem('id')
      } else {
        state.user.token = ''
        state.user.isAuthenticated = false
        state.user.username = ''
        state.user.profile_slug = ''
        state.user.id = 0;
      }
    },
    logUser(state, dat) {
      state.user.token = dat.token
      state.user.username = dat.username
      state.user.isAuthenticated = true;
      state.user.profile_slug = dat.profile_slug
      state.user.id = dat.id
      localStorage.setItem('token', dat.token);
      localStorage.setItem('username', dat.username);
      localStorage.setItem('profile_slug', dat.profile_slug)
      localStorage.setItem('id',dat.id)
    },
    logOutUser(state) {
      state.user.token = '';
      state.user.username = '';
      state.user.isAuthenticated = false;
      state.user.profile_slug = ''
      state.user.id = 0;
      localStorage.removeItem('token');
      localStorage.removeItem('username');
      localStorage.removeItem('profile_slug')
      localStorage.removeItem('id')
    },
    updateProfile(state, dat) {
      state.user.profile_slug = dat.profile_slug
      localStorage.setItem('profile_slug', dat.profile_slug)
    }
  },
  actions: {
  },
  modules: {

  }
})
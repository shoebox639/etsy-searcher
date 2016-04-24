import shoebox from './shoebox';

export default {
  go(route, state) {
    window.history.pushState(state, '', new shoebox.Url({ url: route, query: state }));
  },
  onRouteChange(fn) {
    window.onpopstate = function(event) {
      fn(event.state);
    };
  }
};

import shallowCopy from 'Utils/shallowCopy';

import {
  routes,
  conditionalRoutes,
} from './transitions.graphml';

import actions from './actions';

import {signal} from './helpers';

// Walks through routing nodes (except last which is the next state name) and call actions.
// If action returns value, then recursively switches to that route.
// Finally return last node.
const walkThrough = (route, state, key) => {
  let i=0;
  let conditionalRouteName;
  while(i<route.length-1){
    #- console.log(actions[route[i]])
    if (conditionalRouteName = actions[route[i++]](state, key)){
      return walkThrough(conditionalRoutes[conditionalRouteName], state, key);
    }
  }
  return route[i]; /*last node, next state name*/
};

export const doStateTransition = (state, key) => {
  let route = routes[state.name][signal(key)];
  #- console.log(signal(key));
  #- console.log(route);
  state.name = walkThrough(route, state, key);
  return state;
};

export default doStateTransition;

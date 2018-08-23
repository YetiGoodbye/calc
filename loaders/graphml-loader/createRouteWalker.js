const createRouteWalker = (routes, conditionalRoutes, actions, mapKeyToGraphSignal) => {
  const walkThrough = (route, state, key) => {
    let i=0;
    let conditionalRouteName;
    while(i<route.length-1){
      if (conditionalRouteName = actions[route[i++]](state, key)){
        return walkThrough(conditionalRoutes[conditionalRouteName], state, key);
      }
    }
    return route[i];
  };

  // Walks through routing nodes (except last which is the next state name) and call actions.
  // If action returns value, then recursively switches to that route.
  // Finally return last node.
  return (state, key) => {
    let route = routes[state.name][mapKeyToGraphSignal(key)];
    if (route) state.name = walkThrough(route, state, key);
    return state;
  }
} 

export default createRouteWalker;

const defaultRouteId = '#000000';

class Analizer {
  constructor(graph){
    this.graph = graph;
    this.normalRoutes = {};
    this.alternativeRoutes = {};
  }

  isAction(nodeId){
    return this.graph.actions[nodeId];
  }

  isState(nodeId){
    return this.graph.states[nodeId];
  }

  transitions(nodeId){
    return Object.values(this.graph.transitions).filter(tr => (tr.source === nodeId));
  }

  transtionsWithRouteId(nodeId, routeId){
    return this.transitions(nodeId).filter(tr => tr.routeId === routeId);    
  }

  nextNodes(nodeId){
    return this.transitions(nodeId).map(tr => tr.target);
  }

  // next node for route with routeId or for default route
  nextNodeForRoute(nodeId, routeId){
    let transitions = this.transitions(nodeId);

    let exactRouteTransitions = transitions.filter(tr => tr.routeId === routeId);
    if(exactRouteTransitions.length === 1)
      return exactRouteTransitions[0].target;

    if(exactRouteTransitions.length > 1)
        throw "Invalid graph";

    let defaultRouteTransitions = transitions.filter(tr => tr.routeId === defaultRouteId);
    if(defaultRouteTransitions.length === 1)
      return defaultRouteTransitions[0].target;

    throw "Invalid graph";
  }

  findRouteRecursive(nodeId, routeId, route){
    let nextNodeId = this.nextNodeForRoute(nodeId, routeId);
    if(this.isAction(nextNodeId)){
      route.push(this.graph.actions[nextNodeId]);
      this.findRouteRecursive(nextNodeId, routeId, route);
    } else if (this.isState(nextNodeId)){
      route.push(this.graph.states[nextNodeId]);
    } else {
      throw "Invalid graph";
    }
  }

  findRouteWithId(nodeId, routeId){
    let exactRouteTransitions = this.transtionsWithRouteId(nodeId, routeId);
    if(exactRouteTransitions.length !== 1)
      throw "Invalid graph";
    let nextNode = exactRouteTransitions[0].target 
    
    if(this.isState(nextNode)) return [this.graph.states[nextNode]];

    let route = [this.graph.actions[nextNode]];

    this.findRouteRecursive(nextNode, routeId, route);
    return route;
  }

  findRoute(signalId){
    let transitions = this.transitions(signalId);
    if(transitions.length !== 1) throw "Invalid graph";
    let route = [];
    this.findRouteRecursive(signalId, transitions[0].routeId, route);
    return route;  
  }

  analize(){
    Object.entries(this.graph.states).forEach(stateEntry => {
      let [stateId, stateName] = stateEntry;
      this.normalRoutes[stateName] = {};

      let signalIds = this.nextNodes(stateId);

      signalIds.forEach(signalId => {
        let signalName = this.graph.signals[signalId];
        if(!signalName) throw "Invalid graph";
        this.normalRoutes[stateName][signalName] = this.findRoute(signalId);
      });

      Object.entries(this.graph.conditions).forEach(conditionEntry => {
        let [conditionId, condition] = conditionEntry;
        let transitions =
          this.transitions(conditionId)
          .filter(tr => (tr.routeId === condition.routeId));

        if(transitions.length !== 1) throw "Invalid graph";

        this.alternativeRoutes[this.graph.actions[conditionId]] = this.findRouteWithId( conditionId, condition.routeId );
      });
    });

    return {
      normalRoutes: this.normalRoutes,
      alternativeRoutes: this.alternativeRoutes,
    };
  }
}

function analize(graph){
  return new Analizer(graph).analize();
}

module.exports = analize;

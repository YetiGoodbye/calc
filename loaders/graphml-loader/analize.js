const inspect = require('util').inspect;
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

    if(exactRouteTransitions.length > 1){
      throw (
        'found more than one exact transitions',
        '\ngraphml node id: ' + nodeId +
        '\nnode name:' + (this.graph.signals[nodeId] || this.graph.actions[nodeId] || this.graph.states[nodeId]) +
        '\nroute id: ' + routeId + 
        '\ntransitions:\n' + inspect(transitions)
      );
    }
      

    let defaultRouteTransitions = transitions.filter(tr => tr.routeId === defaultRouteId);
    if(defaultRouteTransitions.length === 1)
      return defaultRouteTransitions[0].target;

    throw (
      'failed to find any route' +
      '\ngraphml node id: ' + nodeId +
      '\nnode name:' + (this.graph.signals[nodeId] || this.graph.actions[nodeId] || this.graph.states[nodeId]) +
      '\nroute id: ' + routeId + 
      '\ntransitions:\n' + inspect(transitions)
    );
  }

  findRouteRecursive(nodeId, routeId, route){
    let nextNodeId;
    try {
      nextNodeId = this.nextNodeForRoute(nodeId, routeId);
    } catch (e){
      throw e + '\nroute: ' + inspect(route);
    }

    if(this.isAction(nextNodeId)){
      route.push(this.graph.actions[nextNodeId]);
      this.findRouteRecursive(nextNodeId, routeId, route);
    } else if (this.isState(nextNodeId)){
      route.push(this.graph.states[nextNodeId]);
    } else {
      throw (
        'received a route node with not applicable type' +
        '\ngraphml node id:' + nextNodeId +
        '\nnode name:' + (this.graph.signals[nodeId] || this.graph.actions[nodeId] || this.graph.states[nodeId]) +
        '\nroute id: ' + routeId + 
        '\nroute: ' + inspect(route)
      );
    }
  }

  findRouteWithId(nodeId, routeId){
    let exactRouteTransitions = this.transtionsWithRouteId(nodeId, routeId);
    // this was checked before call
    // if(exactRouteTransitions.length !== 1) throw ...

    let nextNode = exactRouteTransitions[0].target 
    
    if(this.isState(nextNode)) return [this.graph.states[nextNode]];

    let route = [this.graph.actions[nextNode]];

    this.findRouteRecursive(nextNode, routeId, route);
    return route;
  }

  findRoute(signalId){
    let transitions = this.transitions(signalId);
    if(transitions.length !== 1){
      throw (
        'found invalid transitions count' + transitions.length +
        '\ngraphml node id:' + signalId +
        '\nnode name:' + (this.graph.signals[nodeId] || this.graph.actions[nodeId] || this.graph.states[nodeId])
        );
    }

    let route = [];
    this.findRouteRecursive(signalId, transitions[0].routeId, route);
    return route;  
  }

  loopTransitions(){
    const loops = [];
    Object.values(this.graph.transitions).forEach(tr => {
      if(tr.source === tr.target)
        loops.push(tr);
    })
    return loops;
  }

  analize(){

    let warnings = [];
    let errors = [];

    let loopTransitions = this.loopTransitions();
    if (loopTransitions.length){
      warnings.push(
        'found ' + loopTransitions.count + ' loop transitions\n' +
        inspect(loopTransitions)
      );
    }

      Object.entries(this.graph.states).forEach(stateEntry => {
        let [stateId, stateName] = stateEntry;
        this.normalRoutes[stateName] = {};

        let signalIds = this.nextNodes(stateId);

        try {
          signalIds.forEach(signalId => {
            let signalName = this.graph.signals[signalId];
            if(!signalName){
              throw (
                'got unexpected parser error. signalId is not found' +
                '\nsignalId:' + signalId +
                '\nnode name: ' + (this.graph.signals[nodeId] || this.graph.actions[nodeId] || this.graph.states[nodeId]) +
                '\nThis is probably internal loader error. Please report a bug. Sorry :('
                );
            }
            this.normalRoutes[stateName][signalName] = this.findRoute(signalId);
          });
        } catch (e) {
          errors.push(
            e +
            '\nstart from state id: ' + stateId +
            '\nstate name: ' + stateName
            );
        }
      });

      Object.entries(this.graph.conditions).forEach(conditionEntry => {
        let [conditionId, condition] = conditionEntry;

        try {
          let transitions = this.transtionsWithRouteId(conditionId, condition.routeId)

          if(transitions.length !== 1) {
            throw 'found invalid transitions count: ' +transitions.length + 
            '\nroute id: ' + condition.routeId;
          }

          this.alternativeRoutes[this.graph.actions[conditionId]] = this.findRouteWithId( conditionId, condition.routeId );

        } catch (e) {
          console.log('******************************');
          console.log(e);
          errors.push(
            e +
            '\nconditional node id:' + conditionId +
            '\nnodename:' + this.graph.actions[conditionId]
            );
        }
      });

    return {
      normalRoutes: this.normalRoutes,
      alternativeRoutes: this.alternativeRoutes,
      warnings, errors
    };
  }
}

function analize(graph){
  console.log(graph);
  return new Analizer(graph).analize();
}

module.exports = analize;

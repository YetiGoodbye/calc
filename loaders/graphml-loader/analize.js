const inspect = require('util').inspect;
const defaultRouteId = '#000000';

class Analizer {
  constructor(graph){
    this.graph = graph;
    this.routes = {};
    this.conditionalRoutes = {};
  }

  nodeName(nodeId){
    return (this.graph.signals[nodeId] || this.graph.actions[nodeId] || this.graph.states[nodeId]);
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

  nextNodeForRoute(nodeId, routeId){
    let transitions = this.transitions(nodeId);

    let exactRouteTransitions = transitions.filter(tr => tr.routeId === routeId);
    if(exactRouteTransitions.length === 1)
      return exactRouteTransitions[0].target;

    if(exactRouteTransitions.length > 1){
      throw ( 'found more than one route transition' +
        '\ngraphml node id: ' + nodeId +
        '\nnode name:' + this.nodeName(nodeId) +
        '\nroute id: ' + routeId +
        '\ntransitions:' + inspect(transitions));
    }
      

    let defaultRouteTransitions = transitions.filter(tr => tr.routeId === defaultRouteId);
    if(defaultRouteTransitions.length === 1)
      return defaultRouteTransitions[0].target;

    throw ( 'failed to find any route' +
      '\ngraphml node id: ' + nodeId +
      '\nnode name:' + this.nodeName(nodeId) +
      '\nroute id: ' + routeId + 
      '\ntransitions:\n' + inspect(transitions));
  }  

  dereferenceNodes(route){
    return route.map(nodeId => this.nodeName(nodeId));
  }

  findRouteRecursive(nodeId, routeId, route){
    let nextNodeId;
    try {
      nextNodeId = this.nextNodeForRoute(nodeId, routeId);
    } catch (e){
      throw e + '\nroute: ' + inspect(this.dereferenceNodes(route));
    }

    if(this.isAction(nextNodeId)){
      if(route.includes(nextNodeId)){
        throw ('found looping route' +
          '\ngraphml node id:' + nodeId +
          '\nnode name:' + this.nodeName(nodeId) +
          '\nroute id: ' + routeId + 
          '\nroute: ' + inspect(this.dereferenceNodes(route)) +
          '\nnext graphml node id:' + nextNodeId +
          '\nnext node name:' + this.nodeName(nextNodeId));
      }
      route.push(nextNodeId);
      this.findRouteRecursive(nextNodeId, routeId, route);
    } else if (this.isState(nextNodeId)){
      route.push(nextNodeId);
    } else {
      throw ('received a route node with not applicable type' +
        '\ngraphml node id:' + nextNodeId +
        '\nnode name:' + this.nodeName(nodeId) +
        '\nroute id: ' + routeId + 
        '\nroute: ' + inspect(this.dereferenceNodes(route)));
    }
  }

  findRouteWithId(nodeId, routeId){
    let exactRouteTransitions = this.transtionsWithRouteId(nodeId, routeId);

    let nextNode = exactRouteTransitions[0].target 
    
    if(this.isState(nextNode)) return [this.graph.states[nextNode]];

    let route = [this.graph.actions[nextNode]];

    this.findRouteRecursive(nextNode, routeId, route);
    return route;
  }

  findRoute(signalId){
    let transitions = this.transitions(signalId);
    if(transitions.length !== 1){
      throw ('found invalid transitions count: ' + transitions.length +
        '\ngraphml node id:' + signalId +
        '\nnode name:' + this.nodeName(signalId) +
        '\ntransitions' + inspect(transitions));
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
      let inspected = '';
      loopTransitions.forEach(tr => {inspected += '\n\t' + inspect(tr);});
      errors.push(
        'Analyzer found ' + loopTransitions.length + ' loop transitions' + inspected
      );
      return {
        routes: this.routes,
        conditionalRoutes: this.conditionalRoutes,
        warnings, errors
      };
    }

    Object.entries(this.graph.states).forEach(stateEntry => {
      let [stateId, stateName] = stateEntry;
      this.routes[stateName] = {};

      let signalIds = this.nextNodes(stateId);

      try {
        signalIds.forEach(signalId => {
          let signalName = this.graph.signals[signalId];
          if(!signalName){
            throw ('got unexpected parser error. Signal with was not found by id' +
              '\nThis is probably loader bug. Sorry :(' +
              '\nsignalId:' + signalId);
          }
          let route = this.findRoute(signalId)
          this.routes[stateName][signalName] = this.dereferenceNodes(route);
        });
      } catch (e) {
        errors.push('Analizer ' +
          e +
          '\nstate id: ' + stateId +
          '\nstate name: ' + stateName);
      }
    });

    Object.entries(this.graph.conditions).forEach(conditionEntry => {
      let [conditionId, condition] = conditionEntry;

      try {
        let transitions = this.transtionsWithRouteId(conditionId, condition.routeId)

        if(transitions.length !== 1) {
          throw ('found invalid transitions count: ' +
          transitions.length + 
          '\nroute id: ' + condition.routeId);
        }

        this.conditionalRoutes[this.graph.actions[conditionId]] = this.findRouteWithId( conditionId, condition.routeId );

      } catch (e) {
        errors.push(
          'Analizer ' + e +
          '\nconditional node id:' + conditionId +
          '\nconditional node name:' + this.graph.actions[conditionId]
          );
      }
    });

    return {
      routes: this.routes,
      conditionalRoutes: this.conditionalRoutes,
      warnings, errors
    };
  }
}

module.exports = (graph) => new Analizer(graph).analize();

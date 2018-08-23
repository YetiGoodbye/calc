const parse = require('./parse');
const analize = require('./analize');
const inspect = require('util').inspect;

const loaderName = '***GraphML Loader***\n';

const createExportableConstants = (names) => {
  return names.reduce(
    (constants, name) => (constants[name] = name, constants),
    {}
  )
};

function load(graphml){

  let graph, result;
  try {
    graph = parse(graphml);
  } catch (e) {
    this.emitError(new Error(loaderName + 'parser ' + e));
    return;
  }

  if(this.query.printOutput){
    console.log(loaderName + 'graph:');
    console.log(inspect(graph, {depth: Infinity}));
  }
  
  result = analize(graph);
  
  if(this.query.printOutput){
    console.log('*GraphML loader* generated exports:');
    console.log(inspect(result, {depth: Infinity}));
  }

  result.warnings.forEach(e => this.emitWarning(new Error(loaderName + e)));

  result.errors.forEach(e => this.emitError(new Error(loaderName + e)));
  if(result.errors.length) return '';

  let js = '';
  js += `const states=${JSON.stringify(createExportableConstants(Object.values(graph.states)))};`;
  js += `const actions=${JSON.stringify(createExportableConstants(Object.values(graph.actions)))};`;
  js += `const signals=${JSON.stringify(createExportableConstants(Object.values(graph.signals)))};`;
  js += `const routes=${JSON.stringify(result.routes)};`
  js += `const conditionalRoutes=${JSON.stringify(result.conditionalRoutes)};`
  js += 'export {states,actions,signals,routes,conditionalRoutes};'
  return js;  
}

module.exports = load;

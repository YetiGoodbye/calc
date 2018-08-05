const parse = require('./parse');
const analize = require('./analize');


const loaderName = 'GraphML loader: ';

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
  }

  result = analize(graph);
  result.warnings.forEach(w => this.emitWarning(new Error(w)));
  result.errors.forEach(e => this.emitError(new Error(e)));

  let js = '';
  js += `const states=${JSON.stringify(createExportableConstants(Object.values(graph.states)))};`;
  js += `const actions=${JSON.stringify(createExportableConstants(Object.values(graph.actions)))};`;
  js += `const signals=${JSON.stringify(createExportableConstants(Object.values(graph.signals)))};`;
  js += `const routes=${JSON.stringify(result.normalRoutes)};`
  js += `const conditionalRoutes=${JSON.stringify(result.alternativeRoutes)};`
  js += 'export {states,actions,signals,routes,conditionalRoutes};'
  return js;  
}

module.exports = load;

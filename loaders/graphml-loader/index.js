const parse = require('./parse');
const analize = require('./analize');

const createExportableConstants = (names) => {
  return names.reduce(
    (constants, name) => (constants[name] = name, constants),
    {}
  )
};

const load = (graphml) => {
  const graph = parse(graphml);
  const result = analize(graph);
  let js = '';
  js += `const stateNames=${JSON.stringify(createExportableConstants(Object.values(graph.states)))};`;
  js += `const actionNames=${JSON.stringify(createExportableConstants(Object.values(graph.actions)))};`;
  js += `const signalNames=${JSON.stringify(createExportableConstants(Object.values(graph.signals)))};`;
  js += `const normalRoutes=${JSON.stringify(result.normalRoutes)};`
  js += `const alternativeRoutes=${JSON.stringify(result.alternativeRoutes)};`
  js += 'export {stateNames,actionNames,signalNames,normalRoutes,alternativeRoutes};'
  return js;  
}

module.exports = load;

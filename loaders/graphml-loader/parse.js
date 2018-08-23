const sax = require("sax");
const lastIn = require('array-last');

const isState  = (node) => (node.type === 'ellipse' && node.color === '#FFCC00');
const isSignal = (node) => (node.type === 'ellipse' && node.color === '#00FF00');
const isAction = (node) => (node.type === 'rectangle' || node.type === 'diamond');
const isCondition = (node) => (node.type === 'diamond');
const isConstantDeclaration = (node) => (node.type === 'parallelogram');

// converts array of keys to object of self mapping keys
const o = keys => keys.reduce( (acc,key) => (acc[key]=key, acc), {} );

const xmlNodeParsers = {
  'skipthis': {},
  'graphml': { children: o(['graph']) },
  'graph':   { children: o(['node', 'edge']) },
  'node': {
    children: {'data': 'nodeData'},
    process: (node, context) => {context.currentNode = node.attributes},
    close: (node, context) => {
      let {currentNode} = context;
      let {id, label, color} = currentNode;
      if ( isState(currentNode) ) {
        context.states[id] = label;
      } else if ( isSignal(currentNode) ) {
        context.signals[id] = label;
      } else if ( isConstantDeclaration(currentNode) ){
        currentNode.label.trim().split('\n').forEach(decl =>{
          decl = decl.split(/\s+/);
          context.signalNames[decl[0]] = decl[1];
        });
      } else {
        if ( isAction(currentNode) )
          context.actions[id] = label;
        if ( isCondition(currentNode) )
          context.conditions[id] = { routeId: color };
      }
      currentNode = undefined;
    }
  },
  'nodeData':    { children: o(['y:ShapeNode']) },
  'y:ShapeNode': { children: o(['y:Fill', 'y:Shape', 'y:NodeLabel']) },
  'y:NodeLabel': {
    text: (text, context) => {context.currentNode.label = text}
  },
  'y:Shape': {
    process: (node, context) => {context.currentNode.type = node.attributes.type},
  },
  'y:Fill': {
    process: (node, context) => {context.currentNode.color = node.attributes.color},
  },
  'edge': {
    children: {'data': 'edgeData'},
    process: (node, context) => {context.currentEdge = node.attributes},
    close: (node, context) => {
      let {id, source, target, color} = context.currentEdge;
      context.transitions[id] = {source, target, routeId: color};
      context.currentEdge = undefined;
    }
  },
  'edgeData':  { children: o(['y:ArcEdge']) },
  'y:ArcEdge': { children: o(['y:LineStyle']) },
  'y:LineStyle': {
    process: (node, context) => {context.currentEdge.color = node.attributes.color},
  },
};

function openChild(xmlNode){
  let parserName = lastIn(this.parsersStack);
  if(parserName) {
    let currentParser = xmlNodeParsers[parserName];
    let childParserName = ( currentParser.children && currentParser.children[xmlNode.name] ) || 'skipthis';
    this.parsersStack.push(childParserName);
  } else {
    this.parsersStack.push('graphml');
  }
}

function processTag(xmlNode){
  let parser = xmlNodeParsers[lastIn(this.parsersStack)];
  if(parser.process) {
    parser.process(xmlNode, this);
  }
}

function processText(text){
  let parser = xmlNodeParsers[lastIn(this.parsersStack)];
  if(parser && parser.text) {
    parser.text(text, this);
  }
}

function close(xmlNodeName){
  let parser = xmlNodeParsers[lastIn(this.parsersStack)];
  if(!parser)
    this.errors.push(`parser received unexpected close tag </${xmlNodeName}>`);
  
  if(parser.close)
    parser.close(xmlNodeName, this);
  this.parsersStack.pop();
}

const parse = (graphml) => {
  const context = {
    states: {},
    signals: {},
    signalNames: {},
    actions: {},
    conditions: {},
    transitions: {},
    parsersStack: [],
    errors: [],
    warnings: [],
  };
  const saxParser = sax.parser(/*strict:*/true/*, {trim: true}*/);
  saxParser.onopentagstart = openChild.bind(context);
  saxParser.onopentag      = processTag.bind(context);
  saxParser.ontext         = processText.bind(context);
  saxParser.onclosetag     = close.bind(context);
  saxParser.write(graphml).close();

  Object.keys(context.signals).forEach(signalId => {
    let oldName = context.signals[signalId];
    let newName = context.signalNames[oldName];
    if(newName)
      context.signals[signalId] = newName;
    else
       context.warnings.push('mapping for `' + oldName + '` was not found. Signal id is ' + signalId);
  });

  delete context.signalNames;
  delete context.parsersStack;
  delete context.currentNode;
  delete context.currentEdge;
  return context;
}

module.exports = parse;

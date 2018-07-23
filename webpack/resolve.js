const path = require('path');

function resolve(relativePath) {
  return path.join(__dirname, '/../' + relativePath);
}

module.exports = resolve;

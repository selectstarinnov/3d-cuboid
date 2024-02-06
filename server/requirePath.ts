const dirname = process.cwd();
const path = require('path');

function requirePath(name) {
    return require(path.join(dirname, name));
}


module.exports = requirePath
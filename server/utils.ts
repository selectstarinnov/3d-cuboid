const dirname = process.cwd();
const path = require('path');
const rootPath = path.resolve(__dirname);

function pad(n, width, z) {
    z = z || '0';
    n = n + '';
    return n.length >= width ? n : new Array(width - n.length + 1).join(z) + n;
}

module.exports = {
    dirname,
    pad
}
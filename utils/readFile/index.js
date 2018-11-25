const path = require('path');
const read = require('read-file');

module.exports.readFile = function(filePath) {
    return read.sync(filePath, 'utf8');
}
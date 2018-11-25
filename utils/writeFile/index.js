const path = require('path');
const write = require('write');

module.exports.writeFile = function(filePath, fileContent) {
    return write.sync(filePath, fileContent);
}
const path = require('path');
const write = require('write');

// helper function to insert a given string at a given index of a string!
String.prototype.insertAt = function(index, string) {
    return this.substr(0, index) + string + this.substr(index);
}

module.exports.writeFile = function(filePath, fileContent) {
    return write.sync(filePath, fileContent);
}
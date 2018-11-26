const path = require('path');
const read = require('./utils/readFile');
const write = require('./utils/writeFile');
const projectPath = require('./variables').projectPath;
const componentPaths = require('./variables').componentPaths;

const currentFilePath = path.resolve(projectPath, componentPaths[1]);

let contents = read.readFile(currentFilePath);
//let getType = read.getFileType(path.resolve())

let dependencies = read.getConstructorDependencies(contents);
console.log(dependencies);

let importStatements = read.getImportStatements(contents, dependencies.dependencyNames);
console.log(importStatements);

let usedMethods = read.getInstanceMethods(contents, dependencies.instanceNames);
console.log(usedMethods);

write.writeFile('fuck.txt', importStatements[0]);
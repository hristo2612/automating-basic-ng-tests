const path = require('path');
const read = require('read-file');

function readFile(filePath) {
    return read.sync(filePath, 'utf8');
}

function readSpecFile(filePath) {
    let specFilePath = filePath.replace('.ts', '.spec.ts');
    return read.sync(specFilePath, 'utf8');
}

function getConstructorDependencies(fileContent) {
    let dependencies = fileContent.match(/constructor\(([^)]+)\)/g);

    if (dependencies) {
        // remove whitespaces, tabs and newlines
        dependencies = dependencies[0].replace(/(\s{2,})/g, '')
            .replace('constructor(', '')
            .replace(')', '');
        // split dependencies extracted from constructor by ','
        dependencies = dependencies.split(',');

        // Get instances names
        let instanceNames = dependencies.map((dep) => {
            return dep.trim()
                .split(':')[0]
                .split(' ')[1];
        });

        // And type names
        let dependencyNames = dependencies.map((dep) => {
            return dep.trim()
                .split(':')[1]
                .split(' ')[1];
        });

        return { instanceNames, dependencyNames };
    } else {
        return null;
    }
}

function getImportStatements(fileContent, dependencyNames) {
    let importStatements = [];
    dependencyNames.forEach(name => {
        let regex = new RegExp("import\\s{(\\s{0,2})" + name + "(\\s{0,2})}([^;]+);", "g");
        let matches = fileContent.match(regex);
        if (matches) {
            importStatements.push(matches[0]);
        }
    });
    return importStatements.length > 0 ? importStatements : null;
}

function getInstanceMethods(fileContent, instanceNames) {
    let instanceMethods = [];
    instanceNames.forEach(name => {
        let regex = new RegExp("([^\\/])(this\\.)" + name + "(\\.{1})(\\w+)", "g");
        let matches = fileContent.match(regex);
        if (matches) {
            matches = matches.map((match) => {
                return match.split('.')[2];
            });

            matches = [...new Set(matches)];
            instanceMethods.push({ name: name, usedMethods: matches });
        }
    });
    return instanceMethods.length > 0 ? instanceMethods : null;
}

module.exports.readFile = readFile;
module.exports.readSpecFile = readSpecFile;
module.exports.getConstructorDependencies = getConstructorDependencies;
module.exports.getInstanceMethods = getInstanceMethods;
module.exports.getImportStatements = getImportStatements;

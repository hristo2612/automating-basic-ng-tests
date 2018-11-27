const path = require('path');
const read = require('read-file');

function capitalize(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
}

function file(filePath) {
    return read.sync(filePath, 'utf8');
}

function fileSpec(filePath) {
    let specFilePath = filePath.replace('.ts', '.spec.ts');
    return read.sync(specFilePath, 'utf8');
}

function getComponentInfo(componentPath) {
    let splitPath = componentPath.split('/');
    let directPath = splitPath[splitPath.length - 1].replace('.ts', '');
    let componentSplitName = directPath.split(/[-\.]/);
    componentSplitName = componentSplitName.map((name) => {
        return capitalize(name);
    });
    let componentName = componentSplitName.join('');
    return { componentName, directPath };
}

function getComponentImport(componentPath) {
    let info = getComponentInfo(componentPath);
    return 'import { ' + info.componentName + ' } from \'./' + info.directPath + '\';';
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
        // Safe regex: use (\\s{0,2}) instead of ([^;]+)
        let regex = new RegExp("import([^;\\n]+)" + name + "([^;\\n]+);", "g");
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

module.exports.file = file;
module.exports.fileSpec = fileSpec;
module.exports.getComponentImport = getComponentImport;
module.exports.getComponentInfo = getComponentInfo;
module.exports.getConstructorDependencies = getConstructorDependencies;
module.exports.getInstanceMethods = getInstanceMethods;
module.exports.getImportStatements = getImportStatements;

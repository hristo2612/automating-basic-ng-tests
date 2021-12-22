const path = require('path');
const write = require('write');
const { provider, variable, variableAssign } = require('../../templates/basic');

// helper function to insert a given string at a given index of a string!
String.prototype.insertAt = function (index, string) {
    return this.substr(0, index) + string + this.substr(index);
}

function file(filePath, fileContent) {
    return write.sync(filePath, fileContent);
}

function imports(content, imports) {
    let newContent = content;
    if (imports) {
        newContent = newContent.replace('$IMPORTS', imports.join('\n'));
    } else {
        newContent = newContent.replace('$IMPORTS', '');
    }
    return newContent;
}

function componentImport(content, importString) {
    let newContent = content.replace('$COMPONENT_IMPORT', importString);
    return newContent;
}

function componentUnderTest(content, componentName) {
    let newContent = content.replace(/\$COMPONENT_UNDER_TEST/g, componentName);
    return newContent;
}

function providers(content, dependencies, usedMethods) {
    let newContent = content;
    if (dependencies && usedMethods) {
        let providersArr = [];
        dependencies.instanceNames.forEach((dep, index) => {
            let providerContent = provider.replace(/\$SERVICE_PROVIDER/g, dependencies.dependencyNames[index]);
            providerContent = usedMethods[index] && usedMethods[index].usedMethods ? providerContent.replace('$USED_METHODS', usedMethods[index].usedMethods.map((method) => {
                return `'${method}'`;
            }).join(',\n')) : providerContent.replace('$USED_METHODS', '');
            providersArr.push(providerContent);
        });
        return newContent.replace('$PROVIDERS', providersArr.join('\n'));
    } else {
        return newContent.replace('$PROVIDERS', '');
    }
}

function variables(content, dependencies) {
    let newContent = content;
    if (dependencies) {
        let variables = dependencies.instanceNames.map((name) => {
            return variable.replace('$INSTANCE_NAME', name);
        });
        let assignedVariables = [];
        dependencies.dependencyNames.forEach((dep, index) => {
            assignedVariables.push(
                variableAssign.replace('$INSTANCE_NAME', dependencies.instanceNames[index])
                              .replace('$DEPENDENCY_NAME', dep)
            );
        });
        return newContent.replace('$VARIABLES', variables.join('\n')).replaceAll('$VARIABLES_ASSIGN', assignedVariables.join('\n'));
    } else {
        return newContent.replace('$VARIABLES', '').replaceAll('$VARIABLES_ASSIGN', '');
    }
}

module.exports.file = file;
module.exports.imports = imports;
module.exports.componentImport = componentImport;
module.exports.componentUnderTest = componentUnderTest;
module.exports.providers = providers;
module.exports.variables = variables;
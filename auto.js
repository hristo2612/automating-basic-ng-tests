const path = require('path');
const read = require('./utils/readFile');
const write = require('./utils/writeFile');
const projectPath = require('./variables').projectPath;
const componentPaths = require('./variables').componentPaths;
const template = require('./templates/basic').main;

for (let i = 0; i < componentPaths.length; i++) {
    const currentFilePath = path.resolve(projectPath, componentPaths[i]);

    let contents = read.file(currentFilePath);

    let dependencies = read.getConstructorDependencies(contents);
    let importStatements = dependencies ? read.getImportStatements(contents, dependencies.dependencyNames) : null;
    let usedMethods = dependencies ? read.getInstanceMethods(contents, dependencies.instanceNames) : null;
    let componentName = read.getComponentInfo(componentPaths[i]).componentName;

    let changedContent = template;

    changedContent = write.componentImport(changedContent, read.getComponentImport(componentPaths[i]));
    changedContent = write.imports(changedContent, importStatements);
    changedContent = write.componentUnderTest(changedContent, componentName);
    changedContent = write.providers(changedContent, dependencies, usedMethods);
    changedContent = write.variables(changedContent, dependencies);

    write.file(currentFilePath.replace('.ts', '.spec.ts'), changedContent);
    //write.file(`temp/${componentName}.js`, changedContent);
}
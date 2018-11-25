const path = require('path');
const read = require('./utils/readFile');
const write = require('./utils/writeFile');

let contents = read.readFile(path.resolve('C://Users/Hristo/Github/angular-fundamentals/src/app/product-list', 'product-list.component.ts'));

// Get constructor dependencies

let dependencies = contents.match(/constructor\((.+?)(\D+?)(\))/g);

// remove whitespaces, tabs and newlines
dependencies = dependencies[0].replace(/(\s{2,})/g, '')
    .replace('constructor(', '')
    .replace(')', '');
dependencies = dependencies.split(',')
// Get instances names
let instances = dependencies.map((dep) => {
    return dep.trim()
        .split(':')[0]
        .split(' ')[1];
});

// And type names
let types = dependencies.map((dep) => {
    return dep.trim()
        .split(':')[1]
        .split(' ')[1];
});


console.log('Our dependencies', types);

instances.forEach(element => {
    let regex = new RegExp("([^\\/])(this\\.)" + element + "(\\.{1})(\\w+)", "g");
    let matches = contents.match(regex);
    if (matches) {
        matches = matches.map((match) => {
            return match.split('.')[2];
        });

        matches = [...new Set(matches)];

        console.log("Methods for " + element + ": ", matches);
    }
});
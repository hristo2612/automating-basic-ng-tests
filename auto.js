let read = require('read-file');

let contents = read.sync('comp02.js', 'utf8');

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
# Automating Basic Angular Tests
A node.js script which generates code for an angular.spec file.
It includes:
1. Retrieving all of the component's dependencies and placing them as jasmine mock objects in the spec file
2. Injecting all imports inside TestBed
3. Generating 2 separate testing units ( As Unit & As Component )

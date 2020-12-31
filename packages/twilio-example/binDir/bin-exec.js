#!/usr/bin/env node

// esm package allows to use without the need to 
// transpile for Node.js versions.
require = require('esm')(module /*, options*/);
require('../src/cli').cli(process.argv);

//this is the cli executable.
// now you can write code to parse arguments in this
// file and 
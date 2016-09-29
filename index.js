'use strict';


const express = require('express');
const app = express();
const authenticate = require('./lib/authenticator');
const reposApi = require('./lib/api')
const program = require('commander');
const fs = require('fs');

/**
 * Command line app management
 */
program
    .version('0.0.1')
    .usage('<keys_file>')
    .parse(process.argv);


if(program.args.length!==1){
    program.outputHelp();
    process.exit(0);
}

/**
 * retrieving of api keys
 */
let keysFile;

const fileError = new Error('Cannot read keys file at: ' + program.args[0]);
try {
    keysFile = fs.readFileSync(program.args[0], {encoding: 'utf8'});
}catch(e){
    return console.error(fileError);
}


if(!keysFile){
    console.error(fileError);
    return process.exit(1);
}


/**
 * Serving the api
 */

const keys = keysFile.split('\n');

app.use(authenticate(keys));
app.use('/repos',reposApi);

app.listen(3000, function () {
    console.log('Githubber listening on port 3000!');
});
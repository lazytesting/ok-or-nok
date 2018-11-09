const generator = require('./generator.js');
const commandLineArgs = require('command-line-args')


const optionDefinitions = [
    { name: 'type', alias: 't', type: String },
    { name: 'nok', alias: 'n', type: Boolean },
    { name: 'count', alias: 'c', type: Number },
    { name: 'port', alias: 'p', type: Number }
  ]
const options = commandLineArgs(optionDefinitions)

if(!options.type || !options.count || !options.port) {
    throw "Not all options are set."
}

generator.generateSet(options.type, !options.nok, options.count, options.port);
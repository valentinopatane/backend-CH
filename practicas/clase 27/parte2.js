const parseArgs = require('minimist');

const opts = {
    alias: {m: 'modo', p:'puerto', d: 'debug'}, 
    default:{p:0, d:false, m:'prod'}
}

console.log(parseArgs(process.argv.slice(2), opts))

// node parte2.js 1 2 3
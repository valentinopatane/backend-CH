const parseArgs = require('minimist');

const opts = { alias: { m: 'modo', p:'puerto', d: 'debug' } }

console.log(parseArgs(process.argv.slice(2) , opts))

// node parte1.js 1 2 3 --m dev --p 8080 --d
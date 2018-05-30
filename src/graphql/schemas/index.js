const fs = require('fs');
const glob = require('fast-glob');

const filePaths = glob.sync('./**/*.graphql');
const schemas = filePaths.map(type => fs.readFileSync(type, 'utf8')).join('\n');

module.exports = { schemas };

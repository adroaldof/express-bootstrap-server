const knex = require('knex');

const config = require('./knex-config');


const connection = knex(config);

module.exports = connection;

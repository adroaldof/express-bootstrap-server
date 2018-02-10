import knex from 'knex';

import config from './knex-config';


const connection = knex(config);


export default connection;

import knex from 'knex';

import config from './knex-config';


const connection = knex(config);


export default connection;


export async function migrate () {
  console.info('***** Start Migration *****');

  try {
    const [migrated, files] = await connection.migrate.latest(); // eslint-disable-line no-unused-vars
    console.info(`***** Migrated ${files.length} files`);
  } catch (error) {
    console.error('*** error', error);
  }

  console.info('***** End Migration *****');
}


export async function seed () {
  console.info('***** Start Seed *****');

  try {
    let seeded;

    const [products] = await connection('products').count();

    if (Number(products.count) === 0) {
      [seeded] = await connection.seed.run();
    }

    console.info(`***** Seeded ${(seeded && seeded.length) || 0} files`);
  } catch (error) {
    console.error('*** error', error);
  }

  console.info('***** End Seed *****');
}

const tableName = 'products';

async function createTable (knex, tableName) {
  try {
    await knex
      .schema
      .createTable(tableName, function (table) {
        table.increments('id').primary().unique();
        table.text('name');
        table.text('type');
        table.text('description');
        table.text('tradeMark');
        table.text('model');
        table.text('image');
        table.text('barCode').unique();
        table.decimal('price');
        table.timestamp('createdAt').defaultTo(knex.fn.now());
        table.timestamp('updatedAt').defaultTo(knex.fn.now());
      });
  } catch (error) {
    console.error(`Error creating table (${tableName}) migration`, error);
  }
}

exports.up = async function (knex, Promise) { // eslint-disable-line no-unused-vars
  try {
    const exists = await knex.schema.hasTable(tableName);

    if (!exists) {
      await createTable(knex, tableName);
    }
  } catch (error) {
    console.error(`Create table (${tableName}) exists`, error);
  }
};

exports.down = async function (knex, Promise) { // eslint-disable-line no-unused-vars
  try {
    const exists = await knex.schema.hasTable(tableName);

    if (!exists) {
      await knex
        .schema
        .dropTableIfExists(tableName);
    }
  } catch (error) {
    console.error(`Create table (${tableName}) exists`, error);
  }
};

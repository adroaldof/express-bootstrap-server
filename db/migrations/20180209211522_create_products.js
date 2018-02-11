const tableName = 'products';

exports.up = async function (knex, Promise) { // eslint-disable-line no-unused-vars
  await knex
    .schema
    .createTableIfNotExists(tableName, function (table) {
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
};

exports.down = async function (knex, Promise) { // eslint-disable-line no-unused-vars
  await knex
    .schema
    .dropTableIfExists(tableName);
};

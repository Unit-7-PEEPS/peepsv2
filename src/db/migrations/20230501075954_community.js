/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('community', (table) => {
        table.increments('id').primary();
        table.string('name').notNullable();
        table.integer('creator_id').notNullable();
        table.foreign('creator_id').references('id').inTable('users');
        table.string('image').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        table.string('summary');
    })
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('community');
};

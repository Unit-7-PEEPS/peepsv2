/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('posts', (table) => {
        table.increments('id').primary();
        table.integer('community_id').notNullable();
        table.foreign('community_id').references('id').inTable('community');
        table.integer('user_id').notNullable();
        table.foreign('user_id').references('id').inTable('users');
        table.string('content').notNullable();
        table.timestamp('created_at').defaultTo(knex.fn.now());
        // table.timestamp('updated_at', { useTz: true }).notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('posts');
};

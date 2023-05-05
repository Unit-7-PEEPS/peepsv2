/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('likes', (table) => {
        table.increments('id').primary();
        table.integer('user_id').notNullable();
        table.foreign('user_id').references('id').inTable('users');
        table.integer('post_id').notNullable();
        table.foreign('post_id').references('id').inTable('posts');
        table.timestamp('created_at').defaultTo(knex.fn.now());
        // table.timestamp('updated_at', { useTz: true }).notNullable();
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('likes');
};

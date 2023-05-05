/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('friends', (table) => {
        table.integer('user_id').notNullable();
        table.foreign('user_id').references('id').inTable('users');
        table.integer('friends_id').notNullable();
        table.foreign('friends_id').references('id').inTable('users');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('friends');
};

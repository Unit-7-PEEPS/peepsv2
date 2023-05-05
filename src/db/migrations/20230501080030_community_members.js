/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.up = function(knex) {
    return knex.schema.createTable('community_members', (table) => {
        table.integer('user_id').notNullable();
        table.foreign('user_id').references('id').inTable('users');
        table.integer('community_id').notNullable();
        table.foreign('community_id').references('id').inTable('community');
        table.timestamp('created_at').defaultTo(knex.fn.now());
    });
};

/**
 * @param { import("knex").Knex } knex
 * @returns { Promise<void> }
 */
exports.down = function(knex) {
    return knex.schema.dropTableIfExists('community_members');
};


exports.up = function(knex) {
  return knex.schema
            .createTable('departments', departments => {
                departments
                    .increments();
                departments
                    .string('name', 128)
                    .notNullable()
                    .unique();
            })
            .createTable('users', users => {
                users
                    .increments();
                users
                    .string('name', 128)
                    .notNullable();
                users
                    .string('username', 128)
                    .notNullable()
                    .unique()
                    .index();
                users
                    .string('password', 256)
                    .notNullable();
                users
                    .integer('dept_id')
                    .unsigned()
                    .references('id')
                    .inTable('departments')
                    .onDelete('RESTRICT')
                    .onUpdate('CASCADE')
            })
            
};

exports.down = function(knex) {
  return knex.schema
            .dropTableIfExists('users')
            .dropTableIfExists('departments')
};

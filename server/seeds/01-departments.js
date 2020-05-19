const colors = require('colors');


exports.seed = function(knex) {

      return knex('departments').insert([
        {id: 1, name: 'customer'},
        {id: 2, name: 'sales'},
        {id: 3, name: 'marketing'},
        {id: 4, name: 'admin'},
        {id: 5, name: 'manager'},
        {id: 6, name: 'customerserver'}
      ]);
};

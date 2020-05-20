const colors = require('colors');


exports.seed = function(knex) {

      return knex('departments').insert([
        {name: 'customer'},
        {name: 'sales'},
        {name: 'marketing'},
        {name: 'admin'},
        {name: 'manager'},
        {name: 'customerserver'}
      ]);
};

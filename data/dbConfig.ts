import Knex = require("knex");

const kenexConfig: Knex.Config = require( '../knexfile' ).development;

export const database: Knex = Knex( kenexConfig );
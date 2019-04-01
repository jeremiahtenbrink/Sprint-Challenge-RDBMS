exports.up = function( knex, Promise ) {
    return knex.schema.createTable( "projects", tblBuilder => {
        tblBuilder.increments();
        tblBuilder.string( "name" ).notNullable();
        tblBuilder.string( "description" ).notNullable();
        tblBuilder.boolean( "complete" ).defaultTo( false );
    } ).createTable( "actions", tableBuilder => {
        tableBuilder.increments();
        tableBuilder.integer( "project_id" ).
            references( "id" ).
            inTable( "projects" ).
            onDelete( "CASCADE" ).
            onUpdate( "CASCADE" );
        tableBuilder.string( "description" ).notNullable();
        tableBuilder.string( "notes" );
        tableBuilder.boolean( "complete" ).defaultTo( false );
    } );
};

exports.down = function( knex, Promise ) {
    return knex.schema.dropTableIfExists( "projects" ).
        dropTableIfExists( "actions" );
};

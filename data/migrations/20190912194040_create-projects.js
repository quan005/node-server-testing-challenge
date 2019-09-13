exports.up = function(knex) {
    return knex.schema
        .createTable('project', tbl => {
            tbl.increments();
            tbl.string('project_name', 128).notNullable().unique();
            tbl.text('project_description');
            tbl.boolean('project_complete').notNullable().defaultTo(false);
        })
        .createTable('resource', tbl => {
            tbl.increments();
            tbl.string('resource_name', 128).notNullable().unique();
            tbl.text('resource_description');
        })
        .createTable('task', tbl => {
            tbl.increments();
            tbl.integer('project_id').unsigned().notNullable().references('id').inTable('project').onDelete('CASCADE').onUpdate('CASCADE');
            tbl.string('task_description', 228).notNullable();
            tbl.text('task_notes');
            tbl.boolean('task_complete').notNullable().defaultTo(false);
        })
        .createTable('project_resource', tbl => {
            tbl.integer('project_id').unsigned().notNullable().references('id').inTable('project').onDelete('CASCADE').onUpdate('CASCADE');
            tbl.integer('resource_id').unsigned().notNullable().references('id').inTable('resource').onDelete('CASCADE').onUpdate('CASCADE');
            tbl.primary(['project_id', 'resource_id']);
        })
};

exports.down = function(knex) {
    return knex.schema
        .dropTableIfExists('project_resource')
        .dropTableIfExists('task')
        .dropTableIfExists('resource')
        .dropTableIfExists('project');
};

const db = require('../data/dbConfig.js');


module.exports = {
    findById,
    getProjects,
    addProjects,
    getResources,
    getAllResources,
    addResources,
    attachProjectResource,
    getTasks,
    addTasks
};


function findById(id) {
    return db('project')
        .where({id})
        .first();
}

function getProjects() {
    return db('project');
}

function addProjects(projectData) {
    return db('project')
        .insert(projectData)
        .then(ids => {
            return findById(ids[0])
        });
}

function getResources(projectId) {
    return db('project_resource as pr')
        .join('project as p', 'p.id', 'pr.project_id')
        .join('resource as r', 'r.id', 'pr.resource_id')
        .select('r.resource_name', 'r.resource_description')
        .where('project_id', projectId);
}

function getAllResources() {
    return db('resource')
}

function addResources(resourceData) {
    return db('resource')
        .insert(resourceData)
        .then(ids => {
            return findById(ids[0])
        });
}

function attachProjectResource(projectId, resourceId) {
    return db('project_resource')
        .insert({project_id: projectId, resource_id: resourceId})
        .then(ids => {
            return findById(ids[0])
        });
}

function getTasks(projectId) {
    return db('task as t')
        .join('project as p', 'p.id', 't.project_id')
        .select('t.id', 't.task_description', 't.task_notes', 't.task_complete')
        .where('project_id', projectId);
}

function addTasks(taskData) {
    return db('task')
        .insert(taskData)
        .then(ids => {
            return findById(ids[0])
        });
}
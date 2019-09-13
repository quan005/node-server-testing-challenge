const Projects = require('./projects-model.js');
const db = require('../data/dbConfig.js');

describe('The Projects Model', () => {
    beforeEach(async () => {
        await db('project').truncate();
    });

    describe('The addProjects function', () => {
        it('should create a new project', async () => {

            const projectData = {
                project_name: 'remodel attic',
                project_description: 'changing the attic to be my new man cave.',
                project_complete: false
            };
            await Projects.addProjects(projectData);

            const projects = await db('project');
            console.log(projects);
            expect(projects.length).toBe(1);
            expect(projects[0].project_name).toBe('remodel attic');
        })
    })

    describe('The getProjects function', () => {
        it('should return all projects', async () => {

            await Projects.getProjects();

            const projects = await db('project');
            console.log(projects);
            expect(projects.length).toBe(0);
        })
    })
})
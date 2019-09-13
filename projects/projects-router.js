const express = require('express');

const Projects = require('./projects-model.js');

const router = express.Router();

router.get('/', (req, res) => {
    Projects.getProjects()
        .then(projects => {
            res.json(projects);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ 
                message: 'Failed to get projects'
            });
        });
});

router.post('/', (req, res) => {
    const projectData = req.body;
  
    Projects.addProjects(projectData)
        .then(project => {
            res.status(201).json(project);
        })
        .catch (err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to create new project' });
        });
});

router.get('/:id/resources', (req, res) => {
  const {id} = req.params;

  Projects.getResources(id)
  .then(resources => {
    if (resources.length) {
      res.json(resources);
    } else {
      res.status(404).json({ message: 'Could not get resources for the given recipe' })
    }
  })
  .catch(err => {
        console.log(err);
        res.status(500).json({ message: 'Failed to get resources' });
  });
});

router.get('/resources', (req, res) => {
    Projects.getAllResources()
        .then(projects => {
            res.json(projects);
        })
        .catch(err => {
            console.log(err);
            res.status(500).json({ 
                message: 'Failed to get projects'
            });
        });
});

router.post('/:id/resources', (req, res) => {
    const {id} = req.params;
    const resourceData = req.body;
  
    Projects.addResources(resourceData)
        .then(resource => {
            console.log(resource);
            Projects.attachProjectResource(id, resource.id);
            res.status(201).json(resource);
        })
        .catch (err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to create new resource' });
        });
});

router.get('/:id/tasks', (req, res) => {
    const { id } = req.params;
  
    Projects.getTasks(id)
    .then(tasks => {
      if (tasks.length) {
        res.json(tasks);
      } else {
        res.status(404).json({ message: 'Could not find the tasks for the given project' })
      }
    })
    .catch(err => {
        res.status(500).json({ message: 'Failed to get tasks' });
    });
  });

router.post('/', (req, res) => {
    const taskData = req.body;
  
    Projects.addTasks(taskData)
        .then(task => {
            res.status(201).json(task);
        })
        .catch (err => {
            console.log(err)
            res.status(500).json({ message: 'Failed to create new task' });
        });
});

module.exports = router;
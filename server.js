const express = require('express');

const ProjectRouter = require('./projects/projects-router.js');

const server = express();

server.use(express.json());
server.use('/api/project', ProjectRouter);

module.exports = server;
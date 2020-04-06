const express = require('express');
const { uuid, isUuid } = require('uuidv4');

const app = express();

app.use(express.json());

const projects = [];

function logRequest(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log(1);
  console.time(logLabel);

  next();

  console.log(2);
  console.timeEnd(logLabel);
}

function validateProjectID(request, response, next) {

  const {id} = request.params;

  if(!isUuid(id)) {
    return response.status(400).json({ error: "Invalid project ID."})
  }

  return next();
}

app.use(logRequest);
app.use('/projects/:id', validateProjectID);

app.get('/projects', (request, response) => {

  console.log(3);

  const { title } = request.query;

  const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects;
  
  return response.json(results);
});

app.post('/projects', (request, response) => {

  const { title, owner} = request.body;

  console.log(title);
  console.log(owner);

  const project = { id: uuid(), title, owner };

  projects.push(project);
  
  return response.json(project);
});

app.put('/projects/:id', (request, response) => {
  
  const { title, owner} = request.body;
  const {id} = request.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if(projectIndex < 0) {
    return response.status(400).json({ error: "Project Not Found"});
  }

  const project = {
    id,
    title,
    owner
  };

  projects[projectIndex] = project;

  return response.json(project);

});

app.delete('/projects/:id', (request, response) => {

  const {id} = request.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  if(projectIndex < 0) {
    return response.status(400).json({ error: "Project Not Found"});
  }

  projects.splice(projectIndex, 1);

  return response.status(204).send();
});


app.listen(3333, () => {
  console.log('🚀 Server running on port 3333');
});
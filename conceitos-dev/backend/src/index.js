const express = require('express');
const cors = require('cors')
const { uuid, isUuid } = require('uuidv4');

const app = express();
const PORT = 8080;

app.use(express.json());
app.use(cors())

/* 
    QUERY PARAMS: FILTROS E PAGINAÇÃO
    ROUTE PARAMS: INDENTIFICAR RECURSOS(PUT, DELETE)
    REQUEST BODY: CONTEÚDO NA HORA DE CRIAR OU EDITAR UM RECURSO

*/

/*
    MIDDLEWARE: INTERCEPTADOR DE REQUISIÇÕES QUEM INTERROMPE TOTALMENTE A REQUISIÇÃO OU ALTERA OS DADOS DA REQUISIÇÃO
*/

const projects = [];

function logRequest(request, response, next) {
  const { method, url } = request;

  const logLabel = `[${method.toUpperCase()}] ${url}`;

  console.log('1');
  console.log(logLabel);

  return next();
}

function validateProjectId(request, response, next) {
  const { id } = request.params;

  if (!isUuid(id)) {
    return response
      .status(400)
      .json({ error: 'Project not found, please try again!' });
  }

  return next();
}

app.use(logRequest);
app.use('/projects/:id', validateProjectId)


app.get('/projects', (request, response) => {
  const { title } = request.query;

  const results = title
    ? projects.filter(project => project.title.includes(title))
    : projects;

  return response.json(results);
});

app.post('/projects', (request, response) => {
  const { title, owner } = request.body;

  const project = {
    id: uuid(),
    title,
    owner
  };

  projects.push(project);

  return response.json(project);
});

app.put('/projects/:id', (request, response) => {
  const { id } = request.params;
  const { title, owner } = request.body;

  const projectIndex = projects.findIndex(project => project.id === id);

  const project = {
    id,
    title,
    owner
  };

  projects[projectIndex] = project;

  return response.json(project);
});

app.delete('/projects/:id', (request, response) => {
  const { id } = request.params;

  const projectIndex = projects.findIndex(project => project.id === id);

  projects.splice(projectIndex, 1);

  return response.status(204).send();
});

app.listen(PORT, () => {
  console.log(`✔ Server is runing on port ${PORT}`);
});

import React, { useState, useEffect } from 'react';
import api from './services/api';
import './App.css';

function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('projects').then(response => {
      setProjects(response.data);
    });
  }, []);

  async function handleAddProject() {
    const response = await api.post('projects', {
      title: `new learn react <${Date.now()}>`,
      owner: 'Alexandre'
    });

    const project = response.data

    setProjects([...projects, project])
  }

  function handelRemoveProject(id){
    api.delete( `/projects/${id}`) 
    setProjects(projects.filter(project => project.id !== id))
  }

  return (
    <div className='App'>
      <h1>Projects</h1>
      <ul>
        {projects.map(project => (
          <li key={project.id}>{project.title} <button onClick={() => handelRemoveProject(project.id)}>remover</button></li>
        ))}
      </ul>
      <button onClick={handleAddProject}>Adicionar Repositorio</button>
    </div>
  );
}

export default App;

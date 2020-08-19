import React, { useState, useEffect } from 'react';
import {
  FlatList,
  Text,
  StyleSheet,
  StatusBar,
  SafeAreaView,
  TouchableOpacity
} from 'react-native';
import api from './services/api';

export default function App() {
  const [projects, setProjects] = useState([]);

  useEffect(() => {
    api.get('/projects').then(response => {
      setProjects(response.data);
    });
  }, []);

  async function handelAddProject() {
    const response = await api.post('/projects', {
      title: 'Learn React Native',
      owner: 'Alexandre'
    });

    const project = response.data

    setProjects([...projects, project])
  }

  return (
    <>
      <StatusBar barStyle='light-content' backgroundColor='#7159c1' />
      <SafeAreaView style={styles.container}>
        <FlatList
          data={projects}
          keyExtractor={project => project.id}
          renderItem={({ item: project }) => (
            <Text style={styles.title}>{project.title}</Text>
          )}
        />
        <TouchableOpacity
          activeOpacity={0.6}
          style={styles.button}
          onPress={handelAddProject}
        >
          <Text style={styles.buttonText}>Adicionar novo repositorio</Text>
        </TouchableOpacity>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#7159c1'
  },
  title: {
    color: '#fff',
    fontSize: 32,
    fontWeight: 'bold'
  },
  button: {
    backgroundColor: '#fff',
    margin: 20,
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4
  },
  buttonText: {}
});

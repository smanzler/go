import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, StyleSheet, FlatList, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedButton } from '@/components/ThemedButton';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect, router } from 'expo-router';
import { ThemedIconButton } from '@/components/ThemedIconButton';

const Index = () => {
  const [tasks, setTasks] = useState<any []>([]);

  const loadTasks = async () => {
    try {
      const tasksJson = await AsyncStorage.getItem('tasks');
      let loadedTasks = tasksJson ? JSON.parse(tasksJson) : [];
  
      // Check if the data is in the old format (an array of strings)
      if (loadedTasks.length > 0 && typeof loadedTasks[0] === 'string') {
        // Convert the old format to the new format
        loadedTasks = loadedTasks.map((task: any, index: any) => ({
          id: Date.now() + index, // Generate a unique ID for each task
          text: task,
          completed: false, // Default completed status to false
        }));
  
        // Save the converted data back to AsyncStorage
        await AsyncStorage.setItem('tasks', JSON.stringify(loadedTasks));
      }
  
      setTasks(loadedTasks);
    } catch (e) {
      console.error('Failed to load tasks.', e);
    }
  };
  

  const deleteTask = async (id: any) => {
    const filteredTasks = tasks.filter(task => task.id !== id);
    setTasks(filteredTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(filteredTasks));
  };

  const toggleTaskCompletion = async (id: any) => {
    const updatedTasks = tasks.map(task =>
      task.id === id ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
    await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
  };

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  const renderTask = ({ item }: any) => (
    <View style={styles.taskContainer}>
      <ThemedText style={[styles.taskText, item.completed && styles.completedText]}>
        {item.text}
      </ThemedText>
      <View style={styles.buttonsContainer}>
        <ThemedButton style={styles.completeBtn} onPress={() => toggleTaskCompletion(item.id)}>
          {item.completed ? 'Undo' : 'Complete'}
        </ThemedButton>
        <ThemedButton style={styles.deleteBtn} onPress={() => deleteTask(item.id)}>
          Delete
        </ThemedButton>
      </View>
    </View>
  );

  return (
    <ThemedView style={styles.container}>
      <StatusBar hidden />

      <SafeAreaView>
        <ThemedText type='title'>Tasks for the day</ThemedText>
        <FlatList
          data={tasks}
          renderItem={renderTask}
          keyExtractor={(item) => item.id.toString()}
        />
      </SafeAreaView>

      <ThemedIconButton
        style={styles.newTaskBtn}
        onPress={() => router.push('/(modals)/task')}
      />
    </ThemedView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 20,
  },
  newTaskBtn: {
    position: 'absolute',
    bottom: 10,
    right: 10,
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
  },
  taskContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingVertical: 10,
  },
  taskText: {
    fontSize: 16,
  },
  completedText: {
    textDecorationLine: 'line-through',
    color: 'gray',
  },
  buttonsContainer: {
    flexDirection: 'row',
    gap: 10,
  },
  completeBtn: {
    marginRight: 10,
  },
  deleteBtn: {
    backgroundColor: 'red',
  },
});

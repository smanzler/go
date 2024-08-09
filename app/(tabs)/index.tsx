import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, StyleSheet, FlatList, View, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedView } from '@/src/components/ThemedView';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedButton } from '@/src/components/ThemedButton';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect, router } from 'expo-router';
import { ThemedIconButton } from '@/src/components/ThemedIconButton';
import database, { tasksCollection } from '@/src/db';
import TasksList from '@/src/components/TasksList';

const Index = () => {
  const [tasks, setTasks] = useState<any []>([]);

  const onRead = async () => {

    const tasks = await tasksCollection.query().fetch();
    console.log(tasks)

    // await database.write(async () => {
    //   await tasksCollection.create(task => {
    //     task.description = 'Gym',
    //     task.complete = false

    //   })
    // })
  }

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

  return (
    <ThemedView style={styles.container}>
      <StatusBar hidden />

      <SafeAreaView>
        <ThemedText type='title'>Tasks for the day</ThemedText>

        <TasksList />
      </SafeAreaView>

      <ThemedButton onPress={onRead}>
        Read
      </ThemedButton>

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
});

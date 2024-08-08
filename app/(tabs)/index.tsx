import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, StyleSheet, FlatList, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedView } from '@/components/ThemedView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedIconButton } from '@/components/ThemedIconButton';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect, router } from 'expo-router';

const Index = () => {
  const [tasks, setTasks] = useState([]);

  const loadTasks = async () => {
    try {
      const tasksJson = await AsyncStorage.getItem('tasks');
      if (tasksJson !== null) {
        setTasks(JSON.parse(tasksJson));
      } else {
        setTasks([]);
      }
    } catch (e) {
      console.error('Failed to load tasks.', e);
    }
  };

  useEffect(() => {
    loadTasks();
  }, []);

  useFocusEffect(
    useCallback(() => {
      loadTasks();
    }, [])
  );

  return (
    <ThemedView style={styles.container}>
      <StatusBar hidden />

      <SafeAreaView>
        <ThemedText type='title'>Tasks for the day</ThemedText>
        <FlatList
          data={tasks}
          renderItem={({ item }) => <ThemedText>{item}</ThemedText>}
          keyExtractor={(item, index) => index.toString()}
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
});
import React, { useState, useEffect, useCallback } from 'react';
import { SafeAreaView, StyleSheet, FlatList, View, Text, Switch, Button } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedView } from '@/src/components/ThemedView';
import { ThemedText } from '@/src/components/ThemedText';
import { ThemedButton } from '@/src/components/ThemedButton';
import { StatusBar } from 'expo-status-bar';
import { useFocusEffect, router } from 'expo-router';
import { ThemedIconButton } from '@/src/components/ThemedIconButton';
import database, { tasksCollection } from '@/src/db';
import TasksList from '@/src/components/TasksList';
import { useTheme } from '@/src/providers/ThemeProvider';

const Index = () => {
  const [tasks, setTasks] = useState<any []>([]);
  const { theme, toggleTheme, currentTheme } = useTheme();

  const onPress = () => {
    currentTheme === 'light' ? toggleTheme('dark') : toggleTheme('light');
  }

  return (
    <ThemedView style={styles.container}>
      <StatusBar hidden />

      <SafeAreaView>
        <ThemedText type='title'>Tasks for the day</ThemedText>

        <TasksList />
      </SafeAreaView>

      <Button title='Change Theme' onPress={onPress}/>

      <ThemedIconButton
        style={styles.newTaskBtn}
        elevation={10}
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

import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedButton } from '@/components/ThemedButton';
import { router } from 'expo-router';
import { BlurView } from 'expo-blur';
import { ThemedIconButton } from '@/components/ThemedIconButton';

const TaskScreen = () => {
    const [task, setTask] = useState('');
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [])

    const saveTask = async () => {
        if (task.trim()) {
          try {
            const existingTasks = await AsyncStorage.getItem('tasks');
            const tasks = existingTasks ? JSON.parse(existingTasks) : [];
            const newTask = { id: Date.now(), text: task, completed: false };
            const updatedTasks = [...tasks, newTask];
            await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
            router.back();
          } catch (e) {
            console.error('Failed to save task.', e);
          }
        } else {

        }
      };

    return (
        <BlurView intensity={40} style={styles.container} >
            <ThemedIconButton style={styles.exitBtn} onPress={() => router.back()} exitBtn />

            <TextInput
                ref={inputRef}
                style={styles.input}
                placeholder="Enter something you'd like to do"
                value={task}
                onChangeText={setTask}
            />
            <ThemedButton style={styles.saveBtn} onPress={saveTask} cancelBtn>
                Save Task
            </ThemedButton>
        </BlurView>
    );
};

export default TaskScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        alignItems: 'center',
        paddingTop: 150,
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'white',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 10,
    },
    saveBtn: {
        marginBottom: 10,
        padding: 5,
        paddingHorizontal: 20,
        borderRadius: 25,
    },
    exitBtn: {
        position: 'absolute',
        top: 40,
        left: 10,

        width: 50,
        aspectRatio: 1,
        borderRadius: 25,
    }
})
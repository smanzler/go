import React, { useState } from 'react';
import { StyleSheet, TextInput, View } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { ThemedButton } from '@/components/ThemedButton';
import { router } from 'expo-router';
import { BlurView } from 'expo-blur';
import { ThemedIconButton } from '@/components/ThemedIconButton';

const TaskScreen = () => {
    const [task, setTask] = useState('');

    const saveTask = async () => {
        try {
            const existingTasks = await AsyncStorage.getItem('tasks');
            const tasks = existingTasks ? JSON.parse(existingTasks) : [];
            const updatedTasks = [...tasks, task];
            await AsyncStorage.setItem('tasks', JSON.stringify(updatedTasks));
            router.back();
        } catch (e) {
            console.error('Failed to save task.', e);
        }
    };

    return (
        <BlurView intensity={40} style={styles.container}>
            <ThemedIconButton style={styles.exitBtn} onPress={() => router.back()} exitBtn />

            <TextInput
                style={styles.input}
                placeholder="Enter your task"
                value={task}
                onChangeText={setTask}
            />
            <ThemedButton style={styles.saveBtn} onPress={saveTask}>
                Save Task
            </ThemedButton>
        </BlurView>
    );
};

export default TaskScreen;

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    input: {
        height: 40,
        width: '80%',
        borderColor: 'gray',
        borderWidth: 1,
        marginBottom: 20,
        paddingHorizontal: 10,
        borderRadius: 5,
    },
    saveBtn: {
        marginBottom: 10,
        width: 100,
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
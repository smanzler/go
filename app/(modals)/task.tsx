import React, { useEffect, useRef, useState } from 'react';
import { Keyboard, StyleSheet, TextInput, View } from 'react-native';
import { ThemedButton } from '@/src/components/ThemedButton';
import { router } from 'expo-router';
import { BlurView } from 'expo-blur';
import { ThemedIconButton } from '@/src/components/ThemedIconButton';
import database, { tasksCollection } from '@/src/db';

const TaskScreen = () => {
    const [description, setDescription] = useState('');
    const inputRef = useRef<TextInput>(null);

    useEffect(() => {
        inputRef.current?.focus();
    }, [])

    const saveTask = async () => {
        if (description.trim()) {
            await database.write(async () => {
                await tasksCollection.create(task => {
                    task.description = description.trim(),
                        task.complete = false
                });
            });
            setDescription('')
            router.back();
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
                value={description}
                onChangeText={setDescription}
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
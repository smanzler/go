import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedButton } from "./ThemedButton";
import Task from "../models/Task";

import { withObservables } from "@nozbe/watermelondb/react";

type TaskListItem = {
    task: Task
}

function TaskListItem({ task }: TaskListItem) {
    const deleteTask = async (id: any) => {

    };

    const toggleTaskCompletion = async (id: any) => {

    };

    return (
        <View style={styles.taskContainer}>
            <ThemedText style={[styles.taskText, task.complete && styles.completedText]}>
                {task.description}
            </ThemedText>
            <View style={styles.buttonsContainer}>
                <ThemedButton style={styles.completeBtn} onPress={() => toggleTaskCompletion(task.id)}>
                    {task.complete ? 'Undo' : 'Complete'}
                </ThemedButton>
                <ThemedButton style={styles.deleteBtn} onPress={() => deleteTask(task.id)}>
                    Delete
                </ThemedButton>
            </View>
        </View>
    );
}

const enhance = withObservables(['task'], ({ task }: TaskListItem) => ({
    task,
}))

export default enhance(TaskListItem);

const styles = StyleSheet.create({
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
})
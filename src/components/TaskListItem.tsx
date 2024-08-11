import { StyleSheet, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedButton } from "./ThemedButton";
import Task from "../models/Task";

import { withObservables } from "@nozbe/watermelondb/react";
import database from "../db";

type TaskListItem = {
    task: Task
}

function TaskListItem({ task }: TaskListItem) {
    const onDelete = async () => {
        await database.write(async () => {
            await task.markAsDeleted();
        });
    };

    const onComplete = async () => {
        await database.write(async () => {
            await task.update(task => {
                task.complete = !task.complete;
            })
        });
    };

    return (
        <View style={styles.taskContainer}>
            <ThemedText style={[styles.taskText, task.complete && styles.completedText]}>
                {task.description}
            </ThemedText>
            <View style={styles.buttonsContainer}>
                <ThemedButton style={styles.completeBtn} onPress={onComplete}>
                    {task.complete ? 'Undo' : 'Complete'}
                </ThemedButton>
                <ThemedButton style={styles.deleteBtn} onPress={onDelete}>
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
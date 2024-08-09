import { FlatList } from "react-native";
import TaskListItem from "./TaskListItem";
import { useEffect, useState } from "react";
import { tasksCollection } from "../db";
import Task from "../models/Task";

export default function TasksList() {
    const [tasks, setTasks] = useState<Task []>([]);

    useEffect(() => {
        const fetchTasks = async () => {
            const tasks = await tasksCollection.query().fetch();
            setTasks(tasks);
        }

        fetchTasks();
    }, [])

    return (
        <FlatList
          data={tasks}
          renderItem={({ item }) => <TaskListItem task={item} />}
        />
    )
}
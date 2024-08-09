import { FlatList } from "react-native";
import TaskListItem from "./TaskListItem";
import { useEffect, useState } from "react";
import { tasksCollection } from "../db";
import Task from "../models/Task";

import { withObservables } from '@nozbe/watermelondb/react'

function TasksList({ tasks }: { tasks: Task [] }) {

    return (
        <FlatList
          data={tasks}
          renderItem={({ item }) => <TaskListItem task={item} />}
        />
    )
}

const enhance = withObservables([], () => ({
    tasks: tasksCollection.query()
}));

export default enhance(TasksList);
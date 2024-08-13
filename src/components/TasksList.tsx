import { FlatList } from "react-native";
import TaskListItem from "./TaskListItem";
import { useEffect, useState } from "react";
import { tasksCollection } from "../db";
import Task from "../models/Task";

import { withObservables } from '@nozbe/watermelondb/react'
import { SwipeListView } from "react-native-swipe-list-view";
import HiddenItemWithActions from "./HiddenItemWithActions";

function TasksList({ tasks }: { tasks: Task[] }) {

    return (
        <SwipeListView
            style={{ overflow: 'visible' }}
            data={tasks}
            renderItem={({ item }) => <TaskListItem task={item} />}
            renderHiddenItem={({ item }) => <HiddenItemWithActions task={item} />}
            disableRightSwipe
            rightOpenValue={-70}
        />
    )
}

const enhance = withObservables([], () => ({
    tasks: tasksCollection.query()
}));

export default enhance(TasksList);
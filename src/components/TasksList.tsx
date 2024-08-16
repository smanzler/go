import { FlatList, View } from "react-native";
import TaskListItem from "./TaskListItem";
import { useEffect, useState } from "react";
import { tasksCollection } from "../db";
import Task from "../models/Task";

import { withObservables } from "@nozbe/watermelondb/react";

function TasksList({ tasks }: { tasks: Task[] }) {
  return (
    <View>
      {tasks.map((task) => (
        <TaskListItem key={task.id} task={task} />
      ))}
    </View>
  );
}

const enhance = withObservables([], () => ({
  tasks: tasksCollection.query(),
}));

export default enhance(TasksList);

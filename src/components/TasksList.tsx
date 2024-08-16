import { FlatList, View } from "react-native";
import TaskListItem from "./TaskListItem";
import { useEffect, useState } from "react";
import { tasksCollection } from "../db";
import Task from "../models/Task";

import { withObservables } from "@nozbe/watermelondb/react";
import { useAuth } from "../providers/AuthProvider";

function TasksList({ tasks }: { tasks: Task[] }) {
  const { user } = useAuth();

  return (
    <View>
      {tasks
        .filter(
          (task) =>
            task.userId === user?.id ||
            (task.userId === null && user?.id === undefined)
        )
        .map((task) => (
          <TaskListItem key={task.id} task={task} />
        ))}
    </View>
  );
}

const enhance = withObservables([], () => ({
  tasks: tasksCollection.query(),
}));

export default enhance(TasksList);

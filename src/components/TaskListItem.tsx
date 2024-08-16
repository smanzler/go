import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedButton } from "./ThemedButton";
import Task from "../models/Task";

import { withObservables } from "@nozbe/watermelondb/react";
import database from "../db";
import { useTheme } from "../providers/ThemeProvider";
import { useElevation } from "../constants/Themes";
import { Feather, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Animated, { useAnimatedStyle } from "react-native-reanimated";
import { usePanXGesture } from "../hooks/usePanXGesture";
import { GestureDetector } from "react-native-gesture-handler";

export type TaskListItem = {
  task: Task;
};

function TaskListItem({ task }: TaskListItem) {
  const { theme } = useTheme();
  const [description, setDescription] = useState(task.description);

  const onDelete = async () => {
    console.log("delete");
  };

  const onComplete = async () => {
    await database.write(async () => {
      await task.update((task) => {
        task.complete = !task.complete;
      });
    });
  };

  const onBlur = async () => {
    console.log("blur", task.description);
    if (task.description === description) return;
    await database.write(async () => {
      await task.update((task) => {
        task.description = description;
      });
    });
  };

  const { offsetX, panXGesture } = usePanXGesture(onDelete, onComplete);

  const panXAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offsetX.value,
        },
      ],
    };
  }, []);

  useEffect(() => {
    console.log(task.complete);
  }, [task.complete]);

  return (
    <Animated.View style={[styles.container]}>
      <GestureDetector gesture={panXGesture}>
        <Animated.View
          style={[
            styles.taskContainer,
            { backgroundColor: theme.background },
            useElevation(10, theme),
            panXAnimatedStyles,
          ]}
        >
          <TextInput
            style={[
              styles.taskText,
              { color: theme.text },
              task.complete && styles.completedText,
            ]}
            multiline
            blurOnSubmit
            scrollEnabled={false}
            onBlur={onBlur}
            editable={!task.complete}
            returnKeyType="done"
            value={description}
            onChangeText={setDescription}
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={onComplete}>
              <Feather
                name={task.complete ? "check-circle" : "circle"}
                color={theme.text}
                size={24}
              />
            </TouchableOpacity>
          </View>
        </Animated.View>
      </GestureDetector>
    </Animated.View>
  );
}

const enhance = withObservables(["task"], ({ task }: TaskListItem) => ({
  task,
}));

export default enhance(TaskListItem);

const styles = StyleSheet.create({
  container: {
    marginVertical: 10,
    borderRadius: 10,
    backgroundColor: "pink",
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    padding: 10,
    borderRadius: 10,
  },
  taskText: {
    fontSize: 16,
    width: "90%",
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "gray",
  },
  buttonsContainer: {
    flexDirection: "row",
    gap: 10,
  },
  completeBtn: {
    marginRight: 10,
  },
  deleteBtn: {
    backgroundColor: "red",
  },
});

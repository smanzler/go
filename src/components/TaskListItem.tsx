import { StyleSheet, TextInput, TouchableOpacity, View } from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedButton } from "./ThemedButton";
import Task from "../models/Task";

import { withObservables } from "@nozbe/watermelondb/react";
import database from "../db";
import { useTheme } from "../providers/ThemeProvider";
import { useElevation } from "../constants/Themes";
import { Entypo, Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import { useEffect, useState } from "react";
import Animated, {
  interpolate,
  useAnimatedStyle,
  useSharedValue,
} from "react-native-reanimated";
import { usePanXGesture } from "../hooks/usePanXGesture";
import { GestureDetector } from "react-native-gesture-handler";

export type TaskListItem = {
  task: Task;
};

function TaskListItem({ task }: TaskListItem) {
  const { theme } = useTheme();
  const [description, setDescription] = useState(task.description);
  const taskCompleteSharedValue = useSharedValue(task.complete);

  useEffect(() => {
    setDescription(task.description);
    taskCompleteSharedValue.value = task.complete;
  }, [task, task.description, task.complete]);

  const onDelete = async () => {
    await database.write(async () => {
      await task.markAsDeleted();
    });
  };

  const onComplete = async () => {
    await database.write(async () => {
      await task.update((task) => {
        task.complete = !task.complete;
      });
    });
  };

  const onBlur = async () => {
    if (task.description === description) return;
    await database.write(async () => {
      await task.update((task) => {
        task.description = description;
      });
    });
  };

  const { offsetX, panXGesture } = usePanXGesture(onDelete, onComplete);

  const hiddenLeftAnimatedStyles = useAnimatedStyle(() => {
    const scaleValue = interpolate(offsetX.value, [50, 100], [0.5, 1]);
    const constrainedScaleValue = Math.max(0.5, Math.min(scaleValue, 1));

    return {
      transform: [
        {
          scale: constrainedScaleValue,
        },
      ],
    };
  }, []);

  const hiddenRightAnimatedStyles = useAnimatedStyle(() => {
    const scaleValue = interpolate(offsetX.value, [-50, -100], [0.5, 1]);
    const constrainedScaleValue = Math.max(0.5, Math.min(scaleValue, 1));

    return {
      transform: [
        {
          scale: constrainedScaleValue,
        },
      ],
    };
  }, []);

  const backgroundAnimatedStyles = useAnimatedStyle(() => {
    const bgColor =
      offsetX.value > 0
        ? taskCompleteSharedValue.value
          ? "grey"
          : "#50C878"
        : offsetX.value < 0
        ? "red"
        : "transparent";

    return { backgroundColor: bgColor };
  }, [offsetX.value, taskCompleteSharedValue.value]);

  const panXAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offsetX.value,
        },
      ],
    };
  }, []);

  return (
    <Animated.View style={[styles.container, backgroundAnimatedStyles]}>
      <Animated.View style={[styles.iconLeft, hiddenLeftAnimatedStyles]}>
        <Entypo
          name={task.complete ? "cross" : "check"}
          size={24}
          color="white"
        />
      </Animated.View>

      <Animated.View style={[styles.iconRight, hiddenRightAnimatedStyles]}>
        <FontAwesome6 name="trash-can" size={24} color="white" />
      </Animated.View>
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
  iconLeft: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    left: 20,
    width: 20,
  },
  iconRight: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 0,
    bottom: 0,
    right: 20,
    width: 20,
  },
});

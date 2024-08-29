import {
  NativeSyntheticEvent,
  StyleSheet,
  TextInput,
  TextInputChangeEventData,
  TextInputProps,
  TouchableOpacity,
  View,
} from "react-native";
import { ThemedText } from "./ThemedText";
import { ThemedButton } from "./ThemedButton";
import Task from "../models/Task";

import { withObservables } from "@nozbe/watermelondb/react";
import database from "../db";
import { useTheme } from "../providers/ThemeProvider";
import { useElevation } from "../constants/Themes";
import { Entypo, Feather, FontAwesome6, Ionicons } from "@expo/vector-icons";
import React, { useEffect, useState } from "react";
import Animated, {
  Easing,
  FadeInLeft,
  FadeOutLeft,
  interpolate,
  interpolateColor,
  LinearTransition,
  runOnJS,
  useAnimatedProps,
  useAnimatedReaction,
  useAnimatedStyle,
  useSharedValue,
  withTiming,
} from "react-native-reanimated";
import { usePanXGesture } from "../hooks/usePanXGesture";
import { GestureDetector } from "react-native-gesture-handler";

export type TaskListItem = {
  task: Task;
};

function TaskListItem({ task }: TaskListItem) {
  const { theme } = useTheme();
  const descriptionSharedValue = useSharedValue<string>(task.description);
  const [animating, setAnimating] = useState(false);

  const AnimatedTextInput = Animated.createAnimatedComponent(TextInput);
  const AnimatedIcon = Animated.createAnimatedComponent(Feather);

  const taskCompleteSharedValue = useSharedValue(task.complete);
  const progress = useSharedValue(task.complete ? 1 : 0);
  const textColor = useSharedValue(theme.text);

  useEffect(() => {
    taskCompleteSharedValue.value = task.complete;
  }, [task, task.description, task.complete]);

  useEffect(() => {
    textColor.value = theme.text;
  }, [theme]);

  const fillerAnimatedStyles = useAnimatedStyle(() => {
    const width = interpolate(progress.value, [0, 1], [0, 100]);
    return {
      width: `${width}%`,
    };
  });

  const colorAnimatedStyles = useAnimatedStyle(() => {
    const color = interpolateColor(
      progress.value,
      [0, 1],
      [textColor.value, "rgba(0, 0, 0, 0.85)"]
    );

    return {
      color,
    };
  }, [textColor.value]);

  const onDelete = async () => {
    await database.write(async () => {
      await task.markAsDeleted();
    });
  };

  const onComplete = async () => {
    setAnimating(true);

    progress.value = withTiming(
      progress.value === 0 ? 1 : 0,
      { duration: 1000, easing: Easing.out(Easing.exp) },
      () => {
        runOnJS(setAnimating)(false);
      }
    );

    await database.write(async () => {
      await task.update((task) => {
        task.complete = !task.complete;
      });
    });
  };

  const onBlur = async () => {
    console.log(descriptionSharedValue.value);
    if (task.description === descriptionSharedValue.value) return;
    await database.write(async () => {
      await task.update((task) => {
        task.description = descriptionSharedValue.value;
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
        ? "#ff4444"
        : "transparent";

    return { backgroundColor: bgColor };
  }, [offsetX.value, taskCompleteSharedValue.value]);

  const panXAnimatedStyles = useAnimatedStyle(() => {
    return {
      transform: [
        {
          translateX: offsetX.value * 0.75,
        },
      ],
    };
  }, []);

  const animatedProps = useAnimatedProps(() => {
    return {
      text: descriptionSharedValue.value,
    };
  });

  return (
    <Animated.View
      style={[styles.container, backgroundAnimatedStyles]}
      entering={FadeInLeft}
      exiting={FadeOutLeft}
      layout={LinearTransition}
    >
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
          <View
            style={{
              position: "absolute",
              height: "100%",
              width: "100%",
              borderRadius: 10,
              overflow: "hidden",
            }}
          >
            <Animated.View style={[styles.filler, fillerAnimatedStyles]} />
          </View>

          <AnimatedTextInput
            style={[styles.taskText, colorAnimatedStyles]}
            multiline
            blurOnSubmit
            scrollEnabled={false}
            onBlur={onBlur}
            editable={!task.complete && !animating}
            returnKeyType="done"
            defaultValue={descriptionSharedValue.value}
            onChangeText={(text) => {
              descriptionSharedValue.value = text;
            }}
            animatedProps={animatedProps as any}
          />
          <View style={styles.buttonsContainer}>
            <TouchableOpacity onPress={onComplete} disabled={animating}>
              <AnimatedIcon
                name={task.complete ? "check-circle" : "circle"}
                style={colorAnimatedStyles}
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
  filler: {
    borderRadius: 10,
    position: "absolute",
    height: "100%",
    backgroundColor: "#50C878",
  },
  taskContainer: {
    flexDirection: "row",
    justifyContent: "space-between",

    borderRadius: 10,
  },
  taskText: {
    flex: 1,
    fontSize: 16,
    margin: 10,
  },
  buttonsContainer: {
    margin: 10,
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

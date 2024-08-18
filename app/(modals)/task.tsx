import React, { useEffect, useRef, useState } from "react";
import {
  Keyboard,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from "react-native";
import { ThemedButton } from "@/src/components/ThemedButton";
import { router } from "expo-router";
import { BlurView } from "expo-blur";
import { ThemedIconButton } from "@/src/components/ThemedIconButton";
import database, { tasksCollection } from "@/src/db";
import { useTheme } from "@/src/providers/ThemeProvider";
import { addTint, useElevation } from "@/src/constants/Themes";
import tinycolor from "tinycolor2";
import { useAuth } from "@/src/providers/AuthProvider";
import { Entypo } from "@expo/vector-icons";

const TaskScreen = () => {
  const [description, setDescription] = useState("");
  const inputRef = useRef<TextInput>(null);

  const { theme } = useTheme();
  const { user, isAuthenticated } = useAuth();

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const saveTask = async () => {
    if (description.trim()) {
      await database.write(async () => {
        await tasksCollection.create((task) => {
          task.description = description.trim();
          task.complete = false;
          isAuthenticated && (task.userId = user?.id);
        });
      });
      setDescription("");
      router.back();
    } else {
    }
  };

  return (
    <BlurView intensity={80} style={styles.container}>
      <TouchableOpacity style={[styles.exitBtn]} onPress={() => router.back()}>
        <Entypo name="cross" color={theme.primary} size={40} />
      </TouchableOpacity>

      <TextInput
        ref={inputRef}
        style={[styles.input]}
        placeholderTextColor={"#d3d3d3"}
        placeholder="Enter something you'd like to do"
        value={description}
        onChangeText={setDescription}
        onSubmitEditing={saveTask}
        returnKeyType="done"
      />
    </BlurView>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    paddingTop: 100,
  },
  input: {
    fontSize: 20,
    paddingBottom: 100,
    color: "white",
  },
  exitBtn: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 30,
    left: 30,

    width: 40,
    aspectRatio: 1,
  },
});

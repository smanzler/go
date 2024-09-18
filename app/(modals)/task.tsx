import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Keyboard,
  ScrollView,
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
import DatePicker from "react-native-date-picker";

const TaskScreen = () => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | null>(null);

  const inputRef = useRef<TextInput>(null);

  const { theme } = useTheme();
  const { user, isAuthenticated } = useAuth();

  const [placeholderText, setPlaceholderText] = useState("");
  const fullPlaceholderText = "Enter something you'd like to do";

  useEffect(() => {
    let currentIndex = 0;

    const typeCharacter = () => {
      if (currentIndex < fullPlaceholderText.length) {
        setPlaceholderText((prev) => prev + fullPlaceholderText[currentIndex]);
        currentIndex++;
        setTimeout(typeCharacter, 15);
      }
    };

    typeCharacter();
  }, []);

  useEffect(() => {
    console.log(date);
  }, [date]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  const saveTask = async () => {
    if (description.trim()) {
      await database.write(async () => {
        await tasksCollection.create((task) => {
          task.description = description.trim();
          task.complete = false;
          task.dueAt = date;
          isAuthenticated && (task.userId = user?.id);
        });
      });
      setDescription("");
      router.back();
    } else {
    }
  };

  const addDate = () => {
    date ? setDate(null) : setDate(new Date());
  };

  return (
    <BlurView intensity={80} style={{ flex: 1 }}>
      <ScrollView
        style={styles.container}
        contentContainerStyle={{ alignItems: "center" }}
      >
        <TextInput
          ref={inputRef}
          style={[styles.input]}
          placeholderTextColor={"#d3d3d3"}
          placeholder={placeholderText}
          value={description}
          onChangeText={setDescription}
          onSubmitEditing={saveTask}
          returnKeyType="done"
        />

        <Button title={date ? "Remove date" : "Add date"} onPress={addDate} />

        {date && <DatePicker date={date} onDateChange={setDate} />}
      </ScrollView>

      <TouchableOpacity style={[styles.exitBtn]} onPress={() => router.back()}>
        <Entypo name="cross" color={theme.primary} size={40} />
      </TouchableOpacity>
    </BlurView>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 100,
  },
  input: {
    fontSize: 20,
    color: "white",
    paddingBottom: 20,
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

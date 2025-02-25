import React, { useEffect, useRef, useState } from "react";
import {
  Button,
  Keyboard,
  ScrollView,
  StyleSheet,
  Text,
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
import { AntDesign, Entypo } from "@expo/vector-icons";
import { ThemedText } from "@/src/components/ThemedText";
import dayjs from "dayjs";
import { scheduleNotification } from "@/src/hooks/usePushNotifications";
import DatePicker from "react-native-date-picker";
import { ThemedView } from "@/src/components/ThemedView";

const TaskScreen = () => {
  const [description, setDescription] = useState("");
  const [date, setDate] = useState<Date | null>(null);
  const [dateModalVisible, setDateModalVisible] = useState(false);

  const inputRef = useRef<TextInput>(null);

  const { theme } = useTheme();
  const { user, isAuthenticated } = useAuth();

  const [placeholderText, setPlaceholderText] = useState("");
  const fullPlaceholderText = "Enter something you'd like to do";

  useEffect(() => {
    let currentIndex = 0;
    setPlaceholderText("");

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
    inputRef.current?.focus();
  }, []);

  const saveTask = async () => {
    if (description.trim()) {
      await database.write(async () => {
        const task = await tasksCollection.create((task) => {
          task.description = description.trim();
          task.complete = false;
          task.dueAt = date;
          isAuthenticated && (task.userId = user?.id);
        });

        if (date && dayjs(date).isAfter(dayjs())) {
          await scheduleNotification(task);
        }
      });
      setDescription("");
      router.back();
    } else {
    }
  };

  const addDate = () => {
    if (!date) {
      setDate(new Date());
    }
    setDateModalVisible(true);
  };

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <ThemedView style={styles.container}>
        <TextInput
          ref={inputRef}
          style={[styles.input, { color: theme.text }]}
          placeholderTextColor={"#d3d3d3"}
          placeholder={placeholderText}
          value={description}
          onChangeText={setDescription}
          onSubmitEditing={saveTask}
          returnKeyType="done"
        />

        <TouchableOpacity
          onPress={addDate}
          style={[styles.btn, useElevation(10, theme)]}
        >
          <ThemedText>
            {date ? dayjs(date).format("MMMM D, YYYY h:mm A") : "Add date +"}
          </ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={saveTask}
          style={[styles.btn, { backgroundColor: theme.primary }]}
        >
          <ThemedText>Save Task</ThemedText>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.exitBtn]}
          onPress={() => router.back()}
        >
          <AntDesign name="left" color={theme.primary} size={30} />
        </TouchableOpacity>

        <DatePicker
          modal
          date={date || new Date()}
          open={dateModalVisible}
          onConfirm={(date: Date) => {
            setDate(date);
            setDateModalVisible(false);
          }}
          onCancel={() => {
            setDateModalVisible(false);
          }}
        />
      </ThemedView>
    </TouchableWithoutFeedback>
  );
};

export default TaskScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    alignItems: "center",
  },
  input: {
    fontSize: 20,
    marginBottom: 50,
  },
  exitBtn: {
    justifyContent: "center",
    alignItems: "center",
    position: "absolute",
    top: 10,
    left: 10,

    width: 40,
    aspectRatio: 1,
  },
  btn: {
    padding: 10,
    borderRadius: 20,
    width: 300,
    marginBottom: 20,
    alignItems: "center",
  },
});

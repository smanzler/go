import React, { useState, useEffect, useCallback } from "react";
import {
  SafeAreaView,
  StyleSheet,
  FlatList,
  View,
  Text,
  Switch,
  Button,
  Pressable,
  TouchableOpacity,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedView } from "@/src/components/ThemedView";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedButton } from "@/src/components/ThemedButton";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect, router } from "expo-router";
import { ThemedIconButton } from "@/src/components/ThemedIconButton";
import database, { tasksCollection } from "@/src/db";
import TasksList from "@/src/components/TasksList";
import { useTheme } from "@/src/providers/ThemeProvider";
import { useElevation } from "@/src/constants/Themes";
import { Entypo } from "@expo/vector-icons";

const Index = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const { theme, toggleTheme, currentTheme } = useTheme();

  const onPress = () => {
    currentTheme === "light" ? toggleTheme("dark") : toggleTheme("light");
  };

  return (
    <ThemedView style={styles.container}>
      <StatusBar hidden />

      <SafeAreaView>
        <View style={styles.titleContainer}>
          <ThemedText type="title">Tasks for the day</ThemedText>
          <TouchableOpacity
            style={{
              width: 35,
              aspectRatio: 1,
              justifyContent: "center",
              alignItems: "center",
            }}
            onPress={() => router.push("/(modals)/task")}
          >
            <Entypo name="plus" size={30} color={theme.primary} />
          </TouchableOpacity>
        </View>

        <TasksList />
      </SafeAreaView>

      <Button title="Change Theme" onPress={onPress} />
    </ThemedView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 50,
    padding: 20,
  },
  titleContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  newTaskBtn: {
    position: "absolute",
    bottom: 10,
    right: 10,
    width: 50,
    aspectRatio: 1,
    borderRadius: 25,
  },
});

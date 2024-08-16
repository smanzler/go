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
  ScrollView,
} from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { ThemedView } from "@/src/components/ThemedView";
import { ThemedText } from "@/src/components/ThemedText";
import { ThemedButton } from "@/src/components/ThemedButton";
import { StatusBar } from "expo-status-bar";
import { useFocusEffect, router, Stack } from "expo-router";
import { ThemedIconButton } from "@/src/components/ThemedIconButton";
import database, { tasksCollection } from "@/src/db";
import TasksList from "@/src/components/TasksList";
import { useTheme } from "@/src/providers/ThemeProvider";
import { useElevation } from "@/src/constants/Themes";
import { Entypo } from "@expo/vector-icons";
import { mySync } from "@/src/db/sync";
import { LinearGradient } from "expo-linear-gradient";
import IndexHeader from "@/src/components/navigation/IndexHeader";
import { useAuth } from "@/src/providers/AuthProvider";

const Index = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const { theme, toggleTheme, currentTheme } = useTheme();
  const { user } = useAuth();

  const onPress = () => {
    currentTheme === "light" ? toggleTheme("dark") : toggleTheme("light");
  };

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      nestedScrollEnabled
    >
      <Stack.Screen
        options={{
          header: () => <IndexHeader />,
          headerTransparent: true,
        }}
      />
      <StatusBar hidden />

      <TasksList />

      <Button title="Change Theme" onPress={onPress} />
      <Button title="Sync" onPress={() => mySync(user)} />
    </ScrollView>
  );
};

export default Index;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 130,
    padding: 20,
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

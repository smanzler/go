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
import Animated, { LinearTransition } from "react-native-reanimated";
import dayjs, { Dayjs } from "dayjs";
import { useSync } from "@/src/providers/SyncProvider";
import { usePushNotifications } from "@/src/hooks/usePushNotifications";

const Index = () => {
  const [tasks, setTasks] = useState<any[]>([]);
  const [syncing, setSyncing] = useState<boolean>(false);

  const { theme } = useTheme();
  const { user } = useAuth();
  const { lastSync, updateLastSync } = useSync();

  const { expoPushToken, notification } = usePushNotifications();
  const data = JSON.stringify(notification, undefined, 2);

  console.log(expoPushToken?.data);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
      nestedScrollEnabled
    >
      <Stack.Screen
        options={{
          header: () => <IndexHeader syncing={syncing} />,
          headerTransparent: true,
        }}
      />
      <StatusBar hidden />

      <TasksList />

      {user && (
        <Animated.View layout={LinearTransition}>
          <Button
            title="Sync"
            color={theme.primary}
            onPress={() => mySync(user, updateLastSync, setSyncing)}
          />

          {lastSync && (
            <Text
              style={{
                color: theme.primary,
                marginTop: 30,
                textAlign: "center",
              }}
            >
              {`Last synced at\n${lastSync?.format("MMMM D, YYYY h:mm A")}`}
            </Text>
          )}
          <View style={{ height: 300 }} />
        </Animated.View>
      )}
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

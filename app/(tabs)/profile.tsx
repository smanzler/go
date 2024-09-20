import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React, { useEffect, useState } from "react";
import { ThemedView } from "@/src/components/ThemedView";
import { ThemedText } from "@/src/components/ThemedText";
import { router } from "expo-router";
import { useAuth } from "@/src/providers/AuthProvider";
import { supabase } from "@/src/lib/supabase";
import { useElevation } from "@/src/constants/Themes";
import { useTheme } from "@/src/providers/ThemeProvider";
import RemoteImage from "@/src/components/RemoteImage";
import SettingsListView from "@/src/components/SettingsListView";
import { AntDesign } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Profile = () => {
  const { isAuthenticated, user } = useAuth();
  const { theme } = useTheme();

  const [lastSync, setLastSync] = useState<string | null>("");

  useEffect(() => {
    const getSync = async () => {
      setLastSync(await AsyncStorage.getItem("lastSync"));
    };

    getSync();
  }, []);

  return !isAuthenticated || !user ? (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.text}>
        Welcome to Plan On It!
      </ThemedText>
      <ThemedText type="default" style={styles.text}>
        In order to see your profile and sync your tasks with the cloud, you
        must log in or make an account.
      </ThemedText>
      <Button
        title="Log in"
        onPress={() => router.navigate("/(auth)/login")}
      ></Button>
    </ThemedView>
  ) : (
    <ThemedView
      style={{ flex: 1, alignItems: "center", padding: 26, paddingTop: 100 }}
    >
      <ThemedText>Signed in as {user.email}</ThemedText>

      <Button title="Log out" onPress={() => supabase.auth.signOut()}></Button>

      <ThemedText>{lastSync}</ThemedText>
    </ThemedView>
  );
};

export default Profile;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    padding: 40,
  },
  text: {
    marginBottom: 20,
    textAlign: "center",
  },
  card: {
    flex: 1,
    alignItems: "center",
    padding: 24,
    borderRadius: 24,
  },
  profilePic: {
    width: 150,
    aspectRatio: 1,
    overflow: "hidden",
    borderRadius: 75,
  },
});

import {
  Alert,
  Button,
  Image,
  Modal,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
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
import { AntDesign, Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import dayjs, { Dayjs } from "dayjs";
import { useSync } from "@/src/providers/SyncProvider";

const Profile = () => {
  const { isAuthenticated, user } = useAuth();

  const { theme, toggleTheme, currentTheme } = useTheme();
  const { lastSync } = useSync();

  const [deleteLoading, setDeleteLoading] = useState(false);

  const changeTheme = () => {
    toggleTheme(currentTheme === "light" ? "dark" : "light");
  };

  const onDelete = async () => {
    setDeleteLoading(true);

    const data = await supabase.rpc("delete_user");

    console.log(data);

    supabase.auth.signOut();

    setDeleteLoading(false);
  };

  const deleteAlert = () =>
    Alert.alert(
      "Are you sure you want to delete your account?",
      "This cannot be undone.",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          onPress: onDelete,
          style: "destructive",
        },
      ]
    );

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
      <ThemedText style={{ marginBottom: 30 }}>
        Signed in as {user.email}
      </ThemedText>

      <Button
        title="Change Theme"
        color={theme.primary}
        onPress={changeTheme}
      />

      <Button
        title="Log out"
        color={theme.primary}
        onPress={() => supabase.auth.signOut()}
      />

      <Button title="Delete Account" color={"red"} onPress={deleteAlert} />

      {lastSync && user && (
        <Text
          style={{ color: theme.primary, marginTop: 30, textAlign: "center" }}
        >
          {`Last synced at\n${lastSync?.format("MMMM D, YYYY h:mm A")}`}
        </Text>
      )}
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

import {
  Button,
  Image,
  ScrollView,
  StyleSheet,
  Text,
  View,
} from "react-native";
import React from "react";
import { ThemedView } from "@/src/components/ThemedView";
import { ThemedText } from "@/src/components/ThemedText";
import { router } from "expo-router";
import { useAuth } from "@/src/providers/AuthProvider";
import { supabase } from "@/src/lib/supabase";
import { useElevation } from "@/src/constants/Themes";
import { useTheme } from "@/src/providers/ThemeProvider";
import RemoteImage from "@/src/components/RemoteImage";

const Profile = () => {
  const { isAuthenticated, user } = useAuth();
  const { theme } = useTheme();
  console.log(user);

  return !isAuthenticated ? (
    <ThemedView style={styles.container}>
      <ThemedText type="title" style={styles.text}>
        Welcome to Go!
      </ThemedText>
      <ThemedText type="default" style={styles.text}>
        In order to see your profile you must log in or make an account.
      </ThemedText>
      <Button
        title="Log in"
        onPress={() => router.navigate("/(auth)/login")}
      ></Button>
    </ThemedView>
  ) : (
    <ScrollView
      style={{
        flex: 1,
        padding: 40,
        backgroundColor: theme.background,
      }}
    >
      <View style={[styles.card, useElevation(10, theme)]}>
        <View style={styles.profilePic}>
          <RemoteImage
            path={user?.id}
            profile
            style={{ flex: 1, aspectRatio: 1 }}
          />
        </View>
      </View>
      <Button title="Log out" onPress={() => supabase.auth.signOut()}></Button>
    </ScrollView>
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

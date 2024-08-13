import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { ThemedView } from "@/src/components/ThemedView";
import { ThemedText } from "@/src/components/ThemedText";
import { router } from "expo-router";
import { useAuth } from "@/src/providers/AuthProvider";
import { supabase } from "@/src/lib/supabase";

const Profile = () => {
  const { isAuthenticated } = useAuth();

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
    <ThemedView style={{ flex: 1, alignItems: "center" }}>
      <Button title="Log out" onPress={() => supabase.auth.signOut()}></Button>
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
});

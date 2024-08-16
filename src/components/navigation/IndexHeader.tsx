import {
  SafeAreaView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
} from "react-native";
import React from "react";
import { ThemedText } from "../ThemedText";
import { router } from "expo-router";
import { useTheme } from "@/src/providers/ThemeProvider";
import { LinearGradient } from "expo-linear-gradient";
import { Entypo } from "@expo/vector-icons";

const IndexHeader = () => {
  const { theme } = useTheme();

  return (
    <>
      <View style={styles.titleContainer}>
        <View
          style={[styles.titleContent, { backgroundColor: theme.background }]}
        >
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
        <LinearGradient
          colors={[theme.background, "rgba(255, 255, 255, 0)"]}
          style={{ height: 30 }}
        />
      </View>
    </>
  );
};

export default IndexHeader;

const styles = StyleSheet.create({
  titleContainer: {},
  titleContent: {
    paddingTop: 50,
    padding: 20,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});

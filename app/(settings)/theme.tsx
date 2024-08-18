import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useTheme } from "@/src/providers/ThemeProvider";

const Theme = () => {
  const { theme } = useTheme();
  return (
    <View style={{ flex: 1, backgroundColor: theme.background }}>
      <Text>Theme</Text>
    </View>
  );
};

export default Theme;

const styles = StyleSheet.create({});

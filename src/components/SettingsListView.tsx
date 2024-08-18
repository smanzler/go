import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import React from "react";
import { useElevation } from "../constants/Themes";
import { useTheme } from "../providers/ThemeProvider";
import { AntDesign } from "@expo/vector-icons";
import { router } from "expo-router";

export type Setting = "theme" | "about" | "profile";

const SettingsListView = ({ settings }: { settings: Setting[] }) => {
  const { theme } = useTheme();

  const length = settings.length - 1;

  return (
    <View style={[styles.container, useElevation(10, theme)]}>
      {settings.map((setting, index) => (
        <TouchableOpacity
          key={index}
          style={styles.row}
          onPress={() => router.navigate(`/(settings)/${setting}`)}
        >
          <View style={styles.flex}>
            <Text style={[styles.text, { color: theme.text }]}>
              {setting.charAt(0).toUpperCase() + setting.slice(1)}
            </Text>
            <AntDesign
              name="right"
              style={{ alignSelf: "center" }}
              size={18}
              color={theme.text}
            />
          </View>

          {/* {length !== index && (
            <View style={[styles.border, { backgroundColor: theme.text }]} />
          )} */}
        </TouchableOpacity>
      ))}
    </View>
  );
};

export default SettingsListView;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    borderRadius: 20,
  },
  flex: {
    flexDirection: "row",
    justifyContent: "space-between",
  },
  row: {
    justifyContent: "center",
    height: 50,
    paddingHorizontal: 20,
  },
  border: {
    position: "absolute",
    bottom: 0,
    marginHorizontal: 20,
    width: "100%",
    height: 1,
  },
  text: {
    fontSize: 18,
  },
});

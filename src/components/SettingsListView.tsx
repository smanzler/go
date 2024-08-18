import { StyleSheet, Text, View } from "react-native";
import React from "react";
import { useElevation } from "../constants/Themes";
import { useTheme } from "../providers/ThemeProvider";
import { AntDesign } from "@expo/vector-icons";

const SettingsListView = ({ settings }: { settings: string[] }) => {
  const { theme } = useTheme();

  const length = settings.length - 1;

  return (
    <View style={[styles.container, useElevation(10, theme)]}>
      {settings.map((setting, index) => (
        <View key={index} style={styles.row}>
          <View style={styles.flex}>
            <Text style={[styles.text, { color: theme.text }]}>{setting}</Text>
            <AntDesign
              name="right"
              style={{ alignSelf: "center" }}
              size={18}
              color={theme.text}
            />
          </View>

          <View style={[styles.border]} />
        </View>
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
    height: StyleSheet.hairlineWidth,
  },
  text: {
    fontSize: 18,
  },
});

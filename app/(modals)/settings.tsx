import { useTheme } from "@/src/providers/ThemeProvider";
import React from "react";
import {
  View,
  Text,
  Switch,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
} from "react-native";

const SettingsScreen = () => {
  const { theme } = useTheme();
  const [isEnabled, setIsEnabled] = React.useState(false);

  const toggleSwitch = () => setIsEnabled((previousState) => !previousState);

  return (
    <ScrollView
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <Text style={[styles.header, { color: theme.text }]}>Settings</Text>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          General
        </Text>
        <TouchableOpacity style={styles.option}>
          <Text style={[styles.optionText, { color: theme.text }]}>
            Account
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={[styles.optionText, { color: theme.text }]}>
            Privacy
          </Text>
        </TouchableOpacity>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Preferences
        </Text>
        <View style={styles.option}>
          <Text style={[styles.optionText, { color: theme.text }]}>
            Dark Mode
          </Text>
          <Switch
            trackColor={{ false: "#767577", true: "#81b0ff" }}
            thumbColor={isEnabled ? "#f5dd4b" : "#f4f3f4"}
            ios_backgroundColor="#3e3e3e"
            onValueChange={toggleSwitch}
            value={isEnabled}
          />
        </View>
      </View>

      <View style={styles.section}>
        <Text style={[styles.sectionTitle, { color: theme.text }]}>
          Support
        </Text>
        <TouchableOpacity style={styles.option}>
          <Text style={[styles.optionText, { color: theme.text }]}>
            Help & Support
          </Text>
        </TouchableOpacity>
        <TouchableOpacity style={styles.option}>
          <Text style={[styles.optionText, { color: theme.text }]}>
            Send Feedback
          </Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
  },
  header: {
    fontSize: 32,
    fontWeight: "bold",
    marginBottom: 20,
  },
  section: {
    marginVertical: 20,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "600",
    marginBottom: 10,
  },
  option: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingVertical: 15,
    borderBottomWidth: StyleSheet.hairlineWidth,
    borderBottomColor: "#ccc",
  },
  optionText: {
    fontSize: 18,
  },
});

export default SettingsScreen;

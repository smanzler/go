import { Modal, ModalProps, StyleSheet, Text, View } from "react-native";
import React from "react";
import DateTimePicker from "react-native-ui-datepicker";
import { useTheme } from "../providers/ThemeProvider";
import { BlurView } from "expo-blur";
import { TouchableOpacity } from "react-native-gesture-handler";
import { ThemedText } from "./ThemedText";

type Props = {
  date: Date | null;
  setDate: React.Dispatch<React.SetStateAction<Date | null>>;
  visible: boolean;
  setVisible: React.Dispatch<React.SetStateAction<boolean>>;
};

const DatePickerModal = ({ date, setDate, visible, setVisible }: Props) => {
  const { theme } = useTheme();

  return (
    <Modal transparent animationType="fade" visible={visible}>
      <BlurView intensity={50} style={styles.container}>
        <View
          style={[
            styles.calendar,
            {
              backgroundColor: theme.background,
            },
          ]}
        >
          <DateTimePicker
            date={date}
            mode="single"
            calendarTextStyle={{ color: theme.text }}
            headerTextStyle={{ color: theme.text }}
            weekDaysTextStyle={{ color: theme.text }}
            headerButtonColor={theme.text}
            onChange={(params: any) => setDate(params.date)}
            timePicker
          />
        </View>

        <TouchableOpacity
          onPress={() => setVisible(false)}
          style={[styles.btn, { backgroundColor: theme.primary }]}
        >
          <ThemedText>Save</ThemedText>
        </TouchableOpacity>
      </BlurView>
    </Modal>
  );
};

export default DatePickerModal;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  calendar: {
    width: 300,
    borderRadius: 15,
    padding: 10,
    marginBottom: 20,
  },
  btn: {
    padding: 10,
    borderRadius: 20,
    width: 300,
    marginBottom: 20,
    alignItems: "center",
  },
});

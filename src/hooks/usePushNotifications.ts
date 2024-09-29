import * as Notifications from "expo-notifications";
import * as Device from "expo-device";
import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { useEffect, useRef, useState } from "react";
import { Platform } from "react-native";
import Task from "../models/Task";

export interface PushNotificationState {
  notification?: Notifications.Notification;
  expoPushToken?: Notifications.ExpoPushToken;
}

const saveNotificationId = async (taskId: string, notificationId: string) => {
  await AsyncStorage.setItem(`task-notification-${taskId}`, notificationId);
};

export const getNotificationId = async (
  taskId: string
): Promise<string | null> => {
  return await AsyncStorage.getItem(`task-notification-${taskId}`);
};

export const removeNotificationId = async (taskId: string) => {
  await AsyncStorage.removeItem(`task-notification-${taskId}`);
};

export const scheduleNotification = async (task: Task) => {
  const date = new Date(task.dueAt);

  const notificationId = await Notifications.scheduleNotificationAsync({
    content: {
      title: task.description,
      body: "Reminder",
      data: { taskId: task.id },
    },
    trigger: { date },
  });

  await saveNotificationId(task.id, notificationId);
};

export const usePushNotifications = (): PushNotificationState => {
  Notifications.setNotificationHandler({
    handleNotification: async () => ({
      shouldPlaySound: false,
      shouldShowAlert: true,
      shouldSetBadge: false,
    }),
  });

  const [expoPushToken, setExpoPushToken] = useState<
    Notifications.ExpoPushToken | undefined
  >();
  const [notification, setNotification] = useState<
    Notifications.Notification | undefined
  >();

  const notificationListener = useRef<Notifications.Subscription>();
  const responseListener = useRef<Notifications.Subscription>();

  async function registerForPushNotificationsAsync() {
    let token;

    if (Device.isDevice) {
      const { status: existingStatus } =
        await Notifications.getPermissionsAsync();

      let finalStatus = existingStatus;

      if (existingStatus !== "granted") {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }

      if (finalStatus !== "granted") {
        alert("Failed to get push token");
      }

      token = await Notifications.getExpoPushTokenAsync({
        projectId: Constants.expoConfig?.extra?.eas?.projectId,
      });

      if (Platform.OS === "android") {
        Notifications.setNotificationChannelAsync("default", {
          name: "default",
          importance: Notifications.AndroidImportance.MAX,
        });
      }

      return token;
    } else {
      console.log("ERROR: Please use a physical device.");
    }
  }

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => {
      setExpoPushToken(token);
    });

    notificationListener.current =
      Notifications.addNotificationReceivedListener(async (notification) => {
        setNotification(notification);

        const taskId = notification.request.content.data.taskId;

        console.log("removing", taskId);

        if (taskId) {
          await removeNotificationId(taskId);
        }
      });

    responseListener.current =
      Notifications.addNotificationResponseReceivedListener((response) => {
        console.log(response);
      });

    return () => {
      Notifications.removeNotificationSubscription(
        notificationListener.current!
      );

      Notifications.removeNotificationSubscription(responseListener.current!);
    };
  }, []);

  return {
    expoPushToken,
    notification,
  };
};

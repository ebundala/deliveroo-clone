import React, { useEffect, useRef, useState } from "react";
import { Button, View, Text } from "react-native";
import * as Notifications from "expo-notifications";
import { registerForPushNotificationsAsync, sendPushNotification } from "../App";

export function NotificationScreen() {
  const [expoPushToken, setExpoPushToken] = useState("");
  const [notification, setNotification] = useState<Notifications.Notification>();
  const notificationListener = useRef<ReturnType<typeof Notifications.addNotificationReceivedListener>>();
  const responseListener = useRef<ReturnType<typeof Notifications.addNotificationReceivedListener>>();

  useEffect(() => {
    registerForPushNotificationsAsync().then((token) => setExpoPushToken(token!)
    );

    notificationListener.current =
      Notifications.addNotificationReceivedListener((notification) => {
        setNotification(notification as any);
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

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "space-around",
      }}
    >
      <Text>Your expo push token: {expoPushToken}</Text>
      <View
        style={{ alignItems: "center", justifyContent: "center" }}
      >
        <Text>
          Title:{" "}
          {notification && notification.request.content.title}{" "}
        </Text>
        <Text>
          Body:{" "}
          {notification && notification.request.content.body}
        </Text>
        <Text>
          Data:{" "}
          {notification &&
            JSON.stringify(notification.request.content.data)}
        </Text>
      </View>
      <Button
        title="Press to Send Notification"
        onPress={async () => {
          await sendPushNotification(expoPushToken);
        }} />
    </View>
  );
}

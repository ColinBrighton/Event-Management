import * as Notifications from 'expo-notifications';

export const schedulePushNotification = async () => {

    await Notifications.scheduleNotificationAsync({
        content: {
            title: "You've got mail! 📬",
            body: 'Here is the notification body',
            data: { data: 'goes here', test: { test1: 'more data' } },
        },
        trigger: { seconds: 5 },
    });
}
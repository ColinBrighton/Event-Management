import { useState, useEffect, useRef } from 'react';
import { Text, View, Button, Platform, SafeAreaView, useColorScheme, StyleSheet, StatusBar } from 'react-native';
import * as Notifications from 'expo-notifications';
import { schedulePushNotification } from './ScheduleNotification';
import { registerForPushNotificationsAsync } from './RegisterNotification';
import CustomText from '../../../components/CustomText';
import { COLORS, SIZES } from '../../../constants';
import CustomButton from '../../../components/CustomButton';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

export const Notification = () => {
  const [expoPushToken, setExpoPushToken] = useState('');
  const [channels, setChannels] = useState([]);
  const [notification, setNotification] = useState(
    undefined
  );
  const notificationListener = useRef();
  const responseListener = useRef();
  const theme = useColorScheme();


  useEffect(() => {
    registerForPushNotificationsAsync().then(token => token && setExpoPushToken(token));

    if (Platform.OS === 'android') {
      Notifications.getNotificationChannelsAsync().then(value => setChannels(value ?? []));
    }
    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      notificationListener.current &&
        Notifications.removeNotificationSubscription(notificationListener.current);
      responseListener.current &&
        Notifications.removeNotificationSubscription(responseListener.current);
    };
  }, []);

  return (
    <SafeAreaView style={styles.container(theme)}>
      <View style={styles.header}>
        <CustomText title={'Local Notification'} size={SIZES.xLarge} color={theme === 'dark' ? '#ffffff' : '#000000'} />
      </View>
      <View style={styles.content}>
        <CustomText title={'*Notification will recieve after 5 seconds*'} size={SIZES.normal} color={theme === 'dark' ? '#ffffff' : '#000000'} />
        <CustomButton title={'Send Notification'} textColor={COLORS.white} onPress={async () => {
          await schedulePushNotification();
        }} />
      </View>
    </SafeAreaView>
  );
}


const styles = StyleSheet.create({
  container: (theme) => ({
    flex: 1,
    backgroundColor: theme === 'dark' ? '#000000' : '#ffffff'
  }),
  header: {
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight + 15,
  },
  content: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    marginHorizontal:20,
    gap:20
  }
})
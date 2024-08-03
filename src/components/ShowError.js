import { View, Text, Platform, Alert, ToastAndroid } from 'react-native'
import React from 'react'

export const ShowError = (message) => {
    if (Platform.OS === 'ios') {
        Alert.alert('Error', message);
      } else if (Platform.OS === 'android') {
        ToastAndroid.show(message, ToastAndroid.SHORT);
      }
}

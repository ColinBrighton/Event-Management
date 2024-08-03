import { Alert, Platform, StyleSheet, Text, ToastAndroid, View } from 'react-native'
import React from 'react'

const CustomError = (error) => {
    switch (error) {
        case 'auth/invalid-credential':
            if (Platform.OS === 'ios') {
                Alert.alert('Error', 'Invalid Credentials!');
            } else {
                ToastAndroid.show('Invalid Credentials!', ToastAndroid.LONG);
            }
            break;
        case 'auth/email-already-in-use':
            if (Platform.OS === 'ios') {
                Alert.alert('Error', 'Email already in use!');
            } else {
                ToastAndroid.show('Email already in use!', ToastAndroid.LONG);
            }
            break;
        default:
            ToastAndroid.show('Unknown Error, Please try again!', ToastAndroid.LONG);
            break;
    }
}

export default CustomError

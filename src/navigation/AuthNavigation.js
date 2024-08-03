import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import Login from '../screens/Auth/Login'
import { ROUTES } from '../constants'
import Register from '../screens/Auth/Register'
import AuthHome from '../screens/Auth/AuthHome'

const Stack = createNativeStackNavigator()

const AuthNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ROUTES.AUTHHOME} component={AuthHome} />
            <Stack.Screen name={ROUTES.REGISTER} component={Register} />
            <Stack.Screen name={ROUTES.LOGIN} component={Login} />
        </Stack.Navigator>
    )
}

export default AuthNavigation
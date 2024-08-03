import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { ROUTES } from '../constants'
import Home from '../screens/Users/Home/Home'
import { Notification } from '../screens/Users/Notifications/Notification'
import Events from '../screens/Users/Events/Events'
import AddEvents from '../screens/Admin/AddEvents'

const Stack = createNativeStackNavigator()

const UserNavigation = () => {
    return (
        <Stack.Navigator screenOptions={{ headerShown: false }}>
            <Stack.Screen name={ROUTES.HOME} component={Home} />
            <Stack.Screen name={ROUTES.NOTIFICATION} component={Notification} />
            <Stack.Screen name={ROUTES.EVENTS} component={Events} />
            <Stack.Screen name={ROUTES.ADDEVENTS} component={AddEvents}/>
        </Stack.Navigator>
    )
}

export default UserNavigation

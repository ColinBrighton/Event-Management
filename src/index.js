import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { StatusBar } from 'expo-status-bar'
import UserNavigation from './navigation/UserNavigation'
import AuthNavigation from './navigation/AuthNavigation'
import { useSelector } from 'react-redux'

export const Main = () => {

    const { user } = useSelector(state => state.user)
    console.log(user, 'user');

    return (
        <NavigationContainer >
            <StatusBar />
            {
                user ? <UserNavigation /> : <AuthNavigation />
            }
        </NavigationContainer>
    )
}


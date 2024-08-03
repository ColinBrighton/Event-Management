import { View, Text, StyleSheet, useColorScheme } from 'react-native'
import React from 'react'
import { useSelector } from 'react-redux'
import CustomText from '../components/CustomText'
import { SIZES } from '../constants'

const isAuthenticated = useSelector(state => state.auth.user)
const theme = useColorScheme()

export const CheckAuthenticated = (Component) => {

    return () => {
        if (isAuthenticated) {
            return <Component />
        } else {
            return <View style={styles.container}>
                <CustomText title={'Login to continue!'} size={SIZES.medium} color={theme === 'dark' ? '#ffffff' : "#000000"} />
            </View>
        }
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: "center",
        backgroundColor: theme === 'dark' ? '#000000' : '#ffffff'
    }
})

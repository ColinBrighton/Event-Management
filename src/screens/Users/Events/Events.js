import { SafeAreaView, StyleSheet, Text, View, StatusBar, useColorScheme } from 'react-native'
import React, { useEffect,  useState } from 'react'
import CustomText from '../../../components/CustomText'
import { EventsList } from './EventsList'
import { SIZES } from '../../../constants'

const Events = ({ navigation }) => {
    const theme = useColorScheme()

    const [loading, setLoading] = useState(false)


    return (
        <SafeAreaView style={styles.container(theme)}>
            <View style={styles.header}>
            <CustomText title={'Event List'} size={SIZES.xLarge} color={theme === 'dark' ? '#ffffff' : '#000000'} />
            </View>
            <EventsList setLoading={setLoading} loading={loading} theme={theme}/>
        </SafeAreaView>
    )
}

export default Events

const styles = StyleSheet.create({
    container: (theme) => ({
        flex: 1,
        paddingTop: StatusBar.currentHeight,
        backgroundColor: theme === 'dark' ? "#000000" : "#ffffff"
    }),
    header: {
        padding: 10
    }
})
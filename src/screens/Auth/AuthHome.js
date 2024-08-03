import { ImageBackground, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React from 'react'
import CustomButton from '../../components/CustomButton'
import AntDesign from '@expo/vector-icons/AntDesign';
import CustomText from '../../components/CustomText';
import { ROUTES } from '../../constants';

const AuthHome = ({navigation}) => {
    const theme = useColorScheme()
    return (
        <ImageBackground style={{ flex: 1, }} source={require('../../../assets/background.png')} resizeMode='cover'>
            <View style={{ marginTop: '20%' }}>
                <CustomText title={'Welcome to Event Management'} font={'FontBold'} letterSpacing={1} textAlign={'center'} />
            </View>
            <View style={styles.container(theme)}>
                <CustomButton title={'Continue as Admin'} onPress={()=>navigation.navigate(ROUTES.LOGIN,{role:'admin'})} icon={<AntDesign name="arrowright" size={24} color="black" />} />
                <CustomButton title={'Continue as User'} onPress={()=>navigation.navigate(ROUTES.LOGIN,{role:'user'})} icon={<AntDesign name="arrowright" size={24} color="black" />} />
            </View>
        </ImageBackground>
    )
}

export default AuthHome

const styles = StyleSheet.create({
    container: (theme) => ({
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingHorizontal: 20,
        gap: 20,
        bottom: 80
    })
})
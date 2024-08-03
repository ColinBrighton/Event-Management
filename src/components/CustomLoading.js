import { ActivityIndicator, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS } from '../constants'

const CustomLoading = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={'large'} color={COLORS.primary}/>
    </View>
  )
}

export default CustomLoading

const styles = StyleSheet.create({
    container:{
        flex:1,
        alignItems:'center',
        justifyContent:'center'
    }
})
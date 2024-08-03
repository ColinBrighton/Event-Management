import { ActivityIndicator, Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { COLORS, SHADOWS, SIZES } from '../constants'

const CustomButton = ({ bgColor, icon, title, textColor, loadingcolor, onPress, borderColor, borderWidth, borderRadius, style, loading }) => {
    return (
        <TouchableOpacity disabled={loading} onPress={onPress} activeOpacity={0.7} style={[styles.Btn(bgColor, borderRadius, borderColor, borderWidth), style]}>

            <View style={styles.BtnTextHolder}>
                {icon && <Text style={styles.BtnText(textColor)}>{icon}</Text>}
                <Text style={styles.BtnText(textColor)}>{title}</Text>
            </View>
            {
                loading && <ActivityIndicator color={loadingcolor} />
            }
        </TouchableOpacity>
    )
}

export default CustomButton

const styles = StyleSheet.create({
    Btn: (bgColor, borderRadius, borderColor, borderWidth) => ({
        backgroundColor: bgColor ? bgColor : COLORS.primary,
        width: '100%',
        paddingVertical: Platform.OS === 'ios' ? 12 : 8,
        flexDirection: 'row',
        alignItems: 'center',
        columnGap: 10,
        borderRadius: borderRadius ? borderRadius : 10,
        borderWidth: borderWidth ? borderWidth : 0,
        borderColor: borderColor ? borderColor : COLORS.red,
        alignItems: 'center',
        justifyContent: 'center',
        ...SHADOWS.medium,
        position: 'relative',
        zIndex: 1,
    }),
    BtnTextHolder: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: 8,
    },
    BtnText: (textColor) => ({
        fontFamily: 'FontBold',
        fontSize: SIZES.medium,
        color: textColor ? textColor : COLORS.white,
    })
})
import { PixelRatio, Platform, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../constants'

const CustomText = ({ title, size, color, textAlign, style, numberOfLines, font, letterSpacing, underline, weight, lineThrough, lineHeight, onPress }) => {
    return (
        <Text adjustsFontSizeToFit={true} allowFontScaling={false} numberOfLines={numberOfLines} onPress={onPress} style={[styles.title(size, color, font, textAlign, letterSpacing, underline, weight, lineThrough, lineHeight), style]}>{title}</Text>
    )
}

export default CustomText

const styles = StyleSheet.create({
    title: (size, color, font, textAlign, letterSpacing, underline, weight, lineThrough, lineHeight) => ({
        fontSize: size ? size : SIZES.xxLarge,
        color: color ? color : COLORS.black,
        fontFamily: font ? font : 'FontRegular',
        textAlign: textAlign ? textAlign : 'left',
        letterSpacing: letterSpacing ? letterSpacing : 0,
        textDecorationLine: underline ? 'underline' : lineThrough ? 'line-through' : 'none',
        fontWeight: weight ? weight : null,
        lineHeight: lineHeight
    })
})
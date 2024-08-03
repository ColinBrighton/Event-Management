import { StyleSheet, Text, View, TextInput, Platform, TouchableOpacity } from 'react-native'
import React from 'react'

import { COLORS, SIZES } from '../constants'
import AntDesign from '@expo/vector-icons/AntDesign';
import Entypo from '@expo/vector-icons/Entypo';

export const CustomInput = ({
    disabled,
    right,
    value,
    onChange,
    onChangeText,
    onBlur,
    placeholder,
    numberOfLines,
    label,
    localStyle,
    secureTextEntry,
    keyboardType,
    align,
    error,
    eyeOnpress,
    autoComplete,
    theme,
    autoCapitalize,
    multiline }) => {
    return (
        <View style={styles.ContainerWrapper}>
            <View style={styles.container}>
                <Text style={styles.label(theme)}>{label}</Text>
                <TextInput
                    value={value}
                    onChangeText={onChangeText}
                    onChange={onChange}
                    onBlur={onBlur}
                    placeholderTextColor={'gray'}
                    editable={disabled}
                    pointerEvents={disabled ? 'none' : 'auto'}
                    placeholder={placeholder}
                    secureTextEntry={secureTextEntry}
                    keyboardType={keyboardType}
                    multiline={multiline}
                    numberOfLines={numberOfLines}
                    autoComplete={autoComplete}
                    autoCapitalize={autoCapitalize}
                    style={[
                        styles.input(multiline, align, disabled, theme),
                        localStyle,
                        Platform.OS === 'ios' ? styles.iosInput(numberOfLines, disabled, theme) : null,
                    ]}
                />
                {
                    right &&
                    <View style={styles.icon}>
                        <TouchableOpacity activeOpacity={1} onPress={eyeOnpress}>
                            {
                                secureTextEntry ?
                                    <AntDesign name="eye" size={22} color={theme === 'dark' ? '#ffffff' : "#000000"} />
                                    :
                                    <Entypo name="eye-with-line" size={22} color={theme === 'dark' ? '#ffffff' : "#000000"} />

                            }
                        </TouchableOpacity>
                    </View>
                }
            </View>
        </View>
    )
}


const styles = StyleSheet.create({

    ContainerWrapper: {
        width: '100%',
    },
    container: {
        // backgroundColor: COLORS.white,
        position: 'relative',
        marginVertical: 8,
    },
    input: (multi, align, disabled, theme) => ({
        fontFamily: 'FontRegular',
        // color: theme === 'dark' ? '#ffffff' : "#000000",
        color: theme === 'dark' ? '#ffffff' : "#000000",
        fontSize: SIZES.normal,
        letterSpacing: 1,
        backgroundColor: 'transparent',
        fontWeight: '600',
        borderWidth: 1,
        textAlign: align ? align : 'left',
        borderRadius: 10,
        height: 40,
        borderColor: theme === 'dark' ? '#ffffff' : "#000000",
        paddingLeft: 10,
        paddingRight: 35,
        verticalAlign: 'center',
    }),
    iosInput: (numberOfLines, disabled,theme) => ({
        height: numberOfLines ? 2.5 * 50 : 50,
        justifyContent: "flex-start",
        backgroundColor: disabled ? COLORS.gray : 'transparent',
        color: theme === 'dark' ? '#ffffff' : "#000000",
    }),
    label: (theme) => ({
        fontFamily: 'FontBold',
        fontSize: SIZES.medium,
        paddingHorizontal: 8,
        marginBottom: 2,
        color: theme === 'dark' ? '#ffffff' : "#000000",
    }),
    error: {
        color: COLORS.red_light,
        fontFamily: 'FontBold',
        letterSpacing: 1,
        fontSize: 14,
        textTransform: 'capitalize',
        fontWeight: '700',
    },
    icon: {
        position: 'absolute',
        zIndex: 2,
        bottom: Platform.OS === 'ios' ? 10 : 10,
        right: 12,
    }
})
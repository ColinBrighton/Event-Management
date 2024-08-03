import { KeyboardAvoidingView, ScrollView, StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS, ROUTES, SHADOWS, SIZES, } from '../../constants'
import CustomText from '../../components/CustomText'
import { CustomInput } from '../../components/CustomTextInput'
import { Formik } from 'formik'
import CustomButton from '../../components/CustomButton'
import { registerSchema } from '../../utilities/ValidationSchema'
import CustomError from '../../components/CustomError'
import { createUserWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_AUTH } from '../../utilities/FirebaseConfig'
import { useDispatch } from 'react-redux'
import { ToogleTheme } from '../../redux/slices/ThemeSlice'
import { setUser } from '../../redux/slices/AuthSlice'

const Register = ({ navigation }) => {
    const colorScheme = useColorScheme();

    const [loading, setLoading] = useState(false)
    const [pass, setPass] = useState(true)
    const [confirmPass, setConfirmPass] = useState(true)
    const dispatch = useDispatch()
    const themeContainerStyle =
        colorScheme === 'light' ? styles.lightContainer : styles.darkContainer;


    useEffect(() => {
        dispatch(ToogleTheme(colorScheme))
    }, [])

    let initialValues = {
        email: '',
        password: '',
        confirmPassword: '',
    };

    const handelNavigate = () => {
        navigation.navigate(ROUTES.LOGIN, { role: 'user' })
    }

    const submitForm = async ({ email, password }) => {
        setLoading(true)
        createUserWithEmailAndPassword(FIREBASE_AUTH, email, password)
            .then((userCredential) => {
                const values = {
                    user: true,
                    role: 'user'
                }
                setLoading(false)
                dispatch(setUser(values))
            })
            .catch((error) => {
                setLoading(false)
                CustomError(error.code)
            });
    }

    return (
        <KeyboardAvoidingView behavior='padding' style={[styles.container, themeContainerStyle]}>

            <View style={{ alignItems: 'center', width: '100%' }}>
                <Formik
                    validationSchema={registerSchema}
                    initialValues={initialValues}
                    onSubmit={(values, { resetForm }) => {
                        submitForm({ ...values }, resetForm)
                    }}
                >
                    {({
                        getFieldProps,
                        handleChange,
                        setFieldValue,
                        handleBlur,
                        handleReset,
                        handleSubmit,
                        values,
                        errors,
                        touched,
                        resetForm
                    }) => {
                        useEffect(() => {
                            resetForm()
                        }, [navigation])

                        return (
                            <View style={styles.registerCard(colorScheme)}>
                                <CustomText title={'Register'} font={'FontBold'} size={SIZES.xLarge} color={COLORS.primary} letterSpacing={2} />
                                <View>
                                    <CustomInput
                                        placeholder={'Enter email'}
                                        value={values.email}
                                        theme={colorScheme}
                                        keyboardType={'email-address'}
                                        onChangeText={handleChange('email')}
                                        label={'Email'}
                                        autoCapitalize={'none'}
                                        onBlur={handleBlur('email')}
                                    />
                                    {touched.email && errors.email && (
                                        <Text style={{ color: 'red' }}>{errors.email}</Text>
                                    )}


                                    <CustomInput
                                        placeholder={'Enter password'}
                                        value={values.password}
                                        keyboardType={'password'}
                                        right
                                        theme={colorScheme}
                                        label={'Password'}
                                        secureTextEntry={pass}
                                        eyeOnpress={() => setPass((prev) => !prev)}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                    />
                                    {touched.password && errors.password && (
                                        <Text style={{ color: 'red' }}>{errors.password}</Text>
                                    )}

                                    <CustomInput
                                        theme={colorScheme}
                                        placeholder={'Re-Enter password'}
                                        value={values.confirmPassword}
                                        keyboardType={'password'}
                                        right
                                        label={'Confirm Password'}
                                        secureTextEntry={confirmPass}
                                        eyeOnpress={() => setConfirmPass((prev) => !prev)}
                                        onChangeText={handleChange('confirmPassword')}
                                        onBlur={handleBlur('confirmPassword')}
                                    />
                                    {touched.confirmPassword && errors.confirmPassword && (
                                        <Text style={{ color: 'red' }}>{errors.confirmPassword}</Text>
                                    )}
                                </View>
                                <View style={styles.buttonHolder}>
                                    <CustomButton loading={loading} loadingcolor={"#fff"} title={!loading && 'Submit'} style={styles.btn} onPress={handleSubmit} />
                                    <CustomText title={'or'} color={colorScheme === 'dark' ? '#ffffff' : '#000000'} textAlign={'center'} size={SIZES.small} />
                                    <CustomText title={'Already have an Account? Click here!'} textAlign={'center'} size={SIZES.normal} color={COLORS.primary} underline={true} onPress={handelNavigate} />
                                </View>
                            </View>
                        )
                    }}
                </Formik>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Register

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20
    },

    registerCard: (colorScheme) => ({
        width: '90%',
        backgroundColor: colorScheme === 'dark' ? '#232b2b' : '#ffffff',
        padding: 20,
        borderRadius: 10,
        shadowColor: colorScheme === 'dark' ? '#ffffff' : '#000000',
        shadowOffset: {
            width: 5,
            height: 5,
        },
        shadowOpacity: 0.8,
        shadowRadius: 5.84,
        elevation: 10,
        gap: 25
    }),
    buttonHolder: {
        gap: 10
    },
    lightContainer: {
        backgroundColor: '#ffffff',
    },
    darkContainer: {
        backgroundColor: '#000000',
    },
})
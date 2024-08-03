import {  KeyboardAvoidingView,  StyleSheet, Text, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import { COLORS,  ROUTES, SIZES } from '../../constants'
import { CustomInput } from '../../components/CustomTextInput'
import CustomText from '../../components/CustomText'
import CustomButton from '../../components/CustomButton'
import { Formik } from 'formik'
import { loginSchema } from '../../utilities/ValidationSchema'
import { signInWithEmailAndPassword } from 'firebase/auth'
import { FIREBASE_AUTH } from '../../utilities/FirebaseConfig'
import CustomError from '../../components/CustomError'
import { useDispatch } from 'react-redux'
import { ToogleTheme } from '../../redux/slices/ThemeSlice'
import { setUser } from '../../redux/slices/AuthSlice'

const Login = ({ navigation, route }) => {

    const { role } = route.params;
    const [loading, setLoading] = useState(false)
    const [visible, setVisible] = useState(true)
    const colorScheme = useColorScheme();
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(ToogleTheme(colorScheme))
    }, [])

    let initialValues = {
        email: '',
        password: '',
    };
    const handleRegister = () => {
        navigation.navigate(ROUTES.REGISTER)
    }

    const submitForm = async ({ email, password }) => {
        setLoading(true)
        signInWithEmailAndPassword(FIREBASE_AUTH, email, password)
            .then((userCredential) => {
                const user = userCredential.user
                let values;
                if (user.email === 'admin@gmail.com') {
                    values = {
                        user: true,
                        role: 'admin'
                    }
                } else {
                    values = {
                        user: true,
                        role: 'user'
                    }
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
        <KeyboardAvoidingView behavior='padding' style={styles.container(colorScheme)}>
            <View style={{ alignItems: 'center', width: '100%' }}>
                <Formik
                    validationSchema={loginSchema}
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

                        return (
                            <View style={styles.loginCard(colorScheme)}>
                                {
                                    role == 'admin' ?
                                        <CustomText title={'Admin Login'} font={'FontBold'} size={SIZES.xLarge} color={COLORS.primary} letterSpacing={2} /> :
                                        <CustomText title={'Login'} font={'FontBold'} size={SIZES.xLarge} color={COLORS.primary} letterSpacing={2} />
                                }
                                <View>
                                    <CustomInput
                                        placeholder={'Enter email'}
                                        value={values.email}
                                        theme={colorScheme}
                                        keyboardType={'email-address'}
                                        onChangeText={handleChange('email')}
                                        label={'Email'}
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
                                        secureTextEntry={visible}
                                        eyeOnpress={() => setVisible((prev) => !prev)}
                                        onChangeText={handleChange('password')}
                                        onBlur={handleBlur('password')}
                                    />
                                    {touched.password && errors.password && (
                                        <Text style={{ color: 'red' }}>{errors.password}</Text>
                                    )}
                                </View>
                                <View style={styles.buttonHolder}>
                                    <CustomButton loading={loading} title={'Login'} onPress={handleSubmit} loadingcolor={COLORS.white} />
                                    {
                                        role == 'user' &&
                                        <View>
                                            <CustomText title={'or'} color={colorScheme === 'dark' ? '#ffffff' : '#000000'} textAlign={'center'} size={SIZES.small} />
                                            <CustomButton onPress={handleRegister} title={'Register'} borderColor={COLORS.primary} borderWidth={1} bgColor={COLORS.white} textColor={COLORS.primary} />
                                        </View>
                                    }
                                </View>
                            </View>
                        )
                    }}
                </Formik>
            </View>
        </KeyboardAvoidingView>
    )
}

export default Login

const styles = StyleSheet.create({
    container: (theme) => ({
        flex: 1,
        backgroundColor: theme === 'dark' ? '#000000' : '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
        gap: 20
    }),
    loginCard: (theme) => ({
        width: '90%',
        backgroundColor: theme === 'dark' ? '#232b2b' : '#ffffff',
        padding: 20,
        borderRadius: 10,
        shadowColor: theme === 'dark' ? '#ffffff' : '#000000',
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
    }
})
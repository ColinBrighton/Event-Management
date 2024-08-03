import { Alert, KeyboardAvoidingView, Platform, SafeAreaView, StatusBar, StyleSheet, Text, ToastAndroid, useColorScheme, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import CustomText from '../../components/CustomText';
import { COLORS, SIZES } from '../../constants';
import { Formik } from 'formik';
import { CustomInput } from '../../components/CustomTextInput';
import CustomButton from '../../components/CustomButton';
import { addDoc, collection, doc, query, Timestamp, where, updateDoc } from 'firebase/firestore';
import { FIREBASE_DB } from '../../utilities/FirebaseConfig';
import { ShowError } from '../../components/ShowError';
import { eventSchema } from '../../utilities/ValidationSchema';

const AddEvents = ({ selectedEvent, refRBSheet, getEventsFromFirestore, navigation }) => {
  const theme = useColorScheme();
  const [loading, setLoading] = useState(false)

  let initialValues = {
    event: '',
    place: '',
    date: ''
  };

  const updateEvent = async (value, resetForm) => {
    setLoading(true)
    try {
      const eventRef = doc(FIREBASE_DB, "events", selectedEvent.item.id);
      updateDoc(eventRef, {
        event: value.event,
        place: value.place,
        date: value.date,
      })
      if (Platform.OS === 'ios') {
        Alert.alert('Error', 'Event Updated!');
      } else if (Platform.OS === 'android') {
        ToastAndroid.show('Event Updated!', ToastAndroid.SHORT);
      }
      refRBSheet.current.close()
      setLoading(false)
      resetForm()
      getEventsFromFirestore()
    } catch (error) {
      setLoading(false)
    }
  }

  const addEvent = async (value, resetForm) => {
    setLoading(true)

    try {
      await addDoc(collection(FIREBASE_DB, "events"), {
        event: value.event,
        place: value.place,
        date: value.date,
      });
      setLoading(false)
      if (Platform.OS === 'ios') {
        Alert.alert('Error', 'Event Added!');
      } else if (Platform.OS === 'android') {
        ToastAndroid.show('Event Added!', ToastAndroid.SHORT);
      }
      resetForm()
    } catch (error) {
      setLoading(false)
      ShowError('Unkonwn Error. Please try after sometime')
    }
  }

  const submitForm = (value, resetForm) => {

    if (selectedEvent?.index) {
      updateEvent(value, resetForm)
    } else {
      addEvent(value, resetForm)
    }
  }

  return (
    <SafeAreaView style={styles.container(theme)}>
      <KeyboardAvoidingView behavior='padding' style={styles.container(theme)}>
        {!selectedEvent?.index && <View style={styles.header}>
          <CustomText title={'Add Event'} size={SIZES.xLarge} color={theme === 'dark' ? '#ffffff' : '#000000'} />
        </View>
        }
        <Formik
          validationSchema={eventSchema}
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
              if (selectedEvent?.index) {
                console.log('setForm',selectedEvent);
                SetValues();
              }
            }, [selectedEvent])
            const SetValues = () => {
              handleChange('event')(selectedEvent?.item.event);
              handleChange('place')(selectedEvent?.item.place);
              handleChange('date')(selectedEvent?.item.date);
            }
            return (
              <View style={styles.formHolder}>
                <View>
                  <CustomInput
                    placeholder={'Enter event name'}
                    value={values.event}
                    theme={theme}
                    onChangeText={handleChange('event')}
                    label={'Event Name'}
                    onBlur={handleBlur('event')}
                  />
                  {touched.event && errors.event && (
                    <Text style={{ color: 'red' }}>{errors.event}</Text>
                  )}

                  <CustomInput
                    placeholder={'Enter event location'}
                    value={values.place}
                    theme={theme}
                    onChangeText={handleChange('place')}
                    label={'Event Location'}
                    onBlur={handleBlur('place')}
                  />
                  {touched.place && errors.place && (
                    <Text style={{ color: 'red' }}>{errors.place}</Text>
                  )}

                  <CustomInput
                    placeholder={'Enter date'}
                    value={values.date}
                    theme={theme}
                    onChangeText={handleChange('date')}
                    label={'Event Date'}
                    onBlur={handleBlur('date')}
                  />
                  {touched.date && errors.date && (
                    <Text style={{ color: 'red' }}>{errors.date}</Text>
                  )}
                </View>
                <View style={styles.buttonHolder}>
                  <CustomButton loading={loading} title={!loading && 'Submit'} onPress={handleSubmit} loadingcolor={COLORS.white} />
                </View>
              </View>
            )
          }}
        </Formik>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}

export default AddEvents

const styles = StyleSheet.create({
  container: (theme) => ({
    flex: 1,
    backgroundColor: theme === 'dark' ? '#000000' : '#ffffff'
  }),
  header: {
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight + 15,
  },
  formHolder: {
    padding: 20
  },
  buttonHolder: {
    marginTop: 30,
  }
})
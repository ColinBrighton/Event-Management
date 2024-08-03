import { SafeAreaView, StatusBar, StyleSheet, TouchableOpacity, View, useColorScheme } from 'react-native'
import React, { useState } from 'react'
import CustomButton from '../../../components/CustomButton'
import { FIREBASE_AUTH,  } from '../../../utilities/FirebaseConfig'
import { COLORS, ROUTES, SIZES } from '../../../constants'
import CustomText from '../../../components/CustomText'
import { useDispatch, useSelector } from 'react-redux'
import { setUser } from '../../../redux/slices/AuthSlice'
import { ShowError } from '../../../components/ShowError'
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';


const Home = ({ navigation }) => {

  const theme = useColorScheme();
  const dispatch = useDispatch()
  const { role } = useSelector(state => state.user)

  const handleSignout = async () => {
    try {
      await FIREBASE_AUTH.signOut()
      const values = {
        user: false,
        role: null
      }
      dispatch(setUser(values))
    } catch (error) {
      ShowError('Unkonwn Error. Please try after sometime')
    }
  }

  return (
    <SafeAreaView style={styles.container(theme)}>
      <View style={styles.header}>
        <View>
          <CustomText title={'Welcome'} color={theme === 'dark' ? '#ffffff' : '#000000'} />
          <CustomText title={'Username'} color={theme === 'dark' ? '#ffffff' : '#000000'} size={SIZES.small} />
        </View>
        <TouchableOpacity activeOpacity={0.3} onPress={handleSignout} style={{ padding: 4 }}>
          <MaterialCommunityIcons name="logout" size={26} color={theme === 'dark' ? "#ffffff" : '#000000'} />
        </TouchableOpacity>
      </View>
      <View style={styles.card}>
        <CustomText
          color={"#000000"}
          size={SIZES.normal}
          lineHeight={25}
          title={"Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's standard dummy text ever since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book."} />
      </View>

      <View style={styles.navCard(theme)}>
        <CustomText size={SIZES.normal} font={'FontBold'} letterSpacing={1} title={'Send Local Notification'} />
        <View style={{ width: 80 }}>
          <CustomButton title={'Go!'} textColor={COLORS.white} onPress={() => navigation.navigate(ROUTES.NOTIFICATION)} />
        </View>
      </View>
      <View style={styles.navCard(theme)}>
        <CustomText size={SIZES.normal} font={'FontBold'} letterSpacing={1} title={'Check Events'} />
        <View style={{ width: 80 }}>
          <CustomButton title={'Go!'} textColor={COLORS.white} onPress={() => navigation.navigate(ROUTES.EVENTS)} />
        </View>
      </View>
      {
        role == 'admin' &&
        <View style={styles.navCard(theme)}>
          <CustomText size={SIZES.normal} font={'FontBold'} letterSpacing={1} title={'Add Event'} />
          <View style={{ width: 80 }}>
            <CustomButton title={'Go!'} textColor={COLORS.white} onPress={() => navigation.navigate(ROUTES.ADDEVENTS)} />
          </View>
        </View>
      }
    </SafeAreaView>
  )
}

export default Home

const styles = StyleSheet.create({
  container: (theme) => ({
    flex: 1,
    backgroundColor: theme === 'dark' ? '#000000' : '#ffffff'
  }),
  text: {
    fontSize: 20,
  },
  lightContainer: {
    backgroundColor: '#d0d0c0',
  },
  darkContainer: {
    backgroundColor: '#242c40',
  },
  lightThemeText: {
    color: '#242c40',
  },
  darkThemeText: {
    color: '#d0d0c0',
  },
  loading: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
  },
  card: {
    backgroundColor: '#FFFFED',
    borderRadius: 10,
    marginHorizontal: 20,
    marginVertical: 10,
    flexWrap: 'nowrap',
    padding: 15,
    borderColor: COLORS.primary,
    borderWidth: 1
  },
  header: {
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingTop: StatusBar.currentHeight + 15,
  },
  navCard: (theme) => ({
    display: "flex",
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: theme === 'dark' ? '#ffffff' : '#f2f2f2',
    marginTop: 20,
    marginHorizontal: 20,
    padding: 10,
    borderRadius: 10
  })
})
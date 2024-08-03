import { StyleSheet } from 'react-native';
import { useFonts } from 'expo-font';
import { FIREBASE_AUTH } from './src/utilities/FirebaseConfig';
import { onAuthStateChanged, } from 'firebase/auth'
import { useEffect, useState } from 'react';
import CustomLoading from './src/components/CustomLoading';
import { Provider, } from 'react-redux';
import { persistor, store } from './src/redux/store';
import * as SplashScreen from 'expo-splash-screen';
import { Main } from './src';
import { PersistGate } from 'redux-persist/integration/react';


SplashScreen.preventAutoHideAsync();

export default function App() {

  const [user, setUser] = useState(false)

  const [loaded, error] = useFonts({
    'FontBold': require('./assets/fonts/Poppins-Bold.ttf'),
    'FontMedium': require('./assets/fonts/Poppins-Medium.ttf'),
    'FontRegular': require('./assets/fonts/Poppins-Regular.ttf'),
    'FontThin': require('./assets/fonts/Poppins-Thin.ttf'),
  });

  useEffect(() => {
    if (loaded || error) {
      SplashScreen.hideAsync();
    }
  }, [loaded, error]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(FIREBASE_AUTH, (user) => {
      setUser(user);
    });

    return () => unsubscribe();
  }, [FIREBASE_AUTH]);

  if (!loaded && !error) {
    return <CustomLoading />
  }

  return (
    <Provider store={store} >
      <PersistGate loading={null} persistor={persistor}>
        <Main />
      </PersistGate>
    </Provider>
  );

}


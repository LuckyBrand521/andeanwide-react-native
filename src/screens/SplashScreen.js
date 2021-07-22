import React, {useEffect, useState} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
} from 'react-native';

import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default function SplashScreen({navigation}) {
  const [splash, setSplash] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setSplash(false);

      navigation.reset({
        index: 0,
        routes: [{name: 'onBoardingScreens'}],
      });
    }, 3000);
  }, []);

  return splash ? (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={true}
        backgroundColor="#1E2026"
        translucent={true}
      />
      <Image
        style={styles.splash}
        source={require('../images/logo.png')}
      />
    </SafeAreaView>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    width:wp('100%'),
    height:hp('100%'),
    backgroundColor: '#131925',
    justifyContent: 'center',
    alignItems: 'center',
  },

  splash: {
    width: 260,
    height: 50,
  },
});

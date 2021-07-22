import React, {useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Image,
  StatusBar,
  Platform,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//imported Views
import BusinessViewEmpressa from '../components/RegistrationScreen/BusinessViewEmpressa';
import PersonViewPersona from '../components/RegistrationScreen/PersonViewPersona';

export default function RegistrationScreen() {
  const [colorP, setColorP] = useState('#fff');
  const [bgColorP, setbgColorP] = useState('#09A04E');

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Image style={styles.topLogo} source={require('../images/logo.png')} />

        <Text style={styles.welcome}>Bienvenido</Text>

        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: wp('68%'),
            alignSelf: 'center',
            justifyContent: 'space-around',
          }}>
          <TouchableWithoutFeedback>
            <View>
              <Text
                style={{
                  color: colorP,
                  textAlign: 'center',
                  marginBottom: 4,
                  fontSize: 20,
                }}>
                CREAR CUENTA
              </Text>
              <View
                style={{width: wp('70%'), height: 4, backgroundColor: bgColorP}}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>

        <PersonViewPersona />
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131925',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  buttonText: {
    color: '#fff',
  },

  topLogo: {
    width: 260,
    height: 50,
    alignSelf: 'center',
    resizeMode: 'cover',
  },

  welcome: {
    fontSize: 21,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#fff',
    marginBottom: 7,
    marginTop: hp('5%'),
  },

  contentContainer: {
    marginTop: hp('12%'),
  },
});

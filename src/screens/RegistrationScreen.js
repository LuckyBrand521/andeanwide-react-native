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
  const [bgColorP, setbgColorP] = useState('#09A04E');
  const [bgColorE, setbgColorE] = useState('#fff');
  const [colorP, setColorP] = useState('#fff');
  const [colorE, setColorE] = useState('gray');
  const [isindividual, setIsindividual] = useState(1);


  const onpresstab1 = () => {
    setIsindividual(1);
    setColorE('#6D7782');
    setbgColorE('#fff');

    setColorP('#fff');
    setbgColorP('#09A04E');
  };

  const onpresstab2 = () => {
    setIsindividual(0);
    //for  tab1
    setColorE('#fff');
    setbgColorE('#fff');

    setColorP('gray');
    setbgColorP('#09A04E');

    //for tab2

    setColorP('#6D7782');
    setbgColorP('#fff');

    setColorE('#fff');
    setbgColorE('#09A04E');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Image style={styles.topLogo} source={require('../images/logo.png')} />

        <Text style={styles.welcome}>Bienvenido</Text>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: wp('80%'),
            alignSelf: 'center',
            justifyContent: 'space-around',
            marginTop: hp('1%'),
          }}>
          <TouchableWithoutFeedback onPress={onpresstab1}>
            <View>
              <Text
                style={{color: colorP, textAlign: 'center', marginBottom: 4}}>
                Persona
              </Text>
              <View
                style={{width: 150, height: 5, backgroundColor: bgColorP}}
              />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={onpresstab2}>
            <View>
              <Text
                style={{color: colorE, textAlign: 'center', marginBottom: 4}}>
                Empresa
              </Text>
              <View
                style={{width: 150, height: 5, backgroundColor: bgColorE}}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>
        {isindividual === 1 ? (
        <PersonViewPersona />
        ) : (
          <BusinessViewEmpressa />
        )}
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

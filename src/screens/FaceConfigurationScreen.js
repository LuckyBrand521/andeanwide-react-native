import React from 'react';

import {
  SafeAreaView,
  Image,
  TouchableOpacity,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function FaceConfigurationScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#18222E"
        translucent={true}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Seguridad de la Cuenta</Text>
      </View>

      <View style={styles.contentContainer}>
        <Text style={styles.headerText}>Face ID</Text>
        <Image
          style={styles.image}
          source={require('../images/facelock.png')}
        />
        <Text style={{...styles.headerText, fontSize: 18}}>
          Inicia sesión más rápido{'\n'} con Face ID
        </Text>

        <Text
          style={{
            ...styles.headerText,
            fontSize: 14,
            marginTop: hp('3%'),
            color: '#474B51',
          }}>
          Añade seguridad extra a tu aplicación de{'\n'} AndeanWide
        </Text>

        <View>
          <TouchableOpacity
            onPress={() => navigation.navigate('PinCodeScreen')}
            style={{
              ...styles.buttonContainer,
            }}>
            <Text style={styles.buttonText}>Configurar Face ID</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('tabs')}
            style={{
              ...styles.buttonContainer,
            }}>
            <Text style={styles.buttonText}>Ahora no</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
    backgroundColor: '#131925',
  },

  header: {
    width: wp('100%'),
    height: hp('15%'),
    backgroundColor: '#18222E',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    alignItems: 'center',
  },

  headerText: {
    color: '#ffffff',
    fontSize: 20,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
  },
  image: {
    alignSelf: 'center',
  },

  buttonContainer: {
    width: wp('45%'),
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#474B52',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp('2.5%'),
  },

  buttonText: {
    color: '#fff',
  },

  contentContainer: {
    marginTop: hp('10%'),
  },
});

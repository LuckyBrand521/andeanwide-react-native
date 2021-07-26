import React, {Component} from 'react';
import {
  Image,
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  TouchableOpacity,
  AppRegistry,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Swiper from 'react-native-swiper';
import LogSignButton from '../components/onBoardingScreens/LogSignButton';

export default function onBoardingScreens({navigation}) {
  return (
    <SafeAreaView style={{flex: 1, backgroundColor: '#18222E'}}>
      <View style={styles.mainContainer}>
        <Swiper
          activeDotStyle={{
            width: 22,
            height: 5,
            backgroundColor: '#169937',
            borderRadius: 0,
          }}
          dotColor={'#989DA2'}
          dotStyle={{width: 22, borderRadius: 0, height: 5}}
          style={styles.wrapper}
          showsButtons={false}
          autoplay={true}
          loop={true}>
          {/* First Onboarding */}

          <SafeAreaView style={styles.container}>
            <StatusBar
              barStyle="light-content"
              hidden={false}
              backgroundColor="#1E2026"
              translucent={true}
            />

            <View style={styles.imageContainer}>
              <Image
                style={styles.onboard1}
                source={require('../images/onBoard1.png')}
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.onboardText}>
                Guarda y convierte diferentes monedas{'\n'}
                en segundos
              </Text>

              <Text
                style={{
                  ...styles.onboardText,
                  color: '#989DA2',
                  marginTop: 16,
                  fontWeight: 'normal',
                  fontSize: 14,
                }}>
                Podras activar direntes monedas en tus balances de{'\n'}
                andea wide y convertir tu dinero de una a otra con tan{'\n'}
                solo un click.
              </Text>
            </View>
          </SafeAreaView>

          {/* Second Onboarding */}

          <SafeAreaView style={styles.container}>
            <StatusBar
              barStyle="light-content"
              hidden={false}
              backgroundColor="#1E2026"
              translucent={true}
            />

            <View style={styles.imageContainer}>
              <Image
                style={styles.onboard1}
                source={require('../images/onBoard2.png')}
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.onboardText}>
                Enviar dinero nunca fue tan facil
              </Text>

              <Text
                style={{
                  ...styles.onboardText,
                  color: '#989DA2',
                  marginTop: 16,
                  fontWeight: 'normal',
                  fontSize: 14,
                }}>
                realiza todas tus trasnferecias con la app de{'\n'}
                andean wide, donde quiera que estes solo con{'\n'}
                un click
              </Text>
            </View>
          </SafeAreaView>

          {/* Third Onboarding */}

          <SafeAreaView style={styles.container}>
            <StatusBar
              barStyle="light-content"
              hidden={false}
              backgroundColor="#1E2026"
              translucent={true}
            />

            <View style={styles.imageContainer}>
              <Image
                style={styles.onboard1}
                source={require('../images/onBoard3.png')}
              />
            </View>

            <View style={styles.textContainer}>
              <Text style={styles.onboardText}>
                Podras abrir balances en{'\n'}
                CLP, USD y EUR de{'\n'}
                Andean Wide
              </Text>

              <Text
                style={{
                  ...styles.onboardText,
                  color: '#989DA2',
                  marginTop: 16,
                  fontWeight: 'normal',
                  fontSize: 14,
                }}>
                La manera mas facíl de enviar y recibir pagos y{'\n'}
                ademas podras ahorrar tu dinero en moneda fuerte,
              </Text>
            </View>
          </SafeAreaView>
        </Swiper>
      </View>

      <View style={styles.buttonsMainContainer}>
        <View style={styles.buttonContainer}>
          <LogSignButton
            title="Iniciar sesión"
            bgcolor="#119438"
            onpress={() => navigation.navigate('LoginScreen')}
          />

          <LogSignButton
            title="Registrate"
            bgcolor="#109338"
            onpress={() => navigation.navigate('RegistrationScreen')}
          />
        </View>

        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={['#41414F', '#77777E', '#ADADAE']}
          style={styles.appleSignInbutton}>
          <View
            style={{
              width: 70,
              height: 40,
              right: -5,
              bottom: 15,
              transform: [{scaleX: 2}],
              overflow: 'hidden',
              position: 'absolute',
              borderRadius: 80,
              backgroundColor: '#929497',
            }}
          />
          <Text style={styles.buttonText}>Iniciar sesión con Apple</Text>
        </LinearGradient>
      </View>
    </SafeAreaView>
  );
}

AppRegistry.registerComponent('myproject', () => SwiperComponent);

const styles = StyleSheet.create({
  mainContainer: {
    height: hp('75%'),
    backgroundColor: '#18222E',
  },

  container: {
    flex: 1,
    backgroundColor: '#18222E',
    // paddingTop:Platform.OS==='android'?StatusBar.currentHeight:0,
  },

  pagination: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    width: wp('13'),
  },

  onboard1: {
    width: 250,
    height: 250,
  },

  onboardText: {
    color: '#fff',
    fontSize: 20,
    textAlign: 'center',
    fontWeight: 'bold',
  },

  imageContainer: {
    marginTop: hp('8'),
    alignSelf: 'center',
  },

  buttonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-around',
    paddingHorizontal: 10,
  },

  appleSignInbutton: {
    width: wp('90%'),
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp('1.5%'),
    overflow: 'hidden',
    display: 'none',
  },

  buttonText: {
    color: '#fff',
  },

  buttonsMainContainer: {
    marginTop: hp('5%'),
  },
});

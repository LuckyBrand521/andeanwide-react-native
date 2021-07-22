import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Carousel from 'react-native-looped-carousel';
import Octicons from 'react-native-vector-icons/Octicons';
import LinearGradient from 'react-native-linear-gradient';

export default function BalanceScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#18222E"
        translucent={true}
      />
      <View style={styles.header}>
        <Text
          style={{...styles.headerText, fontWeight: 'normal', fontSize: 15}}>
          Historia
        </Text>
        <Text style={styles.headerText}>Cartera</Text>
        <Octicons name="person" size={24} color="#fff" />
      </View>

      <View style={styles.middleInputsContainer}>
        <Carousel
          delay={2000}
          style={{width: wp('85%'), height: 180, alignSelf: 'center'}}
          autoplay={false}
          pageInfo={false}
          bullets={true}
          bulletsContainerStyle={{position: 'absolute', bottom: -30}}
          chosenBulletStyle={{
            width: 23,
            height: 6,
            borderRadius: 0,

            borderRadius: 2,
          }}
          bulletStyle={{
            width: 23,
            height: 6,

            borderWidth: 0,
            backgroundColor: '#2C3240',
          }}
          onAnimateNextPage={p => console.log(p)}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#027532', '#0FB658', '#1CFA7F']}
            style={styles.card}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#15BC63', '#1CFA7F']}
              style={{
                width: 150,
                height: 150,
                right: -20,
                top: -40,

                overflow: 'hidden',
                position: 'absolute',
                borderRadius: 75,
                backgroundColor: '#1CFA7F',
              }}
            />

            <View style={styles.cardTextContainer}>
              <Text style={styles.cardText}>CLP Balance</Text>
              <Text style={{...styles.cardText, fontSize: 34}}>$ 0.00</Text>
              <Text style={styles.cardText}>$ 0.00 Disponible</Text>
            </View>

            <View style={styles.cardButtonContainer}>
              <TouchableOpacity>
                <View style={styles.button}>
                  <Text style={styles.btnText}>Deposito</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={styles.button}>
                  <Text style={styles.btnText}>Retiro</Text>
                </View>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#283B50', '#41627E', '#537EA1']}
            style={styles.card}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#466A89', '#4C7494']}
              style={{
                width: 150,
                height: 150,
                right: -20,
                top: -40,

                overflow: 'hidden',
                position: 'absolute',
                borderRadius: 75,
              }}
            />

            <View style={styles.cardTextContainer}>
              <Text style={styles.cardText}>USD Balance</Text>
              <Text style={{...styles.cardText, fontSize: 34}}>$ 0.00</Text>
              <Text style={styles.cardText}>$ 0.00 Disponible</Text>
            </View>

            <View style={styles.cardButtonContainer}>
              <TouchableOpacity>
                <View style={{...styles.button, backgroundColor: '#617E96'}}>
                  <Text style={styles.btnText}>Deposito</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={{...styles.button, backgroundColor: '#617E96'}}>
                  <Text style={styles.btnText}>Retiro</Text>
                </View>
              </TouchableOpacity>
            </View>
          </LinearGradient>

          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#696972', '#9A9B9D', '#9A9B9D']}
            style={styles.card}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#7F8086', '#9A9B9D']}
              style={{
                width: 150,
                height: 150,
                right: -20,
                top: -40,

                overflow: 'hidden',
                position: 'absolute',
                borderRadius: 75,
                backgroundColor: '#1CFA7F',
              }}
            />

            <View style={styles.cardTextContainer}>
              <Text style={styles.cardText}>EUR Balance</Text>
              <Text style={{...styles.cardText, fontSize: 34}}>€ 0.00</Text>
              <Text style={styles.cardText}>$ 0.00 Disponible</Text>
            </View>

            <View style={styles.cardButtonContainer}>
              <TouchableOpacity>
                <View style={{...styles.button, backgroundColor: '#ACACAE'}}>
                  <Text style={styles.btnText}>Deposito</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity>
                <View style={{...styles.button, backgroundColor: '#ACACAE'}}>
                  <Text style={styles.btnText}>Retiro</Text>
                </View>
              </TouchableOpacity>
            </View>
          </LinearGradient>
        </Carousel>
        <Text style={{...styles.headerText, paddingTop: 35}}>
          Transacciones
        </Text>

        <View style={styles.trasactionsTitle}>
          <Text style={{...styles.btnText, color: '#707A81', fontSize: 18}}>
            Cantidad
          </Text>

          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: wp('40%'),
            }}>
            <Text style={{...styles.btnText, color: '#707A81', fontSize: 18}}>
              Fecha{' '}
            </Text>
            <Text style={{...styles.btnText, color: '#707A81', fontSize: 18}}>
              Estatus
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.transactionsList}>
        <Text style={{color: '#fff', fontSize: 18}}>100.0000</Text>

        <View
          style={{
            flexDirection: 'row',
            position: 'absolute',
            right: wp('10%'),
            justifyContent: 'space-between',
            alignItems: 'center',
            width: wp('40%'),
          }}>
          <View>
            <Text style={{color: '#fff', fontSize: 18}}>09/17/2020</Text>
            <Text style={{...styles.btnText, color: '#707A81', fontSize: 10}}>
              11:22pm
            </Text>
          </View>

          <Text style={{...styles.btnText}}>--</Text>
        </View>

        <View></View>
      </View>

      <View style={styles.footerButtonContainer}>
        <TouchableOpacity>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#0D5734', '#0D5734', '#1B975B']}
            style={styles.continueButton}>
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
                backgroundColor: '#198352',
              }}
            />
            <Text style={styles.buttonText}>Convertir</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
    backgroundColor: '#141A28',
  },

  header: {
    width: wp('100%'),
    height: hp('12%'),
    backgroundColor: '#18222E',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },

  headerText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  verifyText: {
    color: '#919191',
    fontSize: 14,
    textAlign: 'center',
    marginTop: hp('1%'),
  },
  middleInputsContainer: {
    backgroundColor: '#18222E',
    height: hp('41%'),
    width: wp('100%'),

    padding: 25,
    marginTop: hp('1%'),
  },
  input: {
    marginTop: hp('0%'),
    borderBottomWidth: 2,
    borderBottomColor: '#919191',
    width: wp('75%'),
    alignSelf: 'center',
    color: '#919191',
  },

  footerButtonContainer: {
    width: wp('100%'),
    height: hp('9%'),
    backgroundColor: '#18222E',
    position: 'absolute',
    bottom: 5,
  },
  continueButton: {
    width: wp('90%'),
    height: 45,
    borderRadius: 8,
    backgroundColor: '#1A8D35',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp('1.5%'),
    overflow: 'hidden',
  },

  buttonText: {
    color: '#fff',
  },
  termText: {
    color: '#919191',
    fontSize: 13.5,
    marginHorizontal: 10,
  },

  termsubContainer: {
    flexDirection: 'row',
    marginTop: hp('3%'),
  },

  card: {
    backgroundColor: '#BADA55',
    width: wp('85%'),
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
  },

  cardText: {
    color: '#fff',
    fontSize: 18,
  },

  cardTextContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  button: {
    width: wp('35%'),
    height: 45,
    borderRadius: 10,
    backgroundColor: '#35BC6F',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontSize: 15,
  },

  cardButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  trasactionsTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('3%'),
  },

  transactionsList: {
    width: wp('100%'),
    height: hp('11%'),
    backgroundColor: '#18222E',
    marginTop: 8,
    paddingHorizontal: 20,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
});

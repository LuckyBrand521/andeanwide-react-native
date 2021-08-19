import React, {useState} from 'react';
import APP from '../../app.json';
import {connect} from 'react-redux';
import axios from 'axios';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';

function ForgotPasswordScreen({navigation, token}) {
  //our states
  const [isLoading, setLoading] = useState(false);
  const [mail, onChangemail] = React.useState('');
  const [emailerror, setEmailError] = React.useState('');

  const submitForm = value => {
    setLoading(true);
    axios
      .post(APP.APP_URL + 'api/forgot-password', value, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}`,
        },
      })
      .then(res => {
        Toast.show('¡Recordatorio de contraseña enviado!', Toast.LONG, [
          'UIAlertController',
        ]);
        setTimeout(function () {
          navigation.navigate('LoginScreen');
        }, 3000);
      })
      .catch(err => {
        Toast.show('Ocurrió un error!', Toast.LONG, ['UIAlertController']);
      });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner
          visible={isLoading}
          textContent={'Envío de datos...'}
          textStyle={styles.spinnerTextStyle}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Image style={styles.topLogo} source={require('../images/logo.png')} />
        <Text style={{color: 'tomato', fontSize: 18, textAlign: 'center'}}>
          {emailerror}
        </Text>
        <Text style={styles.restore}>Restablecer contraseña</Text>
        <View>
          <TextInput
            placeholder="Email"
            keyboardType="email-address"
            placeholderTextColor="#919191"
            style={styles.input}
            onChangeText={onChangemail}
            value={mail}
          />
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={submitForm}
            style={{
              ...styles.buttonContainer,
            }}>
            <Text style={styles.buttonText}>Enviar</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.goBack()}
            style={{
              ...styles.buttonContainer,
            }}>
            <Text style={styles.buttonText}>Volver</Text>
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({
  token: state.root.token,
});

export default connect(mapStateToProps)(ForgotPasswordScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131925',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  input: {
    marginTop: hp('2.2%'),
    borderBottomWidth: 2,
    borderBottomColor: '#919191',
    width: wp('65%'),
    alignSelf: 'center',
    color: '#919191',
  },

  acceptTerms: {
    color: '#919191',
    textAlign: 'center',
  },

  termsContainer: {
    flexDirection: 'row',

    alignSelf: 'center',
    marginTop: hp('2%'),
  },

  buttonContainer: {
    width: wp('30%'),
    height: 30,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#474B52',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp('2.5%'),
  },

  buttonText: {
    color: '#fff',
    fontSize: 12,
  },
  topLogo: {
    width: 260,
    height: 50,
    alignSelf: 'center',
  },
  contentContainer: {
    marginTop: hp('12%'),
  },

  buttonsContainer: {
    marginTop: hp('2%'),
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    width: wp('80%'),
    alignSelf: 'center',
  },
  restore: {
    color: '#fff',
    alignSelf: 'center',
    marginTop: hp('12%'),
    marginBottom: hp('2%'),
  },
});

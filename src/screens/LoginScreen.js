import React from 'react';
import {Alert} from 'react-native';
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

export default function LoginScreen({navigation}) {
  //our states
  const [mail, onChangemail] = React.useState('');
  const [pass, onChangePass] = React.useState('');
  const [emailerror, setEmailError] = React.useState('');

  const insert = () => {
    if (mail.length === 0 || pass.length === 0) {
      setEmailError('Some fields are missing');
    } else {
      setEmailError('');
      navigation.navigate('PinCodeScreen');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <Image style={styles.topLogo} source={require('../images/logo.png')} />

        <Text style={{color: 'tomato', fontSize: 18, textAlign: 'center'}}>
          {emailerror}
        </Text>

        <View>
          <TextInput
            placeholder="Email"
            keyboardType='email-address'
            placeholderTextColor="#919191"
            style={styles.input}
            onChangeText={onChangemail}
            value={mail}
          />

          <TextInput
            secureTextEntry={true}
            placeholder="Contraseña"
            placeholderTextColor="#919191"
            style={styles.input}
            onChangeText={onChangePass}
            value={pass}
          />
        </View>

        <View style={styles.buttonsContainer}>
          <TouchableOpacity
            onPress={insert}
            style={{
              ...styles.buttonContainer,
            }}>
            <Text style={styles.buttonText}>Iniciar Sesión</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('ForgotPasswordScreen')}
            style={{
              ...styles.buttonContainer,
            }}>
            <Text style={styles.buttonText}>Olvidé mi contraseña</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => navigation.navigate('RegistrationScreen')}
            style={{
              ...styles.buttonContainer,
            }}>
            <Text style={styles.buttonText}>Registro</Text>
          </TouchableOpacity>
        </View>
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
  },
});

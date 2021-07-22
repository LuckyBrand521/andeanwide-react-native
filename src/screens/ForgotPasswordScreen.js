import React from 'react';
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

export default function ForgotPasswordScreen({navigation}) {
  //our states
  const [mail, onChangemail] = React.useState('');
  const [emailerror, setEmailError] = React.useState('');

  const insert = () => {
    if (mail.length === 0) {
      setEmailError('Some fields are missing');
    } else {
      setEmailError('');
    }
  };

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
            onPress={insert}
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

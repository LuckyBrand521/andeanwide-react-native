import React, {useState} from 'react';
import APP from '../../../app.json';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
} from 'react-native';

import {Formik} from 'formik';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as yup from 'yup';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/core';
import axios from 'axios';

export default function BusinessViewEmpressa() {
  const navigation = useNavigation();
  //our states
  const [mail, onChangemail] = React.useState('');
  const [pass, onChangePass] = React.useState('');
  const [pass_confirmation, onChangePassConfirmation] = React.useState('');

  const [toggleCheckBox, setToggleCheckBox] = React.useState(false);

  const [emailerror, setEmailError] = React.useState('');

  const insert = () => {
    if (mail.length === 0 || pass.length === 0) {
      setEmailError('Some fields are missing');
    } else {
      setEmailError('');
      navigation.navigate('SignupCompleted');
    }
  };

  return (
    <View style={styles.container}>
      <Text
        style={{
          color: 'tomato',
          fontSize: 18,
          textAlign: 'center',
          marginTop: 10,
        }}>
        {emailerror}
      </Text>
      <View>
        <TextInput
          placeholder="Email"
          keyboardType="email-address"
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
        <TextInput
          secureTextEntry={true}
          placeholder="Contraseña confirmada"
          placeholderTextColor="#919191"
          style={styles.input}
          onChangeText={onChangePassConfirmation}
          value={pass_confirmation}
        />
      </View>

      <View style={styles.termsContainer}>
        <CheckBox
          tintColor="#aaaaaa"
          onFillColor="#09A04E"
          tintColors
          disabled={false}
          value={toggleCheckBox}
          onValueChange={newValue => setToggleCheckBox(newValue)}
        />
        <Text style={styles.acceptTerms}>
          Acepto los terminos y condiciones{'\n'}
          de Andean Wide
        </Text>
      </View>

      <View>
        <TouchableOpacity
          onPress={insert}
          style={{
            ...styles.buttonContainer,
          }}>
          <Text style={styles.buttonText}>Registro Empressa</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={{
            ...styles.buttonContainer,
          }}>
          <Text style={styles.buttonText}>Cancelar</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {},
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
    marginTop: hp('2%'),
  },

  buttonText: {
    color: '#fff',
  },
});

import React, {useState} from 'react';
import {StyleSheet, Text, View, Alert} from 'react-native';
import PINCode, {hasUserSetPinCode} from '@haskkor/react-native-pincode';
import APP from '../../app.json';
import axios from 'axios';

import Fontisto from 'react-native-vector-icons/Fontisto';

export default function PinCodeScreen({route, navigation}) {
  const {formdata} = route.params;
  const registerSubmit = values => {
    setLoading(true);
    axios
      .post(APP.APP_URL + 'api/users/register', values)
      .then(res => {
        setLoading(false);
        const message = res.data.message;
        Toast.show(
          'Registro completado. Por favor revise su bandeja de entrada y confírmelo.',
          Toast.LONG,
          ['UIAlertController'],
        );
        setTimeout(function () {
          navigation.navigate('SignupCompleted');
        }, 3000);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        Toast.show('No permite crear cuenta nueva!', Toast.LONG, [
          'UIAlertController',
        ]);
      });
  };

  const finishProcess = async code => {
    const requestData = {
      ...formdata,
      pin: code,
      pin_confirmation: code,
      old_pin: '',
    };
    // const hasPin = await hasUserSetPinCode();
    // if (hasPin) {
    //   Alert.alert(null, 'You have successfully set/entered your pin.', [
    //     {
    //       title: 'Ok',
    //       onPress: () => {
    //         navigation.navigate('FaceConfigurationScreen');
    //       },
    //     },
    //   ]);
    // }
  };

  return (
    <View style={styles.container}>
      <Fontisto
        style={{alignSelf: 'center', marginTop: 80}}
        name="unlocked"
        size={20}
        color="#fff"
      />
      <PINCode
        titleChoose="Ingrese un código pin"
        titleConfirm="confirma tu código pin"
        titleConfirmFailed="tus entradas no coincidieron"
        stylePinCodeCircle={{
          width: 15,
          height: 15,
          backgroundColor: '#fff',
          borderRadius: 7.5,
        }}
        colorPassword="#fff"
        stylePinCodeButtonNumber="#fff"
        colorPasswordEmpty="#fff"
        colorCircleButtons="#919191"
        pinCodeVisible={true}
        touchIDDisabled={true}
        status={'choose'}
        finishProcess={e => finishProcess(e)}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131925',
  },
});

import React from 'react';
import {StyleSheet, Text, View,Alert} from 'react-native';
import PINCode, { hasUserSetPinCode } from '@haskkor/react-native-pincode'; 


import Fontisto from 'react-native-vector-icons/Fontisto';

export default function PinCodeScreen({navigation}) {

 const  finishProcess = async () => {
        const hasPin = await hasUserSetPinCode();
        if (hasPin) {
          Alert.alert(null, "You have successfully set/entered your pin.", [
            {
              title: "Ok",
              onPress: () => {
                navigation.navigate('FaceConfigurationScreen')
              },
            },
          ]);
        
        }
      };

  return (
    <View style={styles.container}>
      <Fontisto style={{alignSelf:'center',marginTop:80}} name="unlocked" size={20} color="#fff" />
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

        finishProcess={() =>finishProcess()}
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

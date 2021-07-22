import React from 'react';
import {StyleSheet, Text, TouchableOpacity, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function LogSignButton({title, bgcolor,onpress,display}) {
  return (
    <TouchableOpacity
   onPress={onpress}
      style={{
        ...styles.buttonContainer,
        backgroundColor: bgcolor,
        overflow: 'hidden',
      }}>
      <View
        style={{
          display:display,
          
          width: 40,
          height: 40,
          right: -5,
          bottom: 20,
          transform: [{scaleX: 2}],
          overflow: 'hidden',
          position: 'absolute',
          borderRadius: 50,
          backgroundColor: '#1A8C35',
        }}
      />
      <Text style={styles.buttonText}>{title}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  buttonContainer: {
    width: wp('45%'),
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    
  },

  buttonText: {
    color: '#fff',
  },
});

import React from 'react';
import {StyleSheet, Text, View} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function TwoTextView({text_gray, text_white, styles}) {
  return (
    <View style={{...styles}}>
      <Text
        style={{
          color: '#919191',
          fontSize: 14,
        }}>
        {text_gray}
      </Text>
      <Text
        style={{
          color: '#FFF',
          fontSize: 18,
          fontWeight: 'bold',
        }}>
        {text_white}
      </Text>
    </View>
  );
}

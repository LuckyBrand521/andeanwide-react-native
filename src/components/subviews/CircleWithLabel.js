import React from 'react';
import {Text} from 'react-native';
import LinearGradient from 'react-native-linear-gradient';
export default function CircleWithLabel(props) {
  return (
    <LinearGradient
      start={{x: 0.0, y: 1.0}}
      end={{x: 1.0, y: 1.0}}
      colors={['#02411D', '#08F971']}
      style={{
        width: 30,
        height: 30,
        borderRadius: 200,
        borderColor: 'transparent',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <Text
        style={{
          color: 'white',
          fontSize: 14,
          fontWeight: 'bold',
        }}>
        {props.label}
      </Text>
    </LinearGradient>
  );
}

import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function TouchableWithIcon(props) {
  return (
    <TouchableOpacity
      style={{...styles.transactionsList, justifyContent: 'space-around'}}
      onPress={props.passFunction}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          name={props.iconName}
          size={props.iconSize ? props.iconSize : 25}
          color={props.iconColor ? props.iconColor : '#fff'}
          style={{width: wp('15%')}}
        />
        <Text
          style={{
            ...styles.headerText,
            fontWeight: 'bold',
          }}>
          {props.label}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  transactionsList: {
    height: hp('9%'),
    backgroundColor: '#18222E',
    marginTop: 3,
    paddingHorizontal: 30,
  },
});

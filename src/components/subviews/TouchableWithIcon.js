import React from 'react';
import {TextStyleSheet, View, TouchableOpacity} from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';
export default function TouchableWithIcon(props) {
  return (
    <TouchableOpacity
      style={{...styles.transactionsList, justifyContent: 'space-around'}}
      key={orders[i].id}
      onPress={() => {
        toggleDetailModal(i);
      }}>
      <View style={{flexDirection: 'row', alignItems: 'center'}}>
        <Icon
          name={props.iconName}
          size={props.iconSize ? props.iconSize : 20}
          color={props.iconColor ? props.iconColor : '#fff'}
        />
        <Text
          style={{
            ...styles.headerText,
            fontWeight: 'normal',
            marginLeft: 10,
          }}>
          {props.label}
        </Text>
      </View>

      {colorLabel(orders[i])}
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  headerText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

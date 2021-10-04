import React, {useState, useEffect, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TextInput,
  ScrollView,
} from 'react-native';
import Modal from 'react-native-modal';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {TouchableOpacity} from 'react-native';
import Picker from '@gregfrench/react-native-wheel-picker';
var PickerItem = Picker.Item;

export const WheelPicker = props => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [selected, setSelected] = useState(
    props.selectedValue ? props.selectedValue : props.initialValue,
  );
  const [selectedLabel, setSelectedLabel] = useState(props.title);
  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };
  useEffect(() => {
    if (selected == '' || selected == 0) {
      setSelectedLabel(props.title);
    } else {
      for (let i = 0; i < props.items.length; i++) {
        if (props.items[i].id === selected) {
          setSelectedLabel(
            props.items[i].label ? props.items[i].label : props.items[i].name,
          );
        }
      }
    }
  }, [selected]);
  return (
    <>
      <View style={styles.wraperStyle}>
        <TouchableOpacity style={{flex: 9}} onPress={toggleModal}>
          <Text
            style={{
              fontSize: 15,
              color: selected == 0 || selected == '' ? '#919191' : '#FFF',
            }}>
            {selectedLabel}
          </Text>
        </TouchableOpacity>
        <AntDesign
          name="caretdown"
          color="#919191"
          size={14}
          style={{flex: 1, textAlign: 'right'}}
        />
      </View>

      <Modal
        isVisible={isModalVisible}
        style={styles.modal}
        deviceHeight={hp('100%')}
        backdropOpacity={0.5}
        onBackdropPress={toggleModal}>
        <View style={styles.modalContainer}>
          <View style={styles.modalHeader}>
            <TouchableOpacity onPress={toggleModal}>
              <Text style={styles.doneButton}>Hecho</Text>
            </TouchableOpacity>
          </View>
          <Picker
            style={
              props.style
                ? props.style
                : {width: '100%', height: 250, backgroundColor: 'transparent'}
            }
            lineColor="#000000" //to set top and bottom line color (Without gradients)
            lineGradientColorFrom="#000000" //to set top and bottom starting gradient line color
            lineGradientColorTo="#000000" //to set top and bottom ending gradient
            selectedValue={props.selectedValue}
            itemStyle={{color: '#CCC', fontSize: 24}}
            onValueChange={index => {
              setSelected(index);
              props.onValueChange(index);
            }}>
            <PickerItem label={props.title} value={0} key={0} />
            {props.items.map((item, i) => (
              <PickerItem
                label={item.label ? item.label : item.name}
                value={item.id}
                key={i}
              />
            ))}
          </Picker>
        </View>
      </Modal>
    </>
  );
};

const styles = StyleSheet.create({
  modal: {
    width: '100%',
    alignSelf: 'center',
    justifyContent: 'flex-end',
    marginBottom: 0,
  },
  modalHeader: {
    height: 50,
    backgroundColor: '#222222',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingRight: 10,
  },
  modalContainer: {
    height: 300,
    width: '100%',
    backgroundColor: '#707070',
  },
  doneButton: {
    color: '#DDD',
    fontSize: 20,
  },
  wraperStyle: {
    backgroundColor: '#18222E',
    marginBottom: 10,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 18,
    width: wp('85%'),
    alignSelf: 'center',
    color: '#919191',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
});

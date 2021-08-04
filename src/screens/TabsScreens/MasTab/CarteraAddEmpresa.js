import React, {useState} from 'react';
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

import AntDesign from 'react-native-vector-icons/AntDesign';

//Pickers
import DatePicker from 'react-native-datepicker';
import SelectPicker from 'react-native-form-select-picker';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';

const options = ['Masculina', 'Mujer'];
const options2 = ['Casada', 'Única'];
const option_estim = ['10,000', '20,000', '30,000', '40,000', '50,000'];
const option_size = ['Pequeño', 'Medio', 'Grande'];
const option_origin = ['utilidades retenidas', 'deuda', 'patrimonio'];

export default function CarteraAddEmpresa({navigation}) {
  //inputs are in the same pattern as UI
  const [name, setName] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [activity, setActivity] = React.useState('');
  const [idnumber, setIdnumber] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [companyfield, setCompanyfield] = React.useState('');
  const [anualestim, setAnualestim] = React.useState('');
  const [size, setSize] = React.useState('');
  const [origin, setOrigin] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#18222E"
        translucent={true}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Datos de la empresa</Text>
      </View>

      <View>
        <Text style={{...styles.verifyText}}>Completa tus datos</Text>
      </View>

      <View style={styles.middleInputsContainer}>
        <ScrollView>
          <TextInput
            placeholder="Pais"
            placeholderTextColor="#919191"
            style={styles.input}
            onChangeText={setCountry}
            value={country}
          />
          <TextInput
            placeholder="Giro o Actividad"
            placeholderTextColor="#919191"
            style={styles.input}
            onChangeText={setActivity}
            value={activity}
          />
          <TextInput
            placeholder="Numbro o razon social"
            placeholderTextColor="#919191"
            style={styles.input}
            onChangeText={setName}
            value={name}
          />
          <TextInput
            placeholder="numero de identidad"
            placeholderTextColor="#919191"
            style={styles.input}
            onChangeText={setIdnumber}
            value={idnumber}
          />
          <TextInput
            placeholder="Dirección"
            placeholderTextColor="#919191"
            style={styles.input}
            onChangeText={setAddress}
            value={address}
          />
          <TextInput
            placeholder="Actividades de negocio"
            placeholderTextColor="#919191"
            style={styles.input}
            onChangeText={setCompanyfield}
            value={companyfield}
          />
          <View style={{
              ...styles.input,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <SelectPicker
              placeholderStyle={{color: '#999999'}}
              style={{right: wp('1%')}}
              placeholder="Facturación Anual Estimada"
              onSelectedStyle={{color: '#999999'}}
              onValueChange={value => {
                // Do anything you want with the value.
                // For example, save in state.
                setAnualestim(value);
              }}
              selected={anualestim}>
              {Object.values(option_estim).map((val, index) => (
                <SelectPicker.Item label={val} value={val} key={index} />
              ))}
            </SelectPicker>
            <AntDesign
              style={{position: 'absolute', right: 10}}
              name="caretdown"
              color="#919191"
              size={14}
            />
          </View>
          <View style={{
              ...styles.input,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <SelectPicker
              placeholderStyle={{color: '#999999'}}
              style={{right: wp('1%')}}
              placeholder="Tamaño empresa"
              onSelectedStyle={{color: '#999999'}}
              onValueChange={value => {
                // Do anything you want with the value.
                // For example, save in state.
                setSize(value);
              }}
              selected={size}>
              {Object.values(option_size).map((val, index) => (
                <SelectPicker.Item label={val} value={val} key={index} />
              ))}
            </SelectPicker>
            <AntDesign
              style={{position: 'absolute', right: 10}}
              name="caretdown"
              color="#919191"
              size={14}
            />
          </View>
          <View style={{
              ...styles.input,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <SelectPicker
              placeholderStyle={{color: '#999999'}}
              style={{right: wp('1%')}}
              placeholder="Origen de los fondos"
              onSelectedStyle={{color: '#999999'}}
              onValueChange={value => {
                // Do anything you want with the value.
                // For example, save in state.
                setOrigin(value);
              }}
              selected={size}>
              {Object.values(option_origin).map((val, index) => (
                <SelectPicker.Item label={val} value={val} key={index} />
              ))}
            </SelectPicker>
            <AntDesign
              style={{position: 'absolute', right: 10}}
              name="caretdown"
              color="#919191"
              size={14}
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.footerButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('EmpresaVerficationMenuScreen')}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#119438', '#1A9B36', '#1B9D36']}
            style={styles.continueButton}>
            <View
              style={{
                width: 70,
                height: 40,
                right: -5,
                bottom: 15,
                transform: [{scaleX: 2}],
                overflow: 'hidden',
                position: 'absolute',
                borderRadius: 80,
                backgroundColor: '#198352',
              }}
            />
            <Text style={styles.buttonText}>Continuar</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
    backgroundColor: '#141A28',
  },

  header: {
    width: wp('100%'),
    height: hp('14%'),
    backgroundColor: '#18222E',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    alignItems: 'center',
  },

  headerText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
    alignSelf: 'center',
    textAlign: 'center',
  },

  verifyText: {
    color: '#919191',
    fontSize: 14,
    textAlign: 'center',
    marginTop: hp('1%'),
  },
  middleInputsContainer: {
    backgroundColor: '#18222E',
    height: hp('60%'),
    marginTop: hp('1%'),
  },
  input: {
    marginTop: hp('0%'),
    borderBottomWidth: 2,
    borderBottomColor: '#919191',
    width: wp('75%'),
    alignSelf: 'center',
    color: '#919191',
  },

  footerButtonContainer: {
    width: wp('100%'),
    height: hp('9%'),
    backgroundColor: '#18222E',
    position: 'absolute',
    bottom: 5,
  },
  // continueButton: {
  //   width: wp('90%'),
  //   height: 45,
  //   borderRadius: 10,
  //   backgroundColor: '#1A8D35',

  //   justifyContent: 'center',
  //   alignItems: 'center',
  //   alignSelf: 'center',
  //   marginTop: hp('1.5%'),
  //   overflow: 'hidden',
  //   borderWidth: 4,
  //   borderColor: '#919191',
  // },
  continueButton: {
    width: wp('90%'),
    height: 45,
    borderRadius: 8,
    backgroundColor: '#1A8D35',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp('1.5%'),
    overflow: 'hidden',
  },

  buttonText: {
    color: '#fff',
  },
});

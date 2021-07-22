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
const typeofDocument = ['type1', 'type2', 'type3'];
const countries = ['Pakistan', 'USA', 'UK'];
const banks = [
  'United Bank Limited',
  'Bank OF America',
  'Bank of Washington',
  'Bank of MAxico',
];
const AccountTypes = ['Personal', 'Business'];

export default function CrearBeneficiarioScreen({navigation}) {
  //inputs are in the same pattern as UI
  const [mail, setMail] = React.useState('');
  const [name, setName] = React.useState('');
  const [surname, setSurname] = React.useState('');
  const [tod, setTod] = React.useState('');
  const [docnumber, setDocnumber] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [phone, setPhone] = React.useState('');
  const [direction, setDirection] = React.useState('');
  const [bank, setBanks] = React.useState('');
  const [accountype, setAccountType] = React.useState('');
  const [accountNumber, setAccountnumber] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#18222E"
        translucent={true}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Datos de usuario</Text>
      </View>

      <View>
        <Text style={{...styles.verifyText}}>Completa tus datos</Text>
      </View>

      <View style={styles.middleInputsContainer}>
        <ScrollView>
          <TextInput
            placeholder="Correo electronico"
            placeholderTextColor="#919191"
            style={styles.input}
            onChangeText={setMail}
            value={mail}
          />

          <TextInput
            placeholder="Apellidos"
            placeholderTextColor="#919191"
            style={styles.input}
            onChangeText={setName}
            value={name}
          />

          <TextInput
            placeholder="Nombres"
            placeholderTextColor="#919191"
            style={styles.input}
            onChangeText={setSurname}
            value={surname}
          />

          <View
            style={{
              ...styles.input,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <SelectPicker
              placeholderStyle={{color: '#999999'}}
              style={{right: wp('1%')}}
              placeholder="Tipo de documento"
              onSelectedStyle={{color: '#999999'}}
              onValueChange={value => {
                // Do anything you want with the value.
                // For example, save in state.
                setTod(value);
              }}
              selected={tod}>
              {Object.values(typeofDocument).map((val, index) => (
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

          <TextInput
            keyboardType="number-pad"
            placeholder="Numero de documento de ID"
            placeholderTextColor="#919191"
            style={styles.input}
            onChangeText={setDocnumber}
            value={docnumber}
          />

          <View
            style={{
              ...styles.input,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <SelectPicker
              placeholderStyle={{color: '#999999'}}
              style={{right: wp('1%')}}
              placeholder="Pais de Origen"
              onSelectedStyle={{color: '#999999'}}
              onValueChange={value => {
                // Do anything you want with the value.
                // For example, save in state.
                setCountry(value);
              }}
              selected={country}>
              {Object.values(countries).map((val, index) => (
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

          <TextInput
            keyboardType="number-pad"
            placeholder="Telefono"
            placeholderTextColor="#919191"
            style={styles.input}
            onChangeText={setDocnumber}
            value={docnumber}
          />

          <TextInput
            placeholder="Dirección"
            placeholderTextColor="#919191"
            style={styles.input}
            onChangeText={setDirection}
            value={direction}
          />

          <TextInput
            placeholder="Número de documento"
            keyboardType="number-pad"
            placeholderTextColor="#919191"
            style={styles.input}
            onChangeText={setPhone}
            value={phone}
          />

          <View
            style={{
              ...styles.input,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <SelectPicker
              placeholderStyle={{color: '#999999'}}
              style={{right: wp('1%')}}
              placeholder="Banco"
              onSelectedStyle={{color: '#999999'}}
              onValueChange={value => {
                // Do anything you want with the value.
                // For example, save in state.
                setBanks(value);
              }}
              selected={bank}>
              {Object.values(banks).map((val, index) => (
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

          <View
            style={{
              ...styles.input,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <SelectPicker
              placeholderStyle={{color: '#999999'}}
              style={{right: wp('1%')}}
              placeholder="Tipo de cuenta "
              onSelectedStyle={{color: '#999999'}}
              onValueChange={value => {
                // Do anything you want with the value.
                // For example, save in state.
                setAccountType(value);
              }}
              selected={accountype}>
              {Object.values(AccountTypes).map((val, index) => (
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

          <TextInput
            keyboardType="number-pad"
            placeholder="Numero de cuenta"
            placeholderTextColor="#919191"
            style={{...styles.input, marginBottom: 50}}
            onChangeText={setAccountnumber}
            value={accountNumber}
          />
        </ScrollView>
      </View>

      <View style={styles.footerButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DocumentVerificationScreen')}>
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
                backgroundColor: '#1A8D35',
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
    height: hp('62%'),
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
  continueButton: {
    width: wp('90%'),
    height: 45,
    borderRadius: 10,
    backgroundColor: '#1A8D35',

    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp('1.5%'),
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#919191',
  },

  buttonText: {
    color: '#fff',
  },
});

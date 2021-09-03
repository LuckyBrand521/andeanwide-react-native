import React, {useState, useEffect, useRef} from 'react';
import {connect} from 'react-redux';
import APP from '../../../../app.json';
import axios from 'axios';
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
import {Select, CheckIcon} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';

//Pickers
import DatePicker from 'react-native-datepicker';
import SelectPicker from 'react-native-form-select-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';
import {Formik} from 'formik';
import * as yup from 'yup';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';
import PhoneInput from 'react-native-phone-number-input';
import {KeyboardAwareScrollView} from 'react-native-keyboard-aware-scroll-view';
import countryList from '../../../data/countries';
import {ThemeConsumer} from 'styled-components';
import {set} from 'react-hook-form';

const infoFormSchema = yup.object().shape({
  name: yup.string().required('This field is requried'),
  lastname: yup.string().required('This field is required'),
  dni: yup.string().required('This field is requried'),
  country_id: yup.number().required('This field is requried'),
  bank_id: yup.number().required('This field is requried'),
  phone: yup.string().required('This field is requried'),
  email: yup
    .string()
    .email('Please input valid email')
    .required('This field is requried'),
  bank_account: yup.string().required('This field is requried'),
  account_type: yup.string().required('This field is requried'),
  address: yup.string().required('This field is requried'),
  document_type: yup.string().required('This field is requried'),
});

let initial_form_data = {
  name: '',
  lastname: '',
  dni: '',
  country_id: 0,
  bank_id: 0,
  phone: '',
  email: '',
  bank_account: '',
  account_type: '',
  address: '',
  document_type: '',
  type: '',
};
const types = [
  {name: 'personal', label: 'Persona Natural'},
  {name: 'legal', label: 'Persona Juridica'},
];
const accountTypes = [
  {name: 'S', label: 'Ahorros'},
  {name: 'C', label: 'Corriente'},
  {name: 'V', label: 'Vista'},
];
const dniOptions = [
  {name: 'DNI', label: 'DNI'},
  {name: 'RUC', label: 'RUC'},
  {name: 'Carnet Extranjeria', label: 'Carnet Extranjeria'},
  {name: 'PASS', label: 'Pasaporte'},
];

export default function CrearBeneficiarioScreen({route, navigation}) {
  const {isNew, userinfo, token, user_id} = route.params;
  const [isLoading, setLoading] = useState(false);
  const [country, setCountry] = useState(userinfo ? userinfo.country_id : 0);
  const [banks, setBanks] = useState([]);
  const [bankListState, setBankListState] = useState([]);
  const phoneInput = useRef();
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');

  useEffect(() => {
    if (country > 0) {
      setBankListState([]);
      let bankList = [];
      axios
        .get(APP.APP_URL + `api/countries/${country}/banks`, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.value}`,
          },
        })
        .then(res => {
          setBanks(res.data.data);
          let temp = res.data.data;
          temp.map(item => {
            bankList.push(
              <SelectPicker.Item
                label={item.name}
                value={item.id}
                key={item.id}
              />,
            );
          });
          setBankListState(bankList);
        })
        .catch(err => {
          console.log('err----------------------', err);
        });
    }
  }, [country]);
  //inputs are in the same pattern as UI
  //submits the form with new beneficiary insertion
  const formSubmit = values => {
    setLoading(true);
    axios
      .post(APP.APP_URL + 'api/recipients', values, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}`,
        },
      })
      .then(res => {
        setLoading(false);
        Toast.show('¡Creado con éxito!', Toast.LONG);
        navigation.navigate('BeneficiariosScreen', {ordering: false});
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        Toast.show('Ocurrió un error, Try again!', Toast.LONG);
      });
  };

  //deletes the current beneficiary
  const deleteUser = () => {
    axios
      .delete(
        APP.APP_URL + `api/recipients/${user_id}`,
        {},
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.value}`,
          },
        },
      )
      .then(res => {
        Toast.show('Eliminado con éxito!', Toast.LONG);
        navigation.navigate('BeneficiariosScreen');
      })
      .catch(err => {
        console.log(err);
        Toast.show('Ocurrió un error!', Toast.LONG);
      });
  };

  //updates detail data of a recipient
  const updateUser = values => {
    axios
      .put(APP.APP_URL + `api/recipients/${user_id}`, values, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}`,
        },
      })
      .then(res => {
        Toast.show('Actualizado exitosamente', Toast.LONG);
        navigation.goBack();
      })
      .catch(err => {
        Toast.show('Ocurrió un error!', Toast.LONG);
      });
  };

  if (isLoading || bankListState.length === 0) {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner
          visible={isLoading}
          textContent={'Envío de datos...'}
          textStyle={{color: '#fff'}}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Formik
        validationSchema={infoFormSchema}
        initialValues={!userinfo ? initial_form_data : userinfo}
        onSubmit={values => {
          user_id > 0 ? updateUser(values) : formSubmit(values);
        }}>
        {({
          handleChange,
          handleBlur,
          handleSubmit,
          values,
          errors,
          isValid,
        }) => (
          <>
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
              {!isValid && (
                <Text style={{fontSize: 14, color: 'red', textAlign: 'center'}}>
                  Por favor complete el formulario correctamente
                </Text>
              )}
            </View>

            <View style={styles.middleInputsContainer}>
              <KeyboardAwareScrollView>
                <ScrollView>
                  <View
                    style={{
                      ...styles.input,
                      alignItems: 'center',
                      flexDirection: 'row',
                    }}>
                    <SelectPicker
                      placeholderStyle={{color: '#999999'}}
                      style={{right: wp('1%')}}
                      placeholder="Tipo de Persona"
                      onSelectedStyle={{color: '#999999'}}
                      onValueChange={value => {
                        // Do anything you want with the value.
                        // For example, save in state.
                        values.type = value;
                      }}
                      doneButtonText="Hecho"
                      selected={values.type}>
                      {Object.values(types).map((item, index) => (
                        <SelectPicker.Item
                          label={item.label}
                          value={item.name}
                          key={index}
                          id={index}
                        />
                      ))}
                    </SelectPicker>
                    <AntDesign
                      style={{position: 'absolute', right: 10}}
                      name="caretdown"
                      color="#919191"
                      size={14}
                    />
                  </View>
                  <View>
                    <Select
                      // mode="dropdown"
                      style={styles.countryPicker}
                      minWidth={wp('75%')}
                      paddingLeft={1}
                      borderWidth="0"
                      borderBottomWidth={2}
                      borderRadius="0"
                      borderColor="#919191"
                      alignSelf="center"
                      placeholder="País"
                      selectedValue={values.country_id}
                      onValueChange={id => {
                        setCountry(id);
                        values.country_id = id;
                      }}
                      _selectedItem={{
                        bg: 'cyan.600',
                        endIcon: <CheckIcon size={4} />,
                      }}>
                      {Object.values(countryList).map((item, index) => {
                        return (
                          <Select.Item label={item.label} value={item.value} />
                        );
                      })}
                    </Select>
                    <AntDesign
                      style={{
                        position: 'absolute',
                        right: '15%',
                        bottom: '40%',
                      }}
                      name="caretdown"
                      color="#919191"
                      size={14}
                    />
                  </View>
                  <TextInput
                    placeholder="Nombres"
                    name="name"
                    placeholderTextColor="#919191"
                    style={styles.input}
                    onChangeText={handleChange('name')}
                    onBlur={handleBlur('name')}
                    value={values.name}
                  />
                  <TextInput
                    placeholder="Apellidos"
                    name="lastname"
                    placeholderTextColor="#919191"
                    style={styles.input}
                    onChangeText={handleChange('lastname')}
                    onBlur={handleBlur('lastname')}
                    value={values.lastname}
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
                      placeholder="Tipo de Documento"
                      onSelectedStyle={{color: '#999999'}}
                      onValueChange={res => {
                        values.document_type = res;
                      }}
                      onBlur={handleBlur('document_type')}
                      doneButtonText="Hecho"
                      selected={
                        values.document_type ? values.document_type : null
                      }>
                      <SelectPicker.Item label="DNI" value="DNI" />
                      <SelectPicker.Item label="RUC" value="RUC" />
                      <SelectPicker.Item
                        label="Carnet Extranjeria"
                        value="Carnet Extranjeria"
                      />
                      <SelectPicker.Item label="Pasaporte" value="PASS" />
                      {/* {Object.values(dniOptions).map((item, index) => (
                      <SelectPicker.Item
                        label={item.label}
                        value={item.value}
                        key={index}
                      />
                    ))} */}
                    </SelectPicker>
                    <AntDesign
                      style={{position: 'absolute', right: 10}}
                      name="caretdown"
                      color="#919191"
                      size={14}
                    />
                  </View>
                  <TextInput
                    placeholder="Documento de Identidad"
                    name="dni"
                    keyboardType="number-pad"
                    placeholderTextColor="#919191"
                    style={styles.input}
                    onChangeText={handleChange('dni')}
                    onBlur={handleBlur('dni')}
                    value={values.dni}
                  />
                  <TextInput
                    placeholder="Teléfono"
                    name="phone"
                    keyboardType={
                      Platform.OS === 'android' ? 'phone-pad' : 'phone-pad'
                    }
                    placeholderTextColor="#919191"
                    style={styles.input}
                    onChangeText={handleChange('phone')}
                    onBlur={handleBlur('phone')}
                    value={values.phone}
                  />
                  {/* <PhoneInput
                  ref={phoneInput}
                  defaultValue={values.phone}
                  // containerStyle={{
                  //   ...styles.input,
                  //   height: 50,
                  //   alignSelf: 'center',
                  //   backgroundColor: 'transparent',
                  // }}
                  // textContainerStyle={{
                  //   backgroundColor: 'transparent',
                  //   color: '#919191',
                  // }}
                  // textInputStyle={{
                  //   backgroundColor: 'red',
                  //   textColor: '#919191',
                  // }}
                  // codeTextStyle={{color: '#919191'}}
                  // countryPickerButtonStyle={{color: '#999999'}}
                  defaultCode="CL"
                  value={values.phone}
                  // onChangeText={handleChange('phone')}
                  onChangeFormattedText={text => {
                    handleChange('phone');
                    console.log(text);
                  }}
                  withDarkTheme
                  withShadow
                /> */}
                  <TextInput
                    placeholder="Email"
                    name="email"
                    placeholderTextColor="#919191"
                    style={styles.input}
                    onChangeText={handleChange('email')}
                    onBlur={handleBlur('email')}
                    value={values.email}
                  />
                  <TextInput
                    placeholder="Dirección"
                    name="address"
                    placeholderTextColor="#919191"
                    style={styles.input}
                    onChangeText={handleChange('address')}
                    onBlur={handleBlur('address')}
                    value={values.address}
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
                      onValueChange={res => {
                        values.bank_id = res ? res : 0;
                      }}
                      onBlur={handleBlur('bank_id')}
                      doneButtonText="Hecho"
                      selected={values.bank_id}>
                      {bankListState}
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
                      placeholder="Tipo de Cuenta"
                      onSelectedStyle={{color: '#999999'}}
                      onValueChange={value => {
                        // Do anything you want with the value.
                        // For example, save in state.
                        values.account_type = value;
                      }}
                      doneButtonText="Hecho"
                      selected={values.account_type}>
                      {Object.values(accountTypes).map((item, index) => (
                        <SelectPicker.Item
                          label={item.label}
                          value={item.name}
                          key={item.label}
                          keyId={item.label}
                        />
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
                    placeholder="Número de Cuenta"
                    name="bank_account"
                    placeholderTextColor="#919191"
                    style={styles.input}
                    onChangeText={handleChange('bank_account')}
                    onBlur={handleBlur('bank_account')}
                    value={values.bank_account}
                  />
                </ScrollView>
              </KeyboardAwareScrollView>
            </View>

            <View style={styles.footerButtonContainer}>
              {isNew ? (
                <>
                  <TouchableOpacity onPress={handleSubmit}>
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      colors={['#119438', '#1A9B36', '#1B9D36']}
                      style={styles.continueButton}>
                      <Text style={styles.buttonText}>Guardar</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </>
              ) : (
                <View
                  style={{
                    flexDirection: 'row',
                    justifyContent: 'space-around',
                  }}>
                  <TouchableOpacity
                    onPress={() => {
                      deleteUser();
                    }}>
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      colors={['#888888', '#888888', '#888888']}
                      style={{...styles.continueButton, width: wp('40%')}}>
                      <Text style={styles.buttonText}>Borrar</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={handleSubmit}>
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      colors={['#119438', '#1A9B36', '#1B9D36']}
                      style={{...styles.continueButton, width: wp('40%')}}>
                      <Text style={styles.buttonText}>Guardar</Text>
                    </LinearGradient>
                  </TouchableOpacity>
                </View>
              )}
            </View>
          </>
        )}
      </Formik>
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
  countryPicker: {
    color: '#919191',
    fontSize: 14,
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
    bottom: 1,
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
  },
  buttonText: {
    color: '#fff',
  },
});

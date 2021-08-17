import React, {useState, useEffect} from 'react';
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
import Toast from 'react-native-simple-toast';
import {Formik} from 'formik';
import * as yup from 'yup';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';
import countryList from '../../../data/countries';
import {ThemeConsumer} from 'styled-components';
import {set} from 'react-hook-form';

const infoFormSchema = yup.object().shape({
  name: yup.string().required('This field is requried'),
  lastname: yup.string().required('This field is required'),
  dni: yup.string().required('This field is requried'),
  country_id: yup.number().required('This field is requried'),
  bank_id: yup.number().required('This field is requried'),
  phone: yup.number().required('This field is requried'),
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
  phone: 0,
  email: '',
  bank_account: '',
  account_type: '',
  address: '',
  document_type: '',
};

const accountTypes = [
  {name: 'S', label: 'Persona Natural'},
  {name: 'C', label: 'Persona Juridica'},
];
const dniOptions = ['DNI', 'RUC', 'Carnet Extranjeria', 'Paraporte'];
export default function CrearBeneficiarioScreen({route, navigation}) {
  const {isNew, userinfo, token, user_id} = route.params;
  const [isLoading, setLoading] = useState(false);
  const [country, setCountry] = useState(userinfo ? userinfo.country_id : 0);
  const [banks, setBanks] = useState([]);
  useEffect(() => {
    axios
      .get(
        APP.APP_URL + `api/countries/${country}/banks`,
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
        setBanks(res.data.data);
      });
  }, [country]);
  //inputs are in the same pattern as UI
  //submits the form with new beneficiary insertion
  const formSubmit = values => {
    console.log(values);
    axios
      .post(APP.APP_URL + 'api/recipients', values, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}`,
        },
      })
      .then(res => {
        Toast.show('Successfully created!', Toast.LONG, ['UIAlertController']);
        navigation.navigate('BeneficiariosScreen');
      })
      .catch(err => {
        console.log(err);
        Toast.show('An error occurred, Try again!', Toast.LONG, [
          'UIAlertController',
        ]);
      });
  };

  //deletes the current beneficiary
  const deleteUser = () => {
    axios
      .del(
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
        Toast.show('Successfully deleted!', Toast.LONG, ['UIAlertController']);
        navigation.goBack();
      });
  };

  //updates detail data of a recipient
  const updateUser = values => {
    axios
      .del(APP.APP_URL + `api/recipients/${user_id}`, values, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}`,
        },
      })
      .then(res => {
        Toast.show('Successfully saved!', Toast.LONG, ['UIAlertController']);
        navigation.goBack();
      });
  };

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
                  Please fill the form correctly
                </Text>
              )}
            </View>

            <View style={styles.middleInputsContainer}>
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
                      values.account_type = value;
                    }}
                    selected={values.account_type}>
                    {Object.values(accountTypes).map((item, index) => (
                      <SelectPicker.Item
                        label={item.label}
                        value={item.name}
                        key={item.index}
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
                <View>
                  <Select
                    // mode="dropdown"
                    style={styles.countryPicker}
                    minWidth={wp('75%')}
                    paddingLeft={1}
                    borderWidth="0"
                    borderBottomWidth="2"
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
                        <Select.Item
                          label={item.label}
                          value={item.value}
                          key={item.label}
                        />
                      );
                    })}
                  </Select>
                </View>
                <TextInput
                  placeholder="Teléfono"
                  name="phone"
                  keyboardType="number-pad"
                  placeholderTextColor="#919191"
                  style={styles.input}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                />
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
                  placeholder="Address"
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
                    placeholder="Tipo de Documento"
                    onSelectedStyle={{color: '#999999'}}
                    onValueChange={res => {
                      values.document_type = res;
                    }}
                    onBlur={handleBlur('document_type')}
                    selected={values.document_type}>
                    {Object.values(dniOptions).map((item, index) => (
                      <SelectPicker.Item
                        label={item}
                        value={item}
                        key={index}
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
                      console.log(values.bank_id);
                    }}
                    onBlur={handleBlur('bank_id')}
                    selected={values.bank_id}>
                    {Object.values(banks).map(item => (
                      <SelectPicker.Item
                        label={item.name}
                        value={item.id}
                        key={item.id}
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
                  placeholder="ID de banco"
                  name="bank_account"
                  placeholderTextColor="#919191"
                  style={styles.input}
                  onChangeText={handleChange('bank_account')}
                  onBlur={handleBlur('bank_account')}
                  value={values.bank_account}
                />
              </ScrollView>
            </View>

            <View style={styles.footerButtonContainer}>
              {isNew ? (
                <>
                  <TouchableOpacity
                    onPress={() => {
                      console.log(values);
                      handleSubmit;
                    }}>
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
                  <TouchableOpacity
                    onPress={() => {
                      handleSubmit;
                    }}>
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
  },
  buttonText: {
    color: '#fff',
  },
});

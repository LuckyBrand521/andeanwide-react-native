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
import RNPickerSelect from 'react-native-picker-select';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';
import {Formik} from 'formik';
import * as yup from 'yup';
import Picker from '@gregfrench/react-native-wheel-picker';
var PickerItem = Picker.Item;
import {WheelPicker} from '../../../components/WheelPicker';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';
import countryList from '../../../data/countries';

const getCountryInfo = country_id => {
  for (let i = 0; i < countryList.length; i++) {
    if (countryList[i].id == country_id) {
      return countryList[i];
    }
  }
};

const getNamebyID = (dataList, id) => {
  for (let i = 0; i < dataList.length; i++) {
    if (dataList[i].id == id) {
      return dataList[i].name;
    }
  }
};

const getIdbyName = (dataList, name) => {
  for (let i = 0; i < dataList.length; i++) {
    if (dataList[i].name == name) {
      return dataList[i].id;
    }
  }
};

const infoFormSchema = yup.object().shape({
  name: yup.string().required('This field is requried'),
  lastname: yup.string().required('This field is required'),
  activity: yup.string(),
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
  activity: '',
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
  {id: 1, name: 'personal', label: 'Persona Natural'},
  {id: 2, name: 'legal', label: 'Persona Juridica'},
];

export default function CrearBeneficiarioScreen({route, navigation}) {
  const {isNew, userinfo, token, user_id} = route.params;
  const [isLoading, setLoading] = useState(false);
  const [country, setCountry] = useState(userinfo ? userinfo.country_id : 0);
  const [accountTypes, setAccountTypes] = useState([]);
  const [dniOptions, setDniOptions] = useState([]);
  const [banks, setBanks] = useState([]);
  const [bankListState, setBankListState] = useState([]);
  const [showActivity, setShowActivity] = useState(
    userinfo ? userinfo.type == 'legal' : false,
  );
  const phoneInput = useRef();
  const [value, setValue] = useState('');
  const [formattedValue, setFormattedValue] = useState('');

  useEffect(() => {
    if (country > 0) {
      setAccountTypes(getCountryInfo(country).accountTypes);
      setDniOptions(getCountryInfo(country).docs);
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

  if (isLoading || (!isNew && bankListState.length === 0)) {
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
            <ScrollView>
              <View style={styles.middleInputsContainer}>
                <WheelPicker
                  title="Tipo de Persona"
                  initialValue=""
                  items={types}
                  selectedValue={getIdbyName(types, values.type)}
                  onValueChange={index => {
                    values.type = getNamebyID(types, index);
                    setShowActivity(getNamebyID(types, index) == 'legal');
                  }}
                />
                <WheelPicker
                  title="Pais"
                  initialValue={0}
                  items={countryList}
                  selectedValue={values.country_id}
                  onValueChange={index => {
                    setCountry(index);
                    values.country_id = index;
                  }}
                />

                <TextInput
                  placeholder="Nombres"
                  name="name"
                  placeholderTextColor="#919191"
                  style={{...styles.input, placeholderTextColor: '#919191'}}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                <TextInput
                  placeholder="Apellidos"
                  name="lastname"
                  placeholderTextColor="#919191"
                  style={{...styles.input, placeholderTextColor: '#919191'}}
                  onChangeText={handleChange('lastname')}
                  onBlur={handleBlur('lastname')}
                  value={values.lastname}
                />
                {showActivity && (
                  <TextInput
                    placeholder="Giro o actividad de la empresa "
                    name="activity"
                    placeholderTextColor="#919191"
                    style={{...styles.input, placeholderTextColor: '#919191'}}
                    onChangeText={handleChange('activity')}
                    onBlur={handleBlur('activity')}
                    value={values.activity}
                  />
                )}
                <WheelPicker
                  title="Tipo de Documento"
                  initialValue={0}
                  items={dniOptions}
                  selectedValue={getIdbyName(dniOptions, values.document_type)}
                  onValueChange={res => {
                    values.document_type = getNamebyID(dniOptions, res);
                  }}
                />
                <TextInput
                  placeholder="Documento de Identidad"
                  name="dni"
                  keyboardType="number-pad"
                  placeholderTextColor="#919191"
                  style={{...styles.input, placeholderTextColor: '#919191'}}
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
                  style={{...styles.input, placeholderTextColor: '#919191'}}
                  onChangeText={handleChange('phone')}
                  onBlur={handleBlur('phone')}
                  value={values.phone}
                />
                <TextInput
                  placeholder="Correo electrónico"
                  name="email"
                  placeholderTextColor="#919191"
                  style={{...styles.input, placeholderTextColor: '#919191'}}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
                  value={values.email}
                />
                <TextInput
                  placeholder="Dirección"
                  name="address"
                  placeholderTextColor="#919191"
                  style={{...styles.input, placeholderTextColor: '#919191'}}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  value={values.address}
                />
                <WheelPicker
                  title="Banco"
                  initialValue={0}
                  items={banks}
                  selectedValue={values.bank_id}
                  onValueChange={res => {
                    values.bank_id = res;
                  }}
                />
                <WheelPicker
                  title="Tipo de Cuenta"
                  initialValue={0}
                  items={accountTypes}
                  selectedValue={getIdbyName(accountTypes, values.account_type)}
                  onValueChange={res => {
                    values.account_type = getNamebyID(accountTypes, res);
                  }}
                />
                <TextInput
                  placeholder="Número de Cuenta"
                  name="bank_account"
                  placeholderTextColor="#919191"
                  style={{
                    ...styles.input,
                    marginBottom: 10,
                    placeholderTextColor: '#919191',
                  }}
                  onChangeText={handleChange('bank_account')}
                  onBlur={handleBlur('bank_account')}
                  value={values.bank_account}
                  keyboardType="number-pad"
                />
              </View>
            </ScrollView>
            <View style={{height: hp('10%')}} />
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
  // countryPicker: {
  //   color: '#919191',
  //   fontSize: 14,
  // },
  verifyText: {
    color: '#919191',
    fontSize: 14,
    textAlign: 'center',
    marginTop: hp('1%'),
  },
  middleInputsContainer: {
    // backgroundColor: '#18222E',
    // height: hp('62%'),
    marginTop: hp('1%'),
  },
  input: {
    backgroundColor: '#18222E',
    marginBottom: 10,
    borderRadius: 15,
    paddingHorizontal: 15,
    paddingVertical: 15,
    width: wp('85%'),
    alignSelf: 'center',
    color: '#FFF',
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

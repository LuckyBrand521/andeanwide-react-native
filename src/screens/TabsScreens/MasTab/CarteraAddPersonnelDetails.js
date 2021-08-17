import React, {useState} from 'react';
import {connect} from 'react-redux';

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
import Toast from 'react-native-simple-toast';
import {Formik} from 'formik';
import AntDesign from 'react-native-vector-icons/AntDesign';
// import {AutocompleteDropdown} from 'react-native-autocomplete-dropdown';
// import Autocomplete from 'react-native-autocomplete-input';

//Pickers
import DatePicker from 'react-native-datepicker';
import SelectPicker from 'react-native-form-select-picker';
import Spinner from 'react-native-loading-spinner-overlay';
// import CountryPicker from 'react-native-country-picker-modal';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as yup from 'yup';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {personalAccountVerfify} from '../../../../actions';
import countryList from '../../../data/countries';

const gender_options = [
  {label: 'Masculina', val: 'M'},
  {label: 'Mujer', val: 'F'},
];
const marital_options = [
  {label: 'Casada', val: 'married'},
  {label: 'Única', val: 'single'},
];
const today = new Date();
const maxDob = new Date(new Date().setDate(today.getDate() - 365 * 18));
const infoFormSchema = yup.object().shape({
  firstname: yup.string().required('This field is requried'),
  lastname: yup.string().required('This field is required'),
  dob: yup.date().max(maxDob).required('This field is requried'),
  gender: yup.string().required('This field is requried'),
  identity_number: yup.number().required('This field is requried'),
  issuance_date: yup.date().required('This field is requried'),
  expiration_date: yup.date().min(today).required('This field is requried'),
  profession: yup.string().required('This field is requried'),
  state: yup.string().required('This field is requried'),
});
let initial_form_data = {
  firstname: '',
  lastname: '',
  dob: '',
  gender: '',
  identity_number: '',
  issuance_date: '',
  expiration_date: '',
  profession: '',
  state: '',
};
function CarteraAddPersonnelDetails({
  navigation,
  personalAccountVerfify,
  userinfo,
}) {
  if (userinfo != null) {
    initial_form_data.firstname = userinfo.identity.firstname;
    initial_form_data.lastname = userinfo.identity.lastname;
    initial_form_data.identity_number = userinfo.identity.identity_number;
    initial_form_data.dob = userinfo.identity.dob;
    initial_form_data.gender = userinfo.identity.gender;
    initial_form_data.issuance_date = userinfo.identity.issuance_date;
    initial_form_data.expiration_date = userinfo.identity.expiration_date;
    initial_form_data.profession = userinfo.identity.profession;
    initial_form_data.state = userinfo.identity.state;
  }
  const [isLoading, setLoading] = useState(false);

  /**
   * Country picker information states
   */
  const [issuanceCountryName, setIssuanceCountryName] = useState(
    userinfo ? userinfo.identity.issuance_country.id : '',
  );
  const [nationalityCountryName, setNationalityCountryName] = useState(
    userinfo ? userinfo.identity.nationality_country.id : '',
  );

  //inputs are in the same pattern as UI
  // submits the form to /api/users/identify
  const userInfoSubmit = values => {
    values = {
      ...values,
      issuance_country_id: issuanceCountryName,
      nationality_country_id: nationalityCountryName,
      // account_type: userinfo.account_type,
      document_type: 'dni',
      position: null,
      // pep_declaration: null,
      // funds_declaration: null,
      // veracity_declaration: null,
    };
    setLoading(true);
    personalAccountVerfify(values)
      .then(() => {
        navigation.navigate('ResidanceVerificationScreen');
      })
      .catch(err => {
        console.log(err);
        Toast.show('An error occured!', Toast.LONG, ['UIAlertController']);
      })
      .finally(() => {
        setLoading(false);
        navigation.navigate('ResidanceVerificationScreen');
      });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner
          visible={isLoading}
          textContent={'Submitting data...'}
          textStyle={styles.spinnerTextStyle}
        />
      </SafeAreaView>
    );
  }
  return (
    <SafeAreaView style={styles.container}>
      <Formik
        validationSchema={infoFormSchema}
        initialValues={
          !userinfo.userinfo ? initial_form_data : userinfo.userinfo
        }
        onSubmit={values => userInfoSubmit(values)}>
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
                    placeholder="País de Emision del Documento"
                    selectedValue={issuanceCountryName}
                    onValueChange={setIssuanceCountryName}
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
                    placeholder="País nacionalidadwe"
                    selectedValue={nationalityCountryName}
                    onValueChange={setNationalityCountryName}
                    _selectedItem={{
                      bg: 'cyan.600',
                      endIcon: <CheckIcon size={4} />,
                    }}>
                    {Object.values(countryList).map((item, index) => {
                      return (
                        <Select.Item
                          label={item.label}
                          value={item.value}
                          key={item.id}
                        />
                      );
                    })}
                  </Select>
                </View>
                <TextInput
                  placeholder="Nombres"
                  name="firstname"
                  placeholderTextColor="#919191"
                  style={styles.input}
                  onChangeText={handleChange('firstname')}
                  onBlur={handleBlur('firstname')}
                  value={values.firstname}
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
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <DatePicker
                    placeholder="Fecha de nacimiento"
                    name="dob"
                    placeholderTextColor="#919191"
                    onDateChange={handleChange('dob')}
                    onBlur={handleBlur('dob')}
                    date={values.dob}
                    mode="date" // The enum of date, datetime and time
                    customStyles={{
                      dateIcon: {
                        display: 'none',
                      },

                      dateText: {
                        color: '#999999',
                      },

                      dateInput: {
                        borderRadius: 10,
                        borderWidth: 0,
                        color: '#fff',
                        marginLeft: 5,
                        alignItems: 'flex-start',
                      },
                      placeholderText: {
                        color: '#999999',
                      },
                    }}
                  />
                  <AntDesign
                    style={{position: 'absolute', right: 10}}
                    name="calendar"
                    color="#919191"
                    size={14}
                  />
                </View>

                <View style={styles.input}>
                  <SelectPicker
                    placeholder="Genero"
                    name="gender"
                    value={values.gender}
                    placeholderStyle={{color: '#999999'}}
                    style={{right: wp('1%')}}
                    onSelectedStyle={{color: '#999999'}}
                    onValueChange={handleChange('gender')}
                    onBlur={handleBlur('gender')}
                    selected={values.gender}>
                    {Object.values(gender_options).map((val, index) => (
                      <SelectPicker.Item
                        label={val.label}
                        value={val.val}
                        key={index}
                      />
                    ))}
                  </SelectPicker>
                </View>

                <TextInput
                  placeholder="Número de documento"
                  name="identity_number"
                  keyboardType="number-pad"
                  placeholderTextColor="#919191"
                  style={styles.input}
                  onChangeText={handleChange('identity_number')}
                  onBlur={handleBlur('identity_number')}
                  value={values.identity_number}
                />

                <View
                  style={{
                    ...styles.input,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <DatePicker
                    placeholder="Fecha de Emisión"
                    name="issuance_date"
                    placeholderTextColor="#919191"
                    onDateChange={handleChange('issuance_date')}
                    onBlur={handleBlur('issuance_date')}
                    date={values.issuance_date}
                    mode="date" // The enum of date, datetime and time
                    style={{width: 150, color: 'white'}}
                    customStyles={{
                      dateIcon: {
                        display: 'none',
                      },
                      dateText: {
                        color: '#919191',
                      },
                      dateInput: {
                        borderRadius: 10,
                        borderWidth: 0,
                        color: '#fff',
                        marginLeft: 5,
                        alignItems: 'flex-start',
                      },
                      placeholderText: {
                        color: '#919191',
                      },
                    }}
                  />
                  <AntDesign
                    style={{position: 'absolute', right: 10}}
                    name="calendar"
                    color="#919191"
                    size={14}
                  />
                </View>

                <View
                  style={{
                    ...styles.input,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <DatePicker
                    placeholder="Fecha de Vencimiento"
                    name="expiration_date"
                    placeholderTextColor="#919191"
                    onDateChange={handleChange('expiration_date')}
                    onBlur={handleBlur('expiration_date')}
                    date={values.expiration_date}
                    mode="date" // The enum of date, datetime and time
                    style={{width: 150, color: 'white'}}
                    customStyles={{
                      dateIcon: {
                        display: 'none',
                      },

                      dateText: {
                        color: '#919191',
                      },

                      dateInput: {
                        borderRadius: 10,
                        borderWidth: 0,
                        color: '#fff',
                        marginLeft: 5,
                        alignItems: 'flex-start',
                      },
                      placeholderText: {
                        color: '#919191',
                      },
                    }}
                  />
                  <AntDesign
                    style={{position: 'absolute', right: 10}}
                    name="calendar"
                    color="#919191"
                    size={14}
                  />
                </View>

                <TextInput
                  placeholder="Profesión"
                  name="profession"
                  placeholderTextColor="#919191"
                  style={styles.input}
                  onChangeText={handleChange('profession')}
                  onBlur={handleBlur('profession')}
                  value={values.profession}
                />

                <View
                  style={{
                    ...styles.input,
                    alignItems: 'center',
                    flexDirection: 'row',
                  }}>
                  <SelectPicker
                    placeholder="Estado Civil"
                    name="state"
                    value={values.state}
                    placeholderStyle={{color: '#999999'}}
                    style={{right: wp('1%')}}
                    onSelectedStyle={{color: '#999999'}}
                    onValueChange={handleChange('state')}
                    onBlur={handleBlur('state')}
                    selected={values.state}>
                    {Object.values(marital_options).map((val, index) => (
                      <SelectPicker.Item
                        label={val.label}
                        value={val.val}
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
                <Text />
              </ScrollView>
            </View>

            <View style={styles.footerButtonContainer}>
              <TouchableOpacity
                disabled={!isValid}
                onPress={() => {
                  handleSubmit();
                }}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#119438', '#1A9B36', '#1B9D36']}
                  style={styles.continueButton}>
                  <Text style={styles.buttonText}>Continuar</Text>
                </LinearGradient>
              </TouchableOpacity>
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({
  userinfo: state.root.userinfo,
});

const mapDispatchToProps = dispatch => ({
  personalAccountVerfify: values => dispatch(personalAccountVerfify(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CarteraAddPersonnelDetails);

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

  countryPicker: {
    color: '#919191',
    fontSize: 14,
  },
  itemText: {
    fontSize: 15,
    margin: 2,
  },
  countryname: {
    color: '#919191',
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
  spinnerTextStyle: {
    color: '#FFF',
  },
  autocompleteContainer: {
    flex: 1,
    left: 0,
    position: 'absolute',
    right: 0,
    top: 0,
    zIndex: 1,
  },
});

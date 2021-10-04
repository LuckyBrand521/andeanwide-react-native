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
//import custome components
import {WheelPicker} from '../../../components/WheelPicker';
import {personalAccountVerfify} from '../../../../actions';
import countryList from '../../../data/countries';
import * as CONSTANTS from '../../../data/global-constants';

const gender_options = [
  {id: 1, label: 'Masculina', name: 'M'},
  {id: 2, label: 'Mujer', name: 'F'},
];
const marital_options = [
  {id: 1, label: 'Casada', name: 'married'},
  {id: 2, label: 'Única', name: 'single'},
];
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
  identity_number: 0,
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
  if (userinfo.identity != null) {
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
    userinfo.identity ? userinfo.identity.issuance_country.id : '',
  );
  const [nationalityCountryName, setNationalityCountryName] = useState(
    userinfo.identity ? userinfo.identity.nationality_country.id : '',
  );

  //inputs are in the same pattern as UI
  // submits the form to /api/users/identify
  const userInfoSubmit = values => {
    values = {
      ...values,
      issuance_country_id: issuanceCountryName,
      nationality_country_id: nationalityCountryName,
      document_type: 'dni',
      position: null,
    };
    setLoading(true);
    personalAccountVerfify(values)
      .then(() => {
        navigation.navigate('ResidanceVerificationScreen');
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        Toast.show('Ocurrió un error!', Toast.LONG, ['UIAlertController']);
      });
    // .finally(() => {
    //   setLoading(false);
    //   navigation.navigate('ResidanceVerificationScreen');
    // });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner
          visible={isLoading}
          textContent={'Envío de datos...'}
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
              <Text style={styles.headerText}>
                {userinfo.account_type == 'personal'
                  ? CONSTANTS.PERSONAL_INFO_VERIFICATION
                  : CONSTANTS.COMPANY_REPRESENTATIV_VERIFICATION}
              </Text>
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
                  title="País de Emision del Documento"
                  initialValue=""
                  items={countryList}
                  selectedValue={issuanceCountryName}
                  onValueChange={index => {
                    setIssuanceCountryName(index);
                  }}
                />
                <WheelPicker
                  title="País nacionalidadwe"
                  initialValue={0}
                  items={countryList}
                  selectedValue={nationalityCountryName}
                  onValueChange={index => {
                    setNationalityCountryName(index);
                  }}
                />
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
                    paddingVertical: 9,
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
                        color: '#FFF',
                      },

                      dateInput: {
                        borderRadius: 10,
                        borderWidth: 0,
                        color: '#fff',
                        marginLeft: 5,
                        alignItems: 'flex-start',
                        width: '80%',
                      },
                      placeholderText: {
                        color: '#999999',
                      },
                    }}
                  />
                  <AntDesign
                    style={{position: 'absolute', right: 14}}
                    name="calendar"
                    color="#919191"
                    size={14}
                  />
                </View>
                <WheelPicker
                  title="Genero"
                  initialValue={0}
                  items={gender_options}
                  selectedValue={getIdbyName(gender_options, values.gender)}
                  onValueChange={index => {
                    values.gender = getNamebyID(gender_options, index);
                  }}
                />

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
                    paddingVertical: 9,
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
                        color: '#FFF',
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
                    style={{position: 'absolute', right: 14}}
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
                    paddingVertical: 9,
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
                        color: '#FFF',
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
                    style={{position: 'absolute', right: 14}}
                    name="calendar"
                    color="#919191"
                    size={14}
                  />
                </View>

                <WheelPicker
                  title="Estado Civil"
                  initialValue={0}
                  items={marital_options}
                  selectedValue={getIdbyName(marital_options, values.state)}
                  onValueChange={index => {
                    values.state = getNamebyID(marital_options, index);
                    handleChange('state');
                    handleBlur('state');
                  }}
                />
                <TextInput
                  placeholder="Profesión"
                  name="profession"
                  placeholderTextColor="#919191"
                  style={styles.input}
                  onChangeText={handleChange('profession')}
                  onBlur={handleBlur('profession')}
                  value={values.profession}
                />
                <Text />
              </View>
            </ScrollView>
            <View style={{height: hp('10%')}} />
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
    backgroundColor: '#141A28',
    // height: hp('60%'),
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

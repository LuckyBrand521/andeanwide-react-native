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
import Toast from 'react-native-simple-toast';
import {Formik} from 'formik';
import AntDesign from 'react-native-vector-icons/AntDesign';

//Pickers
import DatePicker from 'react-native-datepicker';
import SelectPicker from 'react-native-form-select-picker';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as yup from 'yup';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {personalAccountVerfify} from '../../../../actions';
import CountryPicker from 'react-native-country-picker-modal';

const gender_options = ['Masculina', 'Mujer'];
const marital_options = ['Casada', 'Única'];
const infoFormSchema = yup.object().shape({
  name: yup.string().required('This field is requried'),
  issuance_country_id: yup.string().required('This field is required'),
  nationality_country_id: yup.string().required('This field is required'),
  country: yup.string().required('This field is requried'),
  birthday: yup.date().required('This field is requried'),
  gender: yup.string().required('This field is requried'),
  doc_num: yup.number().required('This field is requried'),
  issue_date: yup.date().required('This field is requried'),
  expiration_date: yup.date().required('This field is requried'),
  profession: yup.string().required('This field is requried'),
  marry_status: yup.string().required('This field is requried'),
});
const initial_from_data = {
  name: '',
  birthday: '',
  gender: '',
  doc_num: '',
  issue_date: '',
  expiration_date: '',
  profession: '',
  marry_status: '',
  issuance_country_id: 'CL',
  nationality_country_id: 'CL',
};
function CarteraAddPersonnelDetails({
  navigation,
  personalAccountVerfify,
  userinfo,
}) {
  const [isLoading, setLoading] = useState(false);

  /**
   * Country picker information states
   */
  const [issuanceCountry, setIssuanceCountry] = useState({
    countryCode: 'CL',
    name: 'Chile',
  });

  const [nationalityCountry, setNationalityCountry] = useState({
    countryCode: 'CL',
    name: 'Chile',
  });

  const onSelect1 = country => {
    setIssuanceCountry({
      countryCode: country.cca2,
      name: country.name,
    });
  };
  const onSelect2 = country => {
    setNationalityCountry({
      countryCode: country.cca2,
      flag: country.flag,
      name: country.name,
    });
  };
  //inputs are in the same pattern as UI
  // submits the form to /api/users/identify
  const userInfoSubmit = values => {
    setLoading(true);
    personalAccountVerfify(values)
      .then(() => {
        navigation.navigate('ResidanceVerificationScreen');
      })
      .catch(err => {
        console.log(err);
      })
      .finally(() => {
        setLoading(false);
      });
  };
  // const loginSubmitAPI = (values) => {
  //     setLoading(true);
  //     loginAction(values).then(() => {
  //         navigation.navigate('FaceConfigurationScreen');
  //     })
  //     .catch( (err) => {
  //         console.error(err);
  //     })
  //     .finally( () => {
  //         setLoading(false);
  //     });
  // }
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner
          visible={isLoading}
          textContent={'Logging in...'}
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
                <View style={styles.countryPicker}>
                  <Text style={styles.countryname}>
                    País de Emision del Documento
                  </Text>
                  <CountryPicker
                    {...{
                      countryCode: issuanceCountry.countryCode,
                      onSelect: onSelect1,
                    }}
                    visible="false"
                  />
                  {/* {issuanceCountry !== null && (
                    <Text style={styles.countryname}>
                      {JSON.stringify(issuanceCountry.name)}
                    </Text>
                  )} */}
                </View>
                <View style={styles.countryPicker}>
                  <Text style={styles.countryname}>Pais de Nacionalida </Text>
                  <></>
                  <CountryPicker
                    {...{
                      countryCode: nationalityCountry.countryCode,
                      onSelect: onSelect2,
                    }}
                    visible="false"
                  />
                  {/* {nationalityCountry !== null && (
                    <Text style={styles.countryname}>
                      {JSON.stringify(nationalityCountry.name)}
                    </Text>
                  )} */}
                </View>
                <TextInput
                  placeholder="Nombre y Apellidos"
                  name="name"
                  placeholderTextColor="#919191"
                  style={styles.input}
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />

                <View style={{...styles.input}}>
                  <DatePicker
                    placeholder="Fecha de nacimiento"
                    name="birthday"
                    placeholderTextColor="#919191"
                    onDateChange={handleChange('birthday')}
                    onBlur={handleBlur('birthday')}
                    date={values.birthday}
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
                      <SelectPicker.Item label={val} value={val} key={index} />
                    ))}
                  </SelectPicker>
                </View>

                <TextInput
                  placeholder="Número de documento"
                  name="doc_num"
                  keyboardType="number-pad"
                  placeholderTextColor="#919191"
                  style={styles.input}
                  onChangeText={handleChange('doc_num')}
                  onBlur={handleBlur('doc_num')}
                  value={values.doc_num}
                />

                <View
                  style={{
                    ...styles.input,
                    flexDirection: 'row',
                    alignItems: 'center',
                  }}>
                  <DatePicker
                    placeholder="Fecha de Emisión"
                    name="issue_date"
                    placeholderTextColor="#919191"
                    onDateChange={handleChange('issue_date')}
                    onBlur={handleBlur('issue_date')}
                    date={values.issue_date}
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
                    name="caretdown"
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
                    name="caretdown"
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
                    name="marry_status"
                    value={values.marry_status}
                    placeholderStyle={{color: '#999999'}}
                    style={{right: wp('1%')}}
                    onSelectedStyle={{color: '#999999'}}
                    onValueChange={handleChange('marry_status')}
                    onBlur={handleBlur('marry_status')}
                    selected={values.marry_status}>
                    {Object.values(marital_options).map((val, index) => (
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
  userinfo: state.root,
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
    width: wp('75%'),
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingLeft: 3,
    paddingBottom: 6,
    marginTop: 10,
    borderBottomWidth: 2,
    borderBottomColor: '#919191',
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
});

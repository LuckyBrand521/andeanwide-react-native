import React, {useState} from 'react';
import APP from '../../../../app.json';
import {connect} from 'react-redux';
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
import {Formik} from 'formik';
import Toast from 'react-native-simple-toast';

//Pickers
import SelectPicker from 'react-native-form-select-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import CountryPicker from 'react-native-country-picker-modal';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as yup from 'yup';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';
import countryList from '../../../data/countries';
import * as CONSTANTS from '../../../data/global-constants';

const infoFormSchema = yup.object().shape({
  name: yup.string().required('This field is requried'),
  id_number: yup.number().required('This field is requried'),
  activity: yup.string().required('This field is requried'),
  address: yup.string().required('This field is requried'),
  has_politician_history: yup.string().required('This field is requried'),
  activities: yup.string().required('This field is requried'),
  anual_revenues: yup.string().required('This field is requried'),
  company_size: yup.string().required('This field is requried'),
  fund_origins: yup.string().required('This field is requried'),
});
const initial_form_data = {
  name: '',
  id_number: 0,
  activity: '',
  address: '',
  has_politician_history: 0,
  activities: '',
  anual_revenues: '',
  company_size: '',
  fund_origins: '',
};

const option_estim = ['10,000', '20,000', '30,000', '40,000', '50,000'];
const option_size = ['Pequeño', 'Medio', 'Grande'];
const option_origin = ['utilidades retenidas', 'deuda', 'patrimonio'];

function CarteraAddEmpresa({navigation, token, userinfo}) {
  //inputs are in the same pattern as UI
  // is initial state for country name as Chile
  const [mycountry, setMyCountry] = useState('');
  const [isLoading, setLoading] = useState(false);

  const companyInfoSubmit = values => {
    values = {
      ...values,
      country_id: mycountry,
    };
    setLoading(true);
    axios
      .post(APP.APP_URL + 'api/users/company', values, {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}`,
        },
      })
      .then(res => {
        setLoading(false);
        if (res.data) {
          navigation.navigate('EmpresaVerficationMenuScreen');
          // setTimeout(function () {
          //   navigation.navigate('LoginScreen');
          // }, 2000);
        } else {
          Toast.show('Ocurrió un error!', Toast.LONG, ['UIAlertController']);
        }
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
        Toast.show('Ocurrió un error!', Toast.LONG, ['UIAlertController']);
        // To be updated
        setTimeout(function () {
          navigation.navigate('EmpresaVerficationMenuScreen');
        }, 2000);
      })
      .finally(() => {
        setLoading(false);
      });
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
        initialValues={initial_form_data}
        onSubmit={values => companyInfoSubmit(values)}>
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
              <Text style={styles.headerText}>Datos de la empresa</Text>
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
              <ScrollView>
                <View>
                  <Select
                    // mode="dropdown"
                    style={styles.countryPicker}
                    minWidth={wp('75%')}
                    borderWidth="0"
                    borderBottomWidth="2"
                    borderRadius="0"
                    borderColor="#919191"
                    alignSelf="center"
                    placeholder="País de Emision del Documento"
                    selectedValue={mycountry}
                    onValueChange={setMyCountry}
                    _selectedItem={{
                      bg: 'cyan.600',
                      endIcon: <CheckIcon size={4} />,
                    }}>
                    {Object.values(countryList).map((item, index) => {
                      return (
                        <Select.Item
                          label={item.label}
                          value={item.value}
                          key={item.index}
                        />
                      );
                    })}
                  </Select>
                </View>
                <TextInput
                  placeholder="Nombre o razón social"
                  placeholderTextColor="#919191"
                  style={styles.input}
                  name="name"
                  onChangeText={handleChange('name')}
                  onBlur={handleBlur('name')}
                  value={values.name}
                />
                <TextInput
                  placeholder="Giro o Actividad"
                  placeholderTextColor="#919191"
                  style={styles.input}
                  name="activity"
                  onChangeText={handleChange('activity')}
                  onBlur={handleBlur('activity')}
                  value={values.activity}
                />
                <TextInput
                  placeholder="Numero de identidad"
                  placeholderTextColor="#919191"
                  keyboardType="number-pad"
                  style={styles.input}
                  name="id_number"
                  onChangeText={handleChange('id_number')}
                  onBlur={handleBlur('id_number')}
                  value={values.id_number}
                />
                <TextInput
                  placeholder="Dirección"
                  placeholderTextColor="#919191"
                  style={styles.input}
                  name="address"
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  value={values.address}
                />
                <TextInput
                  placeholder="Actividades de negocio"
                  placeholderTextColor="#919191"
                  style={styles.input}
                  name="activities"
                  onChangeText={handleChange('activities')}
                  onBlur={handleBlur('activities')}
                  value={values.activities}
                />
                <View
                  style={{
                    ...styles.input,
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: 6,
                  }}>
                  <SelectPicker
                    placeholder="Facturación Anual Estimada (USD)"
                    name="anual_revenues"
                    value={values.anual_revenues}
                    placeholderStyle={{color: '#999999'}}
                    style={{right: wp('1%')}}
                    onSelectedStyle={{color: '#999999'}}
                    onValueChange={handleChange('anual_revenues')}
                    onBlur={handleBlur('anual_revenues')}
                    selected={values.anual_revenues}>
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
                <View
                  style={{
                    ...styles.input,
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: 6,
                  }}>
                  <SelectPicker
                    placeholder="Tamaño empresa"
                    name="company_size"
                    value={values.company_size}
                    placeholderStyle={{color: '#999999'}}
                    style={{right: wp('1%')}}
                    onSelectedStyle={{color: '#999999'}}
                    onValueChange={handleChange('company_size')}
                    onBlur={handleBlur('company_size')}
                    selected={values.company_size}>
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
                <View
                  style={{
                    ...styles.input,
                    alignItems: 'center',
                    flexDirection: 'row',
                    marginTop: 6,
                  }}>
                  <SelectPicker
                    placeholder="Origen de los fondos"
                    name="fund_origins"
                    value={values.fund_origins}
                    placeholderStyle={{color: '#999999'}}
                    style={{right: wp('1%')}}
                    onSelectedStyle={{color: '#999999'}}
                    onValueChange={handleChange('fund_origins')}
                    onBlur={handleBlur('fund_origins')}
                    selected={values.fund_origins}>
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
  token: state.root.token,
});

// const mapDispatchToProps = dispatch => ({
//   personalAccountVerfify: values => dispatch(personalAccountVerfify(values)),
// });

export default connect(
  mapStateToProps,
  // mapDispatchToProps,
)(CarteraAddEmpresa);

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
    height: hp('65%'),
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
  countryPicker: {
    width: wp('75%'),
    fontSize: 14,
    color: '#919191',
    alignSelf: 'center',
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    paddingLeft: 3,
    paddingBottom: 6,
    marginTop: 10,
  },
  countryname: {
    color: '#919191',
  },
  footerButtonContainer: {
    width: wp('100%'),
    height: hp('9%'),
    backgroundColor: '#18222E',
    position: 'absolute',
    bottom: 1,
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
  spinnerTextStyle: {
    color: '#FFF',
  },
});

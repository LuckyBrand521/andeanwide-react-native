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

//Pickers
import Spinner from 'react-native-loading-spinner-overlay';
import CountryPicker from 'react-native-country-picker-modal';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as yup from 'yup';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';
//import custom components
import {WheelPicker} from '../../../components/WheelPicker';
import {addressVerify} from '../../../../actions';
import countryList from '../../../data/countries';

const infoFormSchema = yup.object().shape({
  address: yup.string().required('This field is requried'),
  address_ext: yup.string().required('This field is requried'),
  state: yup.string().required('This field is requried'),
  city: yup.string().required('This field is requried'),
  cod: yup.string().required('This field is requried'),
});

const initial_form_data = {
  address: '',
  address_ext: '',
  state: '',
  city: '',
  cod: '',
};
function ResidanceVerificationScreen({navigation, addressVerify, userinfo}) {
  //inputs are in the same pattern as UI
  // is initial state for country name as Chile
  if (userinfo.address) {
    initial_form_data.address = userinfo.address.address;
    initial_form_data.address_ext = userinfo.address.address_ext;
    initial_form_data.state = userinfo.address.state;
    initial_form_data.city = userinfo.address.city;
    initial_form_data.cod = userinfo.address.cod;
  }
  const [isLoading, setLoading] = useState(false);
  const [countryName, setCountryName] = useState(
    userinfo.address ? userinfo.address.country.id : '',
  );

  const residenceInfoSubmit = values => {
    values = {
      ...values,
      country_id: countryName,
    };
    setLoading(true);
    addressVerify(values)
      .then(() => {
        if (userinfo.account_type == 'personal') {
          navigation.navigate('CarteraDocumentTypeSCreen');
        } else if (userinfo.account_type == 'corporative') {
          navigation.navigate('CarteraAddEmpresa');
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        Toast.show('Ocurrió un error!', Toast.LONG, ['UIAlertController']);
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
        onSubmit={values => residenceInfoSubmit(values)}>
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
                Datos de residencia del usuario
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
                  selectedValue={countryName}
                  onValueChange={index => {
                    setCountryName(index);
                  }}
                />
                <TextInput
                  placeholder="Estadi/Povinicia/Region"
                  placeholderTextColor="#919191"
                  name="state"
                  style={styles.input}
                  onChangeText={handleChange('state')}
                  onBlur={handleBlur('state')}
                  value={values.state}
                />
                <TextInput
                  placeholder="Cludad/Comuna"
                  placeholderTextColor="#919191"
                  name="city"
                  style={styles.input}
                  onChangeText={handleChange('city')}
                  onBlur={handleBlur('city')}
                  value={values.city}
                />
                <TextInput
                  placeholder="Codigo Postal"
                  placeholderTextColor="#919191"
                  name="cod"
                  style={styles.input}
                  onChangeText={handleChange('cod')}
                  onBlur={handleBlur('cod')}
                  value={values.cod}
                />
                <TextInput
                  placeholder="Dirección"
                  placeholderTextColor="#919191"
                  name="address"
                  style={styles.input}
                  onChangeText={handleChange('address')}
                  onBlur={handleBlur('address')}
                  value={values.address}
                />
                <TextInput
                  placeholder="Bloque/Dpto"
                  placeholderTextColor="#919191"
                  name="address_ext"
                  style={styles.input}
                  onChangeText={handleChange('address_ext')}
                  onBlur={handleBlur('address_ext')}
                  value={values.address_ext}
                />
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
  addressVerify: values => dispatch(addressVerify(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ResidanceVerificationScreen);

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
  countryPicker: {
    color: '#919191',
    fontSize: 14,
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

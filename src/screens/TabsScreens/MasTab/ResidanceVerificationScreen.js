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
  if (userinfo) {
    initial_form_data.address = userinfo.address.address;
    initial_form_data.address_ext = userinfo.address.address_ext;
    initial_form_data.state = userinfo.address.state;
    initial_form_data.city = userinfo.address.city;
    initial_form_data.cod = userinfo.address.cod;
  }
  const [isLoading, setLoading] = useState(false);
  const [countryName, setCountryName] = useState(
    userinfo ? userinfo.address.country.id : '',
  );

  const residenceInfoSubmit = values => {
    values = {
      ...values,
      country_id: countryName,
    };
    setLoading(true);
    addressVerify(values)
      .then(() => {
        navigation.navigate('CarteraDocumentTypeSCreen');
      })
      .catch(err => {
        console.log(err);
        Toast.show('Ocurrió un error!', Toast.LONG, ['UIAlertController']);
      })
      .finally(() => {
        setLoading(false);
        // navigation.navigate('CarteraDocumentTypeSCreen');
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
                    selectedValue={countryName}
                    onValueChange={setCountryName}
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

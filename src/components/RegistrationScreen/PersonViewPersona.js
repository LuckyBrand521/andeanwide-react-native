import React, {useState} from 'react';
import APP from '../../../app.json';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
} from 'react-native';
import {Formik} from 'formik';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as yup from 'yup';
// import {Button, CheckBox} from 'react-native-elements';
import CheckBox from '@react-native-community/checkbox';
import {useNavigation} from '@react-navigation/core';
import axios from 'axios';

const validationSchema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  password: yup.string().min(6).max(32).required(),
  password_confirmation: yup
    .string()
    .oneOf([yup.ref('password'), null])
    .required(),
  acceptTerms: yup.bool().oneOf([true], 'Please check this item.'),
});

const initial_values = {
  name: '',
  email: '',
  password: '',
  passwordConfirmation: '',
  acceptTerms: false,
};

export default function PersonViewPersona() {
  const navigation = useNavigation();
  // yup schema configuration for form validation

  const [isLoading, setLoading] = useState(false);
  const [checkTerms, setCheckTerms] = useState(false);
  const registerSubmitAPI = values => {
    setLoading(true);
    if (values.acceptTerms) {
      axios
        .post(APP.APP_URL + 'api/users/register', values)
        .then(res => {
          setLoading(false);
          const message = res.data.message;
          console.log(res.data);
          Toast.show(
            'Registro completado. Por favor revise su bandeja de entrada y confírmelo.',
            Toast.LONG,
            ['UIAlertController'],
          );
          setTimeout(function () {
            navigation.navigate('SignupCompleted');
          }, 3000);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
          Toast.show('No permite crear cuenta nueva!', Toast.LONG, [
            'UIAlertController',
          ]);
        });
    }
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
      <Text
        style={{
          color: 'tomato',
          fontSize: 18,
          textAlign: 'center',
          marginTop: 10,
        }}
      />

      <View>
        <Formik
          validationSchema={validationSchema}
          initialValues={initial_values}
          onSubmit={values => {
            registerSubmitAPI(values);
          }}>
          {({
            handleChange,
            handleBlur,
            handleSubmit,
            setFieldValue,
            values,
            errors,
            isValid,
          }) => (
            <>
              {!isValid && (
                <Text style={{fontSize: 14, color: 'red', textAlign: 'center'}}>
                  Por favor complete el formulario correctamente
                </Text>
              )}
              <TextInput
                placeholder="Username"
                placeholderTextColor="#919191"
                onChangeText={handleChange('name')}
                onBlur={handleBlur('name')}
                style={styles.input}
                key="name"
                value={values.name}
              />
              {errors.name && (
                <Text
                  style={{
                    fontSize: 14,
                    color: 'red',
                    width: wp('65%'),
                    alignSelf: 'center',
                  }}>
                  {errors.name}
                </Text>
              )}
              <TextInput
                placeholder="Email"
                keyboardType="email-address"
                placeholderTextColor="#919191"
                onChangeText={handleChange('email')}
                onBlur={handleBlur('email')}
                style={styles.input}
                key="email"
                value={values.email}
              />
              {errors.email && (
                <Text
                  style={{
                    fontSize: 14,
                    color: 'red',
                    width: wp('65%'),
                    alignSelf: 'center',
                  }}>
                  {errors.email}
                </Text>
              )}
              <TextInput
                secureTextEntry={true}
                placeholder="Contraseña"
                placeholderTextColor="#919191"
                onChangeText={handleChange('password')}
                onBlur={handleBlur('password')}
                style={styles.input}
                key="password"
                value={values.password}
              />
              {errors.password && (
                <Text
                  style={{
                    fontSize: 14,
                    color: 'red',
                    width: wp('65%'),
                    alignSelf: 'center',
                  }}>
                  {errors.password}
                </Text>
              )}
              <TextInput
                secureTextEntry={true}
                placeholder="Contraseña confirmada"
                placeholderTextColor="#919191"
                style={styles.input}
                onChangeText={handleChange('password_confirmation')}
                onBlue={handleBlur('password_confirmation')}
                key="password_confirmation"
                value={values.password_confirmation}
              />

              <View style={styles.termsContainer}>
                <CheckBox
                  tintColor="#aaaaaa"
                  onFillColor="#09A04E"
                  // onPress={handleChange('acceptTerms')}
                  onBlur={handleBlur('acceptTerms')}
                  tintColors
                  disabled={false}
                  key="acceptTerms"
                  value={checkTerms}
                  onValueChange={value => {
                    setCheckTerms(value);
                    // values.acceptTerms = value;
                    setFieldValue('acceptTerms', value);
                  }}
                />
                <View>
                  <Text style={styles.acceptTerms}>
                    {/* <Text
                      style={{fontSize: 14, color: 'red', alignSelf: 'center'}}>
                      *{' '}
                    </Text> */}
                    Acepto los terminos y condiciones{'\n'}
                    de Andean Wide
                  </Text>
                </View>
              </View>
              <View>
                {/* {!checkTerms &&
									<Text style={{ fontSize: 14, color: 'red', width: wp('65%'), alignSelf: 'center' }}>*</Text>
								} */}
              </View>
              <View>
                <TouchableOpacity
                  disabled={!isValid}
                  onPress={() => {
                    handleSubmit();
                  }}
                  style={{
                    ...styles.buttonContainer,
                  }}>
                  <Text style={styles.buttonText}>Registro</Text>
                </TouchableOpacity>

                <TouchableOpacity
                  onPress={() => navigation.navigate('LoginScreen')}
                  style={{
                    ...styles.buttonContainer,
                  }}>
                  <Text style={styles.buttonText}>Cancelar</Text>
                </TouchableOpacity>
              </View>
            </>
          )}
        </Formik>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {},
  input: {
    marginTop: hp('0.2%'),
    borderBottomWidth: 2,
    borderBottomColor: '#919191',
    width: wp('65%'),
    alignSelf: 'center',
    color: '#919191',
  },

  acceptTerms: {
    color: '#919191',
    textAlign: 'center',
  },

  termsContainer: {
    flexDirection: 'row',

    alignSelf: 'center',
    marginTop: hp('2%'),
  },

  buttonContainer: {
    width: wp('45%'),
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#474B52',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp('2%'),
  },

  buttonText: {
    color: '#fff',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

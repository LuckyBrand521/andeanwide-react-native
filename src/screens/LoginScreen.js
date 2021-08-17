import React, {useState} from 'react';
import {connect} from 'react-redux';
import APP from '../../app.json';
import {Alert} from 'react-native';
import {Formik} from 'formik';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  Image,
  StatusBar,
  Platform,
  Button,
} from 'react-native';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as yup from 'yup';

import {loginAction, getMyInfo, getOrderHistory} from '../../actions';

const loginFormSchema = yup.object().shape({
  email: yup
    .string()
    .email('Please input valid email')
    .required('Email address is requried'),
  password: yup
    .string()
    .min(6, ({min}) => `Password must be at least ${min} characters`)
    .max(32)
    .required('Password is required'),
});

function LoginScreen({
  navigation,
  loginAction,
  getMyInfo,
  getOrderHistory,
  token,
}) {
  const [isLoading, setLoading] = useState(false);
  const loginSubmitAPI = values => {
    setLoading(true);
    loginAction(values)
      .then(() => {
        //navigation.navigate('FaceConfigurationScreen');
        getMyInfo()
          .then(() => {
            getOrderHistory()
              .then(() => {
                setLoading(false);
                Toast.show('Welcome!', Toast.LONG, ['UIAlertController']);
                navigation.navigate('tabs');
              })
              .catch(err => {
                setLoading(false);
                Toast.show('An error occured!', Toast.LONG, [
                  'UIAlertController',
                ]);
              });
          })
          .catch(err => {
            setLoading(false);
            Toast.show('An error occured!', Toast.LONG, ['UIAlertController']);
          })
          .finally(() => {
            // setLoading(false);
          });
      })
      .catch(err => {
        setLoading(false);
        Toast.show('An error occured!', Toast.LONG, ['UIAlertController']);
      })
      .finally(() => {
        // setLoading(false);
      });
  };

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
      <View style={styles.contentContainer}>
        <Image style={styles.topLogo} source={require('../images/logo.png')} />
        <Text />
        {/* <Text style={{color: 'tomato', fontSize: 18, textAlign: 'center'}}>
            {emailerror}
            </Text> */}

        <View style={styles.loginContainer}>
          <Formik
            validationSchema={loginFormSchema}
            initialValues={{email: '', password: ''}}
            onSubmit={values => loginSubmitAPI(values)}>
            {({
              handleChange,
              handleBlur,
              handleSubmit,
              values,
              errors,
              isValid,
            }) => (
              <>
                <TextInput
                  placeholder="Email"
                  name="email"
                  keyboardType="email-address"
                  placeholderTextColor="#919191"
                  style={styles.input}
                  onChangeText={handleChange('email')}
                  onBlur={handleBlur('email')}
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
                  style={styles.input}
                  onChangeText={handleChange('password')}
                  onBlur={handleBlur('password')}
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
                <View style={styles.buttonsContainer}>
                  <TouchableOpacity
                    disabled={!isValid}
                    onPress={handleSubmit}
                    style={{
                      ...styles.buttonContainer,
                    }}>
                    <Text style={styles.buttonText}> Iniciar Sesión </Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate('ForgotPasswordScreen')}
                    style={{
                      ...styles.buttonContainer,
                    }}>
                    <Text style={styles.buttonText}>Olvidé mi contraseña</Text>
                  </TouchableOpacity>

                  <TouchableOpacity
                    onPress={() => navigation.navigate('RegistrationScreen')}
                    style={{
                      ...styles.buttonContainer,
                    }}>
                    <Text style={styles.buttonText}>Registro</Text>
                  </TouchableOpacity>
                </View>
              </>
            )}
          </Formik>
        </View>
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({
  token: state.root,
});

const mapDispatchToProps = dispatch => ({
  loginAction: values => dispatch(loginAction(values)),
  getMyInfo: () => dispatch(getMyInfo()),
  getOrderHistory: () => dispatch(getOrderHistory()),
});

export default connect(mapStateToProps, mapDispatchToProps)(LoginScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131925',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },
  input: {
    marginTop: hp('2.2%'),
    borderBottomWidth: 2,
    borderBottomColor: '#919191',
    width: wp('65%'),
    alignSelf: 'center',
    color: '#919191',
    fontSize: 16,
  },

  submitButton: {
    width: wp('45%'),
  },

  buttonContainer: {
    width: wp('45%'),
    height: 45,
    borderRadius: 10,
    justifyContent: 'center',
    backgroundColor: '#474B52',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp('2.5%'),
  },

  buttonText: {
    color: '#fff',
  },
  topLogo: {
    width: 260,
    height: 50,
    alignSelf: 'center',
  },
  contentContainer: {
    marginTop: hp('12%'),
  },

  buttonsContainer: {
    marginTop: hp('2%'),
  },

  spinnerTextStyle: {
    color: '#FFF',
  },
});

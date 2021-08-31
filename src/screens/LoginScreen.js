import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import APP from '../../app.json';
import {Alert} from 'react-native';
import axios from 'axios';
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
import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as yup from 'yup';

import {
  loginAction,
  getMyInfo,
  getOrderHistory,
  removeUserToken,
} from '../../actions';

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
  removeUserToken,
  token,
}) {
  const [isLoading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const loginSubmitAPI = values => {
    setLoading(true);
    loginAction(values)
      .then(() => {
        //navigation.navigate('FaceConfigurationScreen');
        getMyInfo()
          .then(userinfo => {
            getOrderHistory()
              .then(() => {
                setLoading(false);
                Toast.show('Welcome!', Toast.LONG);
                if (userinfo.email_verified_at != null) {
                  navigation.navigate('tabs', {screen: 'BalanceScreen'});
                } else {
                  setModalVisible(true);
                }
              })
              .catch(err => {
                setLoading(false);
                Toast.show('Ocurrió un error!', Toast.LONG, [
                  'UIAlertController',
                ]);
              });
          })
          .catch(err => {
            setLoading(false);
            Toast.show('Ocurrió un error!', Toast.LONG);
          })
          .finally(() => {
            // setLoading(false);
          });
      })
      .catch(err => {
        setLoading(false);
        Toast.show('Ocurrió un error!', Toast.loginFormSchema);
      })
      .finally(() => {
        // setLoading(false);
      });
  };

  const sendEmailVerification = () => {
    setLoading(true);
    axios
      .post(
        APP.APP_URL + 'api/email/verification-notification',
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
        setLoading(false);
        if (res.data.message) {
          Toast.show(res.data.message, Toast.LONG);
        }
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
        Toast.show('Ocurrió un error!', Toast.LONG);
      });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner
          visible={isLoading}
          textContent={'Iniciando sesión...'}
          textStyle={styles.spinnerTextStyle}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modal_container}>
          <Icon
            name="bullhorn"
            style={{
              textAlign: 'center',
            }}
            size={40}
            color="#fff"
          />
          <Text style={styles.modal_header}>
            TU CUENTA DE CORREO NO HA SIDO VERIFICADA
          </Text>
          <Text style={{color: '#999999', paddingHorizontal: 10}}>
            Un correo de confirmación fue enviado con el link de verificación de
            correo electrónico a la cuenta que has registrado en andenwide.com .
            Haz clic en el botón “Verificar Cuenta”, para poder acceder a
            nuestros servicios. Si no has recibido el correo con el link, puedes
            solicitar haciendo clic en el botón "Solicitar Link de
            Verificación".
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'space-between',
              marginTop: 10,
              alignItems: 'center',
            }}>
            <Text
              style={{marginRight: 20, color: 'white', fontSize: 16}}
              onPress={toggleModal}>
              SALIR
            </Text>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: '#10D234',
                borderRadius: 5,
                paddingVertical: 8,
                paddingHorizontal: 12,
              }}
              onPress={sendEmailVerification}>
              <Text style={{color: '#BBB', fontSize: 13}}>
                Solicitar Link de Verificación
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.contentContainer}>
        <Image style={styles.topLogo} source={require('../images/logo.png')} />
        <Text />
        {/* <Text style={{color: 'tomato', fontSize: 18, textAlign: 'center'}}>
            {emailerror}
            </Text> */}

        <View style={styles.loginContainer}>
          <Formik
            validationSchema={loginFormSchema}
            initialValues={{
              email: '',
              password: '',
            }}
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
  token: state.root.token,
});

const mapDispatchToProps = dispatch => ({
  loginAction: values => dispatch(loginAction(values)),
  getMyInfo: () => dispatch(getMyInfo()),
  getOrderHistory: () => dispatch(getOrderHistory()),
  removeUserToken: () => dispatch(removeUserToken()),
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
  modal_container: {
    backgroundColor: '#1a2138',
    height: 'auto',
    borderRadius: 10,
    borderWidth: 0,
    paddingTop: 10,
    paddingBottom: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_header: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
    alignSelf: 'center',
  },
});

import React, {useState, useRef} from 'react';
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
  TouchableHighlight,
  ImageBackground,
} from 'react-native';
import {Select, CheckIcon, TextArea, Stack} from 'native-base';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {Formik} from 'formik';
import Toast from 'react-native-simple-toast';
import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from 'react-native-raw-bottom-sheet';

//Pickers
import Spinner from 'react-native-loading-spinner-overlay';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import * as yup from 'yup';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';

const infoFormSchema = yup.object().shape({
  title: yup.string().required('This field is requried'),
  description: yup.string(),
});
const initial_form_data = {
  file: '',
  description: '',
};

function EmpresaDocumentUploadScreen({navigation, token}) {
  const sheet = useRef();
  const [isLoading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const [passportImage, setPassportImage] = useState(null);
  //For Front-Side-Image
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      setImage(image.path);
      setPassportImage(image);
      sheet.current.close();
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image => {
      console.log(image);
      console.log('Image one called');
      setImage(image.path);
      setPassportImage(image);
      sheet.current.close();
    });
  };
  // uploads image to the server based on passed in url and image
  const handleSubmit = () => {
    if (passportImage) {
      setLoading(true);
      let formData = new FormData();
      formData.append('image', {
        name: passportImage.path.split('/').pop(),
        type: passportImage.mime,
        uri:
          Platform.OS === 'android'
            ? passportImage.path
            : passportImage.path.replace('file://', ''),
      });
      axios
        .post(APP.APP_URL + 'api/users/identity/attach-front-image', formData, {
          headers: {'Content-type': 'multipart/form-data'},
        })
        .then(response => {
          setLoading(false);
          Toast.show('Successfully uploaded!', Toast.LONG, [
            'UIAlertController',
          ]);
          navigation.navigate('AfidavetVerificationScreen');
        })
        .catch(error => {
          setLoading(false);
          Toast.show('Ocurrió un error while uploading!', Toast.LONG, [
            'UIAlertController',
          ]);
          console.log(error);
          // To be removed after completion
          navigation.navigate('AfidavetVerificationScreen');
        });
    } else {
      Toast.show('Please upload the image!', Toast.LONG, ['UIAlertController']);
    }
  };
  const companyInfoSubmit = values => {
    values = {
      ...values,
      country_id: mycountry,
    };
    console.log(token.value);
    console.log(values);
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
      <RBSheet
        ref={sheet}
        height={350}
        closeOnDragDown={true}
        closeOnPressMask={false}
        customStyles={{
          wrapper: {},
          draggableIcon: {
            backgroundColor: '#000',
          },
        }}>
        <View style={styles.panel}>
          <View style={{alignItems: 'center'}}>
            <Text style={styles.panelTitle}>Upload Photo</Text>
            <Text style={styles.panelSubtitle}>
              Choose Your Profile Picture
            </Text>
          </View>
          <TouchableHighlight
            style={styles.panelButton}
            onPress={takePhotoFromCamera}>
            <Text style={styles.panelButtonTitle}>Take Photo</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.panelButton}
            onPress={choosePhotoFromLibrary}>
            <Text style={styles.panelButtonTitle}>Choose From Library</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.panelButton}
            onPress={() => sheet.current.close()}>
            <Text style={styles.panelButtonTitle}>Cancel</Text>
          </TouchableHighlight>
        </View>
      </RBSheet>
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
              <Text style={styles.headerText}>Verificar Empresa</Text>
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
              <TextInput
                placeholder="Título"
                placeholderTextColor="#919191"
                style={styles.input}
                name="title"
                onChangeText={handleChange('title')}
                onBlur={handleBlur('title')}
                value={values.name}
              />
              <Stack w="90%">
                <TextArea
                  numberOfLines={5}
                  placeholder="Text Area Placeholder"
                  style={styles.description}
                  value={values.description}
                  name="description"
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                />
              </Stack>
            </View>
            <View>
              <TouchableOpacity onPress={() => sheet.current.open()}>
                {image === '' ? (
                  <View style={styles.imageContainer}>
                    <LinearGradient
                      start={{x: 0, y: 0}}
                      end={{x: 1, y: 0}}
                      colors={['#078F41', '#17DD6F']}
                      style={styles.plusCircle}>
                      <AntDesign name="plus" size={16} color="#fff" />
                    </LinearGradient>
                    <Text style={styles.cardText}>Cargar Imagen</Text>
                  </View>
                ) : (
                  <ImageBackground
                    resizeMode="cover"
                    style={{...styles.imageContainer, overflow: 'hidden'}}
                    source={{
                      uri: image,
                    }}
                  />
                )}
              </TouchableOpacity>
              <Text style={{...styles.cardText, color: '#919191'}}>
                Sube una foto o un escaneado de la foto{'\n'}
                de tu pasaporte.
              </Text>
            </View>
          </>
        )}
      </Formik>
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({
  token: state.root.token,
});

// const mapDispatchToProps = dispatch => ({
//   personalAccountVerfify: values => dispatch(personalAccountVerfify(values)),
// });

export default connect(
  mapStateToProps,
  // mapDispatchToProps,
)(EmpresaDocumentUploadScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
    backgroundColor: '#141A28',
  },
  description: {
    borderWidth: 0,
    borderRadius: 0,
    borderBottomWidth: 2,
    marginTop: hp('1%'),
    borderBottomColor: '#919191',
    width: wp('75%'),
    alignSelf: 'center',
    color: '#919191',
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
  imageContainer: {
    width: wp('70%'),
    height: wp('40%'),
    alignSelf: 'center',
    backgroundColor: '#2F3B47',
    borderRadius: 20,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: hp('1.5%'),
  },
  cardText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
  },

  plusCircle: {
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },
  panelHeader: {
    alignItems: 'center',
  },
  panelHandle: {
    width: 40,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#00000040',
    marginBottom: 10,
  },
  panelTitle: {
    fontSize: 27,
    height: 35,
  },
  panelSubtitle: {
    fontSize: 14,
    color: 'gray',
    height: 30,
    marginBottom: 10,
  },
  panelButton: {
    padding: 13,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginVertical: 7,
  },
  panelButtonTitle: {
    fontSize: 17,
    fontWeight: 'bold',
    color: 'white',
  },
  panel: {
    padding: 20,
    backgroundColor: '#FFFFFF',
    paddingTop: 20,
    // borderTopLeftRadius: 20,
    // borderTopRightRadius: 20,
    // shadowColor: '#000000',
    // shadowOffset: {width: 0, height: 0},
    // shadowRadius: 5,
    // shadowOpacity: 0.4,
  },
});

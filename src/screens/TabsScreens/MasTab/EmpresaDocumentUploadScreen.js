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
import DocumentPicker from 'react-native-document-picker';
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

function EmpresaDocumentUploadScreen({route, navigation, token}) {
  const [singleFile, setSingleFile] = useState(null);
  const [isLoading, setLoading] = useState(false);
  const {title} = route.params;
  const initial_form_data = {
    title: title,
    description: '',
  };

  const selectFile = async () => {
    // Opening Document Picker to select one file
    try {
      const res = await DocumentPicker.pick({
        // Provide which type of file you want user to pick
        type: [DocumentPicker.types.allFiles],
        // There can me more options as well
        // DocumentPicker.types.allFiles
        // DocumentPicker.types.images
        // DocumentPicker.types.plainText
        // DocumentPicker.types.audio
        // DocumentPicker.types.pdf
      });
      // Printing the log realted to the file
      console.log('res : ' + JSON.stringify(res));
      // Setting the state to show single file attributes
      setSingleFile(res[0]);
    } catch (err) {
      setSingleFile(null);
      // Handling any exception (If any)
      if (DocumentPicker.isCancel(err)) {
        // If user canceled the document selection
        alert('Canceled');
      } else {
        // For Unknown Error
        alert('Unknown Error: ' + JSON.stringify(err));
        throw err;
      }
    }
  };

  const uploadDocument = async values => {
    // Check if any file is selected or not
    if (singleFile != null) {
      setLoading(true);
      // If file selected then create FormData
      const fileToUpload = singleFile;
      const data = new FormData();
      data.append('title', values.title);
      data.append('description', values.description);
      data.append('document', fileToUpload);
      // Please change file upload URL
      let res = await fetch(APP.APP_URL + 'api/users/company', {
        method: 'post',
        body: data,
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}`,
        },
      });
      let responseJson = await res.json();
      if (responseJson.status == 204) {
        setLoading(false);
        Toast.show('Upload Successful');
        navigation.navigate('EmpresaVerificationMenuScreen');
      }
      setLoading(false);
    } else {
      // If no file selected the show alert
      alert('Please Select File first');
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
      <Formik
        validationSchema={infoFormSchema}
        initialValues={initial_form_data}
        onSubmit={values => uploadDocument(values)}>
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
                value={values.title}
              />
              <TextInput
                style={styles.description}
                underlineColorAndroid="transparent"
                placeholder="Escriba la descripcións"
                placeholderTextColor="grey"
                numberOfLines={5}
                multiline={true}
                name="description"
                onChangeText={handleChange('description')}
                onBlur={handleBlur('description')}
                value={values.description}
              />
              {/* <Stack w="75%" style={{alignSelf: 'center', marginTop: 10}}>
                <TextArea
                  numberOfLines={5}
                  placeholder="Text Area Placeholder"
                  style={styles.description}
                  value={values.description}
                  name="description"
                  onChangeText={handleChange('description')}
                  onBlur={handleBlur('description')}
                />
              </Stack> */}
              <View>
                {singleFile != null ? (
                  <Text style={styles.textStyle}>
                    File Name: {singleFile.name ? singleFile.name : ''}
                    {'\n'}
                    Type: {singleFile.type ? singleFile.type : ''}
                    {'\n'}
                    File Size: {singleFile.size ? singleFile.size : ''}
                    {'\n'}
                    URI: {singleFile.uri ? singleFile.uri : ''}
                    {'\n'}
                  </Text>
                ) : null}
                <TouchableOpacity
                  style={styles.buttonStyle}
                  activeOpacity={0.5}
                  onPress={selectFile}>
                  <Text style={styles.buttonTextStyle}>Select File</Text>
                </TouchableOpacity>
                <Text style={{...styles.cardText, color: '#919191'}}>
                  Sube una foto o un escaneado de la foto{'\n'}
                  de tu pasaporte.
                </Text>
              </View>
            </View>
            <View style={styles.footerButtonContainer}>
              <TouchableOpacity
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
    borderBottomColor: '#919191',
    width: wp('75%'),
    color: '#919191',
    alignSelf: 'center',
    marginTop: 10,
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
    marginTop: hp('2.5%'),
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
  buttonStyle: {
    backgroundColor: '#307ecc',
    borderWidth: 0,
    color: '#FFFFFF',
    borderColor: '#307ecc',
    height: 40,
    alignItems: 'center',
    borderRadius: 30,
    marginLeft: 35,
    marginRight: 35,
    marginTop: 15,
  },
  buttonTextStyle: {
    color: '#FFFFFF',
    paddingVertical: 10,
    fontSize: 16,
  },
  textStyle: {
    backgroundColor: '#fff',
    fontSize: 15,
    marginTop: 16,
    marginLeft: 35,
    marginRight: 35,
    textAlign: 'center',
  },
});

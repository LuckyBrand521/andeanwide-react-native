import React, {useState, useRef} from 'react';
import APP from '../../../../app.json';
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

import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';

export default function PassportVerificationScreen({navigation}) {
  const sheet = useRef();
  const [image, setImage] = useState('');
  const [passportImage, setPassportImage] = useState(null);
  const [isLoading, setLoading] = useState(false);

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
          Toast.show('An error occurred while uploading!', Toast.LONG, [
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

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner
          visible={isLoading}
          textContent={'Submitting data...'}
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

      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#18222E"
        translucent={true}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Verificar identidad</Text>
      </View>

      <View>
        <View style={{...styles.verifyText}} />
      </View>

      <View style={styles.middleInputsContainer}>
        <Text
          style={{...styles.headerText, fontSize: 20, marginTop: hp('0.8%')}}>
          Pasaporte
        </Text>

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
      </View>

      <View style={styles.footerButtonContainer}>
        <TouchableOpacity onPress={handleSubmit}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#119438', '#1A9B36', '#1B9D36']}
            style={styles.continueButton}>
            <Text style={styles.buttonText}>Continuar</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

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
    height: hp('35%'),
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
  plusCircle: {
    width: 40,
    height: 40,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
  },

  cardText: {
    fontSize: 14,
    color: '#fff',
    textAlign: 'center',
    marginTop: 5,
  },

  header2: {
    backgroundColor: '#FFFFFF',
    shadowColor: '#333333',
    shadowOffset: {width: -1, height: -3},
    shadowRadius: 2,
    shadowOpacity: 0.4,
    // elevation: 5,
    paddingTop: 20,
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
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

  commandButton: {
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#FF6347',
    alignItems: 'center',
    marginTop: 10,
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
  spinnerTextStyle: {
    color: '#FFF',
  },
});

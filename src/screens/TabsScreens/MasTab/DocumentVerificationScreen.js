import React, {useState, useRef} from 'react';
import {connect} from 'react-redux';
import APP from '../../../../app.json';
import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableHighlight,
  TouchableOpacity,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import LinearGradient from 'react-native-linear-gradient';
import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from 'react-native-raw-bottom-sheet';
import {ImageBackground} from 'react-native';

function DocumentVerificationScreen({navigation, token}) {
  const sheet = useRef();
  const sheet2 = useRef();
  const [isLoading, setLoading] = useState(false);
  const [frontImage, setFrontImage] = useState(null);
  const [backImage, setBackImage] = useState(null);

  //For Front-Side-Image
  const takePhotoFromCamera = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(img => {
      setFrontImage(img);

      sheet.current.close();
    });
  };

  const choosePhotoFromLibrary = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(img => {
      setFrontImage(img);
      sheet.current.close();
    });
  };

  //For back-Side-Image
  const takePhotoFromCamera2 = () => {
    ImagePicker.openCamera({
      compressImageMaxWidth: 300,
      compressImageMaxHeight: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(img => {
      setBackImage(img);
      sheet2.current.close();
    });
  };

  const choosePhotoFromLibrary2 = () => {
    ImagePicker.openPicker({
      width: 300,
      height: 300,
      cropping: true,
      compressImageQuality: 0.7,
    }).then(image2 => {
      setBackImage(image2);
      sheet2.current.close();
    });
  };

  // uploads image to the server based on passed in url and image
  const uploadIDImage = (image, api_url) => {
    let formData = new FormData();
    formData.append('image', {
      name: image.path.split('/').pop(),
      type: image.mime,
      uri:
        Platform.OS === 'android'
          ? image.path
          : image.path.replace('file://', ''),
    });
    return new Promise((resolve, reject) => {
      axios
        .post(api_url, formData, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          // console.log(JSON.parse(JSON.stringify(response.status)));
          // Toast.show('Successfully uploaded!', Toast.LONG, ['UIAlertController']);
          resolve(response);
        })
        .catch(err => {
          console.log(err);
          // Toast.show('Image Upload Post Failed!', Toast.LONG, [
          //   'UIAlertController',
          // ]);
          reject(err);
        });
    });
  };

  const handleSubmit = () => {
    if (frontImage == null || backImage == null) {
      Toast.show('Please upload the image!', Toast.LONG, ['UIAlertController']);
    } else {
      setLoading(true);
      uploadIDImage(
        frontImage,
        APP.APP_URL + 'api/users/identity/attach-front-image',
      )
        .then(res => {
          uploadIDImage(
            backImage,
            APP.APP_URL + 'api/users/identity/attach-back-image',
          )
            .then(res2 => {
              setLoading(false);
              Toast.show('¡Cargado correctamente!', Toast.LONG, [
                'UIAlertController',
              ]);
              navigation.navigate('AfidavetVerificationScreen');
            })
            .catch(err => {
              setLoading(false);
              console.log(err);
              Toast.show('Atrás Error al cargar la imagen.', Toast.LONG, [
                'UIAlertController',
              ]);
            });
        })
        .catch(error => {
          setLoading(false);
          console.log(error);
          Toast.show('¡La publicación de subida de imagen falló!', Toast.LONG, [
            'UIAlertController',
          ]);
          // To be removed after completing project
          // navigation.navigate('AfidavetVerificationScreen');
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
            <Text style={styles.panelTitle}>Subir foto</Text>
            <Text style={styles.panelSubtitle}>
              Elige tu foto de perfil (Delantero)
            </Text>
          </View>
          <TouchableHighlight
            style={styles.panelButton}
            onPress={takePhotoFromCamera}>
            <Text style={styles.panelButtonTitle}>Tomar foto</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.panelButton}
            onPress={choosePhotoFromLibrary}>
            <Text style={styles.panelButtonTitle}>Elegir de la biblioteca</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.panelButton}
            onPress={() => sheet.current.close()}>
            <Text style={styles.panelButtonTitle}>Cancelar</Text>
          </TouchableHighlight>
        </View>
      </RBSheet>

      {/* This one is for backImage */}

      <RBSheet
        ref={sheet2}
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
            <Text style={styles.panelTitle}>Subir foto</Text>
            <Text style={styles.panelSubtitle}>
              Elige tu foto de perfil (atrás)
            </Text>
          </View>
          <TouchableHighlight
            style={styles.panelButton}
            onPress={takePhotoFromCamera2}>
            <Text style={styles.panelButtonTitle}>Tomar foto</Text>
          </TouchableHighlight>

          <TouchableHighlight
            style={styles.panelButton}
            onPress={choosePhotoFromLibrary2}>
            <Text style={styles.panelButtonTitle}>Elegir de la biblioteca</Text>
          </TouchableHighlight>
          <TouchableHighlight
            style={styles.panelButton}
            onPress={() => sheet2.current.close()}>
            <Text style={styles.panelButtonTitle}>Cancelar</Text>
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
          Documento de identidad
        </Text>

        <View>
          <TouchableOpacity onPress={() => sheet.current.open()}>
            {frontImage === null ? (
              <View style={{...styles.imageContainer}}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#078F41', '#17DD6F']}
                  style={styles.plusCircle}>
                  <AntDesign name="plus" size={16} color="#fff" />
                </LinearGradient>
                <Text style={styles.cardText}>Parte delantera</Text>
              </View>
            ) : (
              <ImageBackground
                resizeMode="cover"
                style={{...styles.imageContainer, overflow: 'hidden'}}
                source={{
                  uri: frontImage.path,
                }}
              />
            )}
          </TouchableOpacity>
          <Text style={{...styles.cardText, color: '#919191'}}>
            Sube la parte delantera de tu documento{'\n'}
            de identidad
          </Text>
        </View>

        {/* BackSide Image */}
        <View>
          <TouchableOpacity onPress={() => sheet2.current.open()}>
            {backImage === null ? (
              <View style={styles.imageContainer}>
                <LinearGradient
                  start={{x: 0, y: 0}}
                  end={{x: 1, y: 0}}
                  colors={['#078F41', '#17DD6F']}
                  style={styles.plusCircle}>
                  <AntDesign name="plus" size={16} color="#fff" />
                </LinearGradient>
                <Text style={styles.cardText}>Parte posterior</Text>
              </View>
            ) : (
              <ImageBackground
                resizeMode="cover"
                style={{...styles.imageContainer, overflow: 'hidden'}}
                source={{
                  uri: backImage.path,
                }}
              />
            )}
          </TouchableOpacity>

          <Text style={{...styles.cardText, color: '#919191'}}>
            Sube la parte posterior de tu documento{'\n'}
            de identidad
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

const mapStateToProps = state => ({
  token: state.root.token.value,
});

export default connect(mapStateToProps)(DocumentVerificationScreen);

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
  spinnerTextStyle: {
    color: '#FFF',
  },
});

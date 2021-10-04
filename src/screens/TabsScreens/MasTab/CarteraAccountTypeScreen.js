import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import {setAccountType} from '../../../../actions';

function CarteraAccountTypeScreen({navigation, setAccountType, userinfo}) {
  const [isLoading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  // if(navigation.curr)
  useEffect(() => {
    navigation.addListener('focus', () => {
      if (userinfo.veracity_declaration_at == null) {
        setModalVisible(false);
      } else {
        setModalVisible(true);
      }
    });
  }, [navigation]);
  // submits the account type to /api/users/set-account-type
  const accTypeSubmit = value => {
    const values = {account_type: value};
    setLoading(true);
    setAccountType(values)
      .then(() => {
        if (value == 'personal') {
          navigation.navigate('CarteraAddPersonnelDetails');
        } else if (value == 'corporative') {
          navigation.navigate('CarteraAddPersonnelDetails');
        }
      })
      .catch(err => {
        console.log(err);
        Toast.show('Ocurrió un error!', Toast.LONG, ['UIAlertController']);
      })
      .finally(() => {
        setLoading(false);
        // navigation.navigate('CarteraAddPersonnelDetails');
      });
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const sendEmailVerification = () => {
    setModalVisible(false);
    s;
    navigation.navigate('BalanceStack', {screen: 'BalanceScreen'});
  };
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner
          visible={isLoading}
          textContent={'Sumisión...'}
          textStyle={styles.spinnerTextStyle}
        />
      </SafeAreaView>
    );
  }

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#18222E"
        translucent={true}
      />
      <Modal isVisible={modalVisible}>
        <View style={styles.modal_container}>
          <Icon
            name="bullhorn"
            style={{
              textAlign: 'center',
            }}
            size={40}
            color="#fff"
          />
          <Text style={{...styles.modal_header, marginBottom: 10}}>
            VERIFICACIÓN DE CUENTA DE USUARIO
          </Text>
          <Text style={{color: '#999999', paddingHorizontal: 15}}>
            FELICITACIONES TUS DOCUMENTOS FUERON ENVIADOS EXITOSAMENTE. {'\n\n'}
            Tu documentación fue cargada de forma exitosa, estamos en proceso de
            verificacion de tu cuenta.
          </Text>
          <View
            style={{
              flexDirection: 'row',
              justifyContent: 'center',
              marginTop: 10,
              alignItems: 'center',
            }}>
            <TouchableOpacity
              style={{
                borderWidth: 1,
                borderColor: '#10D234',
                borderRadius: 5,
                paddingVertical: 8,
                paddingHorizontal: 12,
              }}
              onPress={sendEmailVerification}>
              <Text style={{color: '#BBB', fontSize: 14}}>ACEPTAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <Text style={styles.headerText}>Verificar Cuenta</Text>
      </View>

      <View>
        <Text style={{...styles.verifyText, marginBottom: hp('2%')}}>
          Necesitamos saber que tipo de cuenta quieres.
        </Text>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => {
            accTypeSubmit('personal');
          }}>
          <View style={styles.listContainer}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#078F41', '#17DD6F']}
              style={styles.plusCircle}>
              <AntDesign name="plus" size={16} color="#fff" />
            </LinearGradient>
            <View>
              <Text style={{...styles.headerText, ...styles.listTitle}}>
                Cuenta Personal
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity
          onPress={() => {
            accTypeSubmit('corporative');
          }}>
          <View style={styles.listContainer}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#078F41', '#17DD6F']}
              style={styles.plusCircle}>
              <AntDesign name="plus" size={16} color="#fff" />
            </LinearGradient>

            <View>
              <Text style={{...styles.headerText, ...styles.listTitle}}>
                Cuenta empresa
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({
  userinfo: state.root.userinfo,
});

const mapDispatchToProps = dispatch => ({
  setAccountType: values => dispatch(setAccountType(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CarteraAccountTypeScreen);

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
    marginTop: hp('3%'),
  },

  listContainer: {
    width: wp('100%'),
    height: hp('15%'),
    backgroundColor: '#18222E',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('10%'),
    marginTop: hp('.8%'),
  },

  plusCircle: {
    width: 25,
    height: 25,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('4%'),
  },

  listTitle: {
    fontSize: 20,
    paddingBottom: 0,
    alignSelf: 'auto',
    textAlign: 'auto',
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
  listSubtitle: {
    textAlign: 'auto',
    marginTop: 0,
    fontSize: 12,
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
  },
  modal_header: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
    alignSelf: 'center',
  },
});

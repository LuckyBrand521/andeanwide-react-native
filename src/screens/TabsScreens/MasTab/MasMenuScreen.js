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
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';
import TouchableWithIcon from '../../../components/subviews/TouchableWithIcon';

function MasMenuScreen({navigation, setAccountType, userinfo}) {
  const [isLoading, setLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [waitModalVisible, setWaitModalVisible] = useState(false);
  // if(navigation.curr)
  // useEffect(() => {
  //   navigation.addListener('focus', () => {
  //     console.log(userinfo.veracity_declaration_at);
  //     console.log(modalVisible);
  //     if (userinfo.veracity_declaration_at == 'null') {
  //       setModalVisible(false);
  //     } else {
  //       console.log('Ok');
  //       setModalVisible(true);
  //     }
  //   });
  // }, [navigation]);

  const checkVerified = () => {
    if (userinfo.veracity_declaration_at == 'null') {
      navigation.navigate('CarteraAccountTypeScreen');
    } else {
      toggleModal();
    }
  };

  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };

  const sendEmailVerification = () => {
    setModalVisible(false);
    navigation.navigate('BalanceScreen');
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#18222E"
        translucent={true}
      />
      <Modal
        isVisible={waitModalVisible}
        onBackdropPress={() => setWaitModalVisible(false)}>
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
            Próximamente, en breve, pronto
          </Text>
        </View>
      </Modal>
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
              onPress={toggleModal}>
              <Text style={{color: '#BBB', fontSize: 14}}>ACEPTAR</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>
      <View style={styles.header}>
        <Text style={styles.headerText}>Mas</Text>
      </View>

      <View>
        <TouchableWithIcon
          iconName="vcard-o"
          label="Verificar Cuenta"
          passFunction={() => {
            checkVerified();
          }}
          // passFunction={() => {
          //   console.log('==========TEST');
          // }}
        />
        <TouchableWithIcon
          iconName="credit-card"
          label="Tarjetas"
          passFunction={() => {
            setWaitModalVisible(true);
          }}
        />
        <TouchableWithIcon
          iconName="expeditedssl"
          label="Seguridad de la Cuenta"
          passFunction={() => {
            setWaitModalVisible(true);
          }}
        />
        <TouchableWithIcon
          iconName="refresh"
          label="Convertir"
          passFunction={() => {
            setWaitModalVisible(true);
          }}
        />
        <TouchableWithIcon
          iconName="money"
          label="Abrir Balance"
          passFunction={() => {
            setWaitModalVisible(true);
          }}
        />
        <TouchableWithIcon
          iconName="handshake-o"
          label="Terminos y Condiciones"
        />
        <TouchableWithIcon
          iconName="file-text-o"
          label="Politicas de Privacidad"
        />
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({
  userinfo: state.root.userinfo,
});

export default connect(mapStateToProps)(MasMenuScreen);

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

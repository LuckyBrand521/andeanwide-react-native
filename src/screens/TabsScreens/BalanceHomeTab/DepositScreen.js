import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import axios from 'axios';
import APP from '../../../../app.json';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TextInput,
  Button,
  Linking,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Modal from 'react-native-modal';
import Accordion from 'react-native-collapsible/Accordion';
import RNPickerSelect from 'react-native-picker-select';

import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import {setAccountType} from '../../../../actions';

function DepositScreen({navigation, setAccountType, userinfo, token}) {
  const [isLoading, setLoading] = useState(false);
  const [modalVisible1, setModalVisible1] = useState(false);
  const [modalVisible2, setModalVisible2] = useState(false);
  const [accounts, setAccounts] = useState([]);
  const [activeSections, setActiveSections] = useState([]);
  const [amount, setAmount] = useState(0);
  const [method, setMethod] = useState('otrospagos');
  const [error, setError] = useState(false);
  const _renderSectionTitle = section => {
    return (
      <View style={styles.content}>
        <Text> </Text>
      </View>
    );
  };

  const _renderHeader = section => {
    return (
      <View style={styles.section_header}>
        <Text style={styles.section_headerText}>{section.bank.name}</Text>
      </View>
    );
  };

  const _renderContent = section => {
    return (
      <View style={styles.section_content}>
        <Text style={{color: 'white', fontSize: 14}}>
          Titular de la Cuenta:
        </Text>
        <Text style={{color: '#AAA', fontSize: 14}}>
          {section.account_name}
        </Text>
        <Text style={{color: 'white', fontSize: 14}}>
          No. de Identificación:
        </Text>
        <Text style={{color: '#AAA', fontSize: 14}}>
          {section.document_number}
        </Text>
        <Text style={{color: 'white', fontSize: 14}}>Número de Cuenta:</Text>
        <Text style={{color: '#AAA', fontSize: 14}}>
          {section.bank_account}
        </Text>
        <Text style={{color: 'white', fontSize: 14}}>Banco:</Text>
        <Text style={{color: '#AAA', fontSize: 14}}>{section.bank.name}</Text>
        <Text style={{color: 'white', fontSize: 14}}>Tipo de Cuenta:</Text>
        <Text style={{color: '#AAA', fontSize: 14}}>
          {section.account_type}
        </Text>
        <Text style={{color: 'white', fontSize: 14}}>Correo Electrónico:</Text>
        <Text style={{color: '#AAA', fontSize: 14}}>{section.email}</Text>
      </View>
    );
  };

  const _updateSections = activeSections => {
    setActiveSections(activeSections);
  };
  // gets accounts from API after mounting components
  useEffect(() => {
    setLoading(true);
    axios
      .get(APP.APP_URL + 'api/accounts', {
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
          Authorization: `Bearer ${token.value}`,
        },
      })
      .then(res => {
        setAccounts(res.data.data);
        setLoading(false);
      })
      .catch(err => {
        console.log(err);
        setLoading(false);
      });
  }, []);
  // submits the account type to /api/users/set-account-type
  const accTypeSubmit = () => {
    const values = {payment_amount: amount, payment_method: method};
    if (amount == 0 || method == '') {
      setError(true);
    } else {
      setLoading(true);
      axios
        .post(APP.APP_URL + `api/${method}/payins`, values, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.value}`,
          },
        })
        .then(res => {
          setLoading(false);
          Toast.show('Pedido con éxito!', Toast.LONG);
          Linking.openURL(res.data[method].url[0]);
          navigation.navigate('DepositScreen');
        })
        .catch(err => {
          setLoading(false);
          console.log(err);
          Toast.show('Ocurrió un error, Try again!', Toast.LONG);
        });
    }
  };

  const toggleModal1 = () => {
    setModalVisible1(!modalVisible1);
  };
  const toggleModal2 = () => {
    setModalVisible2(!modalVisible2);
  };
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner
          visible={isLoading}
          textContent={'Recolectando datos...'}
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
      <Modal
        isVisible={modalVisible1}
        onBackdropPress={() => setModalVisible1(false)}>
        <View style={styles.modal_container}>
          <Text style={styles.modal_header}>TRANSFERENCIA BANCARIA</Text>
          <Text style={styles.modal_subheader}>
            BANCOS DISPONIBLES PARA TRANSFERIR
          </Text>
          <Accordion
            sections={accounts}
            activeSections={activeSections}
            renderSectionTitle={_renderSectionTitle}
            renderHeader={_renderHeader}
            renderContent={_renderContent}
            onChange={_updateSections}
          />
        </View>
      </Modal>

      <Modal
        isVisible={modalVisible2}
        onBackdropPress={() => setModalVisible2(false)}>
        <View style={styles.modal_container}>
          <Text style={styles.modal_header}>TARJETA CREDITO / DEBITO</Text>
          <TextInput
            placeholder="Monto"
            keyboardType="number-pad"
            placeholderTextColor="#919191"
            style={styles.input}
            onChangeText={setAmount}
            value={amount}
          />
          {/* <View style={{width: wp('75%'), alignSelf: 'center'}}>
            <RNPickerSelect
              placeholder={{
                label: 'Medio de Pago',
                value: '',
              }}
              style={{color: 'white'}}
              placeholderTextColor="#919191"
              onValueChange={value => {
                setMethod(value);
              }}
              items={[
                {label: 'Tarjeta de Debito o Crédito', value: 'otrospagos'},
              ]}
              value={method}
            />
          </View> */}
          <TouchableOpacity onPress={accTypeSubmit}>
            <LinearGradient
              start={{x: 0, y: 0}}
              end={{x: 1, y: 0}}
              colors={['#119438', '#1A9B36', '#1B9D36']}
              style={styles.continueButton}>
              <Text style={styles.buttonText}>Continuar</Text>
            </LinearGradient>
          </TouchableOpacity>
        </View>
      </Modal>

      <View style={styles.header}>
        <Text style={styles.headerText}>Añadir Fondos</Text>
      </View>

      <View>
        <Text style={{...styles.verifyText, marginBottom: hp('2%')}}>
          Elige una opción
        </Text>
      </View>

      <View>
        <TouchableOpacity onPress={toggleModal1}>
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
                Transferencia Bancaria
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={toggleModal2}>
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
                Tarjeta Credito / Debito
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
  token: state.root.token,
});

const mapDispatchToProps = dispatch => ({
  setAccountType: values => dispatch(setAccountType(values)),
});

export default connect(mapStateToProps, mapDispatchToProps)(DepositScreen);

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
    paddingTop: 10,
    paddingBottom: 15,
  },
  modal_header: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
    alignSelf: 'center',
  },
  modal_subheader: {
    alignSelf: 'center',
    marginTop: 10,
    fontSize: 15,
    color: '#919191',
  },
  section_header: {
    width: '90%',
    borderWidth: 1,
    borderColor: '#919191',
    paddingTop: 5,
    paddingBottom: 5,
    alignSelf: 'center',
    alignItems: 'center',
  },
  section_headerText: {
    color: 'white',
    fontSize: 15,
  },
  section_content: {
    alignItems: 'center',
  },
  input: {
    marginTop: hp('0%'),
    borderBottomWidth: 2,
    borderBottomColor: '#919191',
    width: wp('75%'),
    fontSize: 15,
    alignSelf: 'center',
    color: '#919191',
  },
  continueButton: {
    width: wp('75%'),
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
});

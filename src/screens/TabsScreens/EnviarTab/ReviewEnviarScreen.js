import React, {useState, useEffect} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {connect} from 'react-redux';
import APP from '../../../../app.json';
import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import SelectPicker from 'react-native-form-select-picker';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//import custom components
import TwoTextView from '../../../components/subviews/TwoTextView';
import {saveNewOrder} from '../../../../actions';

function ReviewEnviarScreen({navigation, token, new_order, saveNewOrder}) {
  const [recipientInfo, setRecipientInfo] = useState({});
  const [isSelected, setSelection] = useState(false);
  //get the data of recipient
  useEffect(() => {
    console.log(token.value);
    if (new_order.recipient_id) {
      axios
        .get(APP.APP_URL + 'api/recipients/' + new_order.recipient_id, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.value}`,
          },
        })
        .then(res => {
          setRecipientInfo(res.data.data);
        });
    }
  }, []);

  const submitOrder = () => {
    console.log(new_order);
    console.log(token.value);
    console.log(APP.APP_URL + 'api/orsers');
    if (isSelected) {
      axios
        .post(APP.APP_URL + 'api/orsers', new_order, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token.value}`,
          },
        })
        .then(res => {
          navigation.navigate('OrderRequestCompleted');
        })
        .catch(err => {
          console.log(err);
          Toast.show('Order request failed, try again!', Toast.LONG);
          // navigation.navigate('OrderRequestCompleted');
        });
    }
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#18222E"
        translucent={true}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Revisar detalles</Text>
      </View>
      <Text />
      <View style={styles.middleInputsContainer}>
        <ScrollView
          contentContainerStyle={{flexGrow: 1}}
          style={styles.scrollView}>
          <Text
            style={{...styles.headerText, fontSize: 18, marginTop: hp('0.8%')}}>
            Orden
          </Text>
          <View
            style={{
              width: wp('100%'),
              display: 'flex',
              flexDirection: 'row',
              flexWrap: 'wrap',
            }}>
            <TwoTextView
              text_gray="Monto a pagar"
              text_white={`${new_order.payment_amount} ${new_order.currency1}`}
              styles={{width: wp('50%')}}
            />
            <TwoTextView
              text_gray="Tip de Cambio"
              text_white={`${new_order.rate}`}
              styles={{width: wp('50%')}}
            />
            <TwoTextView
              text_gray="Costo Transaccion"
              text_white={`${new_order.cost}`}
              styles={{width: wp('50%')}}
            />
            <TwoTextView
              text_gray="Monto a recibir"
              text_white={`${new_order.receive_amount} ${new_order.currency2}`}
              styles={{width: wp('50%')}}
            />
            <TwoTextView
              text_gray="Importe Convertido"
              text_white={`${new_order.payment_amount - new_order.cost} ${
                new_order.currency1
              }`}
              styles={{width: wp('50%')}}
            />
          </View>
          <View>
            <TextInput
              placeholder="Proposito del Giro"
              placeholderTextColor="#919191"
              style={styles.input}
            />
            <View
              style={{
                display: 'flex',
                flexDirection: 'row',
                marginTop: 8,
              }}>
              <CheckBox
                tintColor="#aaaaaa"
                onFillColor="#09A04E"
                value={isSelected}
                disabled={false}
                tintColors
                onValueChange={isSelected => setSelection(isSelected)}
                style={{flex: 1}}
              />
              <Text style={styles.label}>
                Deseo crear una orden para girar dinero con los datos en
                pantalla.
              </Text>
            </View>
          </View>
          <View>
            <Text
              style={{
                ...styles.headerText,
                fontSize: 18,
                marginTop: hp('0.8%'),
              }}>
              Beneficiario
            </Text>
            <View
              style={{
                width: wp('100%'),
              }}>
              <TwoTextView
                text_gray="Nombre"
                text_white={`${recipientInfo.name} ${recipientInfo.lastname}`}
              />
              {/* <TwoTextView
                text_gray="Cuenta"
                text_white={`${recipientInfo.name} ${recipientInfo.lastname}`}
              /> */}
              <TwoTextView
                text_gray="Correo Electronico"
                text_white={recipientInfo.email}
              />
              <TwoTextView
                text_gray="Telefono"
                text_white={recipientInfo.phone}
              />
              <TwoTextView
                text_gray="Direccion"
                text_white={recipientInfo.address}
              />
            </View>
          </View>
        </ScrollView>
      </View>
      <View style={styles.footerButtonContainer}>
        <TouchableOpacity
          onPress={() => {
            submitOrder();
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#0D9239', '#199B37']}
            style={{...styles.continueButton, marginTop: 0, width: wp('90%')}}>
            <Text style={styles.buttonText}>Continuar</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}
const mapStateToProps = state => ({
  token: state.root.token,
  new_order: state.root.new_order,
});

const mapDispatchToProps = dispatch => ({
  saveNewOrder: value => dispatch(saveNewOrder(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(ReviewEnviarScreen);
const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131925',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
    display: 'flex',
  },
  header: {
    width: wp('100%'),
    height: hp('10%'),
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

  middleInputsContainer: {
    width: wp('80%'),
    alignSelf: 'center',
    flex: 1,
  },

  input: {
    marginTop: hp('1%'),
    borderBottomWidth: 2,
    borderBottomColor: '#919191',
    width: wp('100%'),
    color: '#919191',
  },

  label: {
    color: '#919191',
    fontSize: 13.5,
    flex: 18,
    marginLeft: 15,
  },

  scrollView: {},
  buttonText: {
    color: '#fff',
    fontSize: 18,
  },
  continueButton: {
    width: wp('80%'),
    height: 45,
    borderRadius: 15,
    backgroundColor: '#1A8D35',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp('5%'),
    overflow: 'hidden',
  },

  footerButtonContainer: {
    width: wp('100%'),
    height: hp('9%'),
    backgroundColor: '#18222E',
    position: 'relative',
    bottom: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

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
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
import Toast from 'react-native-simple-toast';
import RNPickerSelect from 'react-native-picker-select';
import SelectPicker from 'react-native-form-select-picker';
import SearchableDropdown from 'react-native-searchable-dropdown';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//import custom components
import TwoTextView from '../../../components/subviews/TwoTextView';
import {saveNewOrder} from '../../../../actions';

const purposeList = [
  {value: 'EPFAMT', label: 'Family Maintenance'},
  {value: 'ISMDCS', label: 'Medical Services'},
  {value: 'ISSTDY', label: 'Estudios y/o Tutorias'},
  {value: 'ISCHAR', label: 'Charity'},
  {value: 'EPPROP', label: 'Purchase of Properties'},
  {value: 'EPSHAR', label: 'Dividends'},
  {value: 'ISUBIL', label: 'Public Service Providers'},
  {value: 'ISTAXS', label: 'Taxes'},
  {value: 'EPTOUR', label: 'Tourism'},
  {value: 'EPTKAG', label: 'Passages or Tourist Agencies'},
  {value: 'ISSAVG', label: 'Savings'},
  {value: 'ISPENS', label: 'Pensions'},
  {value: 'ISGDDS', label: 'Purchase of Goods'},
  {value: 'ISSUPP', label: 'Suppliers'},
  {value: 'EPREMT', label: 'Remesa'},
  {value: 'ISSCVE', label: 'Purchase of Services'},
  {value: 'EPRENT', label: 'Rental of Movable Property'},
];

let country_abbr = '';
function ReviewEnviarScreen({navigation, token, new_order, saveNewOrder}) {
  const [recipientInfo, setRecipientInfo] = useState({});
  const [purpose, setPurpose] = useState(null);
  const [isSelected, setSelection] = useState(false);
  //get the data of recipient
  useEffect(() => {
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
          country_abbr = res.data.data.country.abbr;
        })
        .catch(err => {
          console.log(err);
        });
    }
  }, []);

  const submitOrder = () => {
    if (isSelected && purpose != '') {
      const formData = {...new_order, purpose: purpose};
      axios
        .post(APP.APP_URL + 'api/orsers', formData, {
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
          Toast.show(
            'Solicitud de pedido fallida, inténtalo de nuevo.',
            Toast.LONG,
          );
          // navigation.navigate('OrderRequestCompleted');
        });
    }
  };

  const getSuggestions = q => {
    let temp = [];
    purposeList.map(item => {
      if (item.title.toLowerCase().indexOf(q.toLowerCase()) > -1) {
        temp.push(item);
      }
    });
    setSuggestions(temp);
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
          style={{...styles.infoContainer, flex: 1}}>
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
              styles={{width: '45%'}}
            />
            <TwoTextView
              text_gray="Tip de Cambio"
              text_white={`${new_order.rate}`}
              styles={{width: '45%'}}
            />
            <TwoTextView
              text_gray="Costo Transaccion"
              text_white={`${new_order.cost}`}
              styles={{width: '45%'}}
            />
            <TwoTextView
              text_gray="Monto a recibir"
              text_white={`${new_order.receive_amount} ${new_order.currency2}`}
              styles={{width: '45%'}}
            />
            <TwoTextView
              text_gray="Importe Convertido"
              text_white={`${new_order.payment_amount - new_order.cost} ${
                new_order.currency1
              }`}
              styles={{width: '45%'}}
            />
          </View>
          <View>
            <View>
              <RNPickerSelect
                onValueChange={value => {
                  setPurpose(value);
                }}
                style={{inputAndroid: {color: 'white'}}}
                value={purpose}
                placeholder={{label: 'Seleccione el propósito', value: null}}
                items={purposeList}
                mode="dropdown"
              />
            </View>
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

              <Image
                source={{
                  uri:
                    'https://flagcdn.com/h60/' +
                    recipientInfo.country?.abbr?.toLowerCase() +
                    '.png',
                }}
                style={{
                  borderRadius: 10,
                  height: 30,
                  width: 30,
                  borderColor: 'transparent',
                  resizeMode: 'stretch',
                  alignItems: 'center',
                }}
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
  autocomplete: {
    borderRadius: 0,
    backgroundColor: 'transparent',
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
  infoContainer: {
    overflow: 'hidden',
  },
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

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
  TextInput,
  TouchableOpacity,
  ScrollView,
  Image,
} from 'react-native';
import {Switch} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import SelectPicker from 'react-native-form-select-picker';
import RNPickerSelect from 'react-native-picker-select';
import Spinner from 'react-native-loading-spinner-overlay';
import Icon from 'react-native-vector-icons/FontAwesome';
import Toast from 'react-native-simple-toast';
import Modal from 'react-native-modal';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getPairs, saveNewOrder} from '../../../../actions';
import CircleWithLabel from '../../../components/subviews/CircleWithLabel';
import {numberWithCommas} from '../../../data/helpers';

const options = ['CLP', 'USD', 'PEN', 'COP'];
const trimDigit = value => {
  let number = Number(value);
  if (Number.isInteger(number)) {
    return number;
  } else {
    return number.toFixed(2);
  }
};
let sendOptions = [];
let recvOptions = [];
let sendCurrencies = [];
let recvCurrencies = [];
function EnviarScreen({navigation, userinfo, pairs, getPairs, saveNewOrder}) {
  const [isLoading, setLoading] = useState(false);
  const [sendModalVisible, setSendModalVisible] = useState(false);
  const [recvModalVisible, setRecvModalVisible] = useState(false);
  const [cost, setCost] = useState(1.19);
  const [rate, setRate] = useState(1.0);

  const [currency1, setCurrency1] = useState(null);
  const [currency2, setCurrency2] = useState(null);

  //Textinputs for curreny
  const [number1, setNumber1] = useState(0);
  const [number2, setNumber2] = useState(0);

  //priority toggle
  const [intPriority, setIntPriority] = useState(false);
  //set send and receive currencies lists

  pairs.map(item => {
    if (sendOptions.indexOf(item.base.name) == -1) {
      sendOptions.push(item.base.name);
    }
    if (recvOptions.indexOf(item.quote.name) == -1) {
      recvOptions.push(item.quote.name);
    }
  });
  sendCurrencies = [];
  recvCurrencies = [];
  sendOptions.map(item => {
    sendCurrencies.push(
      <TouchableOpacity
        key={item}
        onPress={() => {
          handleCurrency1Change(item);
          setSendModalVisible(false);
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
          paddingHorizontal: 20,
          backgroundColor: '#18222E',
        }}>
        <View
          style={{
            flex: 4,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri:
                'https://flagcdn.com/h60/' +
                item.slice(0, 2).toLowerCase() +
                '.png',
            }}
            style={{
              borderRadius: 10,
              height: 30,
              width: 30,
              borderColor: 'transparent',
              resizeMode: 'stretch',
              flex: 2,
              alignItems: 'center',
            }}
          />
          <View style={{flex: 4, paddingLeft: 10}}>
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: 'bold',
                paddingLeft: 10,
              }}>
              {item}
            </Text>
          </View>
        </View>
        <Text
          style={{
            flex: 6,
            textAlign: 'right',
            fontSize: 26,
            color: '#00AA23',
            paddingRight: 10,
          }}>
          {item == 'CLP' ? userinfo.balance : 0}
        </Text>
      </TouchableOpacity>,
    );
  });
  recvOptions.map(item => {
    recvCurrencies.push(
      <TouchableOpacity
        key={item}
        onPress={() => {
          handleCurrency2Change(item);
          setRecvModalVisible(false);
        }}
        style={{
          flexDirection: 'row',
          alignItems: 'center',
          padding: 15,
          paddingHorizontal: 20,
          backgroundColor: '#18222E',
        }}>
        <View
          style={{
            flex: 4,
            flexDirection: 'row',
            alignItems: 'center',
          }}>
          <Image
            source={{
              uri:
                'https://flagcdn.com/h60/' +
                item.slice(0, 2).toLowerCase() +
                '.png',
            }}
            style={{
              borderRadius: 10,
              height: 30,
              width: 30,
              borderColor: 'transparent',
              resizeMode: 'stretch',
              flex: 2,
              alignItems: 'center',
            }}
          />
          <View style={{flex: 4, paddingLeft: 10}}>
            <Text
              style={{
                color: '#fff',
                fontSize: 18,
                fontWeight: 'bold',
                paddingLeft: 10,
              }}>
              {item}
            </Text>
          </View>
        </View>
        <Text
          style={{
            flex: 6,
            textAlign: 'right',
            fontSize: 26,
            color: '#00AA23',
            paddingRight: 10,
          }}>
          0
        </Text>
      </TouchableOpacity>,
    );
  });
  useEffect(() => {
    navigation.addListener('focus', () => {
      setLoading(true);
      getPairs()
        .then(res => {
          setCurrency1(res.base.name);
          setCurrency2(res.quote.name);
          axios
            .get(
              `https://api.andeanwide.com/api/exchange-rate/${res.base.name}/${res.quote.name}`,
            )
            .then(res => {
              setLoading(false);
              const new_rate = parseFloat(res.data.data.bid);
              setRate(new_rate);
            });
        })
        .catch(err => {
          console.log(err);
        });
    });
  }, [navigation]);

  const handleNumber1Change = val => {
    setNumber1(val);
    setNumber2(trimDigit(val * rate * (intPriority ? 0.95 : 0.9881)));
  };

  const handleNumber2Change = val => {
    setNumber2(val);
    setNumber1(trimDigit(val / rate / (intPriority ? 0.95 : 0.9881)));
  };

  const handleSwitchChange = res => {
    setIntPriority(!intPriority);
    setNumber2(trimDigit(number1 * rate * (!intPriority ? 0.95 : 0.9881)));
  };

  const swapCurrency = () => {
    setLoading(true);
    let temp = currency1;
    axios
      .get(
        `https://api.andeanwide.com/api/exchange-rate/${currency2}/${currency1}`,
      )
      .then(response => {
        const new_rate = parseFloat(response.data.data.bid);
        setRate(new_rate);
        setNumber2(
          trimDigit(number1 * new_rate * (intPriority ? 0.95 : 0.9881)),
        );
        setCurrency1(currency2);
        setCurrency2(temp);
        setLoading(false);
      })
      .catch(err => {
        setLoading(false);
        Toast.show('Ocurrió un error!');
      });
  };

  const handleCurrency1Change = val => {
    if (val == currency2) {
      Toast.show('Please select the different currency!', Toast.LONG);
    } else {
      setLoading(true);
      axios
        .get(`https://api.andeanwide.com/api/exchange-rate/${val}/${currency2}`)
        .then(response => {
          const new_rate = parseFloat(response.data.data.bid);
          setRate(new_rate);
          setCurrency1(val);
          setNumber2(
            trimDigit(number1 * new_rate * (intPriority ? 0.95 : 0.9881)),
          );
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          Toast.show('Ocurrió un error!');
        });
    }
  };

  const handleCurrency2Change = val => {
    if (val == currency1) {
      Toast.show('Seleccione la moneda diferente!', Toast.LONG);
    } else {
      setLoading(true);
      axios
        .get(`https://api.andeanwide.com/api/exchange-rate/${currency1}/${val}`)
        .then(res => {
          const new_rate = parseFloat(res.data.data.bid);
          setCurrency2(val);
          setRate(new_rate);
          setNumber1(
            trimDigit(number2 / new_rate / (intPriority ? 0.95 : 0.9881)),
          );
          setLoading(false);
        })
        .catch(err => {
          setLoading(false);
          Toast.show('Ocurrió un error!');
        });
    }
  };

  /**
   * useEffect called as componentdidmount once
   * updates the currency pairs according to the values passed in from API
   */
  // useEffect(() => {
  //   getPairs()
  //     .then(res => {
  //       setCurrency1(res.base.name);
  //       setCurrency2(res.quote.name);
  //     })
  //     .catch(err => {
  //       console.log(err);
  //     });
  // }, []);

  const continueOrder = () => {
    //validate the currency and payment_amount
    if (number1 <= 0 || number2 <= 0) {
      Toast.show('Por favor complete el formulario correctamente', Toast.LONG);
    } else {
      let pair_id = 0;
      for (let i = 0; i < pairs.length; i++) {
        if (
          pairs[i].base.name == currency1 &&
          pairs[i].quote.name == currency2
        ) {
          pair_id = pairs[i].id;
        }
      }
      const cost = intPriority
        ? 0.05 * Number(number1)
        : 0.0119 * Number(number1);
      let data = {
        recipient_id: 0,
        remitter_id: 0,
        priority_id: intPriority ? 2 : 1,
        payment_amount: Number(number1),
        rate: Number(rate),
        pair_id: pair_id,
        currency1: currency1,
        currency2: currency2,
        cost: trimDigit(cost),
        receive_amount: Number(number2),
      };
      saveNewOrder(data);
      // navigation.navigate('BeneficiariosStack', {screen: 'BeneficiariosScreen'});
      navigation.navigate('BeneficiariosScreen', {
        params: {ordering: 'yes'},
      });
    }
  };
  const toggleModal = () => {
    setSendModalVisible(!sendModalVisible);
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner
          visible={isLoading}
          textContent={'Envío de datos...'}
          textStyle={{color: '#fff'}}
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
        isVisible={sendModalVisible}
        onBackdropPress={() => setSendModalVisible(false)}>
        <View style={styles.modal_container}>
          <View style={{alignItems: 'center', paddingBottom: 10}}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
                alignItems: 'center',
              }}>
              Selecciona
            </Text>
            <Icon
              name="times-circle-o"
              size={25}
              style={{position: 'absolute', left: 10, color: 'white'}}
              onPress={() => setSendModalVisible(false)}
            />
          </View>
          <ScrollView>{sendCurrencies}</ScrollView>
        </View>
      </Modal>
      <Modal
        isVisible={recvModalVisible}
        onBackdropPress={() => setRecvModalVisible(false)}>
        <View style={styles.modal_container}>
          <View style={{alignItems: 'center', paddingBottom: 10}}>
            <Text
              style={{
                color: 'white',
                fontSize: 16,
                fontWeight: 'bold',
                alignItems: 'center',
              }}>
              Selecciona
            </Text>
            <Icon
              name="times-circle-o"
              size={25}
              style={{position: 'absolute', left: 10, color: 'white'}}
              onPress={() => setRecvModalVisible(false)}
            />
          </View>
          <ScrollView>{recvCurrencies}</ScrollView>
        </View>
      </Modal>
      <View style={styles.header}>
        <View style={{alignItems: 'center'}}>
          <View style={styles.nameHeader}>
            <CircleWithLabel
              label={
                userinfo.identity.firstname[0] + userinfo.identity.lastname[0]
              }
            />
            <Text style={{...styles.headerText}}>{userinfo.name}</Text>
          </View>
        </View>
      </View>
      <View style={styles.contentContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
            paddingHorizontal: 20,
            backgroundColor: '#18222E',
          }}>
          <TouchableOpacity
            style={{
              flex: 4,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => {
              setSendModalVisible(true);
            }}>
            {currency1 && (
              <>
                <Image
                  source={{
                    uri:
                      'https://flagcdn.com/h60/' +
                      currency1.slice(0, 2).toLowerCase() +
                      '.png',
                  }}
                  style={{
                    borderRadius: 10,
                    height: 30,
                    width: 30,
                    borderColor: 'transparent',
                    resizeMode: 'stretch',
                    flex: 2,
                    alignItems: 'center',
                  }}
                />
                <View style={{flex: 4, paddingLeft: 10}}>
                  <Text style={{color: '#fff', fontSize: 10, paddingLeft: 10}}>
                    Enviar
                  </Text>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 18,
                      fontWeight: 'bold',
                      paddingLeft: 10,
                    }}>
                    {currency1}
                  </Text>
                </View>
                <AntDesign
                  style={{flex: 1, alignSelf: 'center', paddingLeft: 10}}
                  name="down"
                  color="#fff"
                  size={14}
                />
              </>
            )}
          </TouchableOpacity>
          <TextInput
            style={{
              flex: 6,
              textAlign: 'right',
              fontSize: 26,
              color: '#00AA23',
              paddingRight: 10,
            }}
            keyboardType="numeric"
            maxLength={10}
            value={numberWithCommas(number1.toString())}
            placeholder="0"
            placeholderTextColor="#00AA23"
            onChangeText={res => {
              handleNumber1Change(res.replace(/\,/g, ''));
            }}
          />
        </View>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            padding: 15,
            paddingHorizontal: 20,
            marginTop: 5,
            backgroundColor: '#18222E',
          }}>
          <TouchableOpacity
            style={{
              flex: 4,
              flexDirection: 'row',
              alignItems: 'center',
            }}
            onPress={() => {
              setRecvModalVisible(true);
            }}>
            {currency2 && (
              <>
                <Image
                  source={{
                    uri:
                      'https://flagcdn.com/h60/' +
                      currency2.slice(0, 2).toLowerCase() +
                      '.png',
                  }}
                  style={{
                    borderRadius: 10,
                    height: 30,
                    width: 30,
                    borderColor: 'transparent',
                    resizeMode: 'stretch',
                    flex: 2,
                    alignItems: 'center',
                  }}
                />
                <View style={{flex: 4, paddingLeft: 10}}>
                  <Text style={{color: '#fff', fontSize: 10, paddingLeft: 10}}>
                    Recibir
                  </Text>
                  <Text
                    style={{
                      color: '#fff',
                      fontSize: 18,
                      fontWeight: 'bold',
                      paddingLeft: 10,
                    }}>
                    {currency2}
                  </Text>
                </View>
                <AntDesign
                  style={{flex: 1, alignSelf: 'center', paddingLeft: 10}}
                  name="down"
                  color="#fff"
                  size={14}
                />
              </>
            )}
          </TouchableOpacity>
          <View style={{flex: 6, justifyContent: 'center'}}>
            <TextInput
              style={{
                textAlign: 'right',
                fontSize: 26,
                color: '#00AA23',
                paddingRight: 10,
              }}
              keyboardType="numeric"
              maxLength={10}
              value={numberWithCommas(number2.toString())}
              placeholder="0"
              placeholderTextColor="#00AA23"
              onChangeText={res => {
                handleNumber2Change(res.replace(/\,/g, ''));
              }}
            />
            {currency1 && currency2 && (
              <>
                <Text
                  style={{
                    position: 'absolute',
                    right: 0,
                    bottom: -5,
                    color: '#919191',
                    textAlign: 'right',
                    fontSize: 14,
                    paddingRight: 10,
                  }}>
                  1 {currency1} = {trimDigit(rate)} {currency2}
                </Text>
              </>
            )}
          </View>
        </View>
        <Icon
          name="refresh"
          size={20}
          color="#000"
          style={{
            position: 'absolute',
            backgroundColor: '#fff',
            borderRadius: 100,
            alignItems: 'center',
            paddingTop: 3,
            textAlign: 'center',
            width: '6%',
            height: '14%',
            borderWidth: 0,
            bottom: '44%',
            left: '48%',
          }}
          onPress={() => {
            swapCurrency();
          }}
        />
      </View>

      <View style={styles.footerButtonContainer}>
        <TouchableOpacity
          onPress={() => {
            continueOrder();
          }}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#0D9239', '#199B37']}
            style={{...styles.continueButton, marginTop: 0}}>
            <Text style={{...styles.buttonText, fontSize: 18}}>Continuar</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({
  userinfo: state.root.userinfo,
  pairs: state.root.pairs,
});

const mapDispatchToProps = dispatch => ({
  getPairs: values => dispatch(getPairs(values)),
  saveNewOrder: value => dispatch(saveNewOrder(value)),
});

export default connect(mapStateToProps, mapDispatchToProps)(EnviarScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131925',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  buttonText: {
    color: '#fff',
    fontSize: 18,
  },

  welcome: {
    fontSize: 21,
    fontWeight: 'bold',
    alignSelf: 'center',
    color: '#fff',
    marginBottom: 7,
    marginTop: hp('5%'),
  },

  contentContainer: {},
  header: {
    width: wp('100%'),
    height: hp('8%'),
    backgroundColor: '#18222E',
    justifyContent: 'flex-end',
    paddingBottom: 10,
    alignItems: 'center',
    marginBottom: 5,
  },

  headerText: {
    color: '#ffffff',
    fontSize: 14,
    marginHorizontal: 10,
    alignSelf: 'center',
    textAlign: 'center',
  },
  priceInputContainer: {
    width: wp('80%'),
    height: hp('8%'),
    backgroundColor: '#4B5258',
    borderBottomRightRadius: 10,
    alignSelf: 'center',
    marginTop: hp('1%'),
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    overflow: 'hidden',
  },

  switchContainer: {
    marginTop: 10,
    width: wp('80%'),
    flexDirection: 'row',
    justifyContent: 'center',
  },

  input: {
    width: wp('40%'),
    height: hp('7%'),
    color: '#fff',
    paddingBottom: -5,

    fontSize: 18,
  },

  text: {
    color: '#fff',
    fontSize: 17,
  },
  textContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    textAlign: 'right',
    paddingHorizontal: wp('10%'),
    marginTop: hp('1%'),
  },

  continueButton: {
    width: wp('90%'),
    height: 45,
    borderRadius: 15,
    backgroundColor: '#1A8D35',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp('5%'),
    overflow: 'hidden',
  },

  buttonText: {
    color: '#fff',
  },
  footerButtonContainer: {
    width: wp('100%'),
    height: hp('9%'),
    backgroundColor: '#18222E',
    position: 'absolute',
    bottom: 1,
    justifyContent: 'center',
    alignItems: 'center',
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
  nameHeader: {
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 100,
    backgroundColor: '#141A27',
    borderWidth: 0,
    flexDirection: 'row',
  },
});

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
} from 'react-native';
import {Switch} from 'native-base';
import LinearGradient from 'react-native-linear-gradient';
import SelectPicker from 'react-native-form-select-picker';
import Spinner from 'react-native-loading-spinner-overlay';
import Toast from 'react-native-simple-toast';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import {getPairs, saveNewOrder} from '../../../../actions';

const options = ['CLP', 'USD', 'PEN', 'COP'];

function EnviarScreen({navigation, userinfo, pairs, getPairs, saveNewOrder}) {
  const [cost, setCost] = useState(1.19);
  const [rate, setRate] = useState(1.0);
  const [sendOptions, setSendOptions] = useState(['CLP', 'USD', 'PEN', 'COP']);
  const [recvOptions, setRecvOptions] = useState([
    'COP',
    'USD',
    'PEN',
    'MXN',
    'VES',
  ]);
  const [isLoading, setLoading] = useState(false);

  const [currency1, setCurrency1] = useState('CLP');
  const [currency2, setCurrency2] = useState('COP');
  //states for color tab change
  const [colorP, setColorP] = useState('#fff');
  const [colorE, setColorE] = useState('gray');

  const [bgColorP, setbgColorP] = useState('#09A04E');
  const [bgColorE, setbgColorE] = useState('#fff');

  const [selected, setSelected] = useState(0);

  //Textinputs for curreny
  const [number1, setNumber1] = useState(null);
  const [number2, setNumber2] = useState(null);

  //priority toggle
  const [intPriority, setIntPriority] = useState(false);
  const [andPriority, setAndPriority] = useState(false);

  const onpresstab1 = () => {
    setSelected(0);
    setColorE('#6D7782');
    setbgColorE('#fff');

    setColorP('#fff');
    setbgColorP('#09A04E');
  };

  const onpresstab2 = () => {
    //for  tab1
    setSelected(1);
    setColorE('#fff');
    setbgColorE('#fff');

    setColorP('gray');
    setbgColorP('#09A04E');

    //for tab2

    setColorP('#6D7782');
    setbgColorP('#fff');

    setColorE('#fff');
    setbgColorE('#09A04E');
  };

  const handleNumber1Change = val => {
    setNumber1(val);
    setNumber2((val * rate * (intPriority ? 0.95 : 0.9881)).toFixed(3));
  };

  const handleNumber2Change = val => {
    setNumber2(val);
    setNumber1((val / rate / (intPriority ? 0.95 : 0.9881)).toFixed(3));
  };

  const handleSwitchChange = res => {
    setIntPriority(!intPriority);
    setNumber2((number1 * rate * (!intPriority ? 0.95 : 0.9881)).toFixed(3));
  };

  const handleCurrency1Change = res => {
    setCurrency1(res);
    if (pairs.length > 0) {
      let seconds = [];
      pairs.map(item => {
        if (item.base.name == res) {
          seconds.push(item.quote.name);
        }
      });
      setRecvOptions(seconds);
      if (seconds.indexOf(currency2) == -1) {
        setCurrency2(seconds[0]);
        axios
          .get(
            `https://api.andeanwide.com/api/exchange-rate/${res}/${seconds[0]}`,
          )
          .then(res => {
            const new_rate = parseFloat(res.data.data.bid);
            setRate(new_rate);
            setNumber2(
              (number1 * new_rate * (intPriority ? 0.95 : 0.9881)).toFixed(3),
            );
          });
      } else {
        axios
          .get(
            `https://api.andeanwide.com/api/exchange-rate/${res}/${currency2}`,
          )
          .then(res => {
            const new_rate = parseFloat(res.data.data.bid);
            setRate(new_rate);
            setNumber2(
              (number1 * new_rate * (intPriority ? 0.95 : 0.9881)).toFixed(3),
            );
          });
      }
    }
  };

  const handleCurrency2Change = res => {
    setCurrency2(res);
    axios
      .get(`https://api.andeanwide.com/api/exchange-rate/${currency1}/${res}`)
      .then(res => {
        const new_rate = parseFloat(res.data.data.bid);
        setRate(new_rate);
        setNumber1(
          (number2 / new_rate / (intPriority ? 0.95 : 0.9881)).toFixed(3),
        );
      });
  };

  /**
   * useEffect called as componentdidmount once
   * updates the currency pairs according to the values passed in from API
   */
  useEffect(() => {
    setLoading(true);
    getPairs()
      .then(res => {
        setLoading(false);
        setCurrency1(res.base.name);
        setCurrency2(res.quote.name);
      })
      .catch(err => {
        setLoading(false);
        console.log(err);
      });
  }, []);

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
        cost: cost,
        receive_amount: Number(number2),
      };
      console.log(data);
      saveNewOrder(data);
      // navigation.navigate('BeneficiariosStack', {screen: 'BeneficiariosScreen'});
      navigation.navigate('BeneficiariosScreen', {
        params: {ordering: 'yes'},
      });
    }
  };
  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner
          visible={isLoading}
          textContent={'Recolectando datos...'}
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
      <View style={styles.header}>
        <Text style={styles.headerText}>Enviar</Text>
      </View>
      <View style={styles.contentContainer}>
        <View
          style={{
            flexDirection: 'row',
            alignItems: 'center',
            width: wp('80%'),
            alignSelf: 'center',
            justifyContent: 'space-around',
            marginTop: hp('1%'),
          }}>
          <TouchableWithoutFeedback onPress={onpresstab1}>
            <View>
              <Text
                style={{color: colorP, textAlign: 'center', marginBottom: 4}}>
                Internacional
              </Text>
              <View
                style={{width: 150, height: 5, backgroundColor: bgColorP}}
              />
            </View>
          </TouchableWithoutFeedback>

          <TouchableWithoutFeedback onPress={onpresstab2}>
            <View>
              <Text
                style={{color: colorE, textAlign: 'center', marginBottom: 4}}>
                Misma moneda
              </Text>
              <View
                style={{width: 150, height: 5, backgroundColor: bgColorE}}
              />
            </View>
          </TouchableWithoutFeedback>
        </View>

        {selected === 0 ? (
          <View style={styles.mainContainer}>
            <View style={styles.priceInputContainer}>
              <View>
                <Text
                  style={{
                    color: '#919191',
                    fontSize: 17,
                    position: 'absolute',
                    top: 0,
                  }}>
                  Envias
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={res => {
                    handleNumber1Change(res);
                  }}
                  value={number1}
                  placeholder="100.000"
                  placeholderTextColor="#fff"
                  keyboardType="numeric"
                />
              </View>

              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#099E4D', '#2BCF6C']}
                style={{
                  width: wp('35%'),
                  height: hp('8%'),
                  borderTopLeftRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <SelectPicker
                  placeholder="Currency"
                  placeholderStyle={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}
                  style={{right: wp('1%')}}
                  onSelectedStyle={{
                    color: '#fff',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}
                  onValueChange={value => {
                    // Do anything you want with the value.
                    // For example, save in state.
                    handleCurrency1Change(value);
                  }}
                  selected={currency1}>
                  {Object.values(sendOptions).map((val, index) => (
                    <SelectPicker.Item label={val} value={val} key={index} />
                  ))}
                </SelectPicker>
              </LinearGradient>
            </View>
            <View>
              <View style={styles.textContainer}>
                <Text
                  style={{...styles.text, color: '#919191', marginRight: 10}}>
                  {(number1 * (intPriority ? 0.05 : 0.0119)).toFixed(3)}{' '}
                  {currency1}
                </Text>
                <Text style={styles.text}>Transferencia de bajo costo</Text>
              </View>

              <View style={styles.textContainer}>
                <Text
                  style={{...styles.text, color: '#919191', marginRight: 10}}>
                  {(number1 * (intPriority ? 0.95 : 0.9881)).toFixed(3)}
                </Text>
                <Text style={styles.text}>
                  Importe de {currency1} convertido
                </Text>
              </View>

              <View style={styles.textContainer}>
                <Text
                  style={{...styles.text, color: '#919191', marginRight: 10}}>
                  {rate.toFixed(3)}
                </Text>
                <Text style={styles.text}>
                  Tipo de cambio {currency1}/{currency2}
                </Text>
              </View>
            </View>

            <View style={styles.priceInputContainer}>
              <View>
                <Text
                  style={{
                    color: '#919191',
                    fontSize: 17,
                    position: 'absolute',
                    top: 0,
                  }}>
                  Recibes
                </Text>
                <TextInput
                  style={styles.input}
                  onChangeText={res => {
                    handleNumber2Change(res);
                  }}
                  value={number2}
                  placeholder=""
                  placeholderTextColor="#fff"
                  keyboardType="numeric"
                />
              </View>

              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#099E4D', '#2BCF6C']}
                style={{
                  width: wp('35%'),
                  height: hp('8%'),
                  borderTopLeftRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <SelectPicker
                  placeholderStyle={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}
                  placeholder="Currency"
                  style={{right: wp('1%')}}
                  onSelectedStyle={{
                    color: '#fff',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}
                  onValueChange={value => {
                    // Do anything you want with the value.
                    // For example, save in state.
                    handleCurrency2Change(value);
                  }}
                  selected={currency2}>
                  {Object.values(recvOptions).map((val, index) => (
                    <SelectPicker.Item label={val} value={val} key={index} />
                  ))}
                </SelectPicker>
              </LinearGradient>
            </View>
            <View>
              <View style={styles.textContainer}>
                <Text
                  style={{...styles.text, color: '#919191', marginRight: 10}}>
                  Debe llegar para el{' '}
                </Text>
                <Text style={styles.text}>12 de Mayo</Text>
              </View>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                isChecked={intPriority}
                style={{textAlign: 'center', width: wp('30%')}}
                onToggle={res => {
                  handleSwitchChange();
                }}
              />
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  color: '#fff',
                  width: wp('50%'),
                }}>
                Immediata Prioridad
              </Text>
            </View>
          </View>
        ) : (
          <View style={styles.mainContainer}>
            <View style={styles.priceInputContainer}>
              <View>
                <Text
                  style={{
                    color: '#919191',
                    fontSize: 15,
                    position: 'absolute',
                    top: 0,
                  }}>
                  Destinatario recibira
                </Text>
                <TextInput
                  style={styles.input}
                  // onChangeText={}
                  // value={}
                  placeholder="1.000 $"
                  placeholderTextColor="#fff"
                  keyboardType="numeric"
                />
              </View>

              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#099E4D', '#2BCF6C']}
                style={{
                  width: wp('35%'),
                  height: hp('8%'),
                  borderTopLeftRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <SelectPicker
                  placeholderStyle={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}
                  style={{right: wp('1%')}}
                  placeholder="CLP"
                  onSelectedStyle={{
                    color: '#fff',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}
                  onValueChange={value => {
                    // Do anything you want with the value.
                    // For example, save in state.
                    setCurrency1(value);
                  }}
                  selected={currency1}>
                  {Object.values(options).map((val, index) => (
                    <SelectPicker.Item label={val} value={val} key={index} />
                  ))}
                </SelectPicker>
              </LinearGradient>
            </View>
            <View>
              <View style={styles.textContainer}>
                <Text
                  style={{...styles.text, color: '#919191', marginRight: 10}}>
                  5,34 USD
                </Text>
                <Text style={styles.text}>Comisión “wire” Internacional</Text>
              </View>

              <View style={styles.textContainer}>
                <Text
                  style={{...styles.text, color: '#919191', marginRight: 10}}>
                  1,16 USD
                </Text>
                <Text style={styles.text}>Nuestra comisión</Text>
              </View>

              <View style={styles.textContainer}>
                <Text
                  style={{...styles.text, color: '#919191', marginRight: 10}}>
                  6,47 USD
                </Text>
                <Text style={styles.text}>Comisión Total</Text>
              </View>
            </View>

            <View style={styles.priceInputContainer}>
              <View>
                <Text
                  style={{
                    color: '#919191',
                    fontSize: 17,
                    position: 'absolute',
                    top: 0,
                  }}>
                  Envias
                </Text>
                <TextInput
                  style={styles.input}
                  // onChangeText={onChangeNumber2}
                  // value={number2}
                  placeholder="$ 1,006.47"
                  placeholderTextColor="#fff"
                  keyboardType="numeric"
                />
              </View>

              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#099E4D', '#2BCF6C']}
                style={{
                  width: wp('35%'),
                  height: hp('8%'),
                  borderTopLeftRadius: 10,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}>
                <SelectPicker
                  placeholderStyle={{
                    color: '#fff',
                    fontWeight: 'bold',
                    fontSize: 20,
                  }}
                  style={{right: wp('1%')}}
                  placeholder="CLP"
                  onSelectedStyle={{
                    color: '#fff',
                    fontSize: 20,
                    fontWeight: 'bold',
                  }}
                  onValueChange={value => {
                    // Do anything you want with the value.
                    // For example, save in state.
                    setCurrency2(value);
                  }}
                  selected={currency2}>
                  {Object.values(recvOptions).map((val, index) => (
                    <SelectPicker.Item label={val} value={val} key={index} />
                  ))}
                </SelectPicker>
              </LinearGradient>
            </View>
            <View>
              <View style={styles.textContainer}>
                <Text
                  style={{...styles.text, color: '#919191', marginRight: 10}}>
                  Debe llegar para el{' '}
                </Text>
                <Text style={styles.text}>12 de Mayo</Text>
              </View>
            </View>
            <View style={styles.switchContainer}>
              <Switch
                isChecked={andPriority}
                style={{textAlign: 'center', width: wp('30%')}}
                onToggle={setAndPriority}
              />
              <Text
                style={{
                  textAlign: 'center',
                  fontSize: 18,
                  color: '#fff',
                  width: wp('50%'),
                }}>
                Immediata Prioridad
              </Text>
            </View>
          </View>
        )}
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

  contentContainer: {
    marginTop: hp('1%'),
    backgroundColor: '#18222E',
    height: hp('52%'),
  },
  header: {
    width: wp('100%'),
    height: hp('6%'),
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
    bottom: 5,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

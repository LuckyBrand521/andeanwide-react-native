import React, {useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
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
import LinearGradient from 'react-native-linear-gradient';
import SelectPicker from 'react-native-form-select-picker';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';


const options = ['CLP', 'COP', 'PEN', 'USD'];
const options2 = ['CLP', 'COP', 'PEN', 'USD'];

export default function EnviarScreen({navigation}) {
  const [currency1, setCurrecny1] = useState('');
  const [currency2, setCurrecny2] = useState('');

  const [colorP, setColorP] = useState('#fff');
  const [colorE, setColorE] = useState('gray');

  const [bgColorP, setbgColorP] = useState('#09A04E');
  const [bgColorE, setbgColorE] = useState('#fff');

  const [selected, setSelected] = useState(0);

  //Textinputs for curreny
  const [number1, onChangeNumber1] = React.useState(null);
  const [number2, onChangeNumber2] = React.useState(null);

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
                  onChangeText={onChangeNumber1}
                  value={number1}
                  placeholder="100.000 $"
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
                  placeholderStyle={{color: '#fff'}}
                  style={{right: wp('1%')}}
                  placeholder="CLP"
                  onSelectedStyle={{color: '#fff'}}
                  onValueChange={value => {
                    // Do anything you want with the value.
                    // For example, save in state.
                    setCurrecny1(value);
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
                  3,95 CLP
                </Text>
                <Text style={styles.text}>Transferencia de bajo costo</Text>
              </View>

              <View style={styles.textContainer}>
                <Text
                  style={{...styles.text, color: '#919191', marginRight: 10}}>
                  96.05
                </Text>
                <Text style={styles.text}>Importe de CLP convertido</Text>
              </View>

              <View style={styles.textContainer}>
                <Text
                  style={{...styles.text, color: '#919191', marginRight: 10}}>
                  775
                </Text>
                <Text style={styles.text}>Tipo de cambio</Text>
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
                  onChangeText={onChangeNumber2}
                  value={number2}
                  placeholder="$ 75"
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
                  placeholderStyle={{color: '#fff'}}
                  style={{right: wp('1%')}}
                  placeholder="CLP"
                  onSelectedStyle={{color: '#fff'}}
                  onValueChange={value => {
                    // Do anything you want with the value.
                    // For example, save in state.
                    setCurrecny2(value);
                  }}
                  selected={currency2}>
                  {Object.values(options2).map((val, index) => (
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

            <TouchableOpacity onPress={() => navigation.navigate('PriorityScreen')}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#0D5734', '#0D5734', '#1B975B']}
                style={styles.continueButton}>
                <View
                  style={{
                    width: 70,
                    height: 40,
                    right: -5,
                    bottom: 15,
                    transform: [{scaleX: 2}],
                    overflow: 'hidden',
                    position: 'absolute',
                    borderRadius: 80,
                    backgroundColor: '#198352',
                  }}
                />
                <Text style={styles.buttonText}>Prioridad</Text>
              </LinearGradient>
            </TouchableOpacity>
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
                  onChangeText={onChangeNumber1}
                  value={number1}
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
                  placeholderStyle={{color: '#fff'}}
                  style={{right: wp('1%')}}
                  placeholder="CLP"
                  onSelectedStyle={{color: '#fff'}}
                  onValueChange={value => {
                    // Do anything you want with the value.
                    // For example, save in state.
                    setCurrecny1(value);
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
                  onChangeText={onChangeNumber2}
                  value={number2}
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
                  placeholderStyle={{color: '#fff'}}
                  style={{right: wp('1%')}}
                  placeholder="CLP"
                  onSelectedStyle={{color: '#fff'}}
                  onValueChange={value => {
                    // Do anything you want with the value.
                    // For example, save in state.
                    setCurrecny2(value);
                  }}
                  selected={currency2}>
                  {Object.values(options2).map((val, index) => (
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

            <TouchableOpacity onPress={() => navigation.navigate('PriorityScreen')}>
              <LinearGradient
                start={{x: 0, y: 0}}
                end={{x: 1, y: 0}}
                colors={['#0D5734', '#0D5734', '#1B975B']}
                style={styles.continueButton}>
                <View
                  style={{
                    width: 70,
                    height: 40,
                    right: -5,
                    bottom: 15,
                    transform: [{scaleX: 2}],
                    overflow: 'hidden',
                    position: 'absolute',
                    borderRadius: 80,
                    backgroundColor: '#198352',
                  }}
                />
                <Text style={styles.buttonText}>Prioridad</Text>
              </LinearGradient>
            </TouchableOpacity>
          </View>
        )}
      </View>

      <View style={styles.footerButtonContainer}>
        <TouchableOpacity onPress={() => navigation.navigate('ReviewEnviarScreen')}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#0D9239', '#199B37']}
            style={{...styles.continueButton, marginTop: 0}}>
            <View
              style={{
                width: 70,
                height: 40,
                right: -5,
                bottom: 15,
                transform: [{scaleX: 2}],
                overflow: 'hidden',
                position: 'absolute',
                borderRadius: 80,
                backgroundColor: '#1B8D36',
              }}
            />
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
    backgroundColor: '#131925',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  buttonText: {
    color: '#fff',
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

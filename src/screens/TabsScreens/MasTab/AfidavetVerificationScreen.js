import React, {useState, useRef} from 'react';
import APP from '../../../../app.json';
import {connect} from 'react-redux';
import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';

function AfidavetVerificationScreen({navigation, token}) {
  const [term1, setTerm1] = React.useState(false);
  const [term2, setTerm2] = React.useState(false);
  const [term3, setTerm3] = React.useState(false);
  const [isLoading, setLoading] = useState(false);

  const handleSubmit = () => {
    if (term1 && term2 && term3) {
      setLoading(true);
      let data = new FormData();
      data.append('funds_declaration', term1);
      data.append('pep_declaration', term2);
      data.append('veracity_declaration', term3);
      axios
        .post(APP.APP_URL + 'api/users/identity/accept-terms', data, {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        })
        .then(response => {
          setLoading(false);
          Toast.show('Terminado con éxito!', Toast.LONG, ['UIAlertController']);
          navigation.navigate('CarteraAccountTypeScreen');
        })
        .catch(error => {
          console.log(error);
          setLoading(false);
          Toast.show('Ocurrió un error!', Toast.LONG, ['UIAlertController']);

          // To be removed after completion
          // navigation.navigate('CarteraAccountTypeScreen');
        });
    } else {
      Toast.show('¡Acepte todos los términos!', Toast.LONG, [
        'UIAlertController',
      ]);
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
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#18222E"
        translucent={true}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Enviar</Text>
      </View>

      <View style={styles.middleInputsContainer}>
        <View>
          <View style={styles.termsubContainer}>
            <CheckBox
              tintColor="#aaaaaa"
              onFillColor="#09A04E"
              tintColors
              disabled={false}
              value={term1}
              onValueChange={newValue => setTerm1(newValue)}
            />
            <Text style={styles.termText}>
              Declaro que no soy una Persona Expuesta politi-{'\n'}
              camenta (PEP). no tengo relacion comercial ni{'\n'}
              parentesco (Hasta segundo Grado) con personas{'\n'}
              expuestas politicamente (PEP).
            </Text>
          </View>

          <View style={styles.termsubContainer}>
            <CheckBox
              tintColor="#aaaaaa"
              onFillColor="#09A04E"
              tintColors
              disabled={false}
              value={term2}
              onValueChange={newValue => setTerm2(newValue)}
            />
            <Text style={styles.termText}>
              Declaro que los fondos acreditados en mi cuenta{'\n'}
              no provienen ni seran utilizados para actividades{'\n'}
              ilisitas, lavado de dinero o financiamiento al terror{'\n'}ismo
            </Text>
          </View>

          <View style={styles.termsubContainer}>
            <CheckBox
              tintColor="#aaaaaa"
              onFillColor="#09A04E"
              tintColors
              disabled={false}
              value={term3}
              onValueChange={newValue => setTerm3(newValue)}
            />
            <Text style={styles.termText}>
              Declaro que la informacion proporsionada es co{'\n'}
              rrecta y actualizada. Autorizo a Andean Wide ya{'\n'}
              verificar y recabar informacion.
            </Text>
          </View>
        </View>
      </View>

      <View style={styles.footerButtonContainer}>
        <TouchableOpacity onPress={handleSubmit}>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#119438', '#1A9B36', '#1B9D36']}
            style={styles.continueButton}>
            <Text style={styles.buttonText}>Enviar</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({
  token: state.root.token.value,
});

export default connect(mapStateToProps)(AfidavetVerificationScreen);
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
    height: hp('55%'),
    width: wp('100%'),

    padding: 25,
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
    borderRadius: 12,
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
  termText: {
    color: '#919191',
    fontSize: 13.5,
    marginHorizontal: 10,
  },

  termsubContainer: {
    flexDirection: 'row',
    marginTop: hp('3%'),
  },
  spinnerTextStyle: {
    color: '#FFF',
  },
});

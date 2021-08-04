import React, {useState, useRef} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TextInput,
  ScrollView,
  TouchableHighlight,
  ImageBackground,
  TouchableOpacity
} from 'react-native';


import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';


export default function AfidavetVerificationScreen({navigation}) {
  const [term1, setTerm1] = React.useState(false);
  const [term2, setTerm2] = React.useState(false);
  const [term3, setTerm3] = React.useState(false);

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
        <TouchableOpacity
        
        >
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#119438', '#1A9B36', '#1B9D36']}
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
                backgroundColor: '#1A8D35',
              }}
            />
            <Text style={styles.buttonText}>Enviar</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

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
    bottom: 5,
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
});

import React, {useState} from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TextInput,
  ScrollView,
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

//Pickers
import DatePicker from 'react-native-datepicker';
import SelectPicker from 'react-native-form-select-picker';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import LinearGradient from 'react-native-linear-gradient';
import {TouchableOpacity} from 'react-native-gesture-handler';

const options = ['Masculina', 'Mujer'];
const options2 = ['Casada', 'Única'];

export default function ResidanceVerificationScreen({navigation}) {
  //inputs are in the same pattern as UI
  const [country, setCountry] = React.useState('');
  const [region, setRegion] = React.useState('');
  const [cludad, setCludad] = useState();
  const [postal, setPostal] = React.useState('');
  const [address, setAddress] = React.useState('');
  const [block, setBlock] = React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#18222E"
        translucent={true}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Datos de residencia del usuario</Text>
      </View>

      <View>
        <Text style={{...styles.verifyText}}>Completa tus datos</Text>
      </View>

      <View style={styles.middleInputsContainer}>
        <ScrollView>
            <TextInput
                placeholder="Pais de residencia"
                placeholderTextColor="#919191"
                style={styles.input}
                onChangeText={setCountry}
                value={country}
            />
            <TextInput
                placeholder="Estadi/Povinicia/Region"
                placeholderTextColor="#919191"
                style={styles.input}
                onChangeText={setRegion}
                value={region}
            />
            <TextInput
                placeholder="Cludad/Comuna"
                placeholderTextColor="#919191"
                style={styles.input}
                onChangeText={setCludad}
                value={cludad}
            />
            <TextInput
                placeholder="Codigo Postal"
                placeholderTextColor="#919191"
                style={styles.input}
                onChangeText={setPostal}
                value={postal}
            />
            <TextInput
                placeholder="Dirección"
                placeholderTextColor="#919191"
                style={styles.input}
                onChangeText={setAddress}
                value={address}
            />
            <TextInput
                placeholder="Bloque/Dpto"
                placeholderTextColor="#919191"
                style={styles.input}
                onChangeText={setBlock}
                value={block}
            />
        </ScrollView>
      </View>

      <View style={styles.footerButtonContainer}>
        <TouchableOpacity>
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
    height: hp('60%'),
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

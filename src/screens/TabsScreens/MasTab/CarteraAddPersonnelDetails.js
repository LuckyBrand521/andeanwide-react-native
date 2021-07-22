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

export default function CarteraAddPersonnelDetails({navigation}) {
  //inputs are in the same pattern as UI
  const [name, setName] = React.useState('');
  const [country, setCountry] = React.useState('');
  const [date, setDate] = useState('');
  const [gendar, setGendar] = useState();
  const [docnumber, setDocnumber] = React.useState('');
  const [dateofIssue, setDateofissue] = React.useState('');
  const [dueDate, setDuedate] = React.useState('');
  const [profession, setProfession] = React.useState('');
  const [status,setStatus]= React.useState('');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#18222E"
        translucent={true}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Datos de usuario</Text>
      </View>

      <View>
        <Text style={{...styles.verifyText}}>Completa tus datos</Text>
      </View>

      <View style={styles.middleInputsContainer}>
        <ScrollView>
          <TextInput
            placeholder="Nombre y Apellidos"
            placeholderTextColor="#919191"
            style={styles.input}
            onChangeText={setName}
            value={name}
          />

          <TextInput
            placeholder="Pais de Nacionalidad"
            placeholderTextColor="#919191"
            style={styles.input}
            onChangeText={setCountry}
            value={country}
          />

          <View style={{...styles.input}}>
            <DatePicker
              style={{width: 150, color: 'white'}}
              date={date} // Initial date from state
              mode="date" // The enum of date, datetime and time
              placeholder="Fecha de nacimiento"
              placeholderTextColor="#fff"
              customStyles={{
                dateIcon: {
                  display: 'none',
                },

                dateText: {
                  color: '#999999',
                },

                dateInput: {
                  borderRadius: 10,
                  borderWidth: 0,
                  color: '#fff',
                  marginLeft: 5,
                  alignItems: 'flex-start',
                },
                placeholderText: {
                  color: '#999999',
                },
              }}
              onDateChange={date => {
                setDate(date);
              }}
            />
          </View>

          <View style={styles.input}>
            <SelectPicker
              placeholderStyle={{color: '#999999'}}
              style={{right: wp('1%')}}
              placeholder="Genero"
              onSelectedStyle={{color: '#999999'}}
              onValueChange={value => {
                // Do anything you want with the value.
                // For example, save in state.
                setGendar(value);
              }}
              selected={gendar}>
              {Object.values(options).map((val, index) => (
                <SelectPicker.Item label={val} value={val} key={index} />
              ))}
            </SelectPicker>
          </View>

          <TextInput
            placeholder="Número de documento"
            keyboardType="number-pad"
            placeholderTextColor="#919191"
            style={styles.input}
            onChangeText={setDocnumber}
            value={docnumber}
          />

          <View
            style={{
              ...styles.input,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <DatePicker
              style={{width: 150, color: 'white'}}
              date={dateofIssue} // Initial date from state
              mode="date" // The enum of date, datetime and time
              placeholder="Fecha de Emisión"
              placeholderTextColor="#fff"
              customStyles={{
                dateIcon: {
                  display: 'none',
                },

                dateText: {
                  color: '#919191',
                },

                dateInput: {
                  borderRadius: 10,
                  borderWidth: 0,
                  color: '#fff',
                  marginLeft: 5,
                  alignItems: 'flex-start',
                },
                placeholderText: {
                  color: '#919191',
                },
              }}
              onDateChange={date => {
                setDateofissue(date);
              }}
            />
            <AntDesign
              style={{position: 'absolute', right: 10}}
              name="caretdown"
              color="#919191"
              size={14}
            />
          </View>

          <View
            style={{
              ...styles.input,
              flexDirection: 'row',
              alignItems: 'center',
            }}>
            <DatePicker
              style={{width: 150, color: 'white'}}
              date={dueDate} // Initial date from state
              mode="date" // The enum of date, datetime and time
              placeholder="Fecha de Vencimiento"
              placeholderTextColor="#fff"
              customStyles={{
                dateIcon: {
                  display: 'none',
                },

                dateText: {
                  color: '#919191',
                },

                dateInput: {
                  borderRadius: 10,
                  borderWidth: 0,
                  color: '#fff',
                  marginLeft: 5,
                  alignItems: 'flex-start',
                },
                placeholderText: {
                  color: '#919191',
                },
              }}
              onDateChange={date => {
                setDuedate(date);
              }}
            />
            <AntDesign
              style={{position: 'absolute', right: 10}}
              name="caretdown"
              color="#919191"
              size={14}
            />
          </View>

          <TextInput
            placeholder="Profesión"
            placeholderTextColor="#919191"
            style={styles.input}
            onChangeText={setProfession}
            value={profession}
          />

          <View
            style={{
              ...styles.input,
              alignItems: 'center',
              flexDirection: 'row',
            }}>
            <SelectPicker
              placeholderStyle={{color: '#999999'}}
              style={{right: wp('1%')}}
              placeholder="Estado Civil"
              onSelectedStyle={{color: '#999999'}}
              onValueChange={value => {
                // Do anything you want with the value.
                // For example, save in state.
                setStatus(value);
              }}
              selected={status}>
              {Object.values(options2).map((val, index) => (
                <SelectPicker.Item label={val} value={val} key={index} />
              ))}
            </SelectPicker>
            <AntDesign
              style={{position: 'absolute', right: 10}}
              name="caretdown"
              color="#919191"
              size={14}
            />
          </View>
        </ScrollView>
      </View>

      <View style={styles.footerButtonContainer}>
        <TouchableOpacity
          onPress={() => navigation.navigate('DocumentVerificationScreen')}>
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
    borderRadius: 10,
    backgroundColor: '#1A8D35',

    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: hp('1.5%'),
    overflow: 'hidden',
    borderWidth: 4,
    borderColor: '#919191',
  },

  buttonText: {
    color: '#fff',
  },
});

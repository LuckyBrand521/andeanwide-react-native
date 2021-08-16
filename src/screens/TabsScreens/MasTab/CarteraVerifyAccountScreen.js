import React from 'react';
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

//icons
import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';

export default function CarteraVerifyAccountScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#18222E"
        translucent={true}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Verificar Cuenta</Text>
      </View>

      <View>
        <Text style={{...styles.verifyText, marginBottom: hp('2%')}}>
          Necesitamos verificar tu identidad{'\n'}
          asi mantendremos tu cuenta segura.
        </Text>
      </View>

      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('CarteraAccountTypeScreen')}>
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
                Verificar identidad
              </Text>
              <Text style={{...styles.verifyText, ...styles.listSubtitle}}>
                Sube una foto o un escaneado de un servicio o{'\n'}
                alguna pagina que verifique tu residencia.
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        {/* <TouchableOpacity
          onPress={() => navigation.navigate('ResidanceVerificationScreen')}>
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
                Verificar residencia
              </Text>
              <Text style={{...styles.verifyText, ...styles.listSubtitle}}>
                Sube una foto o un escaneado de un servicio o{'\n'}
                alguna pagina que verifique tu residencia
              </Text>
            </View>
          </View>
        </TouchableOpacity> */}

        <TouchableOpacity>
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
                Verifica telefono
              </Text>
              <Text style={{...styles.verifyText, ...styles.listSubtitle}}>
                Verifica tu telefono mediante un codigo de confir-{'\n'}mación
              </Text>
            </View>
          </View>
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
    fontSize: 20,
    paddingBottom: 0,
    alignSelf: 'auto',
    textAlign: 'auto',
  },

  listSubtitle: {
    textAlign: 'auto',
    marginTop: 0,
    fontSize: 12,
  },
});

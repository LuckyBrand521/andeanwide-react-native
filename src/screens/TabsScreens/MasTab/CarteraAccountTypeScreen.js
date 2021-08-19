import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';
import Toast from 'react-native-simple-toast';
import Spinner from 'react-native-loading-spinner-overlay';
import {setAccountType} from '../../../../actions';

function CarteraAccountTypeScreen({navigation, setAccountType, userinfo}) {
  const [isLoading, setLoading] = useState(false);
  // submits the account type to /api/users/set-account-type
  const accTypeSubmit = value => {
    const values = {acount_Type: value};
    setLoading(true);
    setAccountType(values)
      .then(() => {
        if (value == 'personal') {
          navigation.navigate('CarteraAddPersonnelDetails');
        } else if (value == 'corporative') {
          navigation.navigate('CarteraAddEmpressa');
        }
      })
      .catch(err => {
        console.log(err);
        Toast.show('Ocurrió un error!', Toast.LONG, ['UIAlertController']);
      })
      .finally(() => {
        setLoading(false);
        // navigation.navigate('CarteraAddPersonnelDetails');
      });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner
          visible={isLoading}
          textContent={'Submitting...'}
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
        <Text style={styles.headerText}>Verificar Cuenta</Text>
      </View>

      <View>
        <Text style={{...styles.verifyText, marginBottom: hp('2%')}}>
          Necesitamos saber que tipo de cuenta quieres.
        </Text>
      </View>

      <View>
        <TouchableOpacity onPress={() => accTypeSubmit('personal')}>
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
                Cuenta Personal
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => accTypeSubmit('corporative')}>
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
                Cuenta empresa
              </Text>
            </View>
          </View>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({
  userinfo: state.root.userinfo,
});

const mapDispatchToProps = dispatch => ({
  setAccountType: values => dispatch(setAccountType(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CarteraAccountTypeScreen);

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
  spinnerTextStyle: {
    color: '#FFF',
  },
  listSubtitle: {
    textAlign: 'auto',
    marginTop: 0,
    fontSize: 12,
  },
});

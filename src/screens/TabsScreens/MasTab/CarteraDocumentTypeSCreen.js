import React from 'react';
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

import {TouchableOpacity} from 'react-native';
import MaterialCommunityIcons from 'react-native-vector-icons/MaterialCommunityIcons';

import {setDocType} from '../../../../actions';

function CarteraDocumentTypeSCreen({navigation, setDocType, userinfo}) {
  const handleSubmit = val => {
    setDocType(val).then(() => {
      if (val == 'dni') {
        navigation.navigate('DocumentVerificationScreen');
      } else if (val == 'passport') {
        navigation.navigate('PassportVerificationScreen');
      }
    });
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
        <Text style={styles.headerText}>Verificar identidad</Text>
      </View>

      <View>
        <Text style={{...styles.verifyText}}>Tipo de documento</Text>
      </View>

      <View>
        <TouchableOpacity onPress={() => handleSubmit('dni')}>
          <View style={styles.listContainer}>
            <MaterialCommunityIcons
              style={styles.documentIcon}
              name="file-document"
              color="#fff"
              size={40}
            />

            <View>
              <Text style={{...styles.headerText, ...styles.listTitle}}>
                Documento de identidad
              </Text>
              <Text style={{...styles.verifyText, ...styles.listSubtitle}}>
                Sube una foto o un escaneado de tu documento{'\n'}de identidad.
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity onPress={() => handleSubmit('passport')}>
          <View style={styles.listContainer}>
            <MaterialCommunityIcons
              style={styles.documentIcon}
              name="file-document"
              color="#fff"
              size={40}
            />

            <View>
              <Text style={{...styles.headerText, ...styles.listTitle}}>
                Pasaporte
              </Text>

              <Text style={{...styles.verifyText, ...styles.listSubtitle}}>
                Sube una foto o un escaneado de tu pasaporte.
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
  setDocType: value => dispatch(setDocType(value)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(CarteraDocumentTypeSCreen);

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

  listContainer: {
    width: wp('100%'),
    height: hp('15%'),
    backgroundColor: '#18222E',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('10%'),
    marginTop: hp('.8%'),
  },

  documentIcon: {
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

import React, {useState, useEffect} from 'react';
import {connect} from 'react-redux';
import APP from '../../../../app.json';
import axios from 'axios';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//icons

import Spinner from 'react-native-loading-spinner-overlay';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import {getRecipientList} from '../../../../actions';

function BeneficiariosScreen({
  navigation,
  recipients,
  token,
  getRecipientList,
}) {
  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    getRecipientList()
      .then(() => {
        setIsLoading(false);
      })
      .catch(err => {
        setIsLoading(false);
        Toast.show('An error occured!', Toast.LONG, ['UIAlertController']);
      });
  }, []);

  const detailView = id => {
    axios
      .get(
        APP.APP_URL + `api/recipients/${id}`,
        {},
        {
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        },
      )
      .then(res => {
        const val = res.data.data;
        let userinfo = {
          name: val.name,
          lastname: val.lastname,
          dni: val.dni,
          country_id: val.country.id,
          bank_id: val.bank.id,
          phone: val.phone,
          email: val.email,
          bank_account: val.bank_account,
          account_type: val.account_type,
          address: val.address,
          document_type: val.document_type,
        };
        navigation.navigate('CrearBeneficiarioScreen', {
          isNew: false,
          userinfo: userinfo,
          token: token,
        });
      })
      .catch(err => {
        console.log(err);
      });
  };

  if (isLoading) {
    return (
      <SafeAreaView style={styles.container}>
        <Spinner
          visible={isLoading}
          textContent={'Colecting data...'}
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
        <Text style={styles.headerText}>Destinatario</Text>
      </View>

      <View style={{flex: 1}}>
        <TouchableOpacity>
          <View style={styles.listContainer}>
            <View style={styles.listdataContainer}>
              <MaterialIcons name="search" size={30} color="#fff" />

              <Text
                style={{
                  ...styles.headerText,
                  ...styles.listTitle,
                  marginLeft: 10,
                }}>
                Buscar Beneficiario
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <TouchableOpacity
          onPress={() =>
            navigation.navigate('CrearBeneficiarioScreen', {
              isNew: true,
              userinfo: null,
              token: token,
            })
          }>
          <View style={styles.listContainer}>
            <View style={styles.listdataContainer}>
              <MaterialIcons name="person-add" size={30} color="#fff" />

              <Text
                style={{
                  ...styles.headerText,
                  ...styles.listTitle,
                  marginLeft: 10,
                }}>
                Crear Beneficiario
              </Text>
            </View>
          </View>
        </TouchableOpacity>

        <Text style={{...styles.verifyText}}>Cuentas Vinculadas</Text>
        <View style={{flex: 1}}>
          <FlatList
            keyExtractor={item => item.id}
            data={recipients}
            renderItem={({item}) => {
              return (
                <TouchableOpacity
                // onPress={() =>
                //   // navigation.navigate('CarteraAccountTypeScreen')
                // }>
                >
                  <View
                    style={{
                      ...styles.listContainer,
                      backgroundColor: '#185341',
                      flex: 1,
                    }}>
                    <View style={{...styles.plusCircle, flex: 1}}>
                      <Text style={{...styles.headerText, ...styles.listTitle}}>
                        {item.name[0] + ' ' + item.lastname[0]}
                      </Text>
                    </View>

                    <View style={{flex: 4}}>
                      <Text style={{...styles.headerText, ...styles.listTitle}}>
                        {item.name}
                      </Text>
                      <Text
                        style={{
                          ...styles.verifyText,
                          ...styles.listSubtitle,
                        }}>
                        {item.type + ' ' + item.phone}
                      </Text>
                    </View>
                    <View style={{flex: 1}} />

                    {/* <Image source={item.country} style={styles.country} /> */}
                  </View>
                </TouchableOpacity>
              );
            }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const mapStateToProps = state => ({
  recipients: state.root.recipients,
  token: state.root.token,
});

const mapDispatchToProps = dispatch => ({
  getRecipientList: values => dispatch(getRecipientList(values)),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(BeneficiariosScreen);

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
    marginBottom: hp('1%'),
  },

  listContainer: {
    width: wp('100%'),
    height: hp('12%'),
    backgroundColor: '#18222E',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('10%'),
    marginTop: 3,
    justifyContent: 'space-between',
  },

  plusCircle: {
    width: 45,
    height: 45,
    borderRadius: 25,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: wp('4%'),
    backgroundColor: '#181A7A',
  },

  listTitle: {
    fontSize: 15,
    alignSelf: 'auto',
    textAlign: 'auto',
  },

  listSubtitle: {
    textAlign: 'auto',
    marginTop: 0,
    fontSize: 12,
  },

  listdataContainer: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  country: {
    width: 40,
    height: 40,
    borderRadius: 20,
    position: 'absolute',
    right: 15,
  },
});

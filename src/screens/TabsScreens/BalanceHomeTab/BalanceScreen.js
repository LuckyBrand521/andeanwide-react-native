import React, {useState} from 'react';
import {connect} from 'react-redux';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Carousel from 'react-native-looped-carousel';
import Octicons from 'react-native-vector-icons/Octicons';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Modal from 'react-native-modal';

import {numberWithCommas} from '../../../data/helpers';

function BalanceScreen({navigation, userinfo, orders}) {
  const [modalVisible, setModalVisible] = useState(false);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#18222E"
        translucent={true}
      />
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modal_container}>
          <Text style={styles.modal_header}>
            Próximamente, en breve, pronto
          </Text>
        </View>
      </Modal>

      <View style={styles.header}>
        <Octicons
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}
          name="gear"
          size={24}
          color="#fff"
          style={{
            flex: 1,
            textAlign: 'left',
          }}
        />
        <Text style={{...styles.headerText, flex: 1, textAlign: 'center'}}>
          Cartera
        </Text>
        <Icon
          name="qrcode"
          style={{flex: 1, textAlign: 'right'}}
          size={24}
          color="#fff"
        />
        {/* <Octicons
          onPress={() => {
            navigation.navigate('LoginScreen');
          }}
          name="qr-code"
          style={{flex: 1, textAlign: 'right'}}
          size={24}
          color="#fff"
        /> */}
      </View>

      <View style={styles.middleInputsContainer}>
        <Carousel
          delay={2000}
          style={{width: wp('90%'), height: 180, alignSelf: 'center'}}
          autoplay={false}
          pageInfo={false}
          bullets={true}
          bulletsContainerStyle={{position: 'absolute', bottom: -30}}
          chosenBulletStyle={{
            width: 23,
            height: 6,
            borderRadius: 0,

            borderRadius: 2,
          }}
          bulletStyle={{
            width: 23,
            height: 6,

            borderWidth: 0,
            backgroundColor: '#2C3240',
          }}
          onAnimateNextPage={p => console.log(p)}>
          <View key={1} style={styles.card}>
            <View style={styles.cardButtonContainer}>
              <TouchableOpacity
                onPress={() => {
                  navigation.navigate('DepositScreen');
                }}>
                <View style={styles.button}>
                  <Text style={styles.btnText}>Deposito</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={toggleModal}>
                <View style={styles.button}>
                  <Text style={styles.btnText}>Retiro</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardText}>CLP</Text>
              <Text style={{...styles.cardText, fontSize: 40}}>
                {numberWithCommas(userinfo.balance)}
              </Text>
              <Text style={{...styles.cardText, color: '#1A8D35'}}>
                Disponsible
              </Text>
            </View>
          </View>

          <View key={2} style={styles.card}>
            <View style={styles.cardButtonContainer}>
              <TouchableOpacity>
                <View style={{...styles.button, backgroundColor: '#617E96'}}>
                  <Text style={styles.btnText}>Deposito</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={toggleModal}>
                <View style={{...styles.button, backgroundColor: '#617E96'}}>
                  <Text style={styles.btnText}>Retiro</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardText}>USD</Text>
              <Text style={{...styles.cardText, fontSize: 40}}>0.00</Text>
              <Text style={{...styles.cardText, color: '#1A8D35'}}>
                Disponible
              </Text>
            </View>
          </View>

          <View key={3} style={styles.card}>
            <View style={styles.cardButtonContainer}>
              <TouchableOpacity>
                <View style={{...styles.button, backgroundColor: '#296945'}}>
                  <Text style={styles.btnText}>Deposito</Text>
                </View>
              </TouchableOpacity>

              <TouchableOpacity onPress={toggleModal}>
                <View style={{...styles.button, backgroundColor: '#296945'}}>
                  <Text style={styles.btnText}>Retiro</Text>
                </View>
              </TouchableOpacity>
            </View>
            <View style={styles.cardTextContainer}>
              <Text style={styles.cardText}>EUR</Text>
              <Text style={{...styles.cardText, fontSize: 40}}>0.00</Text>
              <Text style={{...styles.cardText, color: '#1A8D35'}}>
                Disponible
              </Text>
            </View>
          </View>
        </Carousel>
        <Text
          style={{
            ...styles.headerText,
            paddingTop: 35,
            textAlign: 'center',
            color: '#aaa',
          }}>
          Transacciones
        </Text>

        <View style={styles.trasactionsTitle}>
          <Text
            style={{
              ...styles.btnText,
              color: '#707A81',
              fontSize: 18,
              flex: 2,
            }}>
            Cantidad
          </Text>
          <Text
            style={{
              ...styles.btnText,
              color: '#707A81',
              fontSize: 18,
              flex: 2,
            }}>
            Fecha{' '}
          </Text>
          <Text
            style={{
              ...styles.btnText,
              color: '#707A81',
              fontSize: 18,
              flex: 1,
            }}>
            Estatus
          </Text>
        </View>
      </View>
      <ScrollView>
        {orders.length > 0 &&
          orders.map(item => {
            return (
              <TouchableOpacity style={styles.transactionsList} key={item.id}>
                <Text
                  style={{
                    color: '#fff',
                    fontSize: 18,
                    flex: 2,
                  }}>
                  {numberWithCommas(item.payment_amount)}
                </Text>
                <Text style={{color: '#fff', fontSize: 18, flex: 2}}>
                  {item.payed_at}
                </Text>

                <Text style={{...styles.btnText, fontSize: 14, flex: 1}}>
                  {item.payout_status}
                </Text>
              </TouchableOpacity>
            );
          })}
      </ScrollView>
      {/* <View style={styles.footerButtonContainer}>
        <TouchableOpacity>
          <LinearGradient
            start={{x: 0, y: 0}}
            end={{x: 1, y: 0}}
            colors={['#119438', '#1A9B36', '#1B9D36']}
            style={styles.continueButton}>
            <Text style={styles.buttonText}>Convertir</Text>
          </LinearGradient>
        </TouchableOpacity>
      </View> */}
    </SafeAreaView>
  );
}
const mapStateToProps = state => ({
  userinfo: state.root.userinfo,
  orders: state.root.orders,
});

// const mapDispatchToProps = dispatch => ({
//   removeUserToken: values => dispatch(removeUserToken(null)),
// });

export default connect(mapStateToProps)(BalanceScreen);

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: Platform.OS === 'ios' ? StatusBar.currentHeight : 0,
    backgroundColor: '#141A28',
  },

  header: {
    width: wp('100%'),
    height: hp('12%'),
    marginTop: hp('2%'),
    backgroundColor: '#18222E',
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'flex-end',
    paddingHorizontal: 20,
    paddingBottom: 10,
  },

  headerText: {
    color: '#ffffff',
    fontSize: 18,
    fontWeight: 'bold',
  },

  verifyText: {
    color: '#919191',
    fontSize: 14,
    textAlign: 'center',
    marginTop: hp('1%'),
  },
  middleInputsContainer: {
    backgroundColor: '#18222E',
    height: hp('42%'),
    width: wp('100%'),
    padding: 25,
    marginTop: 0,
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
    position: 'relative',
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
    fontSize: 18,
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

  card: {
    backgroundColor: 'transparent',
    width: wp('90%'),
    height: 180,
    overflow: 'hidden',
  },

  cardText: {
    color: '#fff',
    fontSize: 18,
  },

  cardTextContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
    alignItems: 'center',
  },

  button: {
    width: wp('30%'),
    height: 30,
    borderRadius: 10,
    backgroundColor: '#353535',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontSize: 16,
  },

  cardButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  trasactionsTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('1%'),
  },

  transactionsList: {
    height: hp('11%'),
    backgroundColor: '#18222E',
    marginTop: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  modal_container: {
    backgroundColor: '#1a2138',
    height: 200,
    borderRadius: 10,
    borderWidth: 0,
    paddingTop: 10,
    paddingBottom: 15,
    flexDirection: 'column',
    justifyContent: 'center',
  },
  modal_header: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
    alignSelf: 'center',
  },
});

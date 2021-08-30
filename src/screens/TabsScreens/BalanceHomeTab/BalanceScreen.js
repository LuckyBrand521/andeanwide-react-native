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
import CircleWithLabel from '../../../components/subviews/CircleWithLabel';

import {numberWithCommas} from '../../../data/helpers';

const formatDate = date_str => {
  const d = new Date(date_str);
  const d_str = d.toDateString();
  return d_str.substr(4);
};

const trimName = name => {
  if (name.length > 15) {
    return name.substr(0, 14) + '...';
  }
  return name;
};

const colorLabel = order => {
  // if (order.status == 'COMPLETED') {
  //   return (
  //     <Text
  //       style={{
  //         ...styles.btnText,
  //         fontSize: 18,
  //         flex: 1,
  //         textAlign: 'right',
  //         color: '#D21019',
  //       }}>
  //       {numberWithCommas(order.payment_amount)} {order.pair.base.name}
  //     </Text>
  //   );
  // } else if (order.status == 'PAYOUT_RECEIVED') {
  return (
    <Text
      style={{
        ...styles.btnText,
        fontSize: 14,
        flex: 1,
        textAlign: 'right',
        color: '#0BCE5E',
      }}>
      {order.pair.base.name} {numberWithCommas(order.payment_amount)}
    </Text>
  );
  // }
};

function BalanceScreen({navigation, userinfo, orders}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [detailIndex, setDetailIndex] = useState(-1);
  const toggleModal = () => {
    setModalVisible(!modalVisible);
  };
  const toggleDetailModal = index => {
    setDetailModalVisible(!detailModalVisible);
    setDetailIndex(index);
  };
  let date_label = '';
  let order_rows = [];
  for (let i = 0; i < orders.length; i++) {
    if (formatDate(orders[i].filled_at) != date_label) {
      date_label = formatDate(orders[i].filled_at);
      order_rows.push(
        <Text style={{color: '#919191', padding: 8, paddingHorizontal: 20}}>
          {date_label}
        </Text>,
      );
    }
    order_rows.push(
      <TouchableOpacity
        style={{...styles.transactionsList, justifyContent: 'space-around'}}
        key={orders[i].id}
        onPress={() => {
          toggleDetailModal(i);
        }}>
        <View style={{flexDirection: 'row', alignItems: 'center'}}>
          <CircleWithLabel
            label={
              orders[i].recipient.name[0] + orders[i].recipient.lastname[0]
            }
          />
          <Text style={{...styles.headerText, fontSize: 12}}>
            {trimName(orders[i].recipient.name)}
          </Text>
        </View>

        {colorLabel(orders[i])}
      </TouchableOpacity>,
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
      <Modal
        isVisible={modalVisible}
        onBackdropPress={() => setModalVisible(false)}>
        <View style={styles.modal_container}>
          <Icon
            name="bullhorn"
            style={{
              textAlign: 'center',
            }}
            size={40}
            color="#fff"
          />
          <Text style={styles.modal_header}>
            Próximamente, en breve, pronto
          </Text>
        </View>
      </Modal>
      <Modal
        isVisible={detailModalVisible}
        onBackdropPress={() => setDetailModalVisible(false)}>
        {detailIndex > -1 ? (
          <>
            <View style={styles.modal_container}>
              <Text style={{color: '#959595'}}>FECHA:</Text>
              <Text style={{color: 'white', fontSize: 18}}>
                {orders[detailIndex].filled_at}
              </Text>
              <Text style={{color: '#959595'}}>BENEFICIARIO:</Text>
              <Text style={{color: 'white', fontSize: 18}}>
                {orders[detailIndex].recipient.name}
              </Text>
              <Text style={{color: '#959595'}}>MONTO ENVIADO:</Text>
              <Text style={{color: 'white', fontSize: 18}}>
                {orders[detailIndex].payment_amount}{' '}
                {orders[detailIndex].pair.base.name}
              </Text>
              <Text style={{color: '#959595'}}>MONTO RECIBIDO:</Text>
              <Text style={{color: 'white', fontSize: 18}}>
                {orders[detailIndex].received_amount}{' '}
                {orders[detailIndex].pair.quote.name}
              </Text>
              <Text style={{color: '#959595'}}>TASA:</Text>
              <Text style={{color: 'white', fontSize: 18}}>
                {orders[detailIndex].rate.toFixed(4)}{' '}
                {orders[detailIndex].pair.name}
              </Text>
            </View>
          </>
        ) : (
          <></>
        )}
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
        <View style={{flex: 5, alignItems: 'center'}}>
          <View style={styles.nameHeader}>
            <CircleWithLabel
              label={
                userinfo.identity.firstname[0] + userinfo.identity.lastname[0]
              }
            />
            <Text style={{...styles.headerText}}>{userinfo.name}</Text>
          </View>
        </View>
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
          style={{
            width: wp('90%'),
            height: 175,
            alignSelf: 'center',
            marginTop: 15,
            marginBottom: 15,
          }}
          autoplay={false}
          pageInfo={false}
          bullets={true}
          bulletsContainerStyle={{position: 'absolute', bottom: -10}}
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
              <Text style={{...styles.cardText, fontSize: 28}}>
                {numberWithCommas(userinfo.balance)}
              </Text>
              <Text
                style={{
                  ...styles.cardText,
                  color: '#0A9F4B',
                  fontSize: 16,
                  marginTop: 10,
                }}>
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
              <Text style={{...styles.cardText, fontSize: 28}}>0.00</Text>
              <Text
                style={{
                  ...styles.cardText,
                  color: '#0A9F4B',
                  fontSize: 16,
                  marginTop: 10,
                }}>
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
              <Text style={{...styles.cardText, fontSize: 28}}>0.00</Text>
              <Text
                style={{
                  ...styles.cardText,
                  color: '#0A9F4B',
                  fontSize: 16,
                  marginTop: 10,
                }}>
                Disponible
              </Text>
            </View>
          </View>
        </Carousel>
        <Text
          style={{
            ...styles.headerText,
            paddingTop: 10,
            paddingBottom: 10,
            textAlign: 'center',
            color: '#fff',
            backgroundColor: '#141A28',
            width: wp('100%'),
            marginHorizontal: 0,
            fontSize: 15,
          }}>
          Transacciones
        </Text>
      </View>
      <ScrollView>
        <Text style={{backgroundColor: '#18222E', height: 4}} />
        {order_rows}
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
    height: hp('10%'),
    marginTop: hp('6%'),
    marginBottom: hp('0.5%'),
    backgroundColor: '#18222E',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
  },

  headerText: {
    color: '#ffffff',
    fontSize: 16,
    paddingHorizontal: 10,
  },

  verifyText: {
    color: '#919191',
    fontSize: 14,
    textAlign: 'center',
    marginTop: hp('1%'),
  },
  middleInputsContainer: {
    backgroundColor: '#18222E',
    // height: hp('42%'),
    width: wp('100%'),
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
    fontSize: 12,
  },

  cardTextContainer: {
    paddingHorizontal: 20,
    paddingVertical: 16,
    alignItems: 'center',
  },

  button: {
    width: wp('30%'),
    height: 30,
    borderRadius: 10,
    backgroundColor: '#3D4650',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontSize: 14,
  },

  cardButtonContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 8,
  },
  trasactionsTitle: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginTop: hp('1%'),
    paddingHorizontal: 10,
  },

  transactionsList: {
    height: hp('6%'),
    backgroundColor: '#18222E',
    marginTop: 3,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
  },
  modal_container: {
    backgroundColor: '#1a2138',
    height: 'auto',
    borderRadius: 10,
    borderWidth: 0,
    paddingTop: 10,
    paddingBottom: 15,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal_header: {
    marginTop: 10,
    fontSize: 16,
    color: '#fff',
    alignSelf: 'center',
  },
  nameHeader: {
    width: 'auto',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 5,
    borderRadius: 100,
    backgroundColor: '#141A27',
    borderWidth: 0,
    flexDirection: 'row',
  },
});

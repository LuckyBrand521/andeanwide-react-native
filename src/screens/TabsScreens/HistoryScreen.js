import React, {useState, useRef} from 'react';
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
  Image,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Modal from 'react-native-modal';
import Icon from 'react-native-vector-icons/FontAwesome';
import CircleWithLabel from '../../components/subviews/CircleWithLabel';
import {numberWithCommas} from '../../data/helpers';

const formatDate = date_str => {
  const d = new Date(date_str);
  const d_str = d.toDateString();
  return d_str.substr(4);
};
const trimDigit = value => {
  let number = Number(value);
  if (Number.isInteger(number)) {
    return number;
  } else {
    return number.toFixed(2);
  }
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
  //         color: '#0BCE5E',
  //       }}>
  //       {order.pair.base.name} {numberWithCommas(order.payment_amount)}
  //     </Text>
  //   );
  //   // } else if (order.status == 'PAYOUT_RECEIVED') {
  // } else {
  return (
    <Text
      style={{
        ...styles.btnText,
        fontSize: 18,
        flex: 1,
        textAlign: 'right',
        color: '#0BCE5E',
      }}>
      {order.pair.quote.name}{' '}
      {numberWithCommas(trimDigit(order.received_amount))}
    </Text>
  );
  // }
};
function HistoryScreen({navigation, userinfo, orders}) {
  const [detailModalVisible, setDetailModalVisible] = useState(false);
  const [detailIndex, setDetailIndex] = useState(-1);
  const toggleDetailModal = index => {
    setDetailModalVisible(!detailModalVisible);
    setDetailIndex(index);
  };
  let date_label = '';
  let order_rows = [];
  for (let i = 0; i < orders.length; i++) {
    let temp = orders[i].filled_at.replace(' ', 'T');
    temp = new Date(temp).toDateString();
    if (temp != date_label) {
      date_label = temp;
      order_rows.push(
        <Text
          style={{color: '#919191', padding: 8, paddingHorizontal: 20}}
          key={temp}>
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
          <Text
            style={{
              ...styles.headerText,
              fontWeight: 'normal',
              marginLeft: 10,
            }}>
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
        isVisible={detailModalVisible}
        onBackdropPress={() => setDetailModalVisible(false)}>
        {detailIndex > -1 ? (
          <>
            <View style={styles.modal_container}>
              <Icon
                name="times-circle-o"
                size={20}
                color="#919191"
                style={{position: 'absolute', left: 20, top: 15}}
                onPress={() => setDetailModalVisible(false)}
              />
              <Text
                style={{
                  color: '#959595',
                  marginTop: 5,
                  marginBottom: 5,
                  alignSelf: 'center',
                }}>
                Fecha: {orders[detailIndex].filled_at}
              </Text>
              <View
                style={{
                  textAlign: 'left',
                  borderBottomWidth: 2,
                  borderBottomColor: '#aaa',
                  paddingBottom: 15,
                  marginBottom: 10,
                }}>
                <Text style={{color: 'white', fontSize: 16, marginBottom: 5}}>
                  Envio
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={{flex: 1}}>
                    <Text style={{color: '#959595'}}>Monto a enviar:</Text>
                    <Text style={{color: 'white', fontSize: 16}}>
                      {orders[detailIndex].payment_amount}{' '}
                      {orders[detailIndex].pair.base.name}
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={{color: '#959595'}}>Tipo de cambio:</Text>
                    <Text style={{color: 'white', fontSize: 16}}>
                      1{orders[detailIndex].pair.base.name} ={' '}
                      {orders[detailIndex].rate.toFixed(4)}{' '}
                      {orders[detailIndex].pair.quote.name}
                    </Text>
                  </View>
                </View>
              </View>
              <View>
                <Text style={{color: 'white', fontSize: 16, marginBottom: 5}}>
                  Beneficiario
                </Text>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 10,
                  }}>
                  <View style={{flex: 1}}>
                    <Text style={{color: '#959595'}}>Nombre:</Text>
                    <Text style={{color: 'white', fontSize: 16}}>
                      {orders[detailIndex].recipient.name}
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={{color: '#959595'}}>Cuenta:</Text>
                    <Text style={{color: 'white', fontSize: 16}}>
                      {orders[detailIndex].payment.transaction_number}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                    marginBottom: 10,
                  }}>
                  <View style={{flex: 1}}>
                    <Text style={{color: '#959595'}}>Banco:</Text>
                    <Text style={{color: 'white', fontSize: 16}}>
                      {orders[detailIndex].recipient.bank.name}
                    </Text>
                  </View>
                  <View style={{flex: 1}}>
                    <Text style={{color: '#959595'}}>Tipo de cuenta:</Text>
                    <Text style={{color: 'white', fontSize: 16}}>
                      {orders[detailIndex].recipient.account_type}
                    </Text>
                  </View>
                </View>
                <View
                  style={{
                    flexDirection: 'row',
                  }}>
                  <View style={{flex: 1}}>
                    <Text style={{color: '#959595'}}>Monto a recibir:</Text>
                    <Text style={{color: 'white', fontSize: 16}}>
                      {orders[detailIndex].received_amount.toFixed(2)}{' '}
                      {orders[detailIndex].pair.quote.name}
                      {'   '}
                      <Image
                        source={{
                          uri:
                            'https://flagcdn.com/h60/' +
                            orders[
                              detailIndex
                            ].recipient.country.abbr.toLowerCase() +
                            '.png',
                        }}
                        style={{
                          height: 25,
                          width: 25,
                          borderColor: 'transparent',
                          overflow: 'hidden',
                        }}
                      />
                    </Text>
                  </View>
                </View>
              </View>
              <View
                style={{
                  marginTop: hp('14%'),
                  alignItems: 'center',
                  marginBottom: 5,
                }}>
                <Text
                  style={{
                    padding: 5,
                    fontSize: 10,
                    paddingHorizontal: 30,
                    color: '#12CF38',
                    borderColor: '#12CF38',
                    borderWidth: 1,
                    borderRadius: 20,
                  }}>
                  {orders[detailIndex].status}
                </Text>
              </View>
            </View>
          </>
        ) : (
          <></>
        )}
      </Modal>
      <View style={styles.header}>
        <Text style={{...styles.headerText, textAlign: 'center'}}>
          Transacciones Historia
        </Text>
      </View>
      <ScrollView>
        <Text style={{backgroundColor: '#18222E', height: 4}} />
        {order_rows}
      </ScrollView>
    </SafeAreaView>
  );
}
const mapStateToProps = state => ({
  userinfo: state.root.userinfo,
  orders: state.root.orders,
});

// const mapDispatchToProps = dispatch => ({
//   setAccountType: values => dispatch(setAccountType(values)),
// });

export default connect(
  mapStateToProps,
  // mapDispatchToProps,
)(HistoryScreen);

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
    backgroundColor: '#BADA55',
    width: wp('85%'),
    height: 180,
    borderRadius: 20,
    overflow: 'hidden',
  },

  cardText: {
    color: '#fff',
    fontSize: 18,
  },

  cardTextContainer: {
    paddingHorizontal: 20,
    paddingVertical: 15,
  },

  button: {
    width: wp('35%'),
    height: 45,
    borderRadius: 10,
    backgroundColor: '#35BC6F',
    justifyContent: 'center',
    alignItems: 'center',
  },

  btnText: {
    color: '#fff',
    fontSize: 20,
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
    backgroundColor: '#141B28',
    height: 'auto',
    width: wp('85%'),
    alignSelf: 'center',
    borderRadius: 35,
    borderWidth: 0,
    paddingTop: 10,
    paddingBottom: 15,
    paddingHorizontal: 20,
    flexDirection: 'column',
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

import React, {useState, useEffect} from 'react';
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

import Carousel from 'react-native-looped-carousel';
import Octicons from 'react-native-vector-icons/Octicons';
import LinearGradient from 'react-native-linear-gradient';
import Icon from 'react-native-vector-icons/FontAwesome';
import Spinner from 'react-native-loading-spinner-overlay';
import Modal from 'react-native-modal';
import CircleWithLabel from '../../../components/subviews/CircleWithLabel';

import {numberWithCommas} from '../../../data/helpers';
import {getOrderHistory} from '../../../../actions';
import {Button} from 'react-native';

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

function BalanceScreen({navigation, userinfo, orders, getOrderHistory}) {
  const [modalVisible, setModalVisible] = useState(false);
  const [isLoading, setLoading] = useState(false);
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
    let temp = orders[i].filled_at.replace(' ', 'T');
    temp = new Date(temp).toDateString();
    if (temp != date_label) {
      // date_label = formatDate(orders[i].filled_at);
      date_label = temp;
      // console.log(orders[i].filled_at.split(' ')[0]);
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
          <Text style={{...styles.headerText, fontSize: 13}}>
            {trimName(orders[i].recipient.name)}
          </Text>
        </View>

        {colorLabel(orders[i])}
      </TouchableOpacity>,
    );
  }

  useEffect(() => {
    navigation.addListener('focus', () => {
      setLoading(true);
      getOrderHistory()
        .then(() => {
          setLoading(false);
        })
        .catch(err => {
          console.log(err);
          setLoading(false);
        });
    });
  }, [navigation]);

  if (isLoading) {
    return (
      <SafeAreaView style={{...styles.container, alignItems: 'center'}}>
        <Spinner
          visible={isLoading}
          textContent={'Envío de datos...'}
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
              <Icon
                name="times"
                size={15}
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
                      {orders[detailIndex].received_amount}{' '}
                      {orders[detailIndex].pair.quote.name}
                      {'   '}
                      <Image
                        source={{
                          uri:
                            'https://flagcdn.com/w20/' +
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
        <Octicons
          // onPress={() => {
          //   navigation.navigate('LoginScreen');
          // }}
          name="gear"
          size={24}
          color="#fff"
          style={{
            flex: 1,
            textAlign: 'left',
          }}
          onPress={toggleModal}
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
          onPress={toggleModal}
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

const mapDispatchToProps = dispatch => ({
  // removeUserToken: values => dispatch(removeUserToken(null)),
  getOrderHistory: () => dispatch(getOrderHistory()),
});

export default connect(mapStateToProps, mapDispatchToProps)(BalanceScreen);

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
    fontSize: 14,
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
    fontSize: 14,
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
  spinnerTextStyle: {
    color: '#FFF',
  },
});

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
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import Carousel from 'react-native-looped-carousel';
import Octicons from 'react-native-vector-icons/Octicons';
import LinearGradient from 'react-native-linear-gradient';
import Modal from 'react-native-modal';
import CircleWithLabel from '../../components/subviews/CircleWithLabel';
import {numberWithCommas} from '../../data/helpers';

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
        fontSize: 18,
        flex: 1,
        textAlign: 'right',
        color: '#0BCE5E',
      }}>
      {numberWithCommas(order.payment_amount)} {order.pair.base.name}
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

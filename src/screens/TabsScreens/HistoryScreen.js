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

import {numberWithCommas} from '../../data/helpers';

function HistoryScreen({navigation, userinfo, orders}) {
  console.log(orders.length);
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#18222E"
        translucent={true}
      />
      <View style={styles.header}>
        <Text style={{...styles.headerText, textAlign: 'center'}}>
          Transacciones Historia
        </Text>
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
});

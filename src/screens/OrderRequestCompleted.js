import React from 'react';
import {
  StyleSheet,
  Text,
  SafeAreaView,
  View,
  Image,
  StatusBar,
  Platform,
} from 'react-native';
import {TouchableOpacity} from 'react-native-gesture-handler';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

export default function OrderRequestCompleted({navigation}) {
  const [active, setActive] = useState(true);
  useEffect(() => {
    setTimeout(() => {
      setActive(false);
      navigation.navigate('BalanceStack', {
        screen: 'BalanceScreen',
      });
    }, 5000);
  }, []);

  return active ? (
    <SafeAreaView style={styles.container}>
      <StatusBar
        barStyle="light-content"
        hidden={false}
        backgroundColor="#18222E"
        translucent={true}
      />
      <View style={styles.header} />

      <View style={styles.subContainer}>
        <Image
          style={styles.image}
          source={require('../images/completed.png')}
        />

        <Text style={styles.title}>Pedido solicitado!</Text>
        <Text style={styles.subtTitle}>
          Solicitud de nuevo pedido completada correctamente {'\n'}
          Espere hasta que se confirme
        </Text>

        <TouchableOpacity
          onPress={() => {
            navigation.navigate('BalanceStack', {
              screen: 'BalanceScreen',
            });
          }}>
          <Text style={styles.continueButton}>Continuar on Andean Wide</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  ) : null;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#131925',
    paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
  },

  header: {
    width: wp('100%'),
    height: hp('8%'),
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

  image: {
    width: 200,
    height: 200,
    alignSelf: 'center',
  },

  title: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 20,
    textAlign: 'center',
    marginTop: hp('1%'),
  },

  subtTitle: {
    fontSize: 14,
    color: '#999999',
    textAlign: 'center',
    marginTop: hp('2%'),
  },

  continueButton: {
    fontSize: 14,
    color: '#fff',
    textDecorationLine: 'underline',
    textAlign: 'center',
    marginTop: hp('8%'),
  },

  subContainer: {
    marginTop: hp('10%'),
  },
});

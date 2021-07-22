import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  TouchableOpacity,
  FlatList,
  Image
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//icons

import MaterialIcons from 'react-native-vector-icons/MaterialIcons';


export default function BeneficiariosScreen({navigation}) {
  const [gallery, useGallery] = React.useState([
    {
      id: '1',
      name: 'NC',
      country: require('../../../images/country.png'),
      title: 'NELVINSO JOSE CHAVEZ CUBA',
      subtitle: 'BANCOLOMBIA / 612000000155',
    },
    {
      id: '2',
      name: 'MT',
      country: require('../../../images/country.png'),
      title: 'MIGUEL ÀNGEL TORRES COL',
      subtitle: 'BANCOLOMBIA / 235000001016',
    },
  ]);
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

      <View>
        <TouchableOpacity
          >
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

        <TouchableOpacity onPress={() => navigation.navigate('CrearBeneficiarioScreen')}>
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

        <View>
          <Text style={{...styles.verifyText}}>Cuentas Vinculadas</Text>

          <View style={styles.mainWrapper}>
            <FlatList
              keyExtractor={item => item.id}
              data={gallery}
              renderItem={({item}) => {
                return (
                  <TouchableOpacity
                    onPress={() =>
                      navigation.navigate('CarteraAccountTypeScreen')
                    }>
                    <View
                      style={{
                        ...styles.listContainer,
                        backgroundColor: '#185341',
                      }}>
                      <View style={styles.plusCircle}>
                        <Text
                          style={{...styles.headerText, ...styles.listTitle}}>
                          {item.name}
                        </Text>
                      </View>

                      <View>
                        <Text
                          style={{...styles.headerText, ...styles.listTitle}}>
                          {item.title}
                        </Text>
                        <Text
                          style={{
                            ...styles.verifyText,
                            ...styles.listSubtitle,
                          }}>
                          {item.subtitle}
                        </Text>
                      </View>

                      <Image source={item.country} style={styles.country} />
                    </View>
                  </TouchableOpacity>
                );
              }}
            />
          </View>
        </View>
      </View>
    </SafeAreaView>
  );
}

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
    height: hp('13%'),
    backgroundColor: '#18222E',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('10%'),
    marginTop: hp('.8%'),
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

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  Platform,
  StatusBar,
  ScrollView,
} from 'react-native';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import LinearGradient from 'react-native-linear-gradient';
import AntDesign from 'react-native-vector-icons/AntDesign';
import {TouchableOpacity} from 'react-native';

export default function EmpresaVerficationMenuScreen({navigation}) {
  return (
    <SafeAreaView style={styles.container}>
        <StatusBar
            barStyle="light-content"
            hidden={false}
            backgroundColor="#18222E"
            translucent={true}
        />
        <View style={styles.header}>
            <Text style={styles.headerText}>Verificar Empresa</Text>
        </View>

        <View>
            <Text style={{...styles.verifyText}}>
            Sube una foto o un escaneado de los siguientes{'\n'}
            documentos.
            </Text>
        </View>
        <View style={styles.middleInputsContainer}>
            <ScrollView>
                <TouchableOpacity
                onPress={() => navigation.navigate('CarteraDocumentTypeSCreen')}>
                <View style={styles.listContainer}>
                    <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        colors={['#078F41', '#17DD6F']}
                        style={styles.plusCircle}>
                        <AntDesign name="plus" size={16} color="#fff" />
                    </LinearGradient>

                    <View>
                        <Text style={{...styles.headerText, ...styles.listTitle}}>
                        Escritura de la empresa
                        </Text>
                    </View>
                </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('CarteraAddEmpresa')}>
                    <View style={styles.listContainer}>
                        <LinearGradient
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            colors={['#078F41', '#17DD6F']}
                            style={styles.plusCircle}>
                            <AntDesign name="plus" size={16} color="#fff" />
                        </LinearGradient>

                        <View>
                            <Text style={{...styles.headerText, ...styles.listTitle}}>
                                Cuenta empresa
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('CarteraAddEmpresa')}>
                    <View style={styles.listContainer}>
                        <LinearGradient
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            colors={['#078F41', '#17DD6F']}
                            style={styles.plusCircle}>
                            <AntDesign name="plus" size={16} color="#fff" />
                        </LinearGradient>
                        <View>
                            <Text style={{...styles.headerText, ...styles.listTitle}}>
                                Certificado de vigencia{'\n'}
                                <Text style={{...styles.textInsideMenu}}>(No menor a 30 dias)
                                </Text>
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('CarteraAddEmpresa')}>
                    <View style={styles.listContainer}>
                        <LinearGradient
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            colors={['#078F41', '#17DD6F']}
                            style={styles.plusCircle}>
                            <AntDesign name="plus" size={16} color="#fff" />
                        </LinearGradient>

                        <View>
                            <Text style={{...styles.headerText, ...styles.listTitle}}>
                                Carpeta Turbutria
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
                <TouchableOpacity
                    onPress={() => navigation.navigate('CarteraAddEmpresa')}>
                    <View style={styles.listContainer}>
                        <LinearGradient
                            start={{x: 0, y: 0}}
                            end={{x: 1, y: 0}}
                            colors={['#078F41', '#17DD6F']}
                            style={styles.plusCircle}>
                            <AntDesign name="plus" size={16} color="#fff" />
                        </LinearGradient>

                        <View>
                            <Text style={{...styles.headerText, ...styles.listTitle}}>
                                Declaraciones de Impuesto{'\n'}
                                <Text style={{...styles.textInsideMenu}}>(Ultimos dos)
                                </Text>
                            </Text>
                        </View>
                    </View>
                </TouchableOpacity>
            </ScrollView>
        </View>
        <View style={styles.footerButtonContainer}>
            <TouchableOpacity
                onPress={() => navigation.navigate('CarteraDocumentTypeSCreen')}>
                <LinearGradient
                    start={{x: 0, y: 0}}
                    end={{x: 1, y: 0}}
                    colors={['#0D5734', '#0D5734', '#1B975B']}
                    style={styles.continueButton}>
                    <View
                    style={{
                        width: 70,
                        height: 40,
                        right: -5,
                        bottom: 15,
                        transform: [{scaleX: 2}],
                        overflow: 'hidden',
                        position: 'absolute',
                        borderRadius: 80,
                        backgroundColor: '#198352',
                    }}
                    />
                    <Text style={styles.buttonText}>Continuar</Text>
                </LinearGradient>
            </TouchableOpacity>
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
    marginTop: hp('3%'),
  },

  listContainer: {
    width: wp('100%'),
    height: hp('12%'),
    backgroundColor: '#18222E',
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: wp('10%'),
    marginTop: hp('.8%'),
  },

  plusCircle: {
    width: 25,
    height: 25,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
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

  textInsideMenu: {
    fontSize: 14,
    fontWeight: 'normal',
    textAlign: 'auto',
    color: '#919191'
  },

  middleInputsContainer: {
    backgroundColor: '#18222E',
    height: hp('55%'),
    marginTop: hp('1%'),
  },

  footerButtonContainer: {
    width: wp('100%'),
    height: hp('9%'),
    backgroundColor: '#18222E',
    position: 'absolute',
    bottom: 5,
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
  },
});

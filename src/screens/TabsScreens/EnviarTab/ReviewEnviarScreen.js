import React, {useState} from 'react';
import {TouchableWithoutFeedback} from 'react-native';
import {
  SafeAreaView,
  StyleSheet,
  Text,
  View,
  StatusBar,
  Platform,
  ScrollView,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import CheckBox from '@react-native-community/checkbox';
import LinearGradient from 'react-native-linear-gradient';
import SelectPicker from 'react-native-form-select-picker';

import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

//import custom components
import TwoTextView from '../../../components/subviews/TwoTextView';

export default function ReviewEnviarScreen() {
    const [isSelected, setSelection] = useState(false);
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="light-content"
                hidden={false}
                backgroundColor="#18222E"
                translucent={true}
            />
            <View style={styles.header}>
                <Text style={styles.headerText}>Revisar detalles</Text>
            </View>
            <Text></Text>
            <View style={styles.middleInputsContainer}>
                <ScrollView contentContainerStyle={{ flexGrow: 1 }} style={styles.scrollView}>
                    <Text style={{...styles.headerText, fontSize: 18, marginTop: hp('0.8%')}}>
                        Orden
                    </Text>
                    <View style={{
                        width: wp('100%'),
                        display: 'flex',
                        flexDirection: 'row',
                        flexWrap: 'wrap',
                    }}>
                        <TwoTextView
                            text_gray="Monto a pagar"
                            text_white="100.000 CLP"  
                            styles={{'width': wp('50%')}}
                        >
                        </TwoTextView>
                        <TwoTextView
                            text_gray="Monto a pagar"
                            text_white="100.000 CLP"  
                            styles={{'width': wp('50%')}}
                        >
                        </TwoTextView>
                        <TwoTextView
                            text_gray="Monto a pagar"
                            text_white="100.000 CLP"  
                            styles={{'width': wp('50%')}}
                        >
                        </TwoTextView>
                        <TwoTextView
                            text_gray="Monto a pagar"
                            text_white="100.000 CLP"  
                            styles={{'width': wp('50%')}}
                        >
                        </TwoTextView>
                        <TwoTextView
                            text_gray="Monto a pagar"
                            text_white="100.000 CLP"  
                            styles={{'width': wp('50%')}}
                        >
                        </TwoTextView>
                    </View>
                    <View>
                        <TextInput
                            placeholder="Proposito del Giro"
                            placeholderTextColor="#919191"
                            style={styles.input}
                        />
                        <View
                            style={{
                                display:'flex',
                                flexDirection: 'row',
                                marginTop: 8
                            }}
                        >
                            <CheckBox
                                tintColor="#aaaaaa"
                                onFillColor="#09A04E"   
                                value={isSelected}
                                disabled={false}
                                tintColors
                                onValueChange={isSelected => setSelection(isSelected)}
                                style={{flex: 1}}
                                />
                            <Text style={styles.label}>
                            Deseo crear una orden para girar dinero con los datos en pantalla.</Text>
                        </View>
                    </View>
                    <View>
                        <Text style={{...styles.headerText, fontSize: 18, marginTop: hp('0.8%')}}>
                        Beneficiario
                        </Text>
                        <View style={{
                            width: wp('100%')
                        }}>
                            <TwoTextView
                                text_gray="Nombre"
                                text_white="Miguel A Torres"  
                            >
                            </TwoTextView>
                            <TwoTextView
                                text_gray="Cuenta"
                                text_white="25300001050 BANCOLOMBIA"  
                            >
                            </TwoTextView>
                            <TwoTextView
                                text_gray="Correo Electronico"
                                text_white="miguel_a_torres@gmail.com"  
                            >
                            </TwoTextView>
                            <TwoTextView
                                text_gray="Telefono"
                                text_white="3127127465"  
                            >
                            </TwoTextView>
                            <TwoTextView
                                text_gray="Direccion"
                                text_white="Antioquia, Av 26 Nº52-2000"  
                            >
                            </TwoTextView>
                        </View>
                    </View>
                </ScrollView>
            </View>
            <View style={styles.footerButtonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('ReviewEnviarScreen')}>
                    <LinearGradient
                        start={{x: 0, y: 0}}
                        end={{x: 1, y: 0}}
                        colors={['#0D9239', '#199B37']}
                        style={{...styles.continueButton, marginTop: 0}}>
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
                            backgroundColor: '#1B8D36',
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
        backgroundColor: '#131925',
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0,
        display: 'flex',
    },
    header: {
        width: wp('100%'),
        height: hp('10%'),
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

    middleInputsContainer:{
        width: wp('80%'),
        alignSelf: 'center',
        flex: 1
    },

    input: {
        marginTop: hp('1%'),
        borderBottomWidth: 2,
        borderBottomColor: '#919191',
        width: wp('100%'),
        color: '#919191',
    },

    label: {
        color: '#919191',
        fontSize: 13.5,
        flex: 18,
        marginLeft: 15
    },

    scrollView: {

    },

    continueButton: {
        width: wp('80%'),
        height: 45,
        borderRadius: 15,
        backgroundColor: '#1A8D35',
        justifyContent: 'center',
        alignItems: 'center',
        alignSelf: 'center',
        marginTop: hp('5%'),
        overflow: 'hidden',
    },

    footerButtonContainer: {
        width: wp('100%'),
        height: hp('9%'),
        backgroundColor: '#18222E',
        position: 'relative',
        bottom: 0,
        justifyContent: 'center',
        alignItems: 'center',
    },
})
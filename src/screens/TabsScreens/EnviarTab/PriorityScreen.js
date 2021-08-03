import React, { useState } from 'react';
import { TouchableWithoutFeedback } from 'react-native';
import {
    SafeAreaView,
    StyleSheet,
    Text,
    StatusBar,
    View,
    TouchableOpacity,
} from 'react-native';

import LinearGradient from 'react-native-linear-gradient';
import RadioButtonRN from 'radio-buttons-react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

import {
    widthPercentageToDP as wp,
    heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
const choice_data = [
    {
        label: 
        <View>
            <Text></Text>
            <Text
                style={{
					color:'#FFF',
					fontSize: 16,
				}}>
                Normal
            </Text>
            <Text
                style={{
					color:'#919191',
					fontSize: 12,
                    width: wp('65%'),
				}}>
                Costo: 0.00% Prioridad Normal (Efectivo en 3 
                dias hàbiles)
            </Text>
        </View>
    },
    {
        label: 
        <View>
            <Text></Text>
            <Text
                style={{
					color:'#FFF',
					fontSize: 16,
				}}>
                Inmediata
            </Text>
            <Text
                style={{
					color:'#919191',
					fontSize: 12,
                    width: wp('65%'),
				}}>
                Costo: 5.00% Prioridad Inmediata (Efectivo en 1
                dia hàbil)
            </Text>
        </View>
    }
];
//import custom components


export default function PriorityScreen() {
    const [ismethod1, setIsmethod1] = useState(true);
    return (
        <SafeAreaView style={styles.container}>
            <StatusBar
                barStyle="light-content"
                hidden={false}
                backgroundColor="#18222E"
                translucent={true}
            />
            <View style={styles.header}>
                <Text style={styles.headerText}>Enviar</Text>
            </View>
            <Text></Text>
            <View
                style={{
                    flex: 1,
                }}
            >
                <View style={styles.linearContainer}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 1 }}
                        colors={['#0D141C', '#111622']}
                        style={styles.middleInputsContainer}
                    >
                        <Text style={{ ...styles.headerText, fontSize: 18, marginTop: hp('2.5%'), marginBottom: hp('2%') }}>
                            Prioridad
                        </Text>
                        <RadioButtonRN
                            data={choice_data}
                            activeIndex={1}
                            selectedBtn={(e) => console.log(e)}
                            style={styles.choiceRadioButton}
                            boxStyle={{ backgroundColor: "transparent", borderWidth: 0, }}
                            circleSize={10}
                            activeColor={"#0D9239"}
                        />
                        <TouchableOpacity>
                            <LinearGradient
                                start={{ x: 0, y: 0 }}
                                end={{ x: 1, y: 0 }}
                                colors={['#0D5734', '#0D5734', '#1B975B']}
                                style={styles.continueButton}>
                                <View
                                    style={{
                                        width: 70,
                                        height: 40,
                                        right: -5,
                                        bottom: 15,
                                        transform: [{ scaleX: 2 }],
                                        overflow: 'hidden',
                                        position: 'absolute',
                                        borderRadius: 80,
                                        backgroundColor: '#198352',
                                    }}
                                />
                                <Text style={styles.buttonText}>Cerrar</Text>
                            </LinearGradient>
                        </TouchableOpacity>
                    </LinearGradient>
                </View>
            </View>
            <View style={styles.footerButtonContainer}>
                <TouchableOpacity onPress={() => navigation.navigate('ReviewEnviarScreen')}>
                    <LinearGradient
                        start={{ x: 0, y: 0 }}
                        end={{ x: 1, y: 0 }}
                        colors={['#0D9239', '#199B37']}
                        style={{ ...styles.continueButton, marginTop: 0 }}>
                        <View
                            style={{
                                width: 70,
                                height: 40,
                                right: -5,
                                bottom: 15,
                                transform: [{ scaleX: 2 }],
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
        paddingTop: Platform.OS === 'android' ? StatusBar.currentHeight : 0
    },

    choiceRadioButton: {
        marginTop: 0,
        width: wp('80%'),
        alignSelf: 'center',
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

    linearContainer: {
        backgroundColor: 'black',
        marginLeft: 23,
        marginRight: 18,
        shadowColor: "#000",
        shadowOffset: {
            width: 10,
            height: 10
        },
        shadowOpacity: 1.0,
        shadowRadius: 5.84,
        elevation: 15,
    },

    middleInputsContainer: {
        padding: wp('3%'),
        paddingTop: 0,
        alignItems: 'center',
        // background color must be set
        backgroundColor: "#0000", // invisible color
        left: -3,
        top: -3,
    },

    label: {
        color: '#919191',
        fontSize: 13.5,
        flex: 18,
        marginLeft: 15
    },

    continueButton: {
        width: wp('70%'),
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
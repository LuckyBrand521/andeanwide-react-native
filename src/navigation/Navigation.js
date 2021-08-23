import * as React from 'react';
import {View, Text, Image} from 'react-native';
import {NavigationContainer} from '@react-navigation/native';
import {createStackNavigator} from '@react-navigation/stack';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';

//Our Screens
import SplashScreen from '../screens/SplashScreen';
import onBoardingScreens from '../screens/onBoardingScreens';
import RegistrationScreen from '../screens/RegistrationScreen';
import LoginScreen from '../screens/LoginScreen';
import ForgotPasswordScreen from '../screens/ForgotPasswordScreen';
import PinCodeScreen from '../screens/PinCodeScreen';
import FaceConfigurationScreen from '../screens/FaceConfigurationScreen';
import CarteraVerifyAccountScreen from '../screens/TabsScreens/MasTab/CarteraVerifyAccountScreen';
import HistoryScreen from '../screens/TabsScreens/HistoryScreen';
import CarteraAccountTypeScreen from '../screens/TabsScreens/MasTab/CarteraAccountTypeScreen';
import CarteraDocumentTypeSCreen from '../screens/TabsScreens/MasTab/CarteraDocumentTypeSCreen';
import CarteraAddPersonnelDetails from '../screens/TabsScreens/MasTab/CarteraAddPersonnelDetails';
import SignupCompleted from '../screens/SignupCompleted';
import OrderRequestCompleted from '../screens/OrderRequestCompleted';
import DocumentVerificationScreen from '../screens/TabsScreens/MasTab/DocumentVerificationScreen';
import PassportVerificationScreen from '../screens/TabsScreens/MasTab/PassportVerificationScreen';
import AfidavetVerificationScreen from '../screens/TabsScreens/MasTab/AfidavetVerificationScreen';
import CarteraAddEmpresa from '../screens/TabsScreens/MasTab/CarteraAddEmpresa';
import EmpresaDocumentUploadScreen from '../screens/TabsScreens/MasTab/EmpresaDocumentUploadScreen';
import ResidanceVerificationScreen from '../screens/TabsScreens/MasTab/ResidanceVerificationScreen';
import EmpresaVerficationMenuScreen from '../screens/TabsScreens/MasTab/EmpresaVerficationMenuScreen';
import BalanceScreen from '../screens/TabsScreens/BalanceHomeTab/BalanceScreen';
import EnviarScreen from '../screens/TabsScreens/EnviarTab/EnviarScreen';
import ReviewEnviarScreen from '../screens/TabsScreens/EnviarTab/ReviewEnviarScreen';
import PriorityScreen from '../screens/TabsScreens/EnviarTab/PriorityScreen';
import BeneficiariosScreen from '../screens/TabsScreens/BeneficiaryTab/BeneficiariosScreen';
import CrearBeneficiarioScreen from '../screens/TabsScreens/BeneficiaryTab/CrearBeneficiarioScreen';
import BusinessViewEmpressa from '../components/RegistrationScreen/BusinessViewEmpressa';

const Stack = createStackNavigator();

function Navigation() {
  return (
    <NavigationContainer>
      <Stack.Navigator headerMode="none" initialRouteName={SplashScreen}>
        {/* <Stack.Navigator headerMode="none" initialRouteName={MyTabs}> */}
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="tabs" component={MyTabs} />
        <Stack.Screen name="onBoardingScreens" component={onBoardingScreens} />
        <Stack.Screen
          name="RegistrationScreen"
          component={RegistrationScreen}
        />
        <Stack.Screen name="SignupCompleted" component={SignupCompleted} />
        <Stack.Screen
          name="OrderRequestCompleted"
          component={OrderRequestCompleted}
        />
        <Stack.Screen name="LoginScreen" component={LoginScreen} />
        <Stack.Screen name="PinCodeScreen" component={PinCodeScreen} />
        <Stack.Screen
          name="FaceConfigurationScreen"
          component={FaceConfigurationScreen}
        />
        <Stack.Screen
          name="ForgotPasswordScreen"
          component={ForgotPasswordScreen}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default Navigation;

const Tab = createBottomTabNavigator();

function MyTabs() {
  return (
    <Tab.Navigator
      lazy={false}
      tabBarOptions={{
        activeTintColor: '#fff',
        inactiveTintColor: '#898E94',

        labelPosition: 'below-icon',
        keyboardHidesTabBar: true,
        labelStyle: {
          position: 'absolute',
          bottom: 10,
        },

        tabStyle: {
          backgroundColor: '#18222E',
        },

        style: {
          height: 75,
          borderTopWidth: 0,
        },
      }}>
      <Tab.Screen
        options={{
          tabBarLabel: 'Balance',

          tabBarIcon: ({focused, tintColor, color}) => {
            if (focused) {
              return (
                <View
                  style={{
                    backgroundColor: '#525962',
                    height: 75,
                    width: 80,
                    borderRadius: 10,
                    borderBottomStartRadius: 0,
                    borderBottomEndRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../icons/icons/1.png')}
                    style={{width: 40, height: 40}}
                  />
                </View>
              );
            } else {
              return (
                <Image
                  source={require('../icons/icons/1.png')}
                  style={{width: 34, height: 34}}
                />
              );
            }
          },
        }}
        name="BalanceStack"
        component={BalanceStack}
      />

      <Tab.Screen
        options={{
          tabBarLabel: 'Historial',
          tabBarIcon: ({focused, tintColor, color}) => {
            if (focused) {
              return (
                <View
                  style={{
                    backgroundColor: '#525962',
                    height: 75,
                    width: 80,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../icons/icons/2.png')}
                    style={{width: 40, height: 40}}
                  />
                </View>
              );
            } else {
              return (
                <Image
                  source={require('../icons/icons/2.png')}
                  style={{width: 34, height: 34}}
                />
              );
            }
          },
        }}
        name="HistoryStack"
        component={HistoryStack}
      />

      <Tab.Screen
        options={{
          tabBarLabel: 'Enviar',
          tabBarIcon: ({focused, tintColor, color}) => {
            if (focused) {
              return (
                <View
                  style={{
                    backgroundColor: '#525962',
                    height: 75,
                    width: 80,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../icons/icons/3.png')}
                    style={{width: 40, height: 40}}
                  />
                </View>
              );
            } else {
              return (
                <Image
                  source={require('../icons/icons/3.png')}
                  style={{width: 34, height: 34}}
                />
              );
            }
          },
        }}
        name="EnviarStack"
        component={EnviarStack}
      />

      <Tab.Screen
        options={{
          tabBarLabel: 'Beneficiarios',
          tabBarIcon: ({focused, tintColor, color}) => {
            if (focused) {
              return (
                <View
                  style={{
                    backgroundColor: '#525962',
                    height: 75,
                    width: 80,
                    borderRadius: 10,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../icons/icons/4.png')}
                    style={{width: 40, height: 40}}
                  />
                </View>
              );
            } else {
              return (
                <Image
                  source={require('../icons/icons/4.png')}
                  style={{width: 34, height: 34}}
                />
              );
            }
          },
        }}
        name="BeneficiariosStack"
        component={BeneficiariosStack}
      />

      <Tab.Screen
        options={{
          tabBarLabel: 'Mas',

          tabBarIcon: ({focused, tintColor, color}) => {
            if (focused) {
              return (
                <View
                  style={{
                    backgroundColor: '#525962',
                    height: 75,
                    width: 80,
                    borderRadius: 10,
                    borderTopRightRadius: 0,
                    borderBottomRightRadius: 0,
                    justifyContent: 'center',
                    alignItems: 'center',
                  }}>
                  <Image
                    source={require('../icons/icons/5.png')}
                    style={{width: 40, height: 40}}
                  />
                </View>
              );
            } else {
              return (
                <Image
                  source={require('../icons/icons/5.png')}
                  style={{width: 34, height: 34}}
                />
              );
            }
          },
        }}
        name="MasStack"
        component={MasStack}
      />
    </Tab.Navigator>
  );
}

function MasStack() {
  return (
    // <NavigationContainer independent={true} headerMode>
    <Stack1.Navigator
      headerMode="none"
      // initialRouteName={CarteraVerifyAccountScreen}
      initialRouteName={CarteraAccountTypeScreen}>
      {/* <Stack1.Screen
          name="CarteraVerifyAccountScreen"
          component={CarteraVerifyAccountScreen}
        /> */}
      <Stack1.Screen
        name="CarteraAccountTypeScreen"
        component={CarteraAccountTypeScreen}
      />
      <Stack1.Screen
        name="CarteraDocumentTypeSCreen"
        component={CarteraDocumentTypeSCreen}
      />

      <Stack1.Screen
        name="CarteraAddPersonnelDetails"
        component={CarteraAddPersonnelDetails}
      />

      <Stack1.Screen
        name="BusinessViewEmpressa"
        component={BusinessViewEmpressa}
      />

      <Stack1.Screen
        name="DocumentVerificationScreen"
        component={DocumentVerificationScreen}
      />

      <Stack1.Screen
        name="EmpresaDocumentUploadScreen"
        component={EmpresaDocumentUploadScreen}
      />

      <Stack1.Screen
        name="PassportVerificationScreen"
        component={PassportVerificationScreen}
      />

      <Stack1.Screen
        name="AfidavetVerificationScreen"
        component={AfidavetVerificationScreen}
      />

      <Stack1.Screen name="CarteraAddEmpresa" component={CarteraAddEmpresa} />

      <Stack1.Screen
        name="EmpresaVerficationMenuScreen"
        component={EmpresaVerficationMenuScreen}
      />

      <Stack1.Screen
        name="ResidanceVerificationScreen"
        component={ResidanceVerificationScreen}
      />
    </Stack1.Navigator>
    // </NavigationContainer>
  );
}

function HistoryStack() {
  return (
    // <NavigationContainer independent={true} headerMode>
    <Stack2.Navigator headerMode="none" initialRouteName={HistoryScreen}>
      <Stack2.Screen name="HistoryScreen" component={HistoryScreen} />
    </Stack2.Navigator>
    // </NavigationContainer>
  );
}

function BalanceStack() {
  return (
    // <NavigationContainer independent={true} headerMode>
    <Stack2.Navigator headerMode="none" initialRouteName={BalanceScreen}>
      <Stack2.Screen name="BalanceScreen" component={BalanceScreen} />
    </Stack2.Navigator>
    // </NavigationContainer>
  );
}

function EnviarStack() {
  return (
    // <NavigationContainer independent={true} headerMode>
    <Stack3.Navigator headerMode="none" initialRouteName={EnviarScreen}>
      <Stack3.Screen name="EnviarScreen" component={EnviarScreen} />
      <Stack3.Screen name="PriorityScreen" component={PriorityScreen} />
      <Stack3.Screen name="ReviewEnviarScreen" component={ReviewEnviarScreen} />
    </Stack3.Navigator>
    // </NavigationContainer>
  );
}

function BeneficiariosStack() {
  return (
    // <NavigationContainer independent={true} headerMode>
    <Stack4.Navigator headerMode="none" initialRouteName={BeneficiariosScreen}>
      <Stack4.Screen
        name="BeneficiariosScreen"
        component={BeneficiariosScreen}
      />
      <Stack4.Screen
        name="CrearBeneficiarioScreen"
        component={CrearBeneficiarioScreen}
      />
    </Stack4.Navigator>
    // </NavigationContainer>
  );
}

const Stack1 = createStackNavigator();
const Stack2 = createStackNavigator();
const Stack3 = createStackNavigator();
const Stack4 = createStackNavigator();

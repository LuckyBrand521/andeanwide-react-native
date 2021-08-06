import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TextInput,
  TouchableOpacity,
  Image,
} from 'react-native';
import {
  widthPercentageToDP as wp,
  heightPercentageToDP as hp,
} from 'react-native-responsive-screen';
import { useForm, Controller } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers';
import * as yup from 'yup';
import CheckBox from '@react-native-community/checkbox';
import { useNavigation } from '@react-navigation/core';
import axios from 'axios';

export default function PersonViewPersona() {
	const navigation = useNavigation();
	// yup schema configuration for form validation
	const validationSchema = yup.object().shape({
		username: yup.string().required(),
		email: yup.string().email().required(),
		password: yup.string().min(6).max(32).required(),
		confirmPassword: yup.string().oneOf([Yup.ref('password'), null]).required(),
		acceptTerms: yup.bool().oneOf([true])
	});

	// functions to build the form returned by useForm() hook
	const { register, handleSubmit, reset, errors } = useForm({
		resolver: yupResolver(validationSchema)
	});

	function onSubmit(data) {
		// display form data on success
		alert('SUCCESS!! :-)\n\n' + JSON.stringify(data, null, 4));
	}

	//our states
	
	const [state, setState] = useState({
		username: '',
		email: '',
		password: '',
		confirmPassword: '',
		acceptTerms: false
	});

	// const handleChange = (data, ev) => {
	// 	setState({...state, [data]: ev.target.value});
	// }
	
	


	// const insert = () => {
	// 	if (!validate()) {
	// 	setEmailError('Some fields are missing');
	// 	} else {
	// 	setEmailError('');
	// 	axios.post("https://api.andeanwide.com/register/", {
	// 		name: "admin",
	// 		email: mail,
	// 		password: pass,
	// 		password_confirmation: pass
	// 	}).then((res) => {
	// 		// console.log(res.data.err);
	// 		// navigation.navigate('SignupCompleted');
	// 		// console.log(res.data)
	// 	}).catch(e => {
	// 		console.log(e);
	// 		console.log("=========")
	// 	})
	// 	// navigation.navigate('SignupCompleted');
	// 	}
	// };

	return (
		<Controller style={styles.container}>
			<Text
				style={{
				color: 'tomato',
				fontSize: 18,
				textAlign: 'center',
				marginTop: 10,
				}}>
				{emailerror}
			</Text>

			<View>
				<TextInput
				placeholder="Username"
				placeholderTextColor="#919191"
				style={styles.input}
				key = "username"
				value={username}
				/>

				<TextInput
				placeholder="Email"
				keyboardType="email-address"
				placeholderTextColor="#919191"
				style={styles.input}
				key="email"
				value={email}
				/>

				<TextInput
				secureTextEntry={true}
				placeholder="Contraseña"
				placeholderTextColor="#919191"
				style={styles.input}
				key="password"
				value={password}
				/>

				<TextInput
				secureTextEntry={true}
				placeholder="Contraseña confirmada"
				placeholderTextColor="#919191"
				style={styles.input}
				value={confirmPassword}
				/>  
			</View>

			<View style={styles.termsContainer}>
				<CheckBox
				tintColor="#aaaaaa"
				onFillColor="#09A04E"
				tintColors
				disabled={false}
				value={acceptTerms}
				/>
				<Text style={styles.acceptTerms}>
				Acepto los terminos y condiciones{'\n'}
				de Andean Wide
				</Text>
			</View>

			<View>
				<TouchableOpacity
				onPress={handleSubmit(onSubmit)}
				style={{
					...styles.buttonContainer,
				}}>
				<Text style={styles.buttonText}>Registro</Text>
				</TouchableOpacity>

				<TouchableOpacity
				onPress={navigation.navigate('')}
				style={{
					...styles.buttonContainer,
				}}>
				<Text style={styles.buttonText}>Cancelar</Text>
				</TouchableOpacity>
			</View>
		</Controller>
		);
	}

	const styles = StyleSheet.create({
	container: {},
	input: {
		marginTop: hp('0.2%'),
		borderBottomWidth: 2,
		borderBottomColor: '#919191',
		width: wp('65%'),
		alignSelf: 'center',
		color: '#919191',
	},

	acceptTerms: {
		color: '#919191',
		textAlign: 'center',
	},

	termsContainer: {
		flexDirection: 'row',

		alignSelf: 'center',
		marginTop: hp('2%'),
	},

	buttonContainer: {
		width: wp('45%'),
		height: 45,
		borderRadius: 10,
		justifyContent: 'center',
		backgroundColor: '#474B52',
		alignItems: 'center',
		alignSelf: 'center',
		marginTop: hp('2%'),
	},

	buttonText: {
		color: '#fff',
	},
});

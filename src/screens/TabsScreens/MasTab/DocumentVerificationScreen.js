import React, {useState, useRef} from 'react';
import {
	SafeAreaView,
	StyleSheet,
	Text,
	View,
	Platform,
	StatusBar,
	TouchableHighlight,
	TouchableOpacity
} from 'react-native';

import AntDesign from 'react-native-vector-icons/AntDesign';

import {
	widthPercentageToDP as wp,
	heightPercentageToDP as hp,
} from 'react-native-responsive-screen';

import LinearGradient from 'react-native-linear-gradient';


import ImagePicker from 'react-native-image-crop-picker';
import RBSheet from 'react-native-raw-bottom-sheet';

import {ImageBackground} from 'react-native';


export default function DocumentVerificationScreen({navigation}) {
	const sheet = useRef();
	const sheet2 = useRef();

	const [image, setImage] = useState('');
	const [image2, setImage2] = useState('');

	//For Front-Side-Image
	const takePhotoFromCamera = () => {
		ImagePicker.openCamera({
			compressImageMaxWidth: 300,
			compressImageMaxHeight: 300,
			cropping: true,
			compressImageQuality: 0.7,
		}).then(image => {
			console.log(image);
			setImage(image.path);

			sheet.current.close();
		});
	};

  	const choosePhotoFromLibrary = () => {
		ImagePicker.openPicker({
			width: 300,
			height: 300,
			cropping: true,
			compressImageQuality: 0.7,
		}).then(image => {
			console.log(image);
			console.log('Image one called');
			setImage(image.path);

			sheet.current.close();
		});
  	};

  //For back-Side-Image
	const takePhotoFromCamera2 = () => {
		ImagePicker.openCamera({
			compressImageMaxWidth: 300,
			compressImageMaxHeight: 300,
			cropping: true,
			compressImageQuality: 0.7,
		}).then(image2 => {
			console.log(image2);
			console.log('Image 2 is called');
			setImage2(image2.path);

			sheet2.current.close();
		});
	};

	const choosePhotoFromLibrary2 = () => {
		ImagePicker.openPicker({
			width: 300,
			height: 300,
			cropping: true,
			compressImageQuality: 0.7,
		}).then(image2 => {
			setImage2(image2.path);
			console.log(image2.path);
			sheet2.current.close();
		});
	};

	return (
		<SafeAreaView style={styles.container}>
			<RBSheet
				ref={sheet}
				height={350}
				closeOnDragDown={true}
				closeOnPressMask={false}
				customStyles={{
					wrapper: {},
					draggableIcon: {
						backgroundColor: '#000',
					},
				}}>
				<View style={styles.panel}>
					<View style={{alignItems: 'center'}}>
						<Text style={styles.panelTitle}>Upload Photo</Text>
						<Text style={styles.panelSubtitle}>
						Choose Your Profile Picture
						</Text>
					</View>
					<TouchableHighlight
						style={styles.panelButton}
						onPress={takePhotoFromCamera}>
						<Text style={styles.panelButtonTitle}>Take Photo</Text>
					</TouchableHighlight>

					<TouchableHighlight
						style={styles.panelButton}
						onPress={choosePhotoFromLibrary}>
						<Text style={styles.panelButtonTitle}>Choose From Library</Text>
					</TouchableHighlight>
					<TouchableHighlight
						style={styles.panelButton}
						onPress={() => sheet.current.close()}>
						<Text style={styles.panelButtonTitle}>Cancel</Text>
					</TouchableHighlight>
				</View>
			</RBSheet>

		{/* This one is for backImage */}

			<RBSheet
				ref={sheet2}
				height={350}
				closeOnDragDown={true}
				closeOnPressMask={false}
				customStyles={{
				wrapper: {},
				draggableIcon: {
					backgroundColor: '#000',
				},
				}}>
				<View style={styles.panel}>
					<View style={{alignItems: 'center'}}>
						<Text style={styles.panelTitle}>Upload Photo</Text>
						<Text style={styles.panelSubtitle}>
						Choose Your Profile Picture
						</Text>
					</View>
					<TouchableHighlight
						style={styles.panelButton}
						onPress={takePhotoFromCamera2}>
						<Text style={styles.panelButtonTitle}>Take Photo</Text>
					</TouchableHighlight>

					<TouchableHighlight
						style={styles.panelButton}
						onPress={choosePhotoFromLibrary2}>
						<Text style={styles.panelButtonTitle}>Choose From Library</Text>
					</TouchableHighlight>
					<TouchableHighlight
						style={styles.panelButton}
						onPress={() => sheet2.current.close()}>
						<Text style={styles.panelButtonTitle}>Cancel</Text>
					</TouchableHighlight>
				</View>
			</RBSheet>

			<StatusBar
				barStyle="light-content"
				hidden={false}
				backgroundColor="#18222E"
				translucent={true}
			/>
			<View style={styles.header}>
				<Text style={styles.headerText}>Verificar identidad</Text>
			</View>

			<View>
				<View style={{...styles.verifyText}} />
			</View>

			<View style={styles.middleInputsContainer}>
				<Text
				style={{...styles.headerText, fontSize: 20, marginTop: hp('0.8%')}}>
				Documento de identidad
				</Text>

				<View>
					<TouchableOpacity onPress={() => sheet.current.open()}>
						{image === '' ? (
						<View style={{...styles.imageContainer}}>
							<LinearGradient
							start={{x: 0, y: 0}}
							end={{x: 1, y: 0}}
							colors={['#078F41', '#17DD6F']}
							style={styles.plusCircle}>
							<AntDesign name="plus" size={16} color="#fff" />
							</LinearGradient>
							<Text style={styles.cardText}>Parte delantera</Text>
						</View>
						) : (
						<ImageBackground
							resizeMode="cover"
							style={{...styles.imageContainer, overflow: 'hidden'}}
							source={{
							uri: image,
							}}
						/>
						)}
					</TouchableOpacity>
					<Text style={{...styles.cardText, color: '#919191'}}>
						Sube la parte delantera de tu documento{'\n'}
						de identidad
					</Text>
				</View>
			

			{/* BackSide Image */}
				<View>
					<TouchableOpacity onPress={() => sheet2.current.open()}>
						{image2 === '' ? (
						<View style={styles.imageContainer}>
							<LinearGradient
							start={{x: 0, y: 0}}
							end={{x: 1, y: 0}}
							colors={['#078F41', '#17DD6F']}
							style={styles.plusCircle}>
							<AntDesign name="plus" size={16} color="#fff" />
							</LinearGradient>
							<Text style={styles.cardText}>Parte posterior</Text>
						</View>
						) : (
						<ImageBackground
							resizeMode="cover"
							style={{...styles.imageContainer, overflow: 'hidden'}}
							source={{
							uri: image2,
							}}
						/>
						)}
					</TouchableOpacity>

					<Text style={{...styles.cardText, color: '#919191'}}>
						Sube la parte posterior de tu documento{'\n'}
						de identidad
					</Text>
				</View>
			</View>

			<View style={styles.footerButtonContainer}>
				<TouchableOpacity onPress={()=>navigation.navigate('AfidavetVerificationScreen')}>
					<LinearGradient
						start={{x: 0, y: 0}}
						end={{x: 1, y: 0}}
						colors={['#119438', '#1A9B36', '#1B9D36']}
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
							backgroundColor: '#1A8D35',
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
		marginTop: hp('1%'),
	},
	middleInputsContainer: {
		backgroundColor: '#18222E',
		height: hp('60%'),
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
		position: 'absolute',
		bottom: 5,
	},
	continueButton: {
		width: wp('90%'),
		height: 45,
		borderRadius: 8,
		justifyContent: 'center',
		alignItems: 'center',
		alignSelf: 'center',
		marginTop: hp('1.5%'),
		overflow: 'hidden',
	},

	buttonText: {
		color: '#fff',
	},
	imageContainer: {
		width: wp('70%'),
		height: wp('40%'),
		alignSelf: 'center',
		backgroundColor: '#2F3B47',
		borderRadius: 20,
		justifyContent: 'center',
		alignItems: 'center',
		marginTop: hp('1.5%'),
	},
	plusCircle: {
		width: 40,
		height: 40,
		borderRadius: 25,
		justifyContent: 'center',
		alignItems: 'center',
	},

	cardText: {
		fontSize: 14,
		color: '#fff',
		textAlign: 'center',
		marginTop: 5,
	},

	commandButton: {
		padding: 15,
		borderRadius: 10,
		backgroundColor: '#FF6347',
		alignItems: 'center',
		marginTop: 10,
	},
	panel: {
		padding: 20,
		backgroundColor: '#FFFFFF',
		paddingTop: 20,
		// borderTopLeftRadius: 20,
		// borderTopRightRadius: 20,
		// shadowColor: '#000000',
		// shadowOffset: {width: 0, height: 0},
		// shadowRadius: 5,
		// shadowOpacity: 0.4,
	},
	header2: {
		backgroundColor: '#FFFFFF',
		shadowColor: '#333333',
		shadowOffset: {width: -1, height: -3},
		shadowRadius: 2,
		shadowOpacity: 0.4,
		// elevation: 5,
		paddingTop: 20,
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
	},
	panelHeader: {
		alignItems: 'center',
	},
	panelHandle: {
		width: 40,
		height: 8,
		borderRadius: 4,
		backgroundColor: '#00000040',
		marginBottom: 10,
	},
	panelTitle: {
		fontSize: 27,
		height: 35,
	},
	panelSubtitle: {
		fontSize: 14,
		color: 'gray',
		height: 30,
		marginBottom: 10,
	},
	panelButton: {
		padding: 13,
		borderRadius: 10,
		backgroundColor: '#FF6347',
		alignItems: 'center',
		marginVertical: 7,
	},
	panelButtonTitle: {
		fontSize: 17,
		fontWeight: 'bold',
		color: 'white',
	},
});

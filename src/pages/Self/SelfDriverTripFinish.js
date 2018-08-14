import React from 'react';
import {
	Text,
	StyleSheet,
	TextInput,
	View,
	Picker,
	TouchableOpacity,
	Alert
} from 'react-native';

import Logo from '../../components/Logo'
import {API_URL} from '../../utils/settings';

export default class SelfDriverTripFinish extends React.Component {
	constructor(props) {
		super(props)
		console.log(this.props.navigation.state.params.driver_id)
		this.state = {
			license_number: '',
			phone: '',
			vehicle_id: ''
		}
	}
	async validateTrip() {
		console.log(this.state)
		try {
			let response = await fetch(
				API_URL+'/self/validate',
				{
					method: "POST",
					body: JSON.stringify({
						phone: this.state.phone,
						license_number: this.state.license_number,
						vehicle_id: this.state.vehicle_id
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			let responseJson = await response.json()
			if (response.status != 200)
			{
				Alert.alert(
					"Invalid Self Trip Credentials",
					"Please Try Again",
					[
						{text: "OK", onPress:()=>console.log("Invalid Self Trip Credentials")}
					]
				)
				return
			}
			console.log("trip exists")
			this.props.navigation.navigate("SelfDriverTripFinish2", {responseJson})
		} catch (error) {
			console.error(error)
		}
	}
	render() {
		return(
				<View style={styles.container}>
					<Logo/>
					<View style={styles.content}>
						<Text style={styles.info}>
						Please Enter the Self Trip Credentials
						</Text>
						<TextInput 
			            style={styles.inputBox}
			            underlineColorAndroid='rgba(0,0,0,0)'
			            placeholder="License Number"
			            placeholderTextColor='white'
			            onChangeText={(license_number) => {
			              this.setState({
			                license_number
			              })
			            }}
			          	/>
						<TextInput 
			            style={styles.inputBox}
			            underlineColorAndroid='rgba(0,0,0,0)'
			            placeholder="Phone Number"
			            keyboardType='phone-pad'
			            placeholderTextColor='white'
			            onChangeText={(phone) => {
			              this.setState({
			                phone
			              })
			            }}
			          	/>
						<TextInput 
			            style={styles.inputBox}
			            underlineColorAndroid='rgba(0,0,0,0)'
			            placeholder="Vehicle ID"
			            placeholderTextColor='white'
			            onChangeText={(vehicle_id) => {
			              this.setState({
			                vehicle_id
			              })
			            }}
		          		/>
		          	</View>
		          	<TouchableOpacity 
            		style={styles.button}
            		onPress={()=>this.validateTrip()}
	          		>
	            		<Text style={styles.buttonText}>Validate Trip</Text>
	          		</TouchableOpacity>
	            	<TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
	              		<Text style={styles.signupText}>Cancel Trip</Text>
	            	</TouchableOpacity>
	            	<Text></Text>
	            	<Text></Text>
	            	<Text></Text>
          		</View>
		)
	}
}

const styles = StyleSheet.create({
	buttonText: {
    fontSize: 16,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 16
  },
  button: {
    backgroundColor: '#ee6002',
    borderRadius: 25,
    width: 300,
    margin: 10
  },
	content: {
		flex: 2
	},
	container: {
    backgroundColor: "#ee0290",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  inputBox: {
    width: 300,
    backgroundColor: 'rgba(255,255,255,0.3)',
    height: 50,
    borderRadius: 25,
    paddingHorizontal: 15,
    color: 'white',
    margin: 10,
    fontSize: 16
  },
	info: {
		color: 'white',
		fontSize: 20
	},
	signupTextCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column'
  },
	signupText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
  },
})
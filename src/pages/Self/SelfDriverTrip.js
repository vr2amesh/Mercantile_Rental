import React from 'react';
import {
	Text,
	StyleSheet,
	TextInput,
	View,
	Picker,
	TouchableOpacity,
	Alert,
} from 'react-native';

import Logo from '../../components/Logo'
import {API_URL} from '../../utils/settings';

export default class SelfDriverTrip extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			driver_id: this.props.navigation.state.params.driver_id,
			trip_type: 'self',
			client: "",
			email: "",
			phone: "",
			license_number: "",
			vehicle_id: "",
			start_mileage: '',
			start_date: '',
			purpose: '',
			address: ''
		}
		console.log(this.state)
	}
	async validateVehicle() {
		console.log(this.state)
		if (this.state.purpose == '' || this.state.vehicle_id == '' || this.state.client == '' || this.state.phone == '' || this.state.license_number == '' || this.state.start_mileage == '')
		{
			Alert.alert(
				"Fields cannot be blank",
				"Please Fill All Fields.",
				[
					{text: "OK", onPress: () => console.log("Invalid Trip")}
				],
			)
			return
		}
		try {
			let response = await fetch(
				API_URL+'/vehicle/validate',
				{
					method: 'POST',
					body: JSON.stringify({
              			vehicle_id: this.state.vehicle_id,
              			current_mileage: parseInt(this.state.start_mileage),
            		}),
            		headers: {
            			'Content-Type': 'application/json'
            		}
				}
			);
			let responseJson = await response.json();
			console.log(responseJson)
			if (responseJson.message == "MILEAGE_GREATER")
			{
				Alert.alert(
					"Mileage Greater than Expected",
					"Please enter the right mileage",
					[
						{text: "OK", onPress: () => console.log("Invalid Mileage")}
					],
				)
				return
			}
			else if (responseJson.message == "MILEAGE_LOWER")
			{
				Alert.alert(
					"Mileage Lower than Expected",
					"Please enter the right mileage",
					[
						{text: "OK", onPress: () => console.log("Invalid Mileage")}
					],
				)
				return
			}
			else if (responseJson.message != "Vehicle Valid") {
				Alert.alert(
					"Vehicle is not valid",
					"Please enter the right ID and Start Mileage",
					[
						{text: "OK", onPress: () => console.log("Invalid Vehicle")}
					],
				)
				return
			} 
		} catch (error) {
			console.error(error)
		}
		this.startSelfDriver()
	}
	async startSelfDriver() {
		console.log(this.state)
		try {
			let response = await fetch(
				API_URL+'/self',
				{
					method: "POST",
					body: JSON.stringify({

						vehicle_id: this.state.vehicle_id,
						start_date: new Date().toLocaleString(),
						start_mileage: this.state.start_mileage,
						client: this.state.client,
						email: this.state.email,
						license_number: this.state.license_number,
						phone: this.state.phone,
						address: this.state.address,
						purpose: this.state.purpose
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			let responseJson = await response.json()
			try {
							let response = await fetch(
								API_URL+'/vehicle/status/'+this.state.vehicle_id,
								{
									method: 'PUT',
									body: JSON.stringify({
										status: "IN USE"
									}),
									headers: {
										'Content-Type': 'application/json'
									}
								}
							)
							let responseJson = await response.json()
					} catch (error) {
						console.error(error)
					}
			} catch (error) {
			console.error(error)
		}
		Alert.alert(
			"Successfully started Trip!!",
			"Log Back into Self Driver Trip when you are ready to end the trip!",
			[
				{text: "OK", onPress: ()=> this.props.navigation.navigate('LoginScreen')}
			],
		)
	}
	render() {
		return(

				<View style={styles.container}>
					<TextInput 
		            style={styles.inputBox}
		            underlineColorAndroid='rgba(0,0,0,0)'
		            placeholder="Client"
		            placeholderTextColor='white'
		            onChangeText={(client) => {
		              this.setState({
		                client
		              })
		            }}
		          	/>
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
		            placeholder="Email (optional)"
		            placeholderTextColor='white'
		            onChangeText={(email) => {
		              this.setState({
		                email
		              })
		            }}
		          	/>
		          	<TextInput 
		            style={styles.inputBox}
		            underlineColorAndroid='rgba(0,0,0,0)'
		            placeholder="Address (optional)"
		            placeholderTextColor='white'
		            onChangeText={(address) => {
		              this.setState({
		                address
		              })
		            }}
		          	/>
		          	<TextInput 
		            style={styles.inputBox}
		            underlineColorAndroid='rgba(0,0,0,0)'
		            placeholder="Start Mileage"
		            keyboardType='number-pad'
		            placeholderTextColor='white'
		            onChangeText={(start_mileage) => {
		              this.setState({
		                start_mileage
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
	          		<TextInput 
		            style={styles.inputBox}
		            underlineColorAndroid='rgba(0,0,0,0)'
		            placeholder="Purpose"
		            placeholderTextColor='white'
		            onChangeText={(purpose) => {
		              this.setState({
		                purpose
		              })
		            }}
		          	/>
		          	<TouchableOpacity 
            		style={styles.button}
            		onPress={()=>this.validateVehicle()}
	          		>
	            		<Text style={styles.buttonText}>Start Trip</Text>
	          		</TouchableOpacity>
	            	<TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
	              		<Text style={styles.signupText}>Cancel Trip</Text>
	            	</TouchableOpacity>
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
	container: {
    backgroundColor: "#ee0290",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
	signupText: {
    color: 'orange',
    fontSize: 16,
    fontWeight: '500'
  },
})
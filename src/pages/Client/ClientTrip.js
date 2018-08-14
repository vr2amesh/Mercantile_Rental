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

import {API_URL} from '../../utils/settings';
import Logo from '../../components/Logo'


export default class ClientTrip extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			driver_id: this.props.navigation.state.params.driver_id,
			client: '',
			start_mileage: '',
			company: '',
			vehicle_id: '',
			comp_id: '',
			trip_type: '',
			departure: '',
			dep_latitude: '',
			dep_longitude: '',
			error: ''
		}
		console.log(this.state)
	}
	componentDidMount() {
		navigator.geolocation.getCurrentPosition(
      	(position) => {
        this.setState({
          dep_latitude: position.coords.latitude,
          dep_longitude: position.coords.longitude,
          error: null,
        });
      	},
      	(error) => this.setState({ error: error.message }),
      		{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    	);
    	console.log(this.state)
	}
	async validateVehicle_Company() {
		if (this.state.trip_type == '' || this.state.departure == '' || this.state.client == '' || this.state.company == '' || this.state.vehicle_id == '' || this.state.start_mileage == '')
		{
			Alert.alert(
				"Fields cannot be blank",
				"Please Fill All Fields.",
				[
					{text: "OK", onPress: () => console.log("Invalid Trip Type")}
				],
			)
			return
		}
		if (this.state.trip_type != "Airport" && this.state.trip_type != "Town Run" && this.state.trip_type != "Up Country Trip" && this.state.trip_type != "Out of Country Trip")
		{
			Alert.alert(
				"Invalid Trip Type",
				"Please try again.",
				[
					{text: "OK", onPress: () => console.log("Invalid Trip Type")}
				],
			)
			return
		}
		console.log(this.state)
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
		
		try {
			let response = await fetch(
				API_URL+'/company/validate',
				{
					method: 'POST',
					body: JSON.stringify({
						company: this.state.company
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				}

			)
			let responseJson = await response.json()
			console.log(responseJson)
			if (responseJson.message == "Success")
			{
				this.setState(() => {
					return {comp_id: responseJson.comp_id}
				})
				console.log(this.state.comp_id)
				console.log(this.state)

				try {
					let response = await fetch(
						API_URL+'/trip',
						{
							method: 'POST',
							body: JSON.stringify({
								driver_id: this.props.navigation.state.params.driver_id,
            					start_mileage: parseInt(this.state.start_mileage),
            					client: this.state.client,
            					comp_id: this.state.comp_id,
            					vehicle_id: this.state.vehicle_id,
            					start_date: new Date().toLocaleString(),
            					departure: this.state.departure,
            					trip_type: this.state.trip_type,
            					departure_geo_lat: this.state.dep_latitude,
            					departure_geo_long: this.state.dep_longitude
							}),
							headers: {
								'Content-Type': 'application/json'
							}
						}
					)
					let responseJson = await response.json()
					console.log(responseJson)
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
							let responseJson2 = await response.json()
					} catch (error) {
						console.error(error)
					}
					try {
							console.log("THis is WHAT I WANT")
							console.log(responseJson)
							let response = await fetch(
								API_URL+'/driver/'+this.state.driver_id,
								{
									method: "PUT",
									body: JSON.stringify({
										status: "On a Trip",
										current_trip_type: "Client",
										current_trip: responseJson.trip_id 
									}),
									headers: {
										'Content-Type': 'application/json'
									}
								}
							)
							let responseJson3 = await response.json()
							console.log(responseJson3)
					} catch (error) {
						console.error(error)
					}
					this.props.navigation.navigate('ClientTrip3', { responseJson })
				} catch (error) {
					console.error(error)
				}
			}
			else {
				Alert.alert(
					"Company Name is not Valid",
					"Please enter a valid company name",
					[
						{text: "OK", onPress: ()=> console.log('Company Name')}
					],
				)
			}
		} catch (error) {
			console.error(error)
		}
	}
	render() {
		return(
			<View style={styles.container}>
			<View style = {styles.textCont}>
				<Text>
				</Text>
				<Text>
				</Text>
				<Text>
				</Text>
				<Text>
				</Text>
				<TextInput 
	            style={styles.inputBox}
	            underlineColorAndroid='rgba(0,0,0,0)'
	            placeholder="Trip Type"
	            placeholderTextColor='white'
	            onChangeText={(trip_type) => {
	              this.setState({
	                trip_type
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
	            placeholder="Departure Location"
	            placeholderTextColor='white'
	            onChangeText={(departure) => {
	              this.setState({
	                departure
	              })
	            }}
	          	/>
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
	            placeholder= "Company Name"
	            placeholderTextColor='white'
	            onChangeText={(company) => {
	              this.setState({
	                company
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
				<TouchableOpacity 
            		style={styles.button}
            		onPress={()=>this.validateVehicle_Company(this.state.company, this.state.vehicle_id, this.state.start_mileage, this.state.client)}
          		>
            		<Text style={styles.buttonText}>Start Trip</Text>
          		</TouchableOpacity>
          	</View>
          		<View style={styles.signupTextCont}>
	            	<TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
	              		<Text style={styles.signupText}>Cancel Trip</Text>
	            	</TouchableOpacity>
          		</View>
			</View>

		)
	}
}




const styles = StyleSheet.create({
	signupTextCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
	signupText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    fontWeight: '500'
  },
	textCont: {
		justifyContent: 'center',
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
  container: {
    backgroundColor: "#ee0290",
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  }
})
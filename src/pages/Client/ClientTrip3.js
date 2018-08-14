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

export default class ClientTrip3 extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			driver_id: this.props.navigation.state.params.responseJson.driver_id,
			comp_id: this.props.navigation.state.params.responseJson.comp_id,
			vehicle_id: this.props.navigation.state.params.responseJson.vehicle_id,
			client: this.props.navigation.state.params.responseJson.client,
			start_mileage: this.props.navigation.state.params.responseJson.start_mileage,
			start_date: this.props.navigation.state.params.responseJson.start_date,
			departure: this.props.navigation.state.params.responseJson.departure,
			destination: '',
			end_mileage: '',
			trip_type: this.props.navigation.state.params.responseJson.trip_type,
			trip_id: this.props.navigation.state.params.responseJson.trip_id,
			dest_latitude: '',
			dest_longitude: '',
			error: ''
		}
		console.log(this.state)
	}
	async validateMileage() {
		if (this.state.end_mileage < this.state.start_mileage)
		{
			Alert.alert(
				"The End Mileage can't be less than the Start Mileage!",
				"Enter a new Mileage",
				[
					{text: "OK", onPress: () => console.log("Mileage Mismatch")}
				],
			)
			return
		}
		try {
			let response = await fetch(
				API_URL+'/vehicle/'+this.state.vehicle_id,
				{
					method: 'PUT',
					body: JSON.stringify({
						current_mileage: parseInt(this.state.end_mileage)
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			let responseJson = await response.json()
			if (responseJson.message != "SUCCESS")
			{
				Alert.alert(
					"This End Mileage is not Valid",
					"Please Enter a valid Mileage",
					[
						{text: "OK", onPress: () => console.log("Invalid Mileage Entered")}
					],
				)
				return
			}
			this.endTrip()
		} catch (error) {
			console.error(error)
		}
	}
	async endTrip() {
		try {
			let url = API_URL+'/trip/'+this.state.trip_id
			console.log(url)
			let response = await fetch(
				url,
				{
					method: 'PUT',
					body: JSON.stringify({
						driver_id: this.state.driver_id,
						comp_id: this.state.comp_id,
						vehicle_id: this.state.vehicle_id,
						client: this.state.client,
						start_mileage: this.state.start_mileage,
						start_date: this.state.start_date,
						departure: this.state.departure,
						destination: this.state.destination,
						end_mileage: this.state.end_mileage,
						end_date: new Date().toLocaleString(),
						status: 'Completed',
						trip_type: this.state.trip_type,
						destination_geo_lat: this.state.dest_latitude,
						destination_geo_long: this.state.dest_longitude
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			let responseJson = await response.json()
			Alert.alert("Successfully Ended Trip")
			try {
				let response2 = await fetch(
					API_URL+'/company/'+this.state.comp_id,
					{
						method: 'GET',
						headers: {
							'Content-Type': 'application/json'
						}
					}
				)
				let responseJson2 = await response2.json()
				responseJson.name = responseJson2.name
			} catch (error) {
				console.error(error)
			}
			try {
				let response3 = await fetch(
					API_URL+'/driver/'+this.state.driver_id,
					{
						method: "GET",
						headers: {
							'Content-Type': 'application/json'
						}
					}
				)
				let responseJson3 = await response3.json()
				responseJson.driver = responseJson3.name
			} catch (error) {
				console.error(error)
			}
			try {
				let response3 = await fetch(
					API_URL+'/driver/'+this.state.driver_id,
					{
						method: 'PUT',
						body: JSON.stringify({
							status: "Available",
							current_trip: 0,
							current_trip_type: "N/A"
						}),
						headers: {
							'Content-Type': 'application/json'
						}
					}
				)
				let responseJson3 = await response3.json()
				console.log(responseJson3)
			} catch (error) {
				console.error(error)
			}
			try {	
				let response4 = await fetch(
					API_URL+'/vehicle/status/'+this.state.vehicle_id,
					{
						method: "PUT",
						body: JSON.stringify({
							status: "Available"
						}),
						headers: {
							'Content-Type': 'application/json'
						}
					}
				)
				let responseJson4 = await response4.json()
				console.log(responseJson4)
			} catch(error) {
				console.error(error)
			}
			this.props.navigation.navigate("ConfirmationClient", {responseJson})
		} catch (error) {
			console.log('Hellor Error')
			console.error(error)
		}
	}
	async cancelTrip() {
		try {
			let response = await fetch(
				API_URL+'/trip/'+this.state.trip_id, {
					method: "DELETE",
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
							status: 'Available'
						}),
						headers: {
							'Content-Type': 'application/json'
						}
					}
				)
				let responseJson = await response.json()
				console.log(responseJson)
			} catch (error) {
				console.error(error)
			}
			try {
				let response = await fetch(
					API_URL+'/driver/'+this.state.driver_id,
					{
						method: "PUT",
						body: JSON.stringify({
							status: 'Available',
							current_trip_type: "N/A",
							current_trip: 0
						}),
						headers: {
							'Content-Type': 'application/json'
						}
					}
				)
				let responseJson = await response.json()
				console.log(responseJson)
			} catch (error) {
				console.error(error)
			}
			let driver_id = this.state.driver_id
			this.props.navigation.navigate('Home', {driver_id})
		} catch (error) {
			console.error(error)
		}
	}
	render() {
		return (
			<View style={styles.container}>
				<Logo/>
				<View style={styles.neededComp} >
					<Text style={styles.text}>Fill in the Below Fields</Text>
					<TextInput 
			            style={styles.inputBox}
			            underlineColorAndroid='rgba(0,0,0,0)'
			            placeholder="End Mileage"
			            keyboardType='number-pad'
			            placeholderTextColor='white'
			            onChangeText={(end_mileage) => {
			              this.setState({
			                end_mileage
			              })
			            }}
		          	/>
					<TextInput 
			            style={styles.inputBox}
			            underlineColorAndroid='rgba(0,0,0,0)'
			            placeholder="Destination Location"
			            placeholderTextColor='white'
			            onChangeText={(destination) => {
			              this.setState({
			                destination
			              })
			            }}
			         />

		          	<TouchableOpacity 
	            		style={styles.button}
	            		onPress={()=> this.validateMileage()}
	          		>
	            		<Text style={styles.buttonText}>End Trip</Text>
	          		</TouchableOpacity>
	          	</View>
	          	<View style={styles.cancel}>
	          		<TouchableOpacity
	          			onPress={()=>this.cancelTrip()}
	          		>
	          			<Text style={styles.cancelText}>Cancel Trip</Text>
	          		</TouchableOpacity>
	          	</View>
			</View>
		)
	}
}

const styles = StyleSheet.create({
	cancel: {
		flex: 1
	},
	cancelText: {
		color: 'white',
		fontSize: 18
	},
	neededComp: {
		flex: 2,
		alignItems: 'center',
		justifyContent: 'flex-start'
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
	    margin: 10,
	    justifyContent: 'flex-start'
	  },
	inputBox: {
	    width: 300,
	    backgroundColor: 'rgba(255,255,255,0.3)',
	    height: 50,
	    borderRadius: 25,
	    paddingHorizontal: 15,
	    color: 'white',
	    margin: 10,
	    fontSize: 16,
	    justifyContent: 'flex-start'
  },
	container: {
	    backgroundColor: "#ee0290",
	    flex: 1,
	    alignItems: 'center',
  },
  	text: {
  		color: "white",
  		fontSize: 20,
  		justifyContent: 'flex-start'
  	},
})
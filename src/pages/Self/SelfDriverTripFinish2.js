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



export default class Begin extends React.Component {
	constructor(props) {
		super(props)
		this.state = this.props.navigation.state.params.responseJson
		console.log(this.state)
	}
	async validateMileage() {
		console.log(this.state)
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
				let response = await fetch(
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
				let responseJson = await response.json()
				console.log(responseJson)
			} catch(error) {
				console.error(error)
			}
		try {
			let url = API_URL+'/self/'+this.state.trip_id
			console.log(url)
			let response = await fetch(
				url,
				{
					method: "PUT",
					body: JSON.stringify({
						vehicle_id: this.state.vehicle_id,
						start_mileage: this.state.start_mileage,
						start_date: this.state.start_date,
						client: this.state.client,
						email: this.state.email,
						license_number: this.state.license_number,
						phone: this.state.phone,
						address: this.state.address,
						purpose: this.state.purpose,
						end_mileage: this.state.end_mileage,
						end_date: new Date().toLocaleString(),
						status: "Completed"
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			let responseJson = await response.json()
			console.log(responseJson)
			Alert.alert("Successfully Ended Trip")
			this.props.navigation.navigate('ConfirmationSelf', {responseJson})
			} catch (error) {
				console.error(error)
		}
	}
	render() {
		return(
				<View style={styles.container}>
				<Logo/>
					<View style ={styles.content}>
					<Text style={styles.info}>
						Please Enter the End Mileage of the Car
					</Text>
					<TextInput 
			            style={styles.inputBox}
			            underlineColorAndroid='rgba(0,0,0,0)'
			            placeholder="End Mileage"
			            placeholderTextColor='white'
			            keyboardType='number-pad'
			            onChangeText={(end_mileage) => {
			              this.setState({
			                end_mileage
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
		          	<TouchableOpacity 
            		style={styles.button}
            		onPress={()=>this.validateMileage()}
	          		>
	            		<Text style={styles.buttonText}>Finish Trip</Text>
	          		</TouchableOpacity>
		          	</View>
		          	
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
	info: {
		color: 'white',
		fontSize: 20
	},
	content: {
		flex: 2,
		alignItems: 'center'
	},
	signupTextCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column'
  },
	signupText: {
    color: 'white',
    fontSize: 16,
    fontWeight: '500'
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
    justifyContent: 'center'
  }
})
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


export default class ConfirmationSelf extends React.Component {
	constructor(props) {
		super(props)
		console.log(this.props.navigation.state.params.responseJson)
		this.state = this.props.navigation.state.params.responseJson
		console.log(this.state)
	}
	async cancelTrip() {
		try {
			let response = await fetch(
				API_URL+'/self/'+this.state.trip_id,
				{
					method: "DELETE",
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			let responseJson = await response.json()
			Alert.alert(
			"Trip has been cancelled!",
			"Please start another trip",
			[
				{text: "OK", onPress: ()=> this.props.navigation.navigate('Home')}
			],
			)
		} catch (error) {
			console.error(error)
		}
	}
	endTrip() {
		let responseJson = this.props.navigation.state.params.responseJson
		Alert.alert(
			"Trip has been confirmed! Please Sign!",
			"Thank you for riding with Mercantile",
			[
				{text: "OK", onPress: ()=> this.props.navigation.navigate('SignatureSelf', {responseJson})}
			],
		)
	}
	render() {
		return(
				<View style={styles.container}>
					<Logo/>
					<View style={styles.infoCont}>
						<Text style={styles.info}>
							Client: {this.state.client}
						</Text>
						<Text style={styles.info}>
							Phone: {this.state.phone}
						</Text>
						<Text style={styles.info}>
							License Number: {this.state.license_number}
						</Text>
						<Text style={styles.info}>
							Vehicle ID: {this.state.vehicle_id}
						</Text>
						<Text style={styles.info}>
							Purpose of Trip: {this.state.purpose}
						</Text>
						<Text style={styles.info}>
							Start Date: {this.state.start_date}
						</Text>
						<Text style={styles.info}>
							End Date: {this.state.end_date}
						</Text>
						<Text style={styles.info}>
							Start Mileage: {this.state.start_mileage}
						</Text>
						<Text style={styles.info}>
							End Mileage: {this.state.end_mileage}
						</Text>
						<TouchableOpacity 
	            		style={styles.button}
	            		onPress={()=> this.endTrip()}
	          			>
	            			<Text style={styles.buttonText}>Confirm Trip</Text>
	          			</TouchableOpacity>
						<View style={styles.cancel}>
			            	<TouchableOpacity onPress={() => this.cancelTrip()}>
			              		<Text style={styles.signupText}>Cancel Trip</Text>
			            	</TouchableOpacity>
		            	</View>
	            	</View>
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
	    margin: 10,
	    justifyContent: 'flex-start'
	  },
	cancel: {

	},
	info: {
		color: 'white',
		fontSize: 18
	},
	infoCont: {
		flex: 5,
		alignItems: 'center',
		justifyContent: 'space-evenly'
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
    fontWeight: '500',
    alignItems: 'center'
  },
})
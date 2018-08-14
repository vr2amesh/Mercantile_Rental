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


export default class ConfirmationIndividual extends React.Component {
	constructor(props) {
		super(props)
		console.log(this.props.navigation.state.params.responseJson)
		this.state = this.props.navigation.state.params.responseJson
		console.log(this.state)
	}
	componentDidMount() {
    	navigator.geolocation.getCurrentPosition(
	      	(position) => {
	        this.setState({
	          dest_latitude: position.coords.latitude,
	          dest_longitude: position.coords.longitude,
	          error: null,
	        });
	      	},
	      	(error) => this.setState({ error: error.message }),
	      		{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
	    )
	}
	async cancelTrip() {
		try {
			let response = await fetch(
				API_URL+'/indi-trip/'+this.state.trip_id,
				{
					method: "DELETE",
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)
			let responseJson = await response.json()
			let driver_id = this.state.driver_id
			Alert.alert(
			"Trip has been cancelled!",
			"Please start another trip",
			[
				{text: "OK", onPress: ()=> this.props.navigation.navigate('Home', {driver_id})}
			],
			)
		} catch (error) {
			console.error(error)
		}
	}
	async endTrip() {
		try {
			let response = await fetch(
				API_URL+'/indi-trip/'+this.state.trip_id,
				{
					method: "PUT",
					body: JSON.stringify({
						driver_id: this.state.driver_id,
						vehicle_id: this.state.vehicle_id,
						start_mileage: this.state.start_mileage,
						start_date: this.state.start_date,
						departure: this.state.departure,
						destination: this.state.destination,
						end_mileage: this.state.end_mileage,
						end_date: this.state.end_date,
						client: this.state.client,
						status: this.state.status,
						destination_geo_lat: this.state.dest_latitude,
						destination_geo_long: this.state.dest_longitude
					}),
					headers: {
						'Content-Type': 'application/json'
					}
				}
			)

			let responseJson = this.props.navigation.state.params.responseJson
			Alert.alert(
				"Please sign!",
				"Thank you for riding with Mercantile",
				[
					{text: "OK", onPress: ()=> this.props.navigation.navigate('SignatureIndividual', {responseJson})}
				],
			)
		} catch (error) {
			console.error(error)
		}
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
							Driver: {this.state.driver}
						</Text>
						<Text style={styles.info}>
							Vehicle: {this.state.vehicle_id}
						</Text>
						<Text style={styles.info}>
							Departure Location: {this.state.departure}
						</Text>
						<Text style={styles.info}>
							Final Location: {this.state.destination}
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
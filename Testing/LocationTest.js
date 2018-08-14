

import React from 'react';
import {
	Text,
	StyleSheet,
	TextInput,
	View,
	Picker,
	TouchableOpacity
} from 'react-native';

import {API_KEY} from '../src/utils/settings';
import {LOCATION_API_URL} from '../src/utils/settings'

var DeviceInfo = require('react-native-device-info');


export default class LocationTest extends React.Component {
	constructor(props) {
		super(props)
		this.state = {
			latitude: '',
      		longitude: '',
      		error: ''
		}
	}
	getLocation() {
		navigator.geolocation.getCurrentPosition(
      	(position) => {
        this.setState({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
          error: null,
        });
      	},
      	(error) => this.setState({ error: error.message }),
      		{ enableHighAccuracy: true, timeout: 20000, maximumAge: 1000 },
    	);
    	console.log(this.state)
	}
	render() {
		return(
				<View style={styles.signupTextCont}>
					<TouchableOpacity onPress={() => this.getLocation()}>
	              		<Text style={styles.signupText}>Get Device Info</Text>
	            	</TouchableOpacity>
	            	<TouchableOpacity onPress={() => console.log(this.state)}>
	              		<Text style={styles.signupText}>Get State</Text>
	            	</TouchableOpacity>
	            	<TouchableOpacity onPress={() => this.props.navigation.navigate('LoginScreen')}>
	              		<Text style={styles.signupText}>Cancel Trip</Text>
	            	</TouchableOpacity>
          		</View>
		)
	}
}

const styles = StyleSheet.create({
	signupTextCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'space-evenly',
    flexDirection: 'column'
  },
	signupText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500'
  },
})
import React from 'react';
import {
	Text,
	StyleSheet,
	View,
	TouchableOpacity
} from 'react-native';

import Logo from '../../components/Logo';


export default class Home extends React.Component {
	constructor(props) {
		super(props);
		console.log(this.props.navigation.state.params.driver_id)
		this.state = {
			driver_id: this.props.navigation.state.params.driver_id
		}
		console.log(this.state)
	}
	render() {
		return(
			<View style={styles.container}>
				<Logo/>
				<Text style={styles.text}>
					Please choose a Trip type
				</Text>
				<View style={styles.buttonContainer}>
					<TouchableOpacity
						style = {styles.button}
						onPress={()=>this.props.navigation.navigate('ClientTrip', {
								driver_id: this.state.driver_id
							})}
					>
						<Text style={styles.buttonText}>Client Trip</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={()=>this.props.navigation.navigate('DriverTrip', {
								driver_id: this.state.driver_id
							})}
					>
						<Text style={styles.buttonText}>Driver Trip</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.button}
						onPress={()=>this.props.navigation.navigate('IndividualTrip', {
								driver_id: this.state.driver_id
							})}
					>
						<Text style={styles.buttonText}>Individual Trip</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style = {styles.button2}
						onPress={()=>this.props.navigation.navigate('LoginScreen')}
					>
						<Text style={styles.buttonText}>Log Out</Text>
					</TouchableOpacity>
				</View>
			</View>
			
		)
	}
}


const styles = StyleSheet.create({
	buttonContainer: {
		flex: 2
	},
	text: {
		fontSize: 20,
		color: 'white',
		justifyContent: "flex-start"
	},
	container: {
    backgroundColor: "#ee0290",
    flex: 1,
    alignItems: 'center',
    flexDirection: 'column'
  },
  buttonText: {
  	fontSize: 16,
    color: 'white',
    textAlign: 'center',
    paddingVertical: 16
  },
  button2: {
  	backgroundColor: '#ff7f50',
  	borderRadius: 25,
  	width: 300,
  	margin: 10,
  	justifyContent: 'flex-start'
  },
  button: {
  	backgroundColor: '#ee6002',
    borderRadius: 25,
    width: 300,
    margin: 10,
    justifyContent: 'flex-start'
  }
});
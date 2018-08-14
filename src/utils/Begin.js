
// This file is merely a template for the start of a given file,
// so that I can Live Code with the Application


import React from 'react';
import {
	Text,
	StyleSheet,
	TextInput,
	View,
	Picker,
	TouchableOpacity
} from 'react-native';

export default class Begin extends React.Component {
	constructor(props) {
		super(props)
		console.log(this.props.navigation.state.params.driver_id)
	}
	render() {
		return(
				<View style={styles.signupTextCont}>
	            	<TouchableOpacity onPress={() => this.props.navigation.navigate('Home')}>
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
    justifyContent: 'center',
    flexDirection: 'row'
  },
	signupText: {
    color: 'black',
    fontSize: 16,
    fontWeight: '500'
  },
})
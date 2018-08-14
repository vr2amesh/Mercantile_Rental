import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Image 
 } from 'react-native';

 // This will need to be edited for design purposes.

 export default class Logo extends React.Component {
 	render() {
 		let pic = {
 			uri: 'http://mercantilecarrentals.com/images/img01.png'
 		};
 		return (
 			<View style={styles.container}>
	 			<Image source={pic} style={{width: 300, height: 110}}/>
 				<Text style={styles.text}>Mercantile Car Rentals Ltd.</Text>
 			</View>	
 		)
 	}
 }

 const styles = StyleSheet.create({
 	container: {
 		flex: 1,
 		paddingVertical: 50,
 		flexDirection: 'column',
 		justifyContent: 'flex-start',
 		alignItems: 'center'
 	},
 	text: {
 		color: 'white',
 		fontSize: 30
 	}
 })


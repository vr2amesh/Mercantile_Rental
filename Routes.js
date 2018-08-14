import React from 'react';

import {
	createStackNavigator
} from 'react-navigation';

import LoginScreen from './src/pages/Login/LoginScreen';
import Home from './src/pages/Home/Home';
import ClientTrip from './src/pages/Client/ClientTrip';
import DriverTrip from './src/pages/Driver/DriverTrip'
import ClientTrip3 from './src/pages/Client/ClientTrip3'
import DriverTrip2 from './src/pages/Driver/DriverTrip2'
import IndividualTrip from './src/pages/Individual/IndividualTrip'
import IndividualTrip2 from './src/pages/Individual/IndividualTrip2'
import ConfirmationClient from './src/pages/Client/ConfirmationClient'
import ConfirmationDriver from './src/pages/Driver/ConfirmationDriver'
import ConfirmationIndividual from './src/pages/Individual/ConfirmationIndividual'
import SelfDriverTrip from './src/pages/Self/SelfDriverTrip'
import SignatureClient from './src/pages/Client/SignatureClient'
import SignatureIndividual from './src/pages/Individual/SignatureIndividual'
import SelfDriverTripFinish from './src/pages/Self/SelfDriverTripFinish'
import SelfDriverTripFinish2 from './src/pages/Self/SelfDriverTripFinish2'
import ConfirmationSelf from './src/pages/Self/ConfirmationSelf'
import SignatureSelf from './src/pages/Self/SignatureSelf'
import LocationTest from './Testing/LocationTest'





const Navigator = createStackNavigator({
	LoginScreen: { screen: LoginScreen },
	Home: { screen: Home },
	ClientTrip: {screen: ClientTrip},
	DriverTrip: {screen: DriverTrip},
	ClientTrip3: {screen: ClientTrip3},
	DriverTrip2: {screen: DriverTrip2},
	IndividualTrip: {screen: IndividualTrip},
	IndividualTrip2: {screen: IndividualTrip2},
	ConfirmationClient: {screen: ConfirmationClient},
	ConfirmationDriver: {screen: ConfirmationDriver},
	ConfirmationIndividual: {screen: ConfirmationIndividual},
	SelfDriverTrip: {screen: SelfDriverTrip},
	SignatureClient: {screen: SignatureClient},
	SignatureIndividual: {screen: SignatureIndividual},
	SelfDriverTripFinish: {screen: SelfDriverTripFinish},
	SelfDriverTripFinish2: {screen: SelfDriverTripFinish2},
	ConfirmationSelf: {screen: ConfirmationSelf},
	SignatureSelf: {screen: SignatureSelf},
	LocationTest: {screen: LocationTest}
},
{
	initialRouteName: 'LoginScreen',
	headerMode: "None"
});

export default Navigator;
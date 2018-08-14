import React from 'react';
import { 
  StyleSheet, 
  Text, 
  View,
  Image,
  TouchableOpacity,
  Alert,
  TextInput
} from 'react-native';

import Logo from '../../components/Logo'
import {API_URL} from '../../utils/settings';


  export default class LoginScreen extends React.Component {
    constructor(props) {
      super(props);
      this.state = {
        company_id: "",
        password: "",
        current_trip_type: '',
        current_trip: '',
        driver_id: ''
      }
      console.log(this.props);
    }
    async validateUser() {
      try {
        let response = await fetch(
          API_URL+'/driver/validate',
          {
            method: 'POST',
            body: JSON.stringify({
              company_id: this.state.company_id,
              password: this.state.password
            }),
            headers: {
              'Content-Type': 'application/json'
            }
          }
        );
        console.log("User validated")
        let responseJson = await response.json();
        console.log(responseJson)

        if (responseJson.message == "Welcome to Mercantile")
        {
          console.log(responseJson.driver_id)
          this.setState(() => {
            return {driver_id: responseJson.driver_id}
          });
          console.log(this.state);
          if (responseJson.company_id == "0000")
          {
            console.log("Navigating to self home")
            Alert.alert(
              "Self Driver Trip!",
              "Start a new trip? Or Finish an exisiting one",
              [
                {text: "New", onPress: ()=> this.props.navigation.navigate('SelfDriverTrip', {
                    driver_id: responseJson.driver_id
                })},
                {text: "Finish", onPress: ()=> this.props.navigation.navigate('SelfDriverTripFinish', {
                    driver_id: responseJson.driver_id
                })},
              ],
            )
            
            console.log("Once")
            console.log("Twice")
            return

          }
          console.log("After navigation of self driver. This should not come")
          this.props.navigation.navigate('Home', {
            driver_id: responseJson.driver_id
          })
        }
        else if (responseJson.message == "DRIVER_UNAVAILABLE"){
            this.setState(() => {
              return {
                current_trip: responseJson.current_trip,
                current_trip_type: responseJson.current_trip_type
              }
            });
            if (responseJson.current_trip_type == "Client")
            {
              try { 
                let response2 = await fetch(
                  API_URL+'/trip/'+this.state.current_trip,
                  {
                    method: "GET",
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                )
                let responseJson = await response2.json()
                this.props.navigation.navigate('ClientTrip3', {responseJson})
              } catch (error) {
                console.error(error)
              }
            }
            else if (responseJson.current_trip_type == "Driver")
            {
              console.log("Driver Trip in Progress")
              console.log("Going to DriverTrip2 Screen")
              console.log(responseJson.current_trip)
              try { 
                console.log("Before fethch")
                let response2 = await fetch(
                  API_URL+'/driver-trip/'+this.state.current_trip,
                  {
                    method: "GET",
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                )
                let responseJson = await response2.json()
                console.log(responseJson)
                this.props.navigation.navigate('DriverTrip2', {responseJson})
              } catch (error) {
                console.error(error)
              }
            }
            else if (responseJson.current_trip_type == "Individual")
            {
              try { 
                let response2 = await fetch(
                  API_URL+'/indi-trip/'+this.state.current_trip,
                  {
                    method: "GET",
                    headers: {
                      'Content-Type': 'application/json'
                    }
                  }
                )
                let responseJson2 = await response2.json()
                let responseJson = responseJson2
                this.props.navigation.navigate('IndividualTrip2', {responseJson})
              } catch (error) {
                console.error(error)
              }
            }
            return
        }
        else {
          Alert.alert(
            "Invalid Login Credentials",
            "Please Enter the correct credentials, or sign up.",
            [
              {text: "OK", onPress: () => console.log("Invalid Login")}
            ],
          )
        }
      } catch (error) {
        console.error(error);
      }
    }
    render() {
      return (
        <View style = {styles.container}>
          <Logo/>
          <View style={styles.container2}>
          <TextInput 
            style={styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Driver Company ID"
            placeholderTextColor='white'
            onChangeText={(company_id) => {
              this.setState({
                company_id
              })
            }}
          />
          <TextInput
            style = {styles.inputBox}
            underlineColorAndroid='rgba(0,0,0,0)'
            placeholder="Password"
            secureTextEntry={true}
            placeholderTextColor='white'
            onChangeText={(password) => {
              this.setState({password})
            }}
          />
          <TouchableOpacity 
            style={styles.button}
            onPress={()=>this.validateUser(this.state.name, this.state.password)}
          >
            <Text style={styles.buttonText}>Login</Text>
          </TouchableOpacity>
          </View>
        </View>
      );
    }
  }


const styles = StyleSheet.create({
  container2: {
    flex: 10,
    justifyContent: 'center',
    alignItems: 'center'
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
  },
  signupTextCont: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'row'
  },
  otherText: {
    color: 'rgba(255,255,255,0.7)',
    fontSize: 16
  },
  signupText: {
    color: 'rgba(255,255,255,0.9)',
    fontSize: 16,
    fontWeight: '500'
  }
})
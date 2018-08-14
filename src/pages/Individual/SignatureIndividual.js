import React from 'react' 
import {
	View,
	StyleSheet,
	TouchableHighlight,
	Text,
    Alert
} from 'react-native'

import SignatureCapture from 'react-native-signature-capture'
import {API_URL} from '../../utils/settings';

 
export default class SignatureIndividual extends React.Component {
    
    constructor(props) {
        super(props)
        console.log(this.props)
        this.state = {
            encoded: ''
        }
        console.log(this.state)

    }
    componentDidMount(){
        this.setState(this.props.navigation.state.params.responseJson)
    }
    render = () => {

    return (
      <View style={{flex: 1}}>
          <SignatureCapture
                    style={[{flex:1},styles.signature]}
                    ref="sign"
                    onSaveEvent={this._onSaveEvent}
                    onDragEvent={this._onDragEvent}
                    saveImageFileInExtStorage={false}
                    showNativeButtons={false}
                    showTitleLabel={false}
                    viewMode={"portrait"}/>

                <View style={{ flex: 1, flexDirection: "row" }}>
                    <TouchableHighlight style={styles.buttonStyle}
                        onPress={() => { this.saveSign() } } >
                        <Text>Save</Text>
                    </TouchableHighlight>

                    <TouchableHighlight style={styles.buttonStyle}
                        onPress={() => { this.resetSign() } } >
                        <Text>Reset</Text>
                    </TouchableHighlight>

                </View>

      </View>
    )
  };

    saveSign() {
        this.refs["sign"].saveImage();
        
    }

    resetSign(){
        this.refs["sign"].resetImage();
    }

    _onSaveEvent=(result)=>{
        //result.encoded - for the base64 encoded png
        //result.pathName - for the file path name
        console.log("BEfore state logs")
        console.log(result);
        console.log(this.state)
        console.log("Before the fetch")
        fetch(
            API_URL+'/indi-trip/signature/'+this.state.trip_id,
                {
                    method: "PUT",
                    body: JSON.stringify({
                        signature: result.encoded
                    }),
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
        ).then((response)=>{
            return response.json()
        }).then((responseJson)=>{
            console.log(responseJson)
            Alert.alert('Success','Thank you for riding with us.')
            let driver_id = this.state.driver_id
            this.props.navigation.navigate('Home', {driver_id})
        }).catch((error)=>{
            Alert.alert('Error','Unable to add signature, please try again later.')
        })
        
    }

    _onDragEvent() {
         // This callback will be called when the user enters signature
        
        console.log("dragged");
        console.log(this.props)
    }
}

const styles = StyleSheet.create({
    signature: {
        flex: 1,
        borderColor: '#000033',
        borderWidth: 1,
    },
    buttonStyle: {
        flex: 2, justifyContent: "center", alignItems: "center", height: 50,
        backgroundColor: "#eeeeee",
        margin: 10
    }
});




 
import React, { Component } from 'react'
import {View, StyleSheet, AsyncStorage, TouchableHighlight, Image, Modal} from 'react-native'
import {GoogleSignin, GoogleSigninButton, statusCodes} from '@react-native-community/google-signin';
import axios from 'axios'
const key = "beacon091211fX2TAJS0VbillUWp1aVx002VggT"


export default class GoogleLoginComponent extends Component {
    constructor(props) {
        super(props);
        this.state = {
            pushData: [],
            loggedIn: false,
            userInfo: {email: '', name: '', type:''},
            loading: false,
        }
    }
    componentDidMount() {
       
    }
    _signIn = async() => {
        this.setState({loading: true})
        GoogleSignin.configure({
            webClientId: '420490957468-fg53nft8vmu1egq8d37ralre73liiarb.apps.googleusercontent.com',
            offlineAccess: true,
            hostedDomain: '',
            forceConsentPrompt: true,

        });

        try {
            await GoogleSignin.hasPlayServices();
            const userInfo = await GoogleSignin.signIn();
 
            axios.get("https://beacon.smst.kr/appAPI/v1/loginSns.php?apiKey="
            +key+"&modeType=loginSns&email="+userInfo.user.email+"&snsSite=google&mname="+userInfo.user.name).then(response => {
                if(response.data.rescode == "0000") {
                    this.setState({loading: false})
                    AsyncStorage.setItem("id", response.data.muid);
                    AsyncStorage.setItem("type", "google");
                    this.props.navigation.navigate('Home');
                }
                   
                else {
                    console.log("Login Fail");
                    this.setState({loading: false})
                }
            })       
        } catch(error) {
            this.setState({loading: false})
            if(error.code === statusCodes.SIGN_IN_CANCELLED) {
                console.log("login Cancelled");
            }
            else if(error.code === statusCodes.IN_PROGRESS) {
                console.log("in progress error")
            }
            else if(error.code === statusCodes.PLAY_SERVICES_NOT_AVAILABLE) {
                console.log("play service not available")
            }
            else {
                console.log(error)
            }
        }
    }

    signOut = async() => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
            this.setState({user: null, loggedIn: false});
        }catch (error) {
            console.log(error);
        }
    }

    render() {
        return(
            <>
                {!this.state.loggedIn && <TouchableHighlight style={styles.btn}
                    onPress={this._signIn}  underlayColor="#transparent">
                        <Image style={{height:50, width:50}} source={require('../../assets/google.jpg')}/>
                        </TouchableHighlight>}

                    <Modal visible={this.state.loading}>
                    <View style={{backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                    width: '100%',
                                    height: '100%'}}/>
                    </Modal>
            </>
        )
    }
}

const styles = StyleSheet.create({
    btn: {
        width: 50,
        height: 50,
        
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
        
    }
})
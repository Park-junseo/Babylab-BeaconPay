import React, { Component } from 'react'
import {View, StyleSheet,TouchableHighlight, Image, Modal, AsyncStorage} from 'react-native'
import {NaverLogin, getProfile} from '@react-native-seoul/naver-login'
import axios from 'axios'
const key = "beacon091211fX2TAJS0VbillUWp1aVx002VggT"

const androidKeys = {
    kConsumerKey:'J54f6Ml6Fa4o3mBwRbo0',
    kConsumerSecret:'bH5RX3wwKl',
    kServiceAppName: "비콘결제앱"
}

const initials = androidKeys;

class NaverLoginComponent extends Component{
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            token: null,
            loading: false,
        }
    }
    naverLogin = (props )=> {
        return new Promise((resolve, reject) => {
            NaverLogin.login(props, (err, token) => {
                this.setState({loading: true})
                console.log(`\n\n Token is fetched :: ${token} \n\n`);
                this.setState({loggedIn: true, token: token})
                this.getUserProfile();
                if(err) {
                    reject(err);
                    this.setState({loading: false})
                    return;
                }
                resolve(token);
            })
        })
    }

    naverLogout = () => {
        NaverLogin.logout();
        this.setState({loggedIn: false})
    }

    getUserProfile = async () => {
        const profileResult = await getProfile(this.state.token.accessToken);
        
        if(profileResult.resultcode == "024") {
           console.log("fail")
           this.setState({loading: false})
            return;
        }
        else {
            axios.get("https://beacon.smst.kr/appAPI/v1/loginSns.php?apiKey="
            +key+"&modeType=loginSns&email="+profileResult.response.email+"&snsSite=naver&mname="+profileResult.response.name).then(response => {

                if(response.data.rescode == "0000") {
                    this.setState({loading: false})
                    AsyncStorage.setItem("id", response.data.muid);
                    AsyncStorage.setItem("type", "naver");
                    this.props.navigation.navigate('Home');
                }
               
                else {
                    console.log("Login Fail");
                    this.setState({loading: false})
                }
            })
        }
        
        //this.setState({userInfo: {email: profileResult.response.email, name: profileResult.response.name}})
    }
    render() {
        const loggedIn = this.state.loggedIn;
        return(
            <>
            <TouchableHighlight style={styles.naver_btn} onPress={()=>this.naverLogin(initials)}  underlayColor="#transparent">
                    <Image style={{height:50, width:50}}
                        source={require('../../assets/naver.png')}/>
            </TouchableHighlight>
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
    naver_btn: {
        width: 50,
        height: 50,
        marginBottom: 5,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 2,
        },
        shadowOpacity: 0.25,
        shadowRadius: 3.84,

        elevation: 5,
    },
    naver_text: {
        color: '#ffffff',
        fontWeight: 'bold',
    },
})

export default NaverLoginComponent
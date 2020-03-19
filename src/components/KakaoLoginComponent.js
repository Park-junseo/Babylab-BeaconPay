import { StyleSheet, Image, TouchableHighlight, AsyncStorage, Modal, View, BackHandler} from 'react-native'
import React, {Component} from 'react'
import KakaoLogins from '@react-native-seoul/kakao-login';
import axios from 'axios'

const key = "beacon091211fX2TAJS0VbillUWp1aVx002VggT"

export default class KakaoLoginComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            loggedIn: false,
            userInfo: {email:'', name:'', type:''},
            loading: false,
        
        }
    }


    kakaoLogin = () => {
        this.setState({loading: true})
        KakaoLogins.login().then(result => {
            
            this.setState({loggedIn:true})
            this.getProfile()
        }).catch(err => {
            console.log(err)
            this.setState({loading: false})
            if(err.code === 'E_CANCELLED_OPERATION') {
                
            }
            else {
                
            }
        })
        this.setState({loggedIn:true})
    }

    kakaoLogout = () => {
        KakaoLogins.logout().then(result => {
            this.setState({loggedIn:false})
        }).catch(err => {
            
        })
    }

    getProfile = () => {
        KakaoLogins.getProfile().then(result => {
            axios.get("https://beacon.smst.kr/appAPI/v1/loginSns.php?apiKey="
            +key+"&modeType=loginSns&email="+result.email+"&snsSite=kakao&mname="+result.nickname).then(response => {

                if(response.data.rescode == "0000") {
                    this.setState({loading: false})
                    AsyncStorage.setItem("id", response.data.muid);
                    AsyncStorage.setItem("type", "kakao");
                    this.props.navigation.navigate('Home');
                }
               
                else {
                    console.log("Login Fail");
                    this.setState({loading: false})
                }

            })
            
        }).catch(err => {
            console.log(err)
            this.setState({loading: false})
        })
        
    }
    render() {
        const loggedIn = this.state.loggedIn;
        return (
            <>
            <TouchableHighlight style={styles.kakao_btn} onPress={this.kakaoLogin}  underlayColor="#transparent">
                <Image style={{height: 50, width: 50}} 
                    source={require('../../assets/kakao.png')}/>
            </TouchableHighlight>

           {/* <Modal visible={this.state.loading}>
                <View style={{backgroundColor: 'rgba(0, 0, 0, 0.5)',
                                width: '100%',
                                height: '100%'}}/>
        </Modal>*/}
            </>
        )
    }
    
}
const styles = StyleSheet.create({
    kakao_btn: {
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
    kakao_text: {
        color: '#4a3628',
        fontWeight: 'bold'
    },
})

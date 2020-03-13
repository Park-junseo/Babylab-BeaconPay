import React, { Component } from 'react'
import {Text, View, StyleSheet, StatusBar, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView} from 'react-native'
import axios from 'axios'
import Toast from 'react-native-simple-toast'

import {DefaultInput} from '../components/InputBoxes'
import BlueButton from '../components/BlueButton'

const apiKey = "beacon091211fX2TAJS0VbillUWp1aVx002VggT"
const modeType = "findPasswd"
export default class FindPasswordScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: ''
        }
    }
    _findPW = () => {
        const email = this.state.email;
        if(email == "") {
            Toast.show("이메일을 입력해주세요");
            return ;
        }
        axios.get("http://beacon.smst.kr/appAPI/v1/email_send_passwd.php?apiKey="
        +apiKey+"&modeType="+modeType+"&email="+email).then(response => {
            console.log(response);
            if(response.data.resmsg == "처리성공") {
                Toast.show("입력하신 이메일로 비밀번호가 전송되었습니다.");
            }
            else {
                Toast.show("이메일이 존재하지 않습니다.");
                return ;
            }

            this.props.navigation.pop();
        })
        
    }
    _inputEmail = text => {
        this.setState({email: text})
    }
    render() {
        return(
            <KeyboardAvoidingView behavior="padding">
            <>
                <View style={{height: '100%', width:'100%', backgroundColor: '#fff', alignItems:'center', 
                 justifyContent: 'center', flex:1}}>
                    <View style={{paddingHorizontal:40}}>
                        <DefaultInput text='이메일' placeholder="Seoulpass.com" onChangeText={this._inputEmail} />     
                    </View>
                    

                    <View style={styles.btn_container}>
                        <BlueButton text="확인 메일 보내기" onPress={this._findPW}/>
                    </View>
                </View>
            </>
            </KeyboardAvoidingView>
        )
    }
}
const styles = StyleSheet.create({
    btn_container: {
        width:'100%'
    },
    text: {
        color: '#fff',
        fontWeight: 'bold',

        width: '100%',
        height:0,
        alignSelf: 'flex-start',
        marginBottom: 5,

        borderTopColor: '#384ec9',
        borderTopWidth:45,
        
        borderRightWidth: 10,
        borderRightColor: 'transparent',
        borderStyle: 'solid',
        alignSelf:'flex-end',
        right: 0,

        textAlign: 'center',
        textAlignVertical: 'center',
    }
})
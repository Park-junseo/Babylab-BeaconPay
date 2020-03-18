import React, { Component } from 'react'
import {Text, View, StyleSheet, StatusBar, TouchableOpacity, TextInput, KeyboardAvoidingView, ScrollView} from 'react-native'
import axios from 'axios'
import Toast from 'react-native-simple-toast'

//import {DefaultInput} from '../components/InputBoxes'
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
                <ScrollView contentContainerStyle={{width: '100%', height: '100%'}}>
                <View style={{height: '100%', width:'100%', backgroundColor: '#fff', alignItems:'center',
                 justifyContent: 'center', flex:1}}>
                    <View style={{paddingHorizontal:40}}>
                        <View style={[{ marginBottom:24},]}>
                            <Text style={[input_styles.default_text]}>이메일</Text>
                            <View style={{flexDirection: 'row'}}>
                                <TextInput style={[input_styles.input]} onChangeText={this._inputEmail} 
                            placeholder={"이메일 입력"} placeholderTextColor={'#999999'} keyboardType={'email-address'}/>
                            </View>
                        </View>

                    </View>
                    

                    <View style={styles.btn_container}>
                        <BlueButton text="확인 메일 보내기" onPress={this._findPW}/>
                    </View>
                </View>
                </ScrollView>
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

const input_styles = StyleSheet.create({
    default_text: {
        color: '#000000dd',
        paddingLeft:8,
        marginBottom:9,
        fontWeight:'bold',
        fontSize:12
    },
    detail_text: {
        color: '#000000dd',
        fontWeight: 'bold',
        fontSize:10
    },
    input : {
        borderBottomWidth: 1,
        borderColor : '#00000059',
        paddingLeft: 10,
        paddingBottom:3,
        width:'100%',
        fontSize:14,

    },
    /*
    input_container: {
        marginBottom: 24,
    },
    */
    detail_input: {
        borderBottomWidth: 1,
        borderColor : '#00000059',
        paddingLeft: 10,
        marginBottom:8,
        paddingBottom:4,
        width:'100%',
        fontSize:14
    },
    detail_btn: {
        backgroundColor: '#f5f5f5',
        borderRadius: 7,
        marginLeft: 7,
        paddingHorizontal:12,
        paddingVertical:12,
        textAlignVertical:'bottom',
        alignSelf:'baseline',
        justifyContent:'center',
        borderRadius:20
    },
    color_white:{
        color: '#ffffffdd',
        borderColor: '#ffffff99'
    }
})
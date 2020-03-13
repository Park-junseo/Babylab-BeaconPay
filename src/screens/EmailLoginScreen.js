import React, { Component } from 'react'
import {Text, StyleSheet, TouchableOpacity, View, TextInput, Image, AsyncStorage, KeyboardAvoidingView, 
    ScrollView} from 'react-native'
import axios from 'axios'
import BlueButton from '../components/BlueButton'
import Toast from 'react-native-simple-toast'

import {DefaultInput} from '../components/InputBoxes'


const key = 'beacon091211fX2TAJS0VbillUWp1aVx002VggT'
export default class EmailLoginScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            password:'',
        }
    }
    login = () => {
        axios.get('https://beacon.smst.kr/appAPI/v1/loginPhone.php?apiKey='
            +key+'&modeType=loginPhone&email='+this.state.email+'&passwd='+this.state.password)
        .then(response => {
            if(response.data.rescode == "0000") {
                console.log(response.data.muid)
              //  AsyncStorage.setItem("email", this.state.email);
                AsyncStorage.setItem("id", response.data.muid);
                AsyncStorage.setItem("type", "local");
                this.props.navigation.navigate('Home');
            }
            else {
                Toast.show("이메일과 비밀번호를 확인해주세요")
            }
            
        })
        
    }
    _inputEmail = text => {
        this.setState({email: text})
    }
    _inputPW = text => {
        this.setState({password: text})
    }
    findPW = () => {
        this.props.navigation.navigate('findPW');
    }
    render() {
        return(
            <KeyboardAvoidingView behavior="height">
            <ScrollView contentContainerStyle={{width: '100%', height: '100%'}}>
            <View style={{backgroundColor:'#4666e5', width: '100%', height: '100%', alignItems: 'center'}}>
                <View style={{height: '40%', width: '100%', marginTop:60}}>
                    <Image resizeMode="contain" source={require('../../assets/LOGO.png')} 
                            style={{width: '100%', height: '90%'}}/>
                </View>

                <View style={{width: '100%', 
                alignItems: 'center', justifyContent: 'center', justifyContent: 'flex-end'}}>
                    
                    <View style={styles.login_form}>

                        <DefaultInput text='이메일' placeholder="이메일 입력" white={true} onChangeText={this._inputEmail}
                        onSubmitEditing ={()=>this.secondTextInput.focus()} blurOnSubmit={false} marginBottom={33}/>

                        <DefaultInput text='비밀번호' placeholder="8자리 이상" white={true} onChangeText={this._inputPW}
                        ref={(input)=>{this.secondTextInput = input}} secureTextEntry={true}/>


                    </View>
  
                    <View style={styles.login_btn_container}>
                        <BlueButton text="로그인" white={true} onPress={this.login}/>
                    </View>

                    <View style={styles.find_pw_container}>
                        <Text style={{color: '#ffffff99', marginRight:19}}>비밀번호를 잊어버리셨나요 ? </Text>
                        <TouchableOpacity onPress={this.findPW}>
                            <Text style={styles.find_pw}>비밀번호찾기</Text>
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
            </ScrollView>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    login_form:{
        width: '85%',
        alignSelf: 'center'
    },
    input : {
        marginLeft: 15,
        marginBottom:20,
        borderColor : '#fff',
        borderBottomWidth: 1,
        paddingLeft: 10,
        marginTop: 10,
        color: '#fff',
        fontWeight: 'bold'
    },
    login_btn: {
        width: '90%',
        alignSelf: 'flex-start'        
    },
    login_btn_container: {
        width: '100%',
        
    },
    find_pw_container: {
        flexDirection:'row',
        marginTop:17,
        width:'100%',
        alignItems: 'center',
        justifyContent: 'center',
        fontSize:14

    },
    find_pw: {
        borderBottomWidth: 1,
        color: '#ffffff99',
        borderColor: '#ffffff99'
    },
    login_text:{
        color: '#384ec9',
        fontWeight: 'bold',

        width: '100%',
        height:0,
        alignSelf: 'flex-start',
        marginBottom: 5,

        borderTopWidth: 50,
        borderTopColor: '#fff',
        borderRightWidth: 10,
        borderRightColor: 'transparent',


        textAlignVertical: 'center',
        textAlign: 'center'
    },
})
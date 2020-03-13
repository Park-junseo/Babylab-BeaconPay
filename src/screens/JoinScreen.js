import React, { Component } from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, CheckBox, Alert, 
    ScrollView, Modal, TouchableHighlight, KeyboardAvoidingView} from 'react-native'
import axios from 'axios'
import {WebView} from 'react-native-webview'
import {AntDesign} from '@expo/vector-icons'
import Postcode from 'react-native-daum-postcode';
import Toast from 'react-native-simple-toast'

import BlueButton from '../components/BlueButton'
import {DefaultInput} from '../components/InputBoxes'
import MoreButton from '../../assets/btn/Right.svg'

const key = "beacon091211fX2TAJS0VbillUWp1aVx002VggT"

export default class JoinScreen extends Component{
    constructor(props){
        super(props)
        this.state = {
            check_all: false,
            check_1: false,
            check_2: false,
            email: '',
            pw: '',
            pw2:'',
            name: '',
            phone: '',
            addr: '',
            addr2: '',
            modal: false,
        }
    }
    check_1 = () => {
        this.setState((prev)=>({check_1:!prev.check_1}));
        this.setState((prev)=>({check_all:(prev.check_1&&prev.check_2)}));
    }
    check_2 = () => {
        this.setState((prev)=>({check_2:!prev.check_2}));
        this.setState((prev)=>({check_all:(prev.check_1&&prev.check_2)}));
    }
    check_all = () => {
        this.setState((prev)=>({check_all:!prev.check_all}));
        this.setState((prev)=>({check_1:prev.check_all, check_2:prev.check_all}));
    }

    _inputEmail = text => {
        this.setState({email: text})
    }
    _inputPW = text => {
        this.setState({pw: text})
    }
    _inputPW2 = text => {
        this.setState({pw2: text})
    }
    _inputName = text => {
        this.setState({name: text})
    }
    _inputPhone = text => {
        this.setState({phone: text})
    }
    _inputAddr = text => {
       this.setState({addr: text}) 
    }
    _inputAddr2 = text => {
        this.setState({addr2: text})
    }
  
    _join = () => {
        const check = this.state.check_all;

        const email = this.state.email;
        const pw = this.state.pw;
        const pw_check = this.state.pw2;

        const name = this.state.name;
        const phone = this.state.phone;
        const addr = this.state.addr;
        const addr2 = this.state.addr2;

        if(email == "") {
            Toast.show("이메일은 필수입력사항 입니다.");
            return;
        }
        let reg = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/ ;
        if(reg.test(email) === false) {
            Toast.show("이메일 형식이 바르지 않습니다.");
            return ;
        }


        if(pw.length < 8) {
            Toast.show("비밀번호는 8자 이상 입니다.");
            return;
        }
        if(pw != pw_check) {
            Toast.show("비밀번호를 확인해주세요.");
            return;
        }
        if(name == "") {
            Toast.show("이름은 필수입력사항 입니다.");
            return;
        }
        /*
        if(phone == "") {
            Toast.show("휴대폰은 필수입력사항 입니다.");
            return;
        }*/
        if(addr == "") {
            Toast.show("주소는 필수입력사항 입니다.");
            return;
        }
        

        

        if(check) {
            if(check == true) {
                console.log("Start Join")
                axios.get("https://beacon.smst.kr/appAPI/v1/memberRegisterPhone.php?apiKey="
                +key+"&modeType=join&name="+name+"&email="+email+"&pw="+pw+"&addr="+addr+"&addr2="+addr2+"&phone="+phone).then(response => 
                    {
                        if(response.data.rescode == "0000") {
                            this.success();
                        }
                        else {
                            Toast.show("이미 존재하는 이메일입니다.");
                        }
                    } 
                )}      
        }
        
        else {
            Toast.show("약관 동의가 필요합니다.");
        }
    }
    success = () => {
        Alert.alert(
            "회원가입 성공",
            "",
            [
                {text: '확인', onPress:()=>this.props.navigation.pop()}
            ],
            { cancelable: false }
        );
    }

    setAddress(data) {
       // console.log(data.address);
        this.setState({addr: data.address})
        this.closeModal();
    }
    closeModal = () => {
        this.setState({modal: false})
    }
    openModal = () => {
        this.setState({modal: true})
    }

    render() {
        return(
            <KeyboardAvoidingView behavior="padding">
            <View style={styles.container}>
                <ScrollView>
                <View style={[styles.login_form,styles.margin_horizontal]}>
                    <DefaultInput text='이메일' placeholder="interiorssa@smst.kr" onChangeText={this._inputEmail} marginRight={62} />

                    <DefaultInput text='비밀번호 (8자리 이상)' placeholder="●●●●●●●●" onChangeText={this._inputPW} marginRight={62} secureTextEntry={true}/>

                    <DefaultInput text='비밀번호 확인' placeholder="●●●●●●●●" onChangeText={this._inputPW2} marginRight={62} secureTextEntry={true}/>


                    {/*
                    <View style={styles.input_container}>
                        <Text style={styles.default_text}>이름</Text>
                        <View style={{flexDirection: 'row'}}>
                            <TextInput style={styles.detail_input} placeholderTextColor={'#00000059'}  placeholder="김비콘" onChangeText={this._inputName}/>
                            <TouchableOpacity style={styles.detail_btn}>
                                <Text style={styles.detail_text}>실명확인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    */}

                    <DefaultInput text='이름' placeholder="김비콘" onChangeText={this._inputName} marginRight={62}>
                        <TouchableOpacity style={styles.detail_btn}>
                            <Text style={styles.detail_text}>실명확인</Text>
                        </TouchableOpacity>
                    </DefaultInput>

                    {/*<View style={styles.input_container}>
                        <Text style={styles.default_Text}>전화번호</Text>
                        <View style={{flexDirection: 'row'}}>
                          <TextInput style={styles.phone_input} placeholderTextColor={'#999999'}/>
                          <TouchableOpacity style={styles.phone_btn}>
                              <Text style={styles.detail_Text}>인증번호 전송</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    
                    <View style={styles.input_container}>
                        <Text style={styles.default_Text}>인증번호</Text>
                        <TextInput style={styles.input} placeholderTextColor={'#999999'}/>
                    </View>*/}

                    <DefaultInput text='주소지 입력' placeholder="서울특별시 강남역 1번 출구"
                    initText={this.state.addr} marginRight={62}  marginBottom={8}>
                        <TouchableOpacity style={styles.detail_btn}>
                            <Text style={styles.detail_text} onPress={this.openModal}>우편번호 검색</Text>
                        </TouchableOpacity>
                    </DefaultInput>
                    <DefaultInput title={false} placeholder="(직접입력)" onChangeText={this._inputAddr2} marginRight={62}/>

                </View>
                <View style={[styles.agree_container,styles.margin_horizontal]}>
                    <View style={{flexDirection: 'row', alignItems: 'center'}}>
                        <CheckBox style={styles.check_box} value={this.state.check_all} onValueChange={this.check_all} />
                        
                        <TouchableOpacity onPress={this.check_all}>
                            <Text style={styles.agreeAll_text}>약관 전체동의</Text>
                        </TouchableOpacity>
                    </View> 

                    <View style={styles.agree_list}>
                        <View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <CheckBox style={styles.check_box} value={this.state.check_1} onValueChange={this.check_1} />
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate('agree')}>
                                    <Text style={styles.agree_text}>서울하이패스 이용약관 동의(필수)</Text>
                                </TouchableOpacity>
                                
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <CheckBox style={styles.check_box} value={this.state.check_2} onValueChange={this.check_2} />
                                <TouchableOpacity onPress={()=>this.props.navigation.navigate('agree')}>
                                    <Text style={styles.agree_text}>개인정보 수집이용 동의(필수)</Text>
                                </TouchableOpacity>
                                
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'flex-end'}}>
                            <MoreButton width="24" height="24" fill={'#808080'}/>
                        </View>

                        
                        {/*<View style={{flexDirection: 'row', alignItems: 'center'}}>
                            <CheckBox style={styles.check_box} value={this.state.CheckBox} onValueChange={this.check} />
                            <TouchableOpacity onPress={()=>this.props.navigation.navigate('agree')}>
                                <Text style={styles.agree_text}>마케팅 수신 동의(선택)</Text>
                            </TouchableOpacity>
                            
                        </View>*/}
                    </View>
                    
                </View>
                <View style={styles.join_btn_container}>
                    
                    <BlueButton text="회원가입" white={false} onPress={this._join}/>
                    
                </View>
                </ScrollView>

                <Modal visible={this.state.modal}> 
                    
                        <TouchableHighlight onPress={this.closeModal} style={{alignSelf: 'flex-end'}}>
                            <AntDesign name="close" size={25} color={"#465cdb"} />
                        </TouchableHighlight>
                        <View style={{width: '100%', height: '90%'}}>
                           <Postcode style={{width: '100%', height: '100%'}} jsOptions={{animated: true}} 
                           onSelected={(data) => this.setAddress(data)}/>
                        </View>
                </Modal>
            </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({
    default_text: {
        color: '#000000dd',
        paddingLeft:8,
        marginBottom:10,
        fontWeight:'bold',
        fontSize:12
    },
    detail_text: {
        color: '#000000dd',
        fontWeight: 'bold',
        fontSize:10
    },
    agreeAll_text: {
        color: '#000000dd',
        fontSize:12,
        fontWeight:'bold'
    },
    agree_text: {
        color: '#00000099',
        fontSize:12
    },
    container: {
        width: '100%',
        height: '100%',
        backgroundColor:'#fff'
    },
    login_form:{
        //width: '70%'
        //paddingHorizontal: 25
        marginTop:20,
    },
    input : {
        borderBottomWidth: 1,
        borderColor : '#00000099',
        paddingLeft: 10,
        paddingBottom:2,
        fontSize:14
    },
    input_container: {
        marginBottom: 24,
        marginRight: 62
    },
    detail_input: {
        borderBottomWidth: 1,
        borderColor : '#00000099',
        paddingLeft: 10,
        marginBottom:8,
        paddingBottom:2,
        width:'100%',
        fontSize:14
    },
    detail_btn_wrapper : {
        backgroundColor:'#faa'
    },
    detail_btn: {
        backgroundColor: '#f5f5f5',
        borderRadius: 7,
        marginLeft: 7,
        paddingHorizontal:12,
        paddingVertical:9,
        borderRadius:20,
        alignSelf:'baseline',
        marginBottom:-8
    },
    agree_container: {
        marginTop: 10,
        marginBottom:56
    },
    agree_list: {
        backgroundColor: '#fafafa',
        paddingVertical: 20,
        borderRadius: 5,
        marginHorizontal: -24,
        paddingHorizontal: 24,
        marginTop:18,
        flexDirection:'row',
        justifyContent:'space-between'
    },
    check_box: {
        marginLeft:-5,
        marginRight:12
    },
    join_btn_container: {
        marginBottom:42,
        width:'100%',
        
    },
    margin_horizontal:{
        marginHorizontal:40
    }
})
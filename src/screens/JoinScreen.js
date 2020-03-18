import React, { Component } from 'react'
import {View, Text, StyleSheet, TextInput, TouchableOpacity, CheckBox, Alert, Image,
    ScrollView, Modal, TouchableHighlight, KeyboardAvoidingView} from 'react-native'
import axios from 'axios'
import {WebView} from 'react-native-webview'
import {AntDesign} from '@expo/vector-icons'
import Postcode from 'react-native-daum-postcode';
import Toast from 'react-native-simple-toast'

import BlueButton from '../components/BlueButton'

const key = "beacon091211fX2TAJS0VbillUWp1aVx002VggT"

const content1 = `제1조 [목적]
이 약관은 언제어디서나(이하 “회사”라 한다)가 제공하는 서울하이패스(이하 “서비스”라 한다)의 이용조건 및 절차에 관한 사항 및 기타 필요한 사항을 규정함을 목적으로 한다.
제2조 [약관의 효력과 변경[
약관은 이용자에 공시함으로 효력을 발생한다.
회사는 사정변경의 경우와 영업상 중요사유가 있을 때 약관을 변경할 수 있으며 변경된 약관은 공시함으로 효력을 발생한다.
제3조 [약관의 공시 및 준용]
약관이 변경될 경우 회사는 이를 서비스 내에 공시합니다.
제4조 [서비스 안내]
회사가 제공하는 서비스가 설치된 곳에서 자동으로 승하차를 파악하여 이용요금을 차감하는 서비스를 제공한다.
제5조 [이용요금]
사용자는 카카오페이 등을 이용하여 해당앱의 충전된 금액에서 자동차감하는 방식의 결제가 이루어 지게 됨다.
제6조 [개인정보의 활용]
수집된 개인정보는 개인정보 활용 동의에 따라 처리한다.
`

const content2 = `『개인정보보호법』 등 관련 법규에 의거하여 언제어디서나는 고객님의 개인정보 수집 및 활용에 대해 개인정보 수집, 활용 동의서를 받고 있습니다.
개인정보 제공자가 동의한 내용 외의 다른 목적으로 활용되지 않으며, 제공된 개인정보의 이용을 거부하고자 할 때에는 개인정보 관리책임자를 통해 열람, 정정, 삭제를 요구할 수 있습니다.

제공된 개인정보는 아래의 항목에 제한된 범위에서만 활용됩니다.

수집되는 개인정보 항목 : 성명, 이메일, 전화번호, 결제정보
개인정보 이용 목적
-	결제되는 내역의 본인 확인 절차에 이용
-	신규 서비스 개발을 위한 고객 분석자료
-	제3자의 결제대금 청구에 의한 제공

『개인정보보호법』 등 관련 법규에 의거하여 개인정보 수집, 활용에 동의합니다.
`

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

            agreement: [],
        }
    }

    componentWillMount() {
        const agreeArray = [
            {
                title: '서울패스 이용약관 동의',
                necessary: true,
                content: content1,
                check:this.check_1,
                checkState:this.state.check_1
            },
            {
                title: '개인정보 수집이용 동의',
                necessary: true,
                content: content2,
                check:this.check_2,
                checkState:this.state.check_2
            }
        ]

        this.setState((state)=>({agreement:agreeArray}));
    }

    showAgreement=()=>{
        let agreeArray = this.state.agreement;
        agreeArray[0].checkState=this.state.check_1;
        agreeArray[1].checkState=this.state.check_2;
        
        this.setState((prev)=>({agreement: agreeArray}));


        this.props.navigation.navigate('agree', {agreeArray:agreeArray});
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
        }
        */
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

    agreeElement = () => {
        return (
            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                <CheckBox style={styles.check_box} value={this.state.check_1} onValueChange={this.check_1} />
                <TouchableOpacity onPress={()=>this.props.navigation.navigate('agree')}>
                    <Text style={styles.agree_text}>서울하이패스 이용약관 동의(필수)</Text>
                </TouchableOpacity>
                
            </View>
        )
    }

    render() {
        const _this = this;

        return(
            <KeyboardAvoidingView behavior="padding">
            <View style={styles.container}>
                <ScrollView>
                <View style={[styles.login_form,styles.margin_horizontal]}>
                    <View style={[{marginRight:62, marginBottom:24},]}>
                        <Text style={[input_styles.default_text,]}>이메일</Text>
                        <View style={{flexDirection: 'row'}}>
                            <TextInput style={[input_styles.input]} placeholderTextColor={'#999999'} onChangeText={this._inputEmail}
                                onSubmitEditing ={()=>this.secondTextInput.focus()} keyboardType={'email-address'} placeholder="interiorssa@smst.kr"/>
                        </View>
                    </View>

                    <View style={[{marginRight:62, marginBottom:24},]}>
                        <Text style={[input_styles.default_text,]}>비밀번호 (8자리 이상)</Text>
                        <View style={{flexDirection: 'row'}}>
                            <TextInput style={[input_styles.input]} placeholder="●●●●●●●●" onChangeText={this._inputPW} secureTextEntry={true} onSubmitEditing ={()=>this.ThirdTextInput.focus()}
                            ref={(input)=>{this.secondTextInput = input}}/>
                        </View>
                    </View>

                    <View style={[{marginRight:62, marginBottom:24},]}>
                        <Text style={[input_styles.default_text,]}>비밀번호 확인</Text>
                        <View style={{flexDirection: 'row'}}>
                        <TextInput style={[input_styles.input]} placeholder="●●●●●●●●" onChangeText={this._inputPW2} secureTextEntry={true} onSubmitEditing ={()=>this.ForthTextInput.focus()}
                            ref={(input)=>{this.ThirdTextInput  = input}}/>
                        </View>
                    </View>

                    <View style={[{marginRight:62, marginBottom:24},]}>
                        <Text style={[input_styles.default_text,]}>이름</Text>
                        <View style={{flexDirection: 'row'}}>
                            <TextInput style={input_styles.input} placeholderTextColor={'#999999'} placeholder="김서울"
                            onChangeText={this._inputName}
                            ref={(input)=>{this.ForthTextInput = input}}/>
                            <TouchableOpacity style={styles.detail_btn}>
                                <Text style={styles.detail_text}>실명확인</Text>
                            </TouchableOpacity>
                        </View>
                    </View>

                    <View style={[{marginRight:62, marginBottom:8},]}>
                        <Text style={[input_styles.default_text,]}>주소지입력</Text>
                        <View style={{flexDirection: 'row'}}>
                            <Text style={[input_styles.input]}>{(this.state.addr=='') ? '서울특별시 강남역 1번 출구': this.state.addr}</Text>
                            <TouchableOpacity style={styles.detail_btn}>
                                <Text style={styles.detail_text} onPress={this.openModal}>우편번호 검색</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                    <View style={[{marginRight:62, marginBottom:24},]}>
                        <View style={{flexDirection: 'row'}}>
                            <TextInput style={[input_styles.input]} placeholderTextColor={'#999999'} onChangeText={this._inputAddr2}
                                placeholder="(직접입력)"/>
                        </View>
                    </View>

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
                    </View>

                    <DefaultInput text='주소지 입력' placeholder="서울특별시 강남역 1번 출구"
                    initText={this.state.addr} marginRight={62}  marginBottom={8}>
                        <TouchableOpacity style={styles.detail_btn}>
                            <Text style={styles.detail_text} onPress={this.openModal}>우편번호 검색</Text>
                        </TouchableOpacity>
                    </DefaultInput>
                    <DefaultInput title={false} placeholder="(직접입력)" head={false} onChangeText={this._inputAddr2} marginRight={62}/>
*/}
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
                                <TouchableOpacity onPress={this.showAgreement}>
                                    <Text style={styles.agree_text}>{this.state.agreement[0].title}{(this.state.agreement[0].necessary) ? " (필수)" : ""}</Text>
                                </TouchableOpacity>
                                
                            </View>
                            <View style={{flexDirection: 'row', alignItems: 'center'}}>
                                <CheckBox style={styles.check_box} value={this.state.check_2} onValueChange={this.check_2} />
                                <TouchableOpacity onPress={this.showAgreement}>
                                    <Text style={styles.agree_text}>{this.state.agreement[1].title}{(this.state.agreement[1].necessary) ? " (필수)" : ""}</Text>
                                </TouchableOpacity>
                                
                            </View>
                        </View>
                        <View style={{flex:1, flexDirection:'row', alignItems:'center', justifyContent:'flex-end'}}>
                            <TouchableOpacity onPress={this.showAgreement}>
                                <Image source={require('../../assets/btn_png/Right.png')} resizeMode='contain' style={{width:24, height:24}}/>
                            </TouchableOpacity>
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
import React, { Component } from 'react'
import {StyleSheet, Text, View, StatusBar, Image, 
    TouchableHighlight, AsyncStorage, ScrollView, TextInput, TouchableOpacity, Alert, Modal, KeyboardAvoidingView} from 'react-native'
import {AntDesign} from '@expo/vector-icons'
import axios from 'axios'
import Postcode from 'react-native-daum-postcode';
import BlueButton from '../components/BlueButton'

const key = "beacon091211fX2TAJS0VbillUWp1aVx002VggT"

export default class InfoModifyScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            email: '',
            id: '',
            addr: '',
            addr2: '',
            name: '',
            phone: '',
            pw: '',
            pw2: '',

            modal: false,
            sns: '',
        }
    }
    componentDidMount() {
        AsyncStorage.getItem("type").then(asyncStorageRes => {
            this.setState({sns: asyncStorageRes})
        })
        AsyncStorage.getItem("id").then(asyncStorageRes => {
            this.setState({id: asyncStorageRes}, function() {
                axios.get("https://beacon.smst.kr/appAPI/v1/memberRegisterPhone.php?apiKey="
                +key+"&modeType=userInfo&muid="+this.state.id).then(response => {
                    console.log(response);
                    this.setState({email: response.data.email, name: response.data.mname, addr: response.data.addr,
                    addr2: response.data.addr2, phone: response.data.hphone, sns: response.data.sns })
                })
            })
        })
    }

    _inputPW = text => {
        this.setState({pw:text})
    }
    _inputPW2 = text => {
        this.setState({pw2: text})
    }
    _inputPhone = text => {
        this.setState({phone: text})
    }
    _inputAddr2 = text => {
        this.setState({addr2: text})
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
    _modify = () => {
        if(this.state.sns == "local") {
            if(this.state.pw.length < 8 || this.state.pw2.length < 8 ) {
                Alert.alert(
                    "비밀번호는 8자 이상입니다",
                    "",
                    [
                        {text: '확인'}
                    ],
                    { cancelable: false }
                );
                return ;
            }
            if(this.state.pw != this.state.pw2 ) {
                Alert.alert(
                    "비밀번호를 확인해주세요",
                    "",
                    [
                        {text: '확인'}
                    ],
                    { cancelable: false }
                );
                return ;
            }
        }
        

        const pw = this.state.pw;
        const phone = this.state.phone;
        const addr = this.state.addr;
        const addr2 = this.state.addr2;
        const id = this.state.id;
      

        axios.get("https://beacon.smst.kr/appAPI/v1/memberRegisterPhone.php?apiKey="+key+"&modeType=mody&muid="+
            id+"&pw="+pw+"&addr="+addr+"&addr2="+addr2+"&phone="+phone).then(response => {
                    if(response.data.rescode == "0000"){
                        Alert.alert(
                            "수정되었습니다.",
                            "",
                            [
                                {text: '확인'}
                            ],
                            { cancelable: false }
                        );
                        this.props.navigation.pop();
                    }
                })

    }
    render() {
        return(
            <KeyboardAvoidingView behavior="padding">
            <View style={styles.container}>
                <ScrollView>
                    <View style={[styles.login_form,styles.margin_horizontal]}>
                        <View style={[{marginRight:62, marginBottom:24},]}>
                            <Text style={[input_styles.default_text,]}>이메일 {this.state.sns != "local" ? "- "+this.state.sns+"로그인" : ""}</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={[input_styles.input]} >{this.state.email}</Text>
                            </View>
                        </View>
                    {this.state.sns == 'local' &&
                        <View style={[{marginRight:62, marginBottom:24},]}>
                            <Text style={[input_styles.default_text,]}>비밀번호 (8자리 이상)</Text>
                            <View style={{flexDirection: 'row'}}>
                                <TextInput style={[input_styles.input]} placeholder="●●●●●●●●" onChangeText={this._inputPW} secureTextEntry={true}/>
                            </View>
                        </View>
                    }
                    {this.state.sns == 'local' &&
                        <View style={[{marginRight:62, marginBottom:24},]}>
                            <Text style={[input_styles.default_text,]}>비밀번호 확인</Text>
                            <View style={{flexDirection: 'row'}}>
                                <TextInput style={[input_styles.input]} placeholder="●●●●●●●●" onChangeText={this._inputPW2} secureTextEntry={true}/>
                            </View>
                        </View>
                    }

                        <View style={[{marginRight:62, marginBottom:24},]}>
                            <Text style={[input_styles.default_text,]}>이름</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={input_styles.input}>{this.state.name}</Text>
                                {/*
                                <TouchableOpacity style={styles.detail_btn}>
                                    <Text style={styles.detail_text}>실명확인</Text>
                                </TouchableOpacity>
                */}
                            </View>
                        </View>

                        <View style={[{marginRight:62, marginBottom:8},]}>
                            <Text style={[input_styles.default_text,]}>주소지입력</Text>
                            <View style={{flexDirection: 'row'}}>
                                <Text style={[input_styles.input]}>{this.state.addr}</Text>
                                <TouchableOpacity style={styles.detail_btn}>
                                    <Text style={styles.detail_text} onPress={this.openModal}>우편번호 검색</Text>
                                </TouchableOpacity>
                            </View>
                        </View>
                        <View style={[{marginRight:62, marginBottom:24},]}>
                            <View style={{flexDirection: 'row'}}>
                                <TextInput style={[input_styles.input]} placeholderTextColor={'#999999'} onChangeText={this._inputAddr2}
                                    placeholder="상세주소 입력" defaultValue={this.state.addr2}/>
                            </View>
                        </View>


                    </View>
                    <View style={styles.join_btn_container}>
                        <BlueButton text={'정보수정'} onPress={this._modify}/>
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
    container: {
        width: '100%',
        height: '100%',
        backgroundColor:'#fff'
    },
    login_form:{
        marginTop:20,
        marginHorizontal: 40,
        marginBottom:'6%'
    },
    input : {
        borderBottomWidth: 1,
        borderColor : '#828282',
        paddingLeft: 10,
        
    },

    join_btn_container: {
        width: '100%',
        marginTop: 20,
        marginBottom:60
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
    detail_text: {
        color: '#000000dd',
        fontWeight: 'bold',
        fontSize:10
    },
    margin_horizontal: {
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
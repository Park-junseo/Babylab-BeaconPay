import React, { Component } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, TextInput, Alert, AsyncStorage} from 'react-native'
import {RadioButton} from 'react-native-paper'
import CardComponent from '../components/CardComponent'
import axios from 'axios'

import BlueButton from '../components/BlueButton'

const apiKey = "beacon091211fX2TAJS0VbillUWp1aVx002VggT";
const modeType = "charge";


export default class ChargeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            val: 1,
            charge: 10000,
            id: "",
        }
    }
    componentDidMount() {
        AsyncStorage.getItem("id").then(asyncStorageRes => {
            this.setState({id: asyncStorageRes})
        })
    }
    _input = text => {
        this.setState({charge: text})
    }
    _charge = () => {
        const value = this.state.charge;
        if(value < 10000) {
            Alert.alert(
                "최소 금액은 10,000원 입니다.",
                "",
                [
                    {text: '확인'},
                ],
                { cancelable: true}
            );
        }

        else {
            Alert.alert(
                "결제 하시겠습니까?",
                "",
                [
                    {text: '결제', onPress:()=>this._chargeProcess()},
                    {text: '취소'}
                ],
                { cancelable: true}
            );
        }
    }
    _chargeProcess = () => {
        const price = this.state.charge;
        const muid = this.state.id;
        const item = "testaaaa";
        const url = "https://beacon.smst.kr/appAPI/v1/kakaoPay/ready.php";
        
        const params = new URLSearchParams();
        params.append('apiKey', apiKey);
        params.append('modeType', "payReady");
        params.append('muid', muid);
        params.append('charge_amount', price);
        params.append('charge_qnt', '1');
        params.append('charge_item', item);

        axios({
            method: 'post',
            url: url,
            data: params
        }).then(response => {
            console.log(response);
            this.props.navigation.navigate('kakaoPay', 
            {   goBackData: this._return ,
                uri: response.data.next_redirect_app_url, orderCode: response.data.ordercode})
            
        })

    /*    axios.get("https://beacon.smst.kr/appAPI/v1/pay/charge.php?apiKey="+
        apiKey+"&modeType="+modeType+"&muid="+muid+"&charge_amount="+price+"&charge_item=테스트충전").then(response => {
            if(response.data.rescode == "0000") {
                Alert.alert(
                    "충천되었습니다.",
                    "",
                    [
                        {text: '확인', onPress:()=>this._return()}
                    ],
                    { cancelable: false }
                );
            }
        })*/
    }
    _return = (data) => {
        this.props.navigation.state.params.goBackData({refresh: data})
        this.props.navigation.pop()
    }
    render() {
        return(
            <KeyboardAvoidingView behavior="position">
            
            {this.state.id != "" && 
            <View style={styles.full_container}>
                <View style={styles.container}>
                    <CardComponent setting={false}/>
                    <View style={[styles.option_container,this.state.optionHeight]}>
                        <View style={styles.option}>
                            <View style ={styles.option_title}>
                                <RadioButton color={'#465cdb'} onPress={()=>this.setState({charge: 10000, val: 1,optionHeight:null})}
                                    status={this.state.val == 1 ? 'checked':'unchecked'} /><Text>10,000원</Text>
                            </View>
                        </View>
                        <View style={styles.option}>
                            <View style ={styles.option_title}>
                                <RadioButton color={'#465cdb'} onPress={()=>this.setState({charge: 30000, val:3,optionHeight:null})}
                                    status={this.state.val == 3 ? 'checked':'unchecked'} /><Text>30,000원</Text>
                            </View>
                        </View>
                        <View style={styles.option}>
                            <View style ={styles.option_title}>
                                <RadioButton color={'#465cdb'} onPress={()=>this.setState({charge: 50000, val:5,optionHeight:null})}
                                    status={this.state.val == 5 ? 'checked':'unchecked'} /><Text>50,000원</Text>
                            </View>
                        </View>

                        <View style={[styles.option]}>
                            <View style ={styles.option_title}>
                                <RadioButton color={'#465cdb'} onPress={()=>this.setState({charge: 0, val:0,optionHeight:null})}
                                    status={this.state.val == 0 ? 'checked':'unchecked'} />
                                <Text>직접 입력  </Text>
                            </View>
                            {this.state.val == 0 ? <View style={{marginLeft:35}}>
                            <TextInput style={styles.input} placeholder={'직접 입력 (10,000원 이상)'} 
                            onChangeText={this._input} keyboardType={'numeric'}/>
                        </View> : <></>}
                        </View>
                    </View>

                </View>
                <View style={styles.btn_wrapper}>
                        <BlueButton text='결제하기'  onPress={this._charge}/>
                </View>
            </View>
            }
            </KeyboardAvoidingView>
            
        )
    }
}
const styles = StyleSheet.create({
    full_container:{
        width: '100%',
        height: '100%',
        backgroundColor: '#fff',
        flexDirection:'column',
        alignItems:'flex-start',
    },

    container: {
        width:'100%',
        paddingHorizontal:24,
        alignSelf: 'center',
        paddingTop:12,
        
    },
    option_container:{
        marginHorizontal:0,
        marginTop:'5%',
        paddingVertical:'4%',
        flexDirection:'column',
        alignSelf:'flex-start',
    },
    option: {
        flexDirection: 'column',
        alignItems: 'flex-start',
    },
    option_title: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        borderBottomWidth: 0.5,
        borderColor: '#828282',
        width: 200,
        
    },
    btn_wrapper: {
        width: '100%',
        marginTop: 20,
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
    },
    bottom_container: {
        width:'100%',
        backgroundColor:'#fff',
        borderTopLeftRadius:5,
        borderTopRightRadius:5,
        flex:1,
    },
    button_container: {
        flexDirection:'row',
        marginHorizontal:-4,
        alignSelf:'flex-start',
        marginTop:16,
        justifyContent:'space-evenly',
    },
    button_container2: {
        flexDirection:'row',
        marginHorizontal:-4,
        alignSelf:'flex-start',
        marginTop:8,
        justifyContent:'space-evenly'
    },
    price_button :{
        flex:0.25,
        alignItems:'center',
        backgroundColor:'#fff',
        borderRadius:5,
        borderColor:'#4a66e5',
        borderWidth:1,
        marginHorizontal:2
    },
    blueColor:{
        backgroundColor:'#4a66e5'
    },
    option_height:{
        
        height:'10%'
    }
})
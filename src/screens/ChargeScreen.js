import React, { Component } from 'react'
import {View, Text, StyleSheet, TouchableOpacity, KeyboardAvoidingView, ScrollView, TextInput, Alert, AsyncStorage} from 'react-native'
import {RadioButton} from 'react-native-paper'
import CardComponent from '../components/CardComponent'
import axios from 'axios'

import BlueButton from '../components/BlueButton'
import {DefaultInput} from '../components/InputBoxes'

const apiKey = "beacon091211fX2TAJS0VbillUWp1aVx002VggT";
const modeType = "charge";

export default class ChargeScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            val: 1,
            charge: 10000,
            id: "",

            auto: 10000,
            optionHeight: null
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
            console.log(this.state.charge)
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

        axios.get("https://beacon.smst.kr/appAPI/v1/pay/charge.php?apiKey="+
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
        })
    }
    _return = () => {
        this.props.navigation.state.params.goBackData({refresh: true})
        this.props.navigation.pop()
    }

    setAutoCharge = (price) => {
        this.setState({auto:price})
    }

    autoChargeHighlight = (price) => {
        return (price == this.state.auto) ? styles.blueColor : null;
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
                
                <View style={styles.bottom_container}>
                    <View style={{marginHorizontal:24}}>
                        <View style={styles.option_container}>
                            <View style={styles.option}>
                                <View style ={styles.option_title}>
                                    <RadioButton color={'#465cdb'} onPress={()=>this.setState({val: -1,optionHeight:styles.option_height})}
                                    status={this.state.val < 0 ? 'checked':'unchecked'} /><Text>자동충전</Text>
                                </View>
                                {this.state.val < 0 ? <View style={{marginLeft:35}}>
                                    <Text>1,500원 이하 남을 경우 10,000 원 자동 충전합니다.</Text>
                                    <View style={styles.button_container}>
                                        <TouchableOpacity style={[styles.price_button,this.autoChargeHighlight(10000)]} onPress={()=>this.setAutoCharge(10000)}>
                                            <Text>10,000</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.price_button,this.autoChargeHighlight(30000)]} onPress={()=>this.setAutoCharge(30000)}>
                                            <Text>30,000</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.price_button,this.autoChargeHighlight(50000)]} onPress={()=>this.setAutoCharge(50000)}>
                                            <Text>50,000</Text>
                                        </TouchableOpacity>
                                        <TouchableOpacity style={[styles.price_button,this.autoChargeHighlight(100000)]} onPress={()=>this.setAutoCharge(100000)}>
                                            <Text>100,000</Text>
                                        </TouchableOpacity>
                                    </View>
                                </View> : <></>}
                            </View>
                        </View>
                    </View>
                    <View style={styles.btn_wrapper}>
                        <BlueButton text='결제하기' />
                    </View>
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
        backgroundColor: '#f5f5f5',
        flexDirection:'column',
        alignItems:'flex-start',
        justifyContent:'space-between'
    },

    container: {
        width:'100%',
        paddingHorizontal:24,
        alignSelf: 'center',
        paddingTop:12,
        backgroundColor:'#fff',
        borderBottomLeftRadius:5,
        borderBottomRightRadius:5,
        marginBottom:5,
        
    },
    option_container:{
        marginHorizontal:16,
        marginVertical:'4%',
        flexDirection:'column',
        alignSelf:'flex-start',
        justifyContent:'space-between',
        //justifyContent:'space-evenly',
        flexGrow:1
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
        alignSelf:'center',
        marginTop:16
    },
    price_button :{
        flex:1,
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
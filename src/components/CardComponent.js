import React, { Component } from 'react'
import {View, StyleSheet, Text,Modal, TouchableOpacity, TouchableHighlight, Image, AsyncStorage} from 'react-native'
import {FontAwesome, Feather, AntDesign} from '@expo/vector-icons'
import axios from 'axios'

const apiKey = "beacon091211fX2TAJS0VbillUWp1aVx002VggT";

export default class CardComponent extends Component {
    constructor(props) {
        super(props)
        this.state = {
            name: "John Doe",
            expire: "05 / 2021",
            balance: "",
            modal: false,
            setting: true,
            id: "",
        }
    }
    componentDidMount() {
        AsyncStorage.getItem("id").then(asyncStorageRes => {
            this.setState({id: asyncStorageRes}, function() {
                this._refreshBalance();
            })
        })
    }
    componentWillReceiveProps(newProps) {
        if(newProps.refresh) {
            this._refreshBalance();
        }
    }
    _refreshBalance = () => {
        axios.get("https://beacon.smst.kr/appAPI/v1/emoney/emoney_balance.php?apiKey="
                +apiKey+"&modeType=balance&muid="+this.state.id).then(response => {
                    if(response.data.rescode == "0000") {
                        this.setState({balance: response.data.balance})
                    }else {
                        console.log("fail")
                    }
        })
    }
    closeModal = () => {
        this.setState({modal: false})
    }
    openModal = () => {
        this.setState({modal: true})
    }
    _pay = () => {
        this.closeModal();
        this.props.navigation.navigate('payinfo')
    }
    _return = (value )=> {
        this._refreshBalance();
    }

    _charge = () => {
        this.closeModal();
        this.props.navigation.navigate('charge',{ goBackData: this._return})
    }
    render() {
        return(
            <>
            <View style={styles.container}>
                <View style={{flexDirection: 'row', height: 40}}>
                    <Text style={styles.bank_title}>카카오뱅크</Text>
                    {this.props.setting && <TouchableHighlight onPress={this.openModal}>
                        <Feather name="more-vertical" size={30} color="#465cdb"/>
                    </TouchableHighlight>}
                </View>
                <View style={{flexDirection: 'row', width: '100%', justifyContent: 'center', marginTop: 10, height:20}}>
                    <View style={{flexDirection:'row', width:'25%', justifyContent: 'center', marginTop:5}}>
                        <View style={{marginRight: 2}}><FontAwesome name="circle" size={8} color="#465cdb"/></View>
                        <View style={{marginRight: 2}}><FontAwesome name="circle" size={8} color="#465cdb"/></View>
                        <View style={{marginRight: 2}}><FontAwesome name="circle" size={8} color="#465cdb"/></View>
                        <View style={{marginRight: 2}}><FontAwesome name="circle" size={8} color="#465cdb"/></View>
                    </View>

                    <View style={{flexDirection:'row', width:'25%', justifyContent: 'center', marginTop:5}}>
                        <View style={{marginRight: 2}}><FontAwesome name="circle" size={8} color="#465cdb"/></View>
                        <View style={{marginRight: 2}}><FontAwesome name="circle" size={8} color="#465cdb"/></View>
                        <View style={{marginRight: 2}}><FontAwesome name="circle" size={8} color="#465cdb"/></View>
                        <View style={{marginRight: 2}}><FontAwesome name="circle" size={8} color="#465cdb"/></View>
                    </View>

                    <View style={{flexDirection:'row', width:'25%', justifyContent: 'center', marginTop:5}}>
                        <View style={{marginRight: 2}}><FontAwesome name="circle" size={8} color="#465cdb"/></View>
                        <View style={{marginRight: 2}}><FontAwesome name="circle" size={8} color="#465cdb"/></View>
                        <View style={{marginRight: 2}}><FontAwesome name="circle" size={8} color="#465cdb"/></View>
                        <View style={{marginRight: 2}}><FontAwesome name="circle" size={8} color="#465cdb"/></View>
                    </View>

                    <View style={{flexDirection:'row', width:'25%', justifyContent: 'center'}}>
                        <Text style={{marginRight: 2,  fontSize:17, color: '#465cdb'}}>1 8 2 6</Text>
                    </View>
                </View>

                <View style={{flexDirection: 'row', marginTop: 20}}>
                    <View style={{width:'50%'}}>
                        <Text style={styles.text}>CARDHOLDER NAME</Text>
                        <Text style={{color: '#465cdb'}}>{this.state.name}</Text>
                    </View>

                    <View>
                        <Text style={styles.text}>EXPIRE DATE</Text>
                        <Text style={{color: '#465cdb'}}>{this.state.expire}</Text>
                    </View>
                </View>
                <View style={{flexDirection: 'row', width: '55%', alignSelf:'flex-end', marginTop: 20, alignItems:'center'}}>
                    <Text style={{color: '#465cdb', marginRight:10}}>잔여 금액</Text>
                    <Text style={{color:'#465cdb', fontSize:20, fontWeight:'bold'}}>{this.state.balance} 원</Text>
                </View>
            </View>
            <Modal visible={this.state.modal} animationType="slide" transparent={true} >
                <View style={styles.modal_container}>
                    <TouchableOpacity style={{height:'60%', width: '100%'}} onPress={this.closeModal}>
                    </TouchableOpacity>
                    <View style={styles.modal_content}>
                        <View style={styles.modal_title_content}>
                            <Text style={styles.modal_title}>결제 설정</Text>
                            <TouchableHighlight style={{position: 'absolute', right: 0}} onPress={this.closeModal}>
                                <Image resizeMode="contain" source={require('../../assets/Cancel.png')} 
                                style={{width: 30, height: 30}} />
                            </TouchableHighlight>
                        </View>
                        <TouchableOpacity style={styles.modal_list} onPress={this._pay}>
                            <Text style={{fontWeight: 'bold'}}>결제 정보 변경</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.modal_list} onPress={this._charge}>
                            <Text style={{fontWeight: 'bold'}}>충전하기</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </Modal>
            </>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 200,
        borderRadius: 5,
        backgroundColor: '#dfeaf5',
        alignSelf :'center',
        marginTop: 10,
        paddingHorizontal: 20,
        paddingVertical:10,

        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 3,
        },
        shadowOpacity: 0.27,
        shadowRadius: 4.65,

        elevation: 6,
    },
    bank_title: {
        width: '90%',
        color: "#465cdb",
        fontSize: 15,
        fontWeight: 'bold',

    },
    text: {
        fontSize: 11,
        fontWeight: 'bold',
        color: '#465cdb'
    },
    modal_container: {
        backgroundColor: 'rgba(0, 0, 0, 0.5)',
        width: '100%',
        height: '100%',
    },
    modal_content: {
        height: '30%',
        width: '100%',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0
    },
    modal_title: {
        fontWeight: 'bold'
    },
    modal_title_content: {
        flexDirection: 'row',
        alignSelf: 'center',
        width: '90%',
        height: '30%',
        borderBottomColor: '#828282',
        borderBottomWidth: 1,
        alignItems: 'center',
        justifyContent: 'center'
    },
    modal_list: {
        height: '25%',
        justifyContent: 'center',
        width: '80%',
        alignSelf: 'center'
    }
})
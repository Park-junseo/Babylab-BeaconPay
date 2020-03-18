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
        this.setState({modal: false})
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
    _balanceToText = (balance) => {
        let text = '';
        let j = 1;
        for(let i = balance.length; i>=0; i-=1) {
            text = balance.substring(i+1, i) +text;
            if(i > 0 && text.length > 0 && j%4 === 0)
            text = ','+text;
            
            
            j += 1;
           
        }
        return text;
    }

    render() {
    
        return(
            <>
             <View style={styles.container}>
                    <Image source={require('../../assets/Card.png')} resizeMode="contain" style={styles.card}/>
                    <View style={styles.card_content}>
                        <View style={{flexDirection: 'row', height: 40}}>
                            <Text style={styles.bank_title}> </Text>
                            {this.props.setting && <TouchableHighlight onPress={this.openModal}>
                                <Feather name="more-vertical" size={30} color="#fff"/>
                            </TouchableHighlight>}
                        </View>
                        <View style={{flexDirection: 'row', width: '55%', alignSelf:'flex-end', marginTop: 20, alignItems:'center'}}>
                            <Text style={{color: '#fff', marginRight:10}}>잔여 금액</Text>
                            <Text style={{color:'#fff', fontSize:20, fontWeight:'bold'}}>{this._balanceToText(this.state.balance)} 원</Text>
                        </View>
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
                                style={{width: 24, height: 24}} />
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
    container_wrapper:{
        width: '100%',
        flexDirection:'row',
        backgroundColor:'#430'
    },
    container: {

        position:'relative',



    },
    card:{
        width:'100%',
        borderRadius: 2,
    },
    card_content: {
        position:'absolute',
        top:0, right:0, left: 0, bottom:0,
        paddingHorizontal: 20,
        paddingVertical:30,
        flexDirection:'column',
        justifyContent:'space-between'

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
        height: '25%',
        width: '100%',
        backgroundColor: '#fff',
        position: 'absolute',
        bottom: 0,
        paddingBottom:10
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
        alignSelf: 'center',
        marginVertical:5
    }
})
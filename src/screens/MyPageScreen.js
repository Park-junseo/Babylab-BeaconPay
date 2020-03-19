import React, { Component } from 'react'
import {Text, StyleSheet, View, TouchableHighlight, Alert, StatusBar, TouchableOpacity, Image, AsyncStorage, ScrollView, FlatList} from 'react-native'
import Modal from 'react-native-modal'
import {AntDesign} from '@expo/vector-icons'
import CardComponent from '../components/CardComponent'
import axios from 'axios'

import RNRestart from 'react-native-restart'
import KakaoLogins from '@react-native-seoul/kakao-login';
import {NaverLogin} from '@react-native-seoul/naver-login'
import {GoogleSignin} from '@react-native-community/google-signin';

const apiKey = "beacon091211fX2TAJS0VbillUWp1aVx002VggT";

export default class MyPageScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            target: 1,
            id: "",
            item: [],
            since: 0,
            refreshing: false,

        }
    }
    componentDidMount() {
        AsyncStorage.getItem("id").then(asyncStorageRes => {
            this.setState({id: asyncStorageRes}, function() {
                this._emoney_list(0);
            })
        })

        this.props.navigation.setParams({
            mypageLeft: (
                <View style={{flexDirection:'row', alignItems:"flex-start", width:'100%',height:'100%'}}>
                    <Image resizeMode="contain" source={require('../../assets/Mypage_1.png')} 
                            style={{width: '80%', height:'100%', marginLeft: -32}}/>
                </View>
            ),
            /*
            mypageTitle: (
                <View style={{marginRight:10,}}>
                    <TouchableOpacity onPress={()=>{}}>
                        <EDIT width="24" height="24"/>
                    </TouchableOpacity>
                </View>
            ),
            */
            mypageRight: (
                <View style={{flexDirection:'row', alignItems:'flex-end'}}>
                    <TouchableOpacity onPress={()=>{this.props.navigation.navigate("MyModi")}} style={{marginRight:10}}>
                        <Image resizeMode="contain" source={require('../../assets/btn_png/Edit.png')} 
                                style={{width: 24, height:24}}/>
                    </TouchableOpacity>
                    <TouchableOpacity onPress={()=>this.props.navigation.popToTop()}>
                        <Image resizeMode="contain" source={require('../../assets/btn_png/Cancel.png')} 
                                style={{width: 24, height:24}}/>
                    </TouchableOpacity>
                </View>
                
            )
        })
    }
    _emoney_list = (since) => {
        let list = [];
        axios.get("https://beacon.smst.kr/appAPI/v1/emoney/emoney_list.php?apiKey="
        +apiKey+"&modeType=list&since="+since+"&per_page=10&muid="+this.state.id).then(response => {
            console.log(response.data);
            list = response.data; 
            const merge = [...this.state.item, ...list];
            if(list.length > 0)
                this.setState({item: merge, since: since+10, refreshing: false})

        })
    }
    _scrollHandler = () => {
        this._emoney_list(this.state.since);
    }
    _handleRefresh = () => {
        this.setState({refreshing: true, since: 0, item:[]}, this._emoney_list(0))
    }
    closeModal = () => {
        this.setState({Version: false, Term: false, quit: false})
    }
    
    _logout = () => {
        Alert.alert(
            "로그아웃 하시겠습니까?",
            "",
            [
                {text: '로그아웃', onPress:()=>this._logoutProcess()},
                {text: '취소'}
            ],
            { cancelable: true}
        );
    }
    kakaoLogout = () => {
        KakaoLogins.logout().then(result => {
            
        }).catch(err => {
            
        })
    }
    naverLogout = () => {
        NaverLogin.logout();
       
    }
    signOut = async() => {
        try {
            await GoogleSignin.revokeAccess();
            await GoogleSignin.signOut();
        }catch (error) {
            console.log(error);
        }
    }

    _logoutProcess = async() => {
        AsyncStorage.getItem("type").then(asyncStorageRes => {
            if(asyncStorageRes == "kakao")
                 this.kakaoLogout();
             else if(asyncStorageRes == "naver")
                 this.naverLogout();
             else if(asyncStorageRes == "google")
                 this.signOut();
         })

       try {
           const keys = await AsyncStorage.getAllKeys();
           await AsyncStorage.multiRemove(keys);
       }catch (err) {
           console.error('Error');

       }finally {
           RNRestart.Restart();
       }
       

    }

    _changeList(target) {
        this.setState({target: target})
    }
    
    _renderItem = ({item}) => (  
        <View style={styles.list}>
            <View style={{flexDirection:'row', marginTop: 20}}>
                <Text style={styles.date}>{item.regdate.replace(" ", "\n")}</Text>
                <Text style={styles.station}>{item.contents}</Text>
                <View>
                    <Text style={styles.price}>{item.amount}</Text>
                    <Text style={styles.balance}>남은 금액 {item.balance}</Text>
                </View>
            </View>
        </View>
    )
/*
    _renderItem = ({item}) => (  
        <View style={styles.list}>
            <Text style={styles.date}>{item.regdate.replace(" ", "\n")}</Text>
            
            <View style={styles.list_detail_contianer}>
                <View style={[styles.list_detail,{marginBottom:14}]}>
                    <Text style={styles.detail_text}>선릉역</Text>
                    <Text style={styles.detail_text}>1,250 원</Text>
                </View>
                <View style={styles.list_detail}>
                    <Text style={styles.detail_text}>삼성역</Text>
                    <Text style={styles.detail_text}>1,250 원</Text>
                </View>
            </View>
        </View>
    )
    */
    render() {
        return(
            <View style={{width:'100%', height:'100%', backgroundColor: '#fff'}}>
                <View style={styles.container}>
                <CardComponent navigation={this.props.navigation} setting={true}/>


                    <View style={styles.option_container}>
                        <Text style={styles.title}>이용 내역</Text>
                        <View style={styles.options}>
                            {this.state.target == 1 ? <TouchableOpacity style={styles.btn} onPress={()=>this._changeList(1)}> 
                                <Text style={{color: '#fff'}}>1개월</Text>
                            </TouchableOpacity> : <TouchableOpacity style={styles.btn2} onPress={()=>this._changeList(1)}>
                                <Text>1개월</Text>
                            </TouchableOpacity> }
                            
                            {this.state.target == 2 ? <TouchableOpacity style={styles.btn} onPress={()=>this._changeList(2)}>
                                <Text style={{color: '#fff'}}>2개월</Text>
                            </TouchableOpacity> : <TouchableOpacity style={styles.btn2} onPress={()=>this._changeList(2)}>
                                <Text>2개월</Text>
                            </TouchableOpacity> }


                            {this.state.target == 3 ? <TouchableOpacity style={styles.btn} onPress={()=>this._changeList(3)}>
                                <Text style={{color: '#fff'}}>3개월</Text>
                            </TouchableOpacity> : <TouchableOpacity style={styles.btn2} onPress={()=>this._changeList(3)}>
                                <Text>3개월</Text>
                            </TouchableOpacity> }
                        </View>
                    </View>
                </View>
                <ScrollView>
                    <FlatList
                        data={this.state.item}
                        renderItem={this._renderItem}
                        keyExtractor={(item, index) => item.id}
                        onEndReached={this._scrollHandler}
                        refreshing={this.state.refreshing}
                        onRefresh={this._handleRefresh}
                       /> 
                </ScrollView>

                <View style={styles.footer}>
                    <View style={{width:"100%",height:'100%', flexDirection:'row', alignItems:'center', justifyContent:'flex-end'}}>
                        <TouchableOpacity style={{width:100,height:32}} onPress={this._logout}>
                            <Text style={styles.btn_text}>로그아웃</Text>
                        </TouchableOpacity>
                    </View>
                </View>

                
            </View>
        )
    }
}

const styles = StyleSheet.create({
    header:{
        width: '100%',
        height: 40,
        flexDirection: 'row'
    },
    container: {
        marginTop: '3%',
        marginHorizontal:24
    },
    option_container:{
        marginTop: "6%",
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'space-between',
        marginHorizontal:8,
        paddingBottom:'3%'
    },
    options: {
        flexDirection:'row',
        alignItems:'flex-start',
    },
    title: {
        color: '#465cdb',
        fontSize: 15,
        fontWeight: 'bold',
        alignItems: 'center',
        justifyContent: 'center',
    },
    list_container: {
        width:'100%'
    },
    list: {
        width: '100%',
        flexDirection:'row',
        alignItems:'flex-start',
        borderBottomWidth: 1,
        borderColor:'#00000099',
        paddingVertical:20,
        paddingHorizontal:32,
    },
    date:{
        color:'#00000099',
        marginRight:30,
    },
    list_detail_contianer:{
        flexDirection:'column',
        alignItems:'flex-start',
        flex:1,
    },
    list_detail:{
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'space-between',
        width:'100%',
        flex:1
    },
    detail_text: {
        fontWeight: 'bold',
        color:'#000000dd'
    },
    btn: {
        borderRadius: 30,
        paddingHorizontal:12,
        paddingVertical:3,
        backgroundColor: '#f00',
        alignItems: 'center',
        justifyContent: 'center',
        marginLeft: 5
    },
    btn2: {
        borderRadius: 30,
        paddingHorizontal:12,
        paddingVertical:3,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
        borderColor: '#465cdb',
        borderWidth: 1,
        marginLeft: 5
    },
    footer:{
        width:'100%',
        flexDirection:'column',
        alignItems:'center',
        height:40,
        height:50
    },
    btn_text_wrapper:{
        position:'absolute',
        alignItems:'center',
        justifyContent: 'center',
        top:0,
        left:0,
        right:0,
        bottom:0
    },
    btn_text:{
        //color:'#ffffff59',
        //fontWeight:'bold',
        //fontSize:16,

        color: '#00000059',
        fontWeight: 'bold',

        width: '100%',
        height:'100%',
        marginBottom: 5,

        borderTopColor: '#fafafa',
        borderTopWidth:32,
        
        borderLeftWidth: 10,
        borderLeftColor: 'transparent',
        borderStyle: 'solid',
        right: 0,

        textAlign: 'center',
        textAlignVertical: 'center',
    }

    
})
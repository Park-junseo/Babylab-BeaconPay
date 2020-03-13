import React, { Component } from 'react'
import {Text, StyleSheet, View, TouchableHighlight, Alert, StatusBar, TouchableOpacity, Image} from 'react-native'
import Modal from 'react-native-modal'
import {AntDesign} from '@expo/vector-icons'
import CardComponent from '../components/CardComponent'
import { ScrollView } from 'react-native-gesture-handler'

import SvgUri from 'react-native-svg-uri'

export default class MyPageScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            Version: false,
            Term: false,
            logout: false,
            quit: false,
            target: 1,
        }
    }
    closeModal = () => {
        this.setState({Version: false, Term: false, quit: false})
    }
    logout = () => {
        Alert.alert(
            '로그아웃 하시겠습니까?',
            '',
            [
                {
                    text: '네',
                    onPress: ()=> console.log('ok'),
                },
                {
                    text: '아니오',
                    onPress: () => console.log('cancel'),
                    style: 'cancel'
                }
            ],
            {cancelable: false}
        )
    }
    _changeList(target) {
        this.setState({target: target})
    }

    renderList = (number)=>{
        const lists = [];
        for(let i=0;i<number;i++){
            lists.push(
                <View style={styles.list}>
                    <Text style={styles.date}>1.18 (화)</Text>
                    
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
        }

        return lists.map((item)=>item);
    }

    componentDidMount() {
        this.props.navigation.setParams({
            mypageLeft: (
                <View style={{flexDirection:'row', alignItems:"flex-start", width:'100%',height:'100%'}}>
                    <SvgUri source={require('../../assets/logo/My_page.svg')} x="0" width="210" height="100%" style={{marginLeft:-32}}/>
                </View>
            ),
            mypageTitle: (
                <View style={{marginRight:10}}>
                    <TouchableOpacity onPress={()=>{}}>
                        <SvgUri source={require('../../assets/btn/Edit.svg')} width="24" height="24"/>
                    </TouchableOpacity>
                </View>
            ),
            mypageRight: (
                <View>
                    <TouchableOpacity onPress={()=>this.props.navigation.popToTop()}>
                        <SvgUri source={require('../../assets/btn/Cancel.svg')} width="24" height="24"/>
                    </TouchableOpacity>
                </View>
                
            )
        })
    }

    render() {
        return(
            <View style={{width:'100%', height:'100%', backgroundColor: '#fff'}}>
                <View style={styles.container}>
                    <CardComponent navigation={this.props.navigation}/>

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
                
                <ScrollView style={{width:'100%'}}>
                        {this.renderList(10)}
                </ScrollView>
                <View style={styles.footer}>
                    <View style={{width:"100%",height:32, flexDirection:'column', alignItems:'flex-end'}}>
                        <TouchableOpacity onPress={()=>{this.logout()}}>
                            <SvgUri source={require('../../assets/btn/Button_white.svg')} width="200" height="100%" fill="#fd3" style={{right:0}}/>
                            <View style={styles.btn_text_wrapper}>
                                <Text style={styles.btn_text}>로그아웃</Text>
                            </View>
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
        backgroundColor: '#465cdb',
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
        height:40
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
        color:'#fff',
        fontWeight:'bold',
        fontSize:16,
    }

    
})
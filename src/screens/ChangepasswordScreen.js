import React, { Component } from 'react'
import {Text, View, StyleSheet, TextInput, TouchableOpacity, Alert, KeyboardAvoidingView, ScrollView} from 'react-native'


export default class ChangepasswordScreen extends Component {
    constructor(props) {
        super(props)
    }

    componentDidMount() {
        this.props.navigation.setParams({
            changeSave: (
                <View style={{flexDirection:'row', alignItems:'flex-end'}}>
                    <TouchableOpacity onPress={this.changePW}>
                        <Text style={{color: '#465cbd', fontSize: 16, fontWeight: 'bold'}}>저장</Text>
                    </TouchableOpacity>
                </View>
                
            )
        })
    }

    changePW = () => {
        Alert.alert(
            '비밀번호가 변경되었습니다. ',
            '',
            [
                {
                    text: '확인',
                    onPress: ()=> this.props.navigation.popToTop(),
                },
    
            ],
            {cancelable: false}
        )
    }
    render() {
        return(
            <KeyboardAvoidingView behavior="padding">
            <View style={styles.container}>
                <ScrollView>
                    <View style={[styles.login_form,styles.margin_horizontal]}>


                        <View style={[{marginBottom:70},]}>
                            <Text style={[input_styles.default_text,{fontSize:14}]}>임시비밀번호</Text>
                            <View style={{flexDirection: 'row'}}>
                                <TextInput style={[input_styles.input]} placeholder="●●●●●●●●" secureTextEntry={true}/>
                            </View>
                        </View>
                        <View style={[{marginBottom:70},]}>
                            <Text style={[input_styles.default_text,{fontSize:14}]}>새 비밀번호 (8자리 이상)</Text>
                            <View style={{flexDirection: 'row'}}>
                                <TextInput style={[input_styles.input]} placeholder="●●●●●●●●" secureTextEntry={true}/>
                            </View>
                        </View>

                        <View style={[{marginBottom:70},]}>
                            <Text style={[input_styles.default_text,{fontSize:14}]}>비밀번호 확인</Text>
                            <View style={{flexDirection: 'row'}}>
                                <TextInput style={[input_styles.input]} placeholder="●●●●●●●●" secureTextEntry={true}/>
                            </View>
                        </View>
                    </View>
                </ScrollView>
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
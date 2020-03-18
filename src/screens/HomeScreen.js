import React, { Component } from 'react'
import {Text, View, StyleSheet, StatusBar, TouchableHighlight, Image,  Modal, 
    TouchableOpacity,  SafeAreaView, AsyncStorage, Alert, Button, BackHandler, ToastAndroid} from 'react-native'
import CardComponent from '../components/CardComponent';
import Map from '../components/Map'
import RNRestart from 'react-native-restart'
import KakaoLogins from '@react-native-seoul/kakao-login';
import {NaverLogin} from '@react-native-seoul/naver-login'
import {GoogleSignin} from '@react-native-community/google-signin';
import Advertisement from '../components/Advertisement';
import {BluetoothStatus} from 'react-native-bluetooth-status';


export default class HomeScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            pay:'credit',
            departure: '',
            dep_code:'',

            destination: '',
            dest_code: '',

            modal: false,
          };
    }
    async getBluetoothState() {
    
        const isEnabled = await BluetoothStatus.state().then(response => {
            if(response == false) {
                Alert.alert(
                    "블루투스가 꺼져있습니다.",
                    "",
                    [
                        {text: '확인'},
                        
                    ],
                    { cancelable: true}
                );  
            }
        });
        
    }
    
    // 이벤트 등록
componentDidMount() {
    this.getBluetoothState()

    BackHandler.addEventListener('hardwareBackPress', this.handleBackButton);

    this.props.navigation.setParams({
        homeLeft: (
            <View style={{flexDirection:'row', alignItems:"flex-start", width:'100%',height:'100%'}}>
                <Image resizeMode="contain" source={require('../../assets/logo/Logo_2.png')}
                            style={{width: '90%', marginLeft:-32}}/>
                            
            </View>
        ),
        homeRight: (
            <View>
                <TouchableOpacity onPress={()=>this.setState({modal: true})}>
                <Image source={require('../../assets/btn_png/My_page.png')} resizeMode="contain" style={{width: 24, height: 24}}/>
                </TouchableOpacity>
            </View>
            
        )
    })
}

// 이벤트 해제
componentWillUnmount() {
    this.exitApp = false;
    BackHandler.removeEventListener('hardwareBackPress', this.handleBackButton);
}

// 이벤트 동작
handleBackButton = () => {
    // 2000(2초) 안에 back 버튼을 한번 더 클릭 할 경우 앱 종료
    if (this.exitApp == undefined || !this.exitApp) {
        ToastAndroid.show('한번 더 누르시면 종료됩니다.', ToastAndroid.SHORT);
        this.exitApp = true;

        this.timeout = setTimeout(
            () => {
                this.exitApp = false;
            },
            2000    // 2초
        );
    } else {
        clearTimeout(this.timeout);

        BackHandler.exitApp();  // 앱 종료
    }
    return true;
}

    _swap = () => {
        const depart = this.state.departure;
        const arrive = this.state.destination;

        const dep_code = this.state.dep_code;
        const dest_code = this.state.dest_code;

        this.setState({departure: arrive, destination: depart, dep_code: dest_code, dest_code: dep_code})
    }
    _depart = (data) => {
        this.setState({departure: data.station, dep_code: data.code})
    }
    _dest = (data) =>{
        this.setState({destination: data.station, dest_code: data.code})
    }

    _navigateMy (option){
        this.setState({modal: false})
        this.props.navigation.navigate(option);
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
    closeModal = () => {
        this.setState({modal: false})
    }
    openModal = () => {
        this.setState({modal: true})
    }
    render() {

        return(
            <View style={{width:'100%',height:'100%',backgroundColor: '#fff'}}>
                {/*Header*/}
                <View style={styles.container}>
                    {/*Card*/}
                    {this.state.pay == 'credit' ? <CardComponent navigation={this.props.navigation} setting={true}/> : <></>}

                    <View style={styles.search}>
                        <TouchableHighlight style={styles.swap} onPress={this._swap} underlayColor="#transparent">
                            <Image resizeMode="contain" source={require('../../assets/btn_png/Change_New.png')} 
                                style={{width: 24, height:24}}/>
                        </TouchableHighlight>
                        <View style={{height:'100%', width:'100%', flex:1, flexDirection:'column', alignItems:'center'}}>
                            <TouchableOpacity style={styles.input} onPress={()=>this.props.navigation.navigate('StationSearch', { goBackData: this._depart, default:this.state.departure})}>
                                <Text>{(this.state.dep_code) ? this.state.departure:'출발역을 입력해주세요'}</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.input2} onPress={()=>this.props.navigation.navigate('StationSearch', { goBackData: this._dest, default:this.state.destination})}>
                                <Text>{(this.state.dest_code) ? this.state.destination: '도착역을 입력해주세요'}</Text>
                            </TouchableOpacity>

                        </View>

                        <TouchableHighlight style={styles.swap}  underlayColor="transparent" onPress={()=>this.props.navigation.navigate('search', 
                            {depart:this.state.departure, dep_code:this.state.dep_code, dest_code:this.state.dest_code, arrive: this.state.destination})}>
                            <Image resizeMode="contain" source={require('../../assets/btn_png/Search.png')} 
                                style={{width: 24, height:24}}/>
                        </TouchableHighlight>
                    </View>
                </View>


                <Map/>
                <Advertisement/>

                <Modal visible={this.state.modal} animationType="slide" transparent={true} >
                <View style={styles.modal_container}>
                    <TouchableOpacity style={{height:'60%', width: '100%'}} onPress={this.closeModal}>
                    </TouchableOpacity>
                    <View style={styles.modal_content}>
                        <View style={styles.modal_title_content}>
                            <Text style={styles.modal_title}>개인 설정</Text>
                            <TouchableHighlight style={{position: 'absolute', right: 0}} onPress={this.closeModal}>
                                <Image resizeMode="contain" source={require('../../assets/Cancel.png')} 
                                style={{width: 30, height: 30}} />
                            </TouchableHighlight>
                        </View>

                        <TouchableOpacity style={styles.modal_list} onPress={()=>this._navigateMy('My')}>
                            <Text style={{fontWeight: 'bold'}}>이용 내역</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.modal_list} onPress={this._logout}>
                            <Text style={{fontWeight: 'bold'}}>로그아웃</Text>
                        </TouchableOpacity>


                    </View>
                </View>
                </Modal>

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        marginTop: '3%',
        marginHorizontal:24,
    },
    header: {
        flexDirection: 'row',
        width: '100%',
        height: 35,
        marginTop: 10,
        marginBottom:15,
        alignItems: 'center',
        flexDirection:'row',
        alignItems:'flex-start',
        justifyContent:'space-between',
    },
   search: {
        backgroundColor: '#fff',
        width: '100%',
        height:80,
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 2, 
        //marginTop:16,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent:'space-between'
      
    },
    swap: {
        width:'8%',
        marginHorizontal:'4%'
    },
    line: {
        backgroundColor: '#e0e0e0',
        height: 1,
        width:'100%',

    },
    input: {
        width: '100%',
        paddingLeft:12,
        justifyContent: 'center',
        borderBottomColor: '#00000099',
        borderBottomWidth:0.5,
        flex:1,
    },
    input2: {
        width: '100%',
        paddingLeft:12,
        justifyContent: 'center',  
        flex:1,     
    },
    list: {
        width:'90%',
        height: 80,
        position: 'relative',
        zIndex:2000,
        margin:0
    },
    listItem: {
        borderBottomWidth: 0.5,
        height: 50,
        justifyContent: 'center',
        paddingLeft: 20
    },
    listText: {
        fontSize: 17,
        color: '#828282',
        
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
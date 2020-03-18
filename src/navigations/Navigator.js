import {createAppContainer, createSwitchNavigator} from 'react-navigation'
import {createStackNavigator} from 'react-navigation-stack'
import LoginScreen from '../screens/LoginScreen';
import JoinScreen from '../screens/JoinScreen';
import AgreementScreen from '../screens/AgreementScreen';

import HomeScreen from '../screens/HomeScreen'
import MyPageScreen from '../screens/MyPageScreen';
import FindPasswordScreen from '../screens/FindPasswordScreen';
import ChangepasswordScreen from '../screens/ChangepasswordScreen';
import EmailLoginScreen from '../screens/EmailLoginScreen';
import PayinfoScreen from '../screens/PayinfoScreen';
import SearchScreen from '../screens/SearchScreen';
import ChargeScreen from '../screens/ChargeScreen';
import DetailScreen from '../screens/DetailScreen';
import StationSearchScreen from '../screens/StationSearchScreen';
import InfoModifyScreen from '../screens/InfoModifyScreen';
import KakaoPayScreen from '../screens/KakaoPayScreen'



import React,{Component} from 'react'

import {Text, Image, View, TouchableOpacity} from 'react-native'



const payStack = createStackNavigator(
    {
        payinfo: {
            screen: PayinfoScreen,
            navigationOptions: {
                headerShown: false,
            }
        },
    }
)
/*
로그인에 필요한 네비게이터
*/
const loginStack = createStackNavigator(
    {
        login:{
            screen:LoginScreen,
            navigationOptions: {
                headerShown: false,
            }
        },
        join: {
            screen: JoinScreen,
            navigationOptions: {
                title: "이메일로 회원가입하기",
                headerTransparent:null,
                headerStyle: {
                    elevation: 0,
                    shadowOpacity: 0,
                    backgroundColor: '#fff',
                    
                },
            }
        },
        agree: {
            screen: AgreementScreen,
            navigationOptions: ({navigation}) => ({
                title: "이용약관",
                headerTransparent:null,
                headerStyle: {
                    elevation: 0,
                    shadowOpacity: 0,
                    backgroundColor: '#fff',
                    
                },
                headerLeft: <View style={{width:24}}></View>,
                headerRight: ()=>(
                    <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                        <Image source={require('../../assets/btn_png/Cancel.png')} resizeMode='contain' style={{width:24, height:24}}/>
                    </TouchableOpacity>
                ),
            })
        },
        findPW: {
            screen: FindPasswordScreen,
            navigationOptions: {
                title:"비밀번호 찾기",
            }
        },
        changePW: {
            screen: ChangepasswordScreen,
            navigationOptions: ({navigation}) => ({
                title: "비밀번호변경하기",
                headerTransparent:null,
                headerStyle: {
                    elevation: 0,
                    shadowOpacity: 0,
                    backgroundColor: '#fff',
                    
                },
                headerRight: ()=>(navigation.getParam('changeSave', <Text>Error</Text>)),
                
            })
        },
        emailLogin: {
            screen: EmailLoginScreen,
            navigationOptions: ({navigation}) => ({
                title: "",
                backLeftColor:'#fff',
                headerLeft: ()=>(
                    <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                        <Image source={require('../../assets/btn_png/Back_W.png')} resizeMode='contain' style={{width:24,height:24}}/>
                    </TouchableOpacity>
                )
            })
        }

    },
    {
        initialRouteName: 'login',
        defaultNavigationOptions: ({navigation}) => ({
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontSize: 16,
                color: '#00000099'
            },
            headerTintColor: '#808080',
            headerTransparent: {
                position: 'absolute',
                backgroundColor: 'transparent',
                zIndex: 100,
                top: 0,
                left: 0,
                right: 0
            },
            headerTitleContainerStyle:{
                flexDirection:'column',
                alignItems:'center',
                flex:1,
                marginHorizontal:0,
                position:'relative'
            },
            headerStyle:{
                backgroundColor:'#fff',
                elevation: 0,
                shadowOpacity: 0,
            },
            headerLeftContainerStyle:{marginLeft:24,position:'relative',},
            headerRightContainerStyle:{marginRight:24,position:'relative',},
            /*
            headerBackImage: ()=>(
                <SvgUri source={require('../../assets/btn/Back.svg')}
                width= "24" height="24" fill={'#808080'}/>
            ),*/

            headerLeft: ()=>(
                <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                    {/*<Image source={require('../../assets/btn_png/Back.png')} resizeMode='contain' style={{width:24,height:24}}/>*/}
                    <Image source={require('../../assets/btn_png/Back2.png')} resizeMode='contain' style={{width:24,height:24}}/>
                </TouchableOpacity>
            ),
            headerRight: <View style={{width:24}}></View>
        })
    }
)
/*
마이페이지 네비게이터
*/
const MyPageStack = createStackNavigator(
    {
        Mypage: {
            screen: MyPageScreen,
            navigationOptions: ({navigation}) => ({
                title: "",
                headerLeft: ()=>(navigation.getParam('mypageLeft', <Text>Error</Text>)),
                headerRight:()=>(navigation.getParam('mypageRight', <View></View>)),
                headerTitleStyle: {
                    fontSize: 16,
                    color: '#00000099',
                },
                headerTitleContainerStyle:{
                    flexDirection:'column',
                    alignItems:'center',
                    flex:1,
                    marginHorizontal:0,
                    position:'relative'
                },
                headerStyle:{
                    backgroundColor:'#fff',
                    elevation: 0,
                    shadowOpacity: 0,
                },
                headerLeftContainerStyle:{marginLeft:24,position:'relative',},
                headerRightContainerStyle:{marginRight:24,position:'relative',},
            })
        },
    },
    {
        initialRouteName: 'Mypage'
    }
)
MyPageStack.navigationOptions = ({navigation}) => {
    let tabBarVisible;
    if(navigation.state.routes.length > 1) {
        navigation.state.routes.map(route => {
            tabBarVisible = false;
        })
    }
    return {
        tabBarVisible
    }
}
const MyModiStack = createStackNavigator(
    {

        MyModi: {
            screen:InfoModifyScreen,
            navigationOptions:{
                header: false
            }
        }
    },
    {
        initialRouteName: 'MyModi'
    }
)
/*
홈 화면 중 메인화면에서 사용하는 네비게이터
*/
const HomeStack = createStackNavigator(
    {
        Home: {
            screen: HomeScreen,
            navigationOptions: ({navigation}) => ({
                headerLeft: ()=>(navigation.getParam('homeLeft', <Text>Error</Text>)),
                headerTitle: null,
                headerRight:()=>(navigation.getParam('homeRight', <View></View>)),
            })
        },
        My: {
            screen: MyPageStack,
            navigationOptions: {
                headerShown: false
            }
        },
        Modi: {
            screen: MyModiStack,
            navigationOptions: {
                title: "정보수정",
            }
        },
        pay: {
            screen: payStack,
            navigationOptions: {
                title: "결제 정보 변경",
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontSize: 17,
                    color: '#000'
                },
                headerStyle: {
                    elevation: 0,
                    shadowOpacity: 0,
                    backgroundColor: '#fff',
                    
                },
            }
        },
        search: {
            screen: SearchScreen,
            navigationOptions: {
                headerTransparent: {
                    position: 'absolute',
                    backgroundColor: 'transparent',
                    zIndex: 100,
                    top: 0,
                    left: 0,
                    right: 0
                },
                headerLeft:null,
                title:''
            }
        },
        kakaoPay: {
            screen: KakaoPayScreen,
            navigationOptions: {
                title: '카카오페이 결제',
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontSize: 17, 
                    color: '#828282'
                },
                headerStyle: {
                    elevation: 0,
                    shadowOpacity: 0,
                    backgroundColor: '#fff',
                },
            }
        },
        charge: {
            screen: ChargeScreen,
            navigationOptions: {
                title: '충전하기',
            }
        },
        Detail: {
            screen: DetailScreen,
            navigationOptions: {
                title: '',
                headerStyle: {
                    elevation: 0,
                    shadowOpacity: 0,
                    backgroundColor: '#fff',
                    
                },
            }
        },
        StationSearch: {
            screen: StationSearchScreen,
            navigationOptions: ({navigation}) => ({
                title: 'hey',
                headerTitle: ()=>(navigation.getParam('stationSearchBar', <Text>Error</Text>)),
                headerRight:()=>(navigation.getParam('searchButton', <View></View>)),

                headerStyle: {
                    elevation: 5,
                    shadowOpacity: 10,
                    backgroundColor: '#fff',
                },
            })
        }

    },
    {
        initialRouteName: 'Home',
        defaultNavigationOptions: ({navigation}) => ({
            headerTitleAlign: 'center',
            headerTitleStyle: {
                fontSize: 16,
                color: '#00000099',
                textAlign:'center',
            },
            headerTitleContainerStyle:{
                flexDirection:'column',
                alignItems:'center',
                flex:1,
                marginHorizontal:0,
                position:'relative'
            },
            headerStyle:{
                backgroundColor:'#fff',
                elevation: 0,
                shadowOpacity: 0,
            },
            headerLeftContainerStyle:{marginLeft:24,position:'relative',},
            headerRightContainerStyle:{marginRight:24,position:'relative',},
            /*
            headerBackImage: ()=>(
                <SvgUri source={require('../../assets/btn/Back.svg')}
                width= "24" height="24" fill={'#808080'}/>
            ),*/
            headerLeft: ()=>(
                <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                    <Image source={require('../../assets/btn_png/Back2.png')} resizeMode='contain' style={{width:24, height:24}}/>
                </TouchableOpacity>
            ),
            headerRight: <View style={{width:24}}></View>

        })
    }
)

HomeStack.navigationOptions = ({navigation}) => {
    let tabBarVisible;
    if(navigation.state.routes.length > 1) {
        navigation.state.routes.map(route => {
            tabBarVisible = false;
        })
    }
    return {
        tabBarVisible
    }
}


/*
시작 화면
*/
const RootSwitch = createSwitchNavigator(
    {
        init:{
            screen: loginStack
        },
        Main: {
            screen: HomeStack
        },
    }
)






export default createAppContainer(RootSwitch);
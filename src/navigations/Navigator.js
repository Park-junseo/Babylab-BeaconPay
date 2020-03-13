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

import React,{Component} from 'react'

import {Text, Image, View, TouchableOpacity} from 'react-native'

import BackButton from '../../assets/btn/Back.svg'


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
            navigationOptions: {
                title: "이용약관",
                headerTitleAlign: 'center',
                headerTitleStyle: {
                    fontSize: 17,
                    color: '#000'
                },
                headerStyle: {
                    elevation: 0,
                    shadowOpacity: 0,
                },
            }
        },
        findPW: {
            screen: FindPasswordScreen,
            navigationOptions: {
                title:"비밀번호 찾기",
            }
        },
        changePW: {
            screen: ChangepasswordScreen,
            navigationOptions: {
                title: "비밀번호 변경하기",
            }
        },
        emailLogin: {
            screen: EmailLoginScreen,
            navigationOptions: ({navigation}) => ({
                title: "",
                backLeftColor:'#fff',
                headerLeft: ()=>(
                    <TouchableOpacity onPress={()=>{navigation.goBack()}}>
                        <BackButton width= "24" height="24" fill='#fff' />
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
                    <BackButton width= "24" height="24" fill='#808080'/>
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
                title: 'hey',
                headerLeft: ()=>(navigation.getParam('mypageLeft', <Text>Error</Text>)),
                headerTitle: ()=>(navigation.getParam('mypageTitle', <Text>Error</Text>)),
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
        initialRouteName: 'MyModi',
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
            navigationOptions: ({navigation}) => ({
                headerLeft: ()=>(navigation.getParam('searchChange', <Text>left</Text>)),
                headerTitle: ()=>(navigation.getParam('pathSearchBar', <Text>Error</Text>)),
                headerRight:()=>(navigation.getParam('searchRight', <View></View>)),
                headerStyle: {
                    height:104
                }
            })
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
                    <BackButton  width= "24" height="24" fill={'#808080'}/>
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

import React, {Component} from 'react'
import {WebView} from 'react-native-webview'
import {StyleSheet, View, StatusBar, ScrollView, Alert, Linking, Platform} from 'react-native'
var SendIntentAndroid = require('react-native-send-intent');
import Toast from 'react-native-simple-toast'


export default class KakaoPayScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            uri: '',
            orderCode: '',
        }
    }
    componentDidMount () {
        const uri = this.props.navigation.getParam('uri');
        const orderCode = this.props.navigation.getParam('orderCode');
    //    console.log(uri, orderCode)
    
        this.setState({uri: uri, orderCode:orderCode}, function() {
          
        })
    }
    callback(response) {
        console.log(response);
    }
    _KakaoPayRequest(url) {
        console.log(url)
    if(url == 'intent://exit') {                //결제 종료 요청
        this.props.navigation.state.params.goBackData({refresh: true})
        this.props.navigation.pop();
        return false;
    }    
    if(url.startsWith('http://beacon.smst.kr/adminnew/kakaoPay/success.php')) {         
        this._success(url);
        return true;
    }
    if(url.startsWith('http://') || url.startsWith('https://') || url.startsWith('about:blank')) {
        return true;
    }
    if(Platform.OS === 'android') {             ///카카오페이 실행 React Native에 안드로이드 인텐트 호출이 없어서 따로 지정 IOS별도 로직 필요
      SendIntentAndroid.openAppWithUri(url).then(isOpened=> {
          if(!isOpened) {
              console.log("fail to open kakao app")
          }
      }).catch(err=> {
          console.log(err)
      });
    }



    //ios 전용 카카오 페이 필요
    if(Platform.OS === 'ios') {

    }

      return false;
    }

    _success(url) {             //결제 성공 시 화면 전환
        const success_url = url+"&ordercode="+this.state.orderCode;
        this.setState({uri: success_url});
       // Toast.show(success_url)
        return ;
    }
    _messageResponse(event) {
        console.log(event)
    }
    render() {
        return(
            <>
            <ScrollView contentContainerStyle={{width: '100%', height: '100%'}}>
            <WebView source={{uri: this.state.uri}} style={{width: '100%', height: '100%'}}
                onMessage={(event) =>this._messageResponse(event)}  onShouldStartLoadWithRequest={(event) => {
                        this._KakaoPayRequest(event.url)
                }}
                allowFileAccess={true}
                domStorageEnabled={true}
                javaScriptEnabled={true}
                geolocationEnabled={true}
                saveFormDataDisabled={true}
                allowFileAccessFromFileURLS={true}
                allowUniversalAccessFromFileURLs={true}
                bounces={false}
                
                >

            </WebView>
            </ScrollView>
            </>
        )
    }
}


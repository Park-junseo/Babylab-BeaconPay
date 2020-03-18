import React, { Component } from 'react'
import {Text, View, StyleSheet, TextInput, TouchableHighlight, StatusBar, Image, ScrollView, TouchableOpacity} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'
import RouteContainer from '../containers/RouteContainer'
import axios from 'axios'
import Toast from 'react-native-simple-toast'


//const pathKey = 'FI9hHlDS2Gr%2FxSZe6VIbL2h6TOv%2Bom0ye60SNfxCnVlz4SnPEBWzjfoSYTC%2BSBILqOFiWKaIt48dGUX2GKaJtQ%3D%3D';
const gpsKey = '5743714d496c736a35387a7047544a';
const pathKey = 'jQXVKZ9WMQk3uZllNXGnqAmjMYF9DdXl3ZBcdQI6rR2k760galhA%2FkrDRClsHT%2Fn6LV2rjOck98g4CXamFnXtg%3D%3D';



var parseString = require('react-native-xml2js').parseString;

export default class SearchScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            depart: '',
            dep_code: '',

            arrive: '',
            dest_code: '',

            startX: '',
            startY: '',

            EndX: '',
            EndY: '',

            path: [],
            current_time: "오늘 "+new Date().getHours()+":"+new Date().getMinutes(),
            limit_access: false,
        }
    }
    componentDidMount () {
        const depart = this.props.navigation.getParam('depart')
        const arrive = this.props.navigation.getParam('arrive');
        const dep_code = this.props.navigation.getParam('dep_code');
        const dest_code = this.props.navigation.getParam('dest_code');
        
        let type = '오전';
        let hour = new Date().getHours();
        if(hour > 12) {
            type = '오후';
            hour -= 12;
        }
        let minute = new Date().getMinutes();

        if(hour < 10) {
            hour = "0"+hour;
        }
        if(minute < 10) {
            minute = "0"+minute;
        }

        this.setState({current_time: '오늘 '+type+'   '+hour+":"+minute})

        this.setState({depart: depart, arrive: arrive, dep_code: dep_code, dest_code: dest_code}, function() {
            this._getPathInfo()
        })
    }
   
    //최단 경로 찾기
    _getPathInfo = () => {
        //출발점 좌표 조회
        axios.get('http://openapi.seoul.go.kr:8088/'+gpsKey+'/json/SearchLocationOfSTNByFRCodeService/1/1/'
            +this.state.dep_code+'/')
            .then(response => 
                { this.setState({startY: response.data.SearchLocationOfSTNByFRCodeService.row[0].XPOINT_WGS, 
                    startX: response.data.SearchLocationOfSTNByFRCodeService.row[0].YPOINT_WGS}, function () {
                        //도착점 좌표 조회
                        axios.get('http://openapi.seoul.go.kr:8088/'+gpsKey+'/json/SearchLocationOfSTNByFRCodeService/1/1/'+this.state.dest_code+'/')
                        .then( result =>
                            {       this.setState({EndY: result.data.SearchLocationOfSTNByFRCodeService.row[0].XPOINT_WGS, 
                                    EndX: result.data.SearchLocationOfSTNByFRCodeService.row[0].YPOINT_WGS}, function() {
                                        const startX = this.state.startX; const EndX = this.state.EndX
                                        const startY = this.state.startY; const EndY = this.state.EndY
                                        //경로 가져오기
                                        axios.get('http://ws.bus.go.kr/api/rest/pathinfo/getPathInfoBySubway?serviceKey='+pathKey+'&startX='+startX+'&startY='
                                        +startY+'&endX='+EndX+'&endY='+EndY).then(path => {
                                            let item = []
                                            parseString(path.data, function(err, result) {
                                               item = result.ServiceResult.msgBody[0].itemList
                                              
                                                console.log(item)
                                            })
                                            
                                            this.setState({path: item})     
                                    })
                                })
                            }) 
                    }
                )})
    }

    _swap = () => {
        const depart = this.state.depart;
        const arrive = this.state.arrive;
        const dep_code = this.state.dep_code;
        const dest_code = this.state.dest_code;

        this.setState({depart: arrive, arrive: depart, dep_code: dest_code, dest_code: dep_code})
    }
    _init = () => {
        this.props.navigation.pop();
    }
    _depart = (data) => {
        this.setState({depart: data.station, dep_code: data.code})
    }
    _dest = (data) =>{
        this.setState({arrive: data.station, dest_code: data.code})
    }

    _renderElement = (item) => {
        return(

            <ScrollView>
                <RouteContainer navigation={this.props.navigation} item={item} />
            </ScrollView>
        )
    }
    render() {
        return(
            <View style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
                <View style={styles.search}>
                    <TouchableHighlight style={styles.swap} onPress={this._swap} underlayColor="#transparent">
                        <Image resizeMode="contain" source={require('../../assets/btn_png/Change_New.png')} 
                            style={{width: 24, height:24}}/>
                    </TouchableHighlight>
                    <View style={{height:'100%', width:'100%', flex:1, flexDirection:'column', alignItems:'center'}}>
                        <TouchableOpacity style={styles.input} onPress={()=>this.props.navigation.navigate('StationSearch', { goBackData: this._depart, default:this.state.depart})}>
                            <Text>{(this.state.dep_code) ? this.state.depart:'출발역을 입력해주세요'}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.input2} onPress={()=>this.props.navigation.navigate('StationSearch', { goBackData: this._dest, default:this.state.arrive})}>
                            <Text>{(this.state.dest_code) ? this.state.arrive: '도착역을 입력해주세요'}</Text>
                        </TouchableOpacity>

                    </View>
                    <View style={styles.swap}>
                        <TouchableHighlight style={{marginBottom:8}} underlayColor="transparent" onPress={this._init}>
                            <Image resizeMode="contain" source={require('../../assets/btn_png/Cancel.png')} 
                                style={{width: 24, height:24}}/>
                        </TouchableHighlight>
                        <TouchableHighlight style={{marginTop:8}} underlayColor="transparent" onPress={this._getPathInfo}>
                            <Image resizeMode="contain" source={require('../../assets/btn_png/Search.png')} 
                                style={{width: 24, height:24}}/>
                        </TouchableHighlight>
                    </View>


                </View>

                <View style={{width: '100%',flexDirection:'row',alignItems:'flex-start', paddingHorizontal:32, paddingVertical:14}}>
                    <View  style={{flexDirection:'row',alignItems:'center', alignSelf:'center'}}>
                        <Text style={{fontSize: 12, color: '#465cdb', fontWeight: 'bold'}}>
                            {this.state.current_time} 
                        </Text>
                        <Text style={{fontSize: 12, color:'#00000099', fontWeight: 'bold',}}>  출발
                        </Text>
                        {/*
                        <View style={{width:24, height:24}}>
                            <Image resizeMode="contain" source={require('../../assets/btn_png/More_down.png')} 
                                style={{width: 24, height:24}}/>
                        </View>*/}
                    </View>
                    
                </View>
                <ScrollView>
                <RouteContainer navigation={this.props.navigation} item={this.state.path} />
            </ScrollView>
                
                
            </View>
        )
    }
}
const styles = StyleSheet.create({
    search: {
        backgroundColor: '#fff',
        width: '100%',
        height:100,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 20,
        borderBottomWidth: 5,
        borderColor: '#e3e3e3'
    },
    search: {
        backgroundColor: '#fff',
        width: '100%',
        height:110,
        /*
        shadowColor: "#000",
        shadowOffset: {
            width: 0,
            height: 1,
        },
        shadowOpacity: 0.20,
        shadowRadius: 1.41,
        elevation: 5, 
        */
        marginTop:StatusBar.currentHeight,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        justifyContent:'space-between',

        paddingVertical:14,
        paddingHorizontal:6,

        borderBottomWidth: 5,
        borderColor: '#00000010'
      
    },
    swap: {
        alignSelf:'center',
        marginHorizontal:12
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
        color: '#00000099',
    },
    input2: {
        width: '100%',
        paddingLeft:12,
        justifyContent: 'center',  
        flex:1,     
        color: '#00000099',
    },
    icon: {
        width: '10%',
        marginLeft: 10
    },
    
})
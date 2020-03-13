import React, { Component } from 'react'
import {Text, View, StyleSheet, TextInput, TouchableHighlight, StatusBar, Image, ScrollView, TouchableOpacity} from 'react-native'
import {MaterialIcons} from '@expo/vector-icons'
import RouteContainer from '../containers/RouteContainer'
import axios from 'axios'

import CHANGE from '../../assets/btn/Change.svg'
import CANCEL from '../../assets/btn/Cancel.svg'
import SEARCH from '../../assets/btn/Search.svg'
import TIMESET from '../../assets/btn/More_down.svg'


const gpsKey = '5743714d496c736a35387a7047544a';
const pathKey = 'w9Mt460KZMdbmTUHJ4%2BY0R5VXWB0yTXhYNHuYATfJKf1EiQya0aYPHYTO%2FlJwWHOxkiVcx3tauCoajOgEEspuA%3D%3D';
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
            current_time: "오늘 "+new Date().getHours()+":"+new Date().getMinutes()
        }
    }
    componentDidMount () {
        const depart = this.props.navigation.getParam('depart')
        const arrive = this.props.navigation.getParam('arrive');
        const dep_code = this.props.navigation.getParam('dep_code');
        const dest_code = this.props.navigation.getParam('dest_code');
        
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
                                            //   console.log(item)
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

    componentDidMount () {
        const depart = this.props.navigation.getParam('depart')
        const arrive = this.props.navigation.getParam('arrive');
        const dep_code = this.props.navigation.getParam('dep_code');
        const dest_code = this.props.navigation.getParam('dest_code');
        
        this.setState({depart: depart, arrive: arrive, dep_code: dep_code, dest_code: dest_code}, function() {
            this._getPathInfo();
            this._setHeader();
        })

    }

    _setHeader = () => {
        this.props.navigation.setParams({
            searchChange: (
                <TouchableHighlight onPress={this._swap} underlayColor="none">
                    <CHANGE width= '24' height='24'/>
                </TouchableHighlight>
            ),
            pathSearchBar: (
                <View style={{flexDirection:'row', alignItems:"center", width:'100%',height:'100%', paddingHorizontal:16}}>
                    <View style={{flexDirection:'column', alignItems:"flex-start", width:'100%',}}>

                        <TouchableOpacity style={styles.input} onPress={()=>this.props.navigation.navigate('StationSearch', { goBackData: this._depart})} underlayColor="none">
                            <Text style={styles.inputText}>{this.state.depart}</Text>
                        </TouchableOpacity>
                        <TouchableOpacity style={styles.input2} onPress={()=>this.props.navigation.navigate('StationSearch', { goBackData: this._dest})} underlayColor="none">
                            <Text style={styles.inputText}>{this.state.arrive}</Text>
                        </TouchableOpacity>
                    </View>
                </View>

            ),
            searchRight: (
                <View>
                    <TouchableHighlight onPress={this._init} style={{marginBottom:6}} underlayColor="none">
                        <CANCEL width= '24' height='24'/>
                    </TouchableHighlight>
                    <TouchableHighlight onPress={this._getPathInfo} style={{marginTop:6}} underlayColor="none">
                        <SEARCH width= '24' height='24'/>
                    </TouchableHighlight>
                </View>
            )
        })
    }

    render() {
        return(
            <View style={{width: '100%', height: '100%', backgroundColor: '#fff'}}>
                <View style={{width: '100%',flexDirection:'row',alignItems:'flex-start', paddingHorizontal:32, paddingVertical:14}}>
                    <View  style={{flexDirection:'row',alignItems:'center', alignSelf:'center'}}>
                        <Text style={{fontSize: 12, color: '#465cdb', fontWeight: 'bold'}}>
                            {this.state.current_time} 
                        </Text>
                        <Text style={{fontSize: 12, color:'#00000099', fontWeight: 'bold',}}>  출발
                        </Text>
                        <View style={{width:24, height:24}}>
                            <TIMESET width= '24' height='24' fill="#42a"/>
                        </View>
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
        marginTop:20,
        alignSelf: 'center',
        alignItems: 'center',
        flexDirection: 'row',
        paddingLeft: 20,
        borderBottomWidth: 5,
        borderColor: '#e3e3e3',
        borderBottomColor: 'transparent'
    },
    swap: {
        width:'10%'
    },
    line: {
        backgroundColor: '#e0e0e0',
        height: 1,
        width:'100%'
    },
    input: {
        height:'45%',
        width:'100%',
        justifyContent: 'center',
        borderBottomColor: '#00000099',
        borderBottomWidth:0.5,
    },
    input2: {
        height:'45%',
        width:'100%',
        justifyContent: 'center',     
    },
    inputText: {
        fontSize: 14,
        color:'#00000099',
        paddingLeft:12
    },
    icon: {
        width: '10%',
        marginLeft: 10
    },
    
})
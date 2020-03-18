import React, { Component } from 'react'
import {View, StyleSheet, Text,TouchableHighlight, Image} from 'react-native'
import SubwayBarImage from '../components/SubwayBarImage'
import SubwayHorizonBar from '../components/SubwayHorizonBar'
import { ScrollView } from 'react-native-gesture-handler'

export default class DetailScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            item: {
                pathList:[]
            },
            color: {
                "1호선" : "#173463", "2호선":"#1bbf15", "3호선":"#fa6800", "4호선":"#55aafa", "5호선":"#7d1cad", "6호선":"#5e2d25", 
                "7호선":"#545c42", "8호선":"#d11f5b", "9호선":"#999762",
                "분당선":"#e3b41b", "신분당선":"#6e2b1a", "김포도시철도":"#a6710f", "경의선":"#82cfa8", "경춘선":"#338f61", "경강선":"#3052fc", 
                "수인선":"#e3be17", "인천1호선":"#7c99d6", "인천2호선":"#ebb028",
                "용인경전철":"#a1d18e", "공항철도":"#acd1f2", "의정부경전철":"#f0b30c", "우이신설경전철":"#9ba847", "서해선":"#83d463"
            },
            time: ''
        }
    }
    componentDidMount () {
        const item = this.props.navigation.getParam('item')
        const time = this.props.navigation.getParam('time')
        this.setState({item: item, time: time})
        console.log(item.pathList)
    }
    _PayFee = () => {
        
    }

    _calculateFee(distance) {
        let fee = 1250;
        if(distance > 10000) {
           fee += 100;
           fee += Math.floor((distance-10000) / 5000)*100;
        }

        return fee;
    }
    _calculateTime(minute) {
        var hours = new Date().getHours();
        var min = new Date().getMinutes();
        const m = Number(minute);

        console.log(hours, min)
        if(m + min > 60) {
            hours = hours+1;
            min = m+min-60;

            if(hours >= 24) {
                hours = hours - 24
            }

        }
        else {
            min = min+m
        }

        if(min < 10) {
            min = "0"+min;
        }
        
        return hours+":"+min;

    }

    render() {
        return(
            <ScrollView contentContainerStyle={{width: '100%', height: '100%'}}>
                <View style={styles.full_container}>
                    <View style={styles.container}>
                        {/*}
                        <View style={{flexDirection: 'row', height: '10%', alignItems: 'center', width:'90%'}}>
                            <Text style={{fontSize:30, fontWeight:'bold', marginTop: -10}}>{this.state.item.time} </Text>
                            <Text style={{fontWeight:'bold'}}>분</Text>
                            <Text style={{fontWeight:'bold'}}>  {this.state.time}  도착</Text>
                        </View>

                        <Text style={{width:'90%', height:'5%'}}>환승 1회 | 1,250 원</Text>
                        <View style={{flexDirection: 'row', alignItems: 'center', width:'90%', marginBottom: 20}}>
                            {
                                this.state.item.pathList.map((value) => {
                                    var width = value.time/this.state.item.subtime * 94;
                                    const line = value.routeNm+"";
                                    return <SubwayBarImage width={width+'%'} time={value.time} line={line.substring(0,1)} 
                                    color={this.state.color[line]}/>
                                })
                            }
                            
                        </View>
                        */}
                        <View style={[styles.container_header,styles.margin_horizontal]}>
                            <View>
                                <View style={styles.container_header_text}>
                                    <Text style={{fontSize:28, fontWeight:'bold'}}>{this.state.item.time} </Text>
                                    <Text style={{fontWeight:'bold'}}>분</Text>
                                    <Text style={{fontWeight:'bold'}}> |   {this.state.time}  도착</Text>
                                </View>
                                <Text style={[styles.container_detail]}>
                                환승 {this.state.item.pathList.length}회 | 도보 {this.state.item.time - this.state.item.subtime} 분 | {this._calculateFee(this.state.item.distance)} 원</Text>
                            </View>

                        </View>

                        <View style={styles.route_graph}>
                            {
                                this.state.item.pathList.map((value) => {
                                    var width = value.time/this.state.item.subtime * 94;
                                    const line = value.routeNm+"";
                                    return <SubwayBarImage width={width+'%'} time={value.time} line={line.substring(0,1)} 
                                    color={this.state.color[line]}/>
                                })
                            }
                        </View>
                        <View style={[styles.detail_container,styles.margin_horizontal]}>
                        {
                            this.state.item.pathList.map((value, index)=> {
                                const line = value.routeNm+"";
                                return(
                                    <View style={styles.horizon_Container}>
                                        <View style={{flexDirection: 'row',height:'100%'}}>
                                            <SubwayHorizonBar color={this.state.color[line]} 
                                            end={index == this.state.item.pathList.length-1 ? true : false} height={100}/>
                                                <View style={styles.station_container}>
                                                    <Text style={styles.title}>{line} {value.fname} 승차</Text>                               
                                                    <Text style={styles.text}>{value.railLinkList.length}개 역 이동</Text>
                                                    <Text style={styles.title2}>
                                                        {index == this.state.item.pathList.length-1 ? value.tname+' 하차': ""} </Text>
                                                </View>
                                        </View>
                                    </View>
                                )
                            })
                        }
                        </View>

                        

                    

                    </View>
                </View>     
            </ScrollView>
       
        )
    }
}

const styles = StyleSheet.create({
    full_container: {

    },

    container: {
        width: '100%',
        backgroundColor: '#fff',
        alignItems: 'flex-start',
        paddingHorizontal:32,
        paddingTop:24,
        paddingBottom:32,
        borderBottomRightRadius:30,
        borderBottomLeftRadius:30,

        elevation: 10,
        shadowOpacity: 0,
    },
    horizon_Container: {
        width: '90%',
        height: 120,
    },
    station_container: {
        marginLeft: 10,
        height: '100%',
        flexDirection:'column',
        justifyContent:'space-between'
    },
    title: {
        fontWeight: 'bold',
        fontSize: 17,
    },
    subtitle: {

    },
    text: {
        color: '#828282'
    },
    title2: {
        fontWeight: 'bold',
        fontSize: 17,
    },


    container_header: {
        flexDirection: 'row',
        alignItems: 'center',
        width:'100%',
        justifyContent:'space-between',
        marginBottom:6,
    },
    container_header_text: {
        flexDirection: 'row',
        alignItems: 'baseline',
        paddingBottom:12
    },
    container_detail:{
        marginBottom:10,
        fontSize: 10,
        color:'#00000099',
    },
    route_graph:{
        flexDirection: 'row', alignItems: 'flex-start', marginBottom:12,
    },
    circle: {
        borderRadius: 50,
        width: 20,
        height: 20,
        backgroundColor: '#000'
    },
    margin_horizontal:{
        marginHorizontal:6
    },
    sumary_path:{
        flexDirection:'column',
        alignItems:'baseline',
    },
    detail_container: {

    }
})
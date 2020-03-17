import React, { Component } from 'react'
import {Text, View, StyleSheet} from 'react-native'


export default class SubwayBarImage extends Component {
    constructor(props) {
        super(props)
        this.state = {
            time: this.props.time,
            line: this.props.line,
            width: this.props.width,
            color: this.props.color, 
            margin: 2
        }
    }
    componentWillReceiveProps(newProps) {
        if(newProps.time != null) {
            this.setState({time: newProps.time})
        }
        if(newProps.width != null) {
            const width = newProps.width.substring(0, newProps.width.length-2)
          //  const min_width = width.substring
            console.log(width)
            this.setState({width: newProps.width})
        }
    }

    render() {
        return(
            <>
                <View style={{flexDirection:'row', height: 24, alignItems: 'center', width: this.state.width}}>
                    <View style={{width:24,
                                    height:24,
                                    borderRadius: 100/2,
                                    backgroundColor: this.props.color,
                                    justifyContent: 'center',
                                    alignItems: 'center',
                                    }}
                                    >
                        <Text style={{fontWeight: 'bold', color: '#fff'}}>{this.state.line}</Text>
                    </View>
                    <View style={{width: '100%', height: 16, marginLeft: -4, alignItems: 'center'}}>
                        <Text style={{color: '#fff', width: '100%', textAlign: 'center',
                        borderTopWidth: 16, borderTopColor: this.props.color, fontSize:10,
                        borderRightWidth: 10, borderRightColor: 'transparent', paddingRight: 10}}>{this.state.time}분</Text>
                    </View>
                </View>
            </>
        )
    }
}

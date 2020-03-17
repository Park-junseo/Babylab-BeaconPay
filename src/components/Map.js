import React, { Component } from 'react'
import {View, ScrollView, Image, Dimensions} from 'react-native'
import PinchZoomView from 'react-native-pinch-zoom-view';
import { TouchableWithoutFeedback } from 'react-native-gesture-handler';

export default class Map extends Component{
    constructor(props){
        super(props)
        this.map = React.createRef();
        this.state ={
            screenWidth:Math.round(Dimensions.get('window').width),
            screenHeight:Math.round(Dimensions.get('window').height),
            mapOffset:null,
        }
    }

    replaceMap = () => {
        return;
        this.map.measure( (fx, fy, width, height, px, py) => {
            let offset = null;
            let left =0,right=0,top=0,bottom=0;
            if(px+width>100) {
                left = px+width+100
            }

            if(!(left==0&& right==0&&top==0&&bottom==0))
                offset = {
                    transform:[
                        {translateX:left}
                    ]
                };
            console.log(offset);
            this.setState((prev)=>({mapOffset:offset}));
        })   
    }

    render() {
        return(
            <View style={{width: '100%', height: '50%', backgroundColor: '#fff', position:'absolute' , overflow: 'hidden'
                ,bottom:0, zIndex: -1}}>
               
                <PinchZoomView minScale={1} >
                    <TouchableWithoutFeedback onPressOut={this.replaceMap} style={[{position:'relative',
                     },this.state.mapOffset]}>
                        <Image source={require('../../assets/img_subway.png')} resizeMode='cover' 
                        style={[{width: '100%', height: '100%',position:'relative'},
                        // this.state.mapOffset
                        ]} ref={view=>{this.map=view}}/>
                    </TouchableWithoutFeedback>
                </PinchZoomView>
            </View>
        )
    }
}
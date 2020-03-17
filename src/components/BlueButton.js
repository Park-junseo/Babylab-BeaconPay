//import SvgUri from 'react-native-svg-uri';
import {View, Text,StyleSheet,TouchableOpacity,Image, Dimensions} from 'react-native'
import PropTypes from 'prop-types';
import React from 'react'
import BLUE from '../../assets//btn/Button_blue.svg'
import WHITE from '../../assets//btn/Button_white.svg'

const BlueButton = ({text, onPress, white, shadow, right})=>{
    //const uri = '../../assets/btn/Button_'+((white)?'white':'blue')+'.svg';
    //const uri = 'http://localhost:19001/assets/btn/Button_'+((white)?'white':'blue')+'.svg';
    //const uri = (white) ? require('../../assets/btn/Button_white.svg') : require('../../assets/btn/Button_blue.svg');
    const uri = require('../../assets/Button_white.svg');

    const fillColor = (white) ? '#fff' : '#4666e5';

    let white_text;
    let rotateStyle = {btn_wrapper:{},svg:{}}
    let svg_shadow;

    const buttonWidth = Math.round(Dimensions.get('window').width) * 0.9;
    const buttonHeight = buttonWidth*52/376;

    if(white) white_text = btn_styles.color_white//style={[Rotate_Y_AnimatedStyle, styles.imageViewStyle]}>

    if(shadow) svg_shadow = btn_styles.shadow;

    if(right) {
        rotateStyle.btn_wrapper= btn_styles.flex_right;
        rotateStyle.svg=btn_styles.rotate;
    }

    return (
    <View style={[btn_styles.btn_wrapper, rotateStyle.btn_wrapper]}>
        <TouchableOpacity style={[btn_styles.btn, ]} onPress={onPress} >
            {(white) ?<WHITE style={[rotateStyle.svg, svg_shadow]} fill={fillColor} width={buttonWidth.toString()} height={buttonHeight.toString()}/>:
             <BLUE style={[rotateStyle.svg, svg_shadow]} fill={fillColor} width={buttonWidth.toString()} height={buttonHeight.toString()}/>}

        </TouchableOpacity>
        <View pointerEvents='none' style={btn_styles.btn_text_wrapper} disabled={true}>
            <Text style={[btn_styles.btn_text, white_text]}>{text}</Text>
        </View>
    </View>        
    )

};

BlueButton.propTypes = {
    text: PropTypes.string,
    onPress: PropTypes.func,
    white: PropTypes.bool,
    right: PropTypes.bool,
    shadow: PropTypes.bool
  };
  
  BlueButton.defaultProps = {
    text: "N/A",
    onPress: () => console.warn('onPress not defined'),
    white: false,
    right: false,
    shadow: false
  };


const btn_styles = StyleSheet.create({
    btn_wrapper: {
        flexDirection: 'column',
        alignItems: 'flex-start',
        width:'100%',
        position:"relative",

    },
    btn: {

    },
    btn_text_wrapper:{
        position:'absolute',
        alignItems:'center',
        justifyContent: 'center',
        top:0,
        left:0,
        right:0,
        bottom:0
    },
    btn_text:{
        color:'#fff',
        fontWeight:'bold',
        fontSize:16,
    },
    color_white: {
        color:'#4666e5'
    },
    rotate : {
        transform: [{ rotate:'180deg'}]
    },
    flex_right : {
        alignItems:'flex-end'
    },
    shadow:{
        //IOS
        shadowColor: "#000", //그림자색
        shadowOpacity: 0.3,//그림자 투명도
        shadowOffset: { width: 2, height: 2 }, //그림자 위치
        //ANDROID
        elevation: 3,
    },
    shadow_ios:{
        //IOS
        shadowColor: "#000", //그림자색
        shadowOpacity: 0.3,//그림자 투명도
        shadowOffset: { width: 2, height: 2 }, //그림자 위치
    },
    shadow_android:{
        //ANDROID
        elevation: 3,
    }
})

export default BlueButton;
//import SvgUri from 'react-native-svg-uri';
import {View, Text,StyleSheet,TouchableOpacity,Image} from 'react-native'
import PropTypes from 'prop-types';
import React from 'react'
//import SvgUri from '../../assets/Button_white.svg'

const BlueButton = ({text, onPress, white, shadow, right})=>{
    //const uri = '../../assets/btn/Button_'+((white)?'white':'blue')+'.svg';
    //const uri = 'http://localhost:19001/assets/btn/Button_'+((white)?'white':'blue')+'.svg';
    //const uri = (white) ? require('../../assets/btn/Button_white.svg') : require('../../assets/btn/Button_blue.svg');

    const fillColor = (white) ? '#fff' : '#4666e5';

    let white_text;
    let white_back;
    let rotateStyle = {btn_wrapper:{},svg:btn_styles.btn_shape,wrapper:{}}
    let svg_shadow;

    if(white) {
        white_text = btn_styles.color_white;
        white_back= btn_styles.back_white;//style={[Rotate_Y_AnimatedStyle, styles.imageViewStyle]}>
    }

    if(shadow) svg_shadow = btn_styles.shadow;

    if(!right) {
        rotateStyle.btn_wrapper= btn_styles.flex_right;
        rotateStyle.svg=btn_styles.btn_shape2;
        rotateStyle.wrapper = btn_styles.flex_start;
    }
/*
    return (
    <View style={[btn_styles.btn_wrapper, rotateStyle.btn_wrapper,{backgroundColor:'#fa0'}]}>
        <TouchableOpacity style={[btn_styles.btn, rotateStyle.wrapper]} onPress={onPress} >
            <View style={[btn_styles.btn_shape,rotateStyle.svg, svg_shadow,white_back]}></View>
        </TouchableOpacity>
        <View pointerEvents='none' style={btn_styles.btn_text_wrapper} disabled={true}>
            <Text style={[btn_styles.btn_text, white_text]}>{text}</Text>
        </View>
    </View>        
    )
*/
    return (
        <View style={[btn_styles.btn_wrapper, rotateStyle.btn_wrapper,]}>
            <TouchableOpacity style={[btn_styles.btn, rotateStyle.wrapper]} onPress={onPress} >
                <Text style={[rotateStyle.svg, svg_shadow,white_back,white_text]}>{text}</Text>
            </TouchableOpacity>
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
        width:'90%',
        alignSelf:'flex-end'
    },
    flex_start:{
        alignSelf:'flex-start'
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
    },
    btn_shape: {
        color: '#fff',
        fontWeight: 'bold',

        width: '100%',
        height:0,
        alignSelf: 'flex-start',
        marginBottom: 5,

        borderBottomColor: '#4666e5',
        borderBottomWidth:50,
        
        borderLeftWidth: 10,
        borderLeftColor: 'transparent',
        borderStyle: 'solid',
        alignSelf:'flex-end',
        right: 0,

        textAlign: 'center',
        textAlignVertical: 'center',
    },
    btn_shape2: {
        color: '#fff',
        fontWeight: 'bold',

        width: '100%',
        height:0,
        alignSelf: 'flex-start',
        marginBottom: 5,

        borderTopColor: '#4666e5',
        borderTopWidth:50,
        
        borderRightWidth: 10,
        borderRightColor: 'transparent',
        borderStyle: 'solid',
        alignSelf:'flex-end',
        right: 0,

        textAlign: 'center',
        textAlignVertical: 'center',
    },
    back_white:{
        borderBottomColor: '#fff',
        borderTopColor: '#fff',
    }
})

export default BlueButton;
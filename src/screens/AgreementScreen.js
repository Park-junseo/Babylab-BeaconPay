import React,{Component} from 'react'
import {View, Text,CheckBox, StyleSheet} from 'react-native'
import { ScrollView } from 'react-native-gesture-handler'

export default class AgreementScreen extends Component {
    constructor(props){
        super(props);
        this.state = {
            agreement:[],
            check:[]
        };
    }

    componentWillMount() {
        const agreeArray = this.props.navigation.state.params.agreeArray;
        this.setState((state)=>({agreement:agreeArray}));

        let checkState = [];

        this.state.agreement.map(
            (item) =>checkState.push(item.checkState)
        )
        this.setState((prev)=>({check:checkState}))
    }

    toggleCheck = (index, func) => {
        let checkState = this.state.check;
        checkState[index] = !checkState[index];

        this.setState((prev)=>({check:checkState}))

        func();
    }

    agreemetnBox = (item, index) => {

        return (
            <View style={styles.agreeContainer}>
                <Text style={styles.text}>{item.title}{(item.necessary) ? " (필수)" : ""}</Text>
                <View style={styles.content_container}>
                    <ScrollView>
                        <Text style={{color: '#000'}}>{item.content}</Text>
                    </ScrollView>
                </View>
                <View style={styles.checkbox}>
                    <CheckBox style={styles.check_box} value={item.checkState} onValueChange={(index)=>{this.toggleCheck(index, item.check)}} />
                    <Text> 동의합니다</Text>
                </View>
            </View>
        );
    }

    render() {
        const {agreement} = this.state;

        return(
            <View style={styles.container}>
                {
                    agreement.map((value, index) => {
                        return this.agreemetnBox(value, index);
                    })
                }

            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        backgroundColor:'#fff', 
        height:'100%',
        paddingBottom:20, 
        flexDirection:'column',
        alignItems:'center'
    },

    content_container:{
        width: '100%',
        backgroundColor: '#f5f5f5',
        alignSelf: 'center',
        borderRadius: 5,
        marginTop: 10,
        paddingHorizontal:16,
        paddingVertical:8,
        flex:1
    },
    agreeContainer:{
        flex:1,
        flexDirection:'column',
        marginVertical:'3%',
        width: '90%',
    },
    text: {
        color: '#000',
        alignSelf: 'flex-start',
        marginTop: 10,
        fontWeight: 'bold',
        marginLeft:8,
    },
    checkbox: {
        alignSelf:'flex-end',
        flexDirection:'row',
        alignItems:'center',
        marginTop:4
    }
})
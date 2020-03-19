import React, {Component} from 'react'
import {View, Text, StyleSheet, Image, TouchableOpacity, KeyboardAvoidingView, ScrollView, TextInput} from 'react-native'
import Autocomplete from 'react-native-autocomplete-input'


const stationData = require('../../assets/Seoul_SubwayList.json').DATA
export default class StationSearchScreen extends Component {
    constructor(props) {
        super(props)
        this.state = {
            station: '',
            code: '',
            flag : false,
            query: this.props.navigation.state.params.default,
            
        };

    }
    findStation(query) {
        if(query === '') {
            return[];
        }
        
        const regex = new RegExp(`${query.trim()}`, 'i');
        return stationData.filter(item => item.station_nm.search(regex) >= 0 );
    }
    check = () => {
        this.props.navigation.state.params.goBackData({station:this.state.station, code:this.state.code})
        this.props.navigation.pop()
        
    }

    renderView = (items ,query) => {
        return items.map( (item)=>
            <TouchableOpacity style={styles.listItem} 
            onPress={()=>this.setState({station: item.station_nm,code:item.fr_code}, this.check)}>
                <Text style={styles.listText}>{item.line_num} {item.station_nm}</Text>
                {/*<HighlighText str={items.station_nm} query={query}/>*/}
            </TouchableOpacity>
        )
    }

    componentWillMount() {
        const {query} = this.state;
        const comp = (a, b) => a.trim() === b.trim();
        const stationList = this.findStation(query)

        this.props.navigation.setParams({
            stationSearchBar: (
                <View style={{flexDirection:'row', alignItems:"center", width:'100%',height:'100%', paddingHorizontal:16}}>
                    <TextInput style={styles.autocompleteContainer} onChangeText={text => this.setState({query:text})} //ref={(input)=>{this.searchBar=input;}}
                    placeholderTextColor={'#999999'} placeholder="역을 입력해주세요">
                        {this.state.query}
                        </TextInput>
                </View>
            ),
            searchButton: (
                <Image resizeMode="contain" source={require('../../assets/btn_png/Search.png')} 
                                style={{width: 24, height:24}}/>
            )
        },)
        //this.searchBar.current.focus().bind(this);
    }
/*
    componentDidMount() {
        if(this.searchBar) this.searchBar.focus();
    }
*/
    render() {
        const {query} = this.state;
        const comp = (a, b) => a.trim() === b.trim();
        const stationList = this.findStation(query)


        return(
            <KeyboardAvoidingView behavior="padding">
            <View style={{width: '100%', height:'100%', backgroundColor: '#fff'}}>
                <ScrollView style={{marginTop:16}}>
                    <View style={styles.list_container} id="rowList">
                        {this.renderView(stationList, query)}
                    </View>    
                </ScrollView>

            </View>
            </KeyboardAvoidingView>
        )
    }
}

const styles = StyleSheet.create({

    autocompleteContainer: {
        width:'100%',
        backgroundColor:'#fafafa',
        fontSize:14,
        paddingHorizontal:8,
        paddingVertical:6
      },
    input: {
        width: '100%',
        borderWidth:1,   
        
    },
    list_container: {
        justifyContent: 'center',
        width: '100%',
        height: '100%',
        flexDirection: 'column',
        alignItems:'flex-start',
        marginHorizontal: 64
    },

    listItem: {
        justifyContent: 'center',
        width:'100%',
        flex:1,
        paddingVertical:6
    },
    listText: {
        fontSize: 14,
        color: '#828282',
        
    },
    normal: {color:'#828282'},
    highlight:{color:'#4666e5'}
})
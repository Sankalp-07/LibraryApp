import React from 'react';
import { StyleSheet, Text, View, Image, TouchableOpacity } from 'react-native';
import AppIntroSlider from 'react-native-app-intro-slider';
 
const slides = [
  {
    key: 1,
    title: 'We have 20+ Libraries',
    text: 'You can choose whichever one you like',
    image: require('../assets/lib.png'),
    backgroundColor: '#59b2ab',
  },
  {
    key: 2,
    title: 'Increase Your Knowledge',
    text: 'We have many books for you!',
    image: require('../assets/library.png'),
    backgroundColor: '#febe29',
  },
  {
    key: 3,
    title: 'Book Your Seat',
    text: 'Hurry up, its not too late.',
    image: require('../assets/study.png'),
    backgroundColor: '#22bcb5',
  }
];
 
export default class App extends React.Component {
    constructor(props){
        super(props)
        this.state = {
            showRealApp: false
          }
    }
 
  _renderItem = ({ item }) => {
    return (
      <View style={{flex:1, justifyContent:'center', alignItems:'center'}}>
        <View style={{width:320, height:320, backgroundColor:'#E7E7E7', borderRadius:450, padding:95, justifyContent:'center'}}>
        <Image source={item.image} />
        </View>
        <Text style={{fontSize:32, fontWeight:'bold', marginTop:60, color:'#000'}}>{item.title}</Text>
        <View style={{width:300, justifyContent:'center'}}>
        <Text style={{fontSize:18, marginTop:10, color:'#000', textAlign:'center'}}>{item.text}</Text>
        </View>
        
        {
            item.key == 3 && (
                <TouchableOpacity style={{marginTop:10, padding:10, backgroundColor:'#4BE5B1', borderRadius:10, zIndex:10}}
                 onPress={() => this.props.navigation.navigate('RegisterScreen')}
                >
                    <Text style={{color:'#fff', fontWeight:'700'}}>{"GET STARTED"}</Text>
                </TouchableOpacity>
            )
        }
      </View>
    );
  }
  _onDone = () => {
    // User finished the introduction. Show real app through
    // navigation or simply by controlling state
    this.setState({ showRealApp: true });
  }
  render() {
    if (this.state.showRealApp) {
      return <App />;
    } else {
      return <AppIntroSlider activeDotStyle={{width:40, backgroundColor:'#4BE5B1'}} renderItem={this._renderItem} data={slides} />;
    }
  }
}
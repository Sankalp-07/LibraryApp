import { React, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
const Header = ({title, isUserProfile, isUserMessage, showNotiIcon}) => {
//   console.log('Header ', props)  
//   useEffect (() =>  {
//     console.log('Header props :', props.userData)
//   })
  const navigation = useNavigation()  
  return (
    <View style={{flexDirection:'row', height:50}}>
        <View style={{flex:1, justifyContent:'center'}}>
        <TouchableOpacity onPress={() => navigation.goBack()}>    
        <Image style={{width:20, height:20, marginLeft:15}} source={require('../assets/left-arrow.png')} resizeMode='contain' />
        </TouchableOpacity>
        </View>
        <View style={{flex:1.5, justifyContent:'center'}}>
            <Text style={{textAlign:'center', fontWeight:'500', fontSize:20}}>{title}</Text>
        </View>
        <View style={{flex:1, justifyContent:'center'}}>
            {
                (isUserProfile?
                <TouchableOpacity>    
                {/* <Image style={{width:15, height:15, marginLeft:60}} source={require('../assets/draw.png')} resizeMode='contain' /> */}
                </TouchableOpacity>:
                isUserMessage?
                <TouchableOpacity >  
                <Image style={{width:15, height:15, marginLeft:60, tintColor:'#FFB668'}} source={require('../assets/notification.png')} resizeMode='contain' />
                </TouchableOpacity>:
                null)
            }
        </View>    
        {/* <View style={{flex:1, justifyContent:'center'}}>
            {
                // isUserProfile?
                // <TouchableOpacity onPress={() => navigation.navigate('EditUserProfile')}>    
                <Image style={{width:15, height:15, marginLeft:60}} source={require('../assets/notification.png')} resizeMode='contain' />
                // </TouchableOpacity>:
                // null
            }
        </View>    */}
    </View>
  )
}

export default Header





const styles = StyleSheet.create({
    headerContainer : {
        flexDirection: 'row',
        height: 50,
        borderWidth: 1,
        borderColor: 'red'
    }
})
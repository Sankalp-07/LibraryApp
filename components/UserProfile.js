import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, SafeAreaView, StatusBar, Image, TouchableOpacity } from 'react-native'
import Header from './Header'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';


const UserProfile = (props) => {
  const navigation = useNavigation()
  const [loginToken, setLoginToken] = useState('')
  const [userDetails, setUserDetails] = useState([])
  const [userid,setUserId] = useState();
  const [photo,setPhoto] = useState();
  const [show,setShow] = useState(true);



  useEffect (async() =>  {
    console.log('userprofile screen :', props.userData )
    console.log('props UserProfile :', props)
    console.log('props UserProfile Id :', props.route.params.data._id)
    const token = await AsyncStorage.getItem('token')
    const id = await AsyncStorage.getItem('_id')
    const stringId = id.toString()
    console.log('logout user login token :', token)
    console.log('logout user login id :', stringId)
    setLoginToken(token)
    setUserId(id)
    getUserDetails(id)
    // navigation.addListener('focus' async() => )
    const response = await fetch(
        `http://192.168.43.99:3000/${id}/register`
      );
      const jsondata = await response.json();
      // jsondata.map(function(item) {
      //   console.log('item ', item)
      // })
      

      console.log('json User Details. ', jsondata)
      // console.log('messageArry ', messageArray)
      setUserDetails(jsondata)
      setPhoto(jsondata.profile)
      setShow(false)
      getUserDetails(id)
      if(!jsondata.profile){
        setShow(true)
        console.log('profile')
        // setPhoto(jsondata.profile)
      }
      else if(jsondata.profile){
        setShow(false)
        setPhoto(jsondata.profile)
      }  
      else{
        setShow(true)
      } 
  },[])

  const getUserDetails = async(id) => {
    console.log('set id : ', id)
    navigation.addListener('focus', async() => {
    const response = await fetch(
        `http://192.168.43.99:3000/${id}/register`
      );
      const jsondata = await response.json();
      // jsondata.map(function(item) {
      //   console.log('item ', item)
      // })
      if(!jsondata.profile){
        setShow(true)
        console.log('profile')
        // setPhoto(jsondata.profile)
      }
      else if(jsondata.profile){
        setShow(false)
        setPhoto(jsondata.profile)
      }  
      else{
        setShow(true)
      }  

      console.log('json User Details. ', jsondata)
      // console.log('messageArry ', messageArray)
      setUserDetails(jsondata)
      setPhoto(jsondata.profile)
    //   return jsondata;
  })
  }

  const logoutUser = () => {
    console.log('user logout')

  //  if(loginToken){
    AsyncStorage.removeItem('token')
    AsyncStorage.removeItem('_id')
    AsyncStorage.removeItem('libraryName')
    const id = AsyncStorage.getItem('_id')
    console.log('iidd ',id)
  //  }
  }

  const editProfile = () => {
    console.log('editProfile Screen')
    // navigation.navigate('EditUserProfile', props.userProfileDataHandler({_id:props.route.params.data._id}))
    navigation.navigate('EditProfile')
  } 

  return (
   <SafeAreaView style={{flex:1, }}>
       <StatusBar />
       <Header title="Profile" isUserProfile={true} navigation={navigation}/>
       <View style={{position:'relative', left:255, bottom:32}}>
        <TouchableOpacity onPress={() => editProfile()}>  
        <Image style={{width:15, height:15, marginLeft:62, tintColor:'#000000'}} source={require('../assets/draw.png')} resizeMode='contain' />
        {/* <View style={{width:8,height:8,backgroundColor:'red', borderRadius:50, position:'absolute', left:67}}/> */}
        </TouchableOpacity>
        </View>  
       <View style={{flex:0, justifyContent:'center', alignItems:'center', marginBottom:20}}>
           <View style={{marginTop:40}}>
           {
           show? 
           <Image style={{width:80, height:80, marginLeft:0}} source={require('../assets/userprofile.png')} />
           :
           <View style={{width:80, height:80, marginBottom:0, bottom:0, left:0, borderRadius:50, borderWidth:1}}>
           <Image style={{width:80, height:80,borderRadius:50, marginBottom:0, right:1, bottom:1, borderWidth:1}} source={{uri:photo}} />
           </View>
           }
           </View>
           <Text>User Profile</Text>
       </View>

       <View>
               <View style={{margin:20}}>
                   <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:30, borderColor:'#CFCFCF', borderBottomWidth:2, width:'100%'}}>
                       <Text style={{fontSize:20, color:'grey'}}>
                        Name
                       </Text>
                       <Text style={{fontSize:20, color:'grey'}}>
                        {userDetails.name}
                       </Text>
                   </View>
                   <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:30, borderColor:'#CFCFCF', borderBottomWidth:2, width:'100%'}}>
                       <Text style={{fontSize:20, color:'grey'}}>
                        Email
                       </Text>
                       <Text style={{fontSize:20, color:'grey'}}>
                        {userDetails.email}
                       </Text>
                   </View>
                   <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:30, borderColor:'#CFCFCF', borderBottomWidth:2, width:'100%'}}>
                       <Text style={{fontSize:20, color:'grey'}}>
                        Number
                       </Text>
                       <Text style={{fontSize:20, color:'grey'}}>
                       {userDetails.number}
                       </Text>
                   </View>
                   <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:30, borderColor:'#CFCFCF', borderBottomWidth:2, width:'100%'}}>
                       <Text style={{fontSize:20, color:'grey'}}>
                        Address
                       </Text>
                       <Text style={{fontSize:20, color:'grey'}}>
                        {userDetails.address}
                       </Text>
                   </View>
               </View>
        </View>
        

        <View>
            <View style={{justifyContent:'center', alignItems:'center', marginTop:180}}>
                <TouchableOpacity style={{width:'80%', backgroundColor:'orange', borderRadius:5, height:52, justifyContent:'center', alignItems:'center'}} onPress={() => logoutUser()}>
                    <Text style={{fontSize:18, fontWeight:'bold'}}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </View>
   </SafeAreaView >
  )
}

export default UserProfile




const styles = StyleSheet.create({
    mainView: {
        marginTop:40,
        flex:1,
        flexDirection:'column',
        justifyContent:'center',
        alignItems:'center'
    },
    topView: {
        width:'100%',
        height:'40%',
        display:'flex',
        flexDirection:'row',
      //   justifyContent:'center',
      //   alignItems:'center',
        backgroundColor:'#FFA53F',
        borderBottomLeftRadius:30,
        borderBottomRightRadius:30
    },
    bottomView: {
        width:'100%',
        height:'60%',
    },
    Heading: {
        fontSize:36,
        fontWeight:'bold',
        marginLeft:15,
        marginTop:20
    },
    formView: {
        width:'100%',
        display:'flex',
        flexDirection:'column',
        alignItems:'center',
        marginTop:5
    },
    textInput: {
        width:'90%',
        borderWidth:1,
        borderColor:'#ffffff',
        height:52,
        borderRadius:10,
        paddingLeft:5,
        marginTop:20,
        color:'#ffffff'
    },
    signinBotton: {
        width:'90%',
        color:'#000',
        height:52,
        backgroundColor:'#fff',
        borderRadius:10,
        marginTop:40,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    signinText: {
        fontWeight:'bold',
        fontSize:18
    }
  })
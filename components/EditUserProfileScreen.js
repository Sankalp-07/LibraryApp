import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, Image, TextInput } from 'react-native'
import Header from './Header'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const EditUserProfileScreen = (props) => {
  const navigation = useNavigation()
  const [photo,setPhoto] = useState();
  const [show,setShow] = useState(true);
  const [userDetails, setUserDetails] = useState([])
  const [userId,setUserId] = useState();
//   console.log('editProfileData ', props.userData)
//   console.log('editProfileData ID ', props)
//   useEffect (async() =>  {
//     console.log('editProfileData ID ', props)
//     const id = await AsyncStorage.getItem('id')
//     setUserId(id)
    // const token = await AsyncStorage.getItem('token')
    // console.log('logout user login token :', token)
    // setLoginToken(token)
    // getUserDetails()
//   },[])


//   const getUserDetails = async() => {
//     const response = await fetch(
//         `http://192.168.43.99:3000/${props.route.params.data._id}/register`
//       );
//       const jsondata = await response.json();
      // jsondata.map(function(item) {
      //   console.log('item ', item)
      // })


    //   console.log('Edit json User Details. ', jsondata)
      // console.log('messageArry ', messageArray)
    //   setUserDetails(jsondata)
    //   return jsondata;
//   }
  const uploadImage = async() =>{
  let options = {
      mediaType: 'photo',
      quality: 1,
      includeBase64: true
  }

  let result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.All,
      allowsEditing:true,
      aspect:[4,3],
      quality:1
  })
  console.log('result :', result)
  if(result.cancelled){
      setShow(false)
  }
  else if(!result.cancelled){
      setPhoto(result.uri)
      setShow(false)
  }
  }
  return (
    <SafeAreaView style={{flex:1, }}>
       <StatusBar />
       <Header title="Edit Profile" navigation={navigation}/>
       <View style={{flex:0, justifyContent:'center', alignItems:'center', marginBottom:20}}>
           <View style={{marginTop:40}}>
               {
                   show?
                   <TouchableOpacity onPress={() => uploadImage()}>   
                   <Image style={{width:80, height:80, marginLeft:0}} source={require('../assets/userprofile.png')} />
                   </TouchableOpacity>:
                     <TouchableOpacity onPress={() => uploadImage()}>   
                     <View style={{width:80, height:80, borderRadius:50, borderWidth:1}}>
                     <Image style={{width:80, height:80,borderRadius:50,}} source={{uri:photo}} />
                     </View>
                     </TouchableOpacity>
               }
        {/* //    <TouchableOpacity onPress={() => uploadImage()}>   
        //    <Image style={{width:80, height:80, marginLeft:0}} source={require('../assets/userprofile.png')} />
        //    <View style={{width:80, height:80, borderRadius:50, borderWidth:1}}>
        //    <Image style={{width:80, height:80,borderRadius:50}} source={{uri:photo}} />
        //    </View>
        //    </TouchableOpacity> */}
           </View>
           <Text>User Profile</Text>
           <View style={{position:'absolute', bottom:'78%',marginLeft:200, backgroundColor:'white', width:25, height:25, borderRadius:50, justifyContent:'center', alignItems:'center'}}>
           <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}}>   
           <Image style={{width:15, height:15, marginLeft:0}} source={require('../assets/draw.png')} resizeMode='contain' />
           </TouchableOpacity>
           </View>
       </View>
       {/* <View style={{position:'absolute', bottom:'78%',marginLeft:200, backgroundColor:'white', width:25, height:25, borderRadius:50, justifyContent:'center', alignItems:'center'}}>
           <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}}>   
           <Image style={{width:15, height:15, marginLeft:0, position:'fixed'}} source={require('../assets/draw.png')} resizeMode='contain' />
           </TouchableOpacity>
           </View> */}

       <View>
               <View style={{margin:20}}>
                   <View>
                   <View>
                       <Text>Name</Text>
                   </View>
                   <View>
                       <TextInput style={{width:'100%', borderWidth:1, borderRadius:5, height:42, marginBottom:10, paddingLeft:5}} />
                   </View>
                   </View>
                   <View>
                   <View>
                       <Text>Email</Text>
                   </View>
                   <View>
                       <TextInput  style={{width:'100%', borderWidth:1, borderRadius:5, height:42, marginBottom:10, paddingLeft:5}} />
                   </View>
                   </View>
                   <View>
                   <View>
                       <Text>Number</Text>
                   </View>
                   <View>
                       <TextInput  style={{width:'100%', borderWidth:1, borderRadius:5, height:42, marginBottom:10, paddingLeft:5}} />
                   </View>
                   </View>
                   <View>
                   <View>
                       <Text>Address</Text>
                   </View>
                   <View>
                       <TextInput  style={{width:'100%', borderWidth:1, borderRadius:5, height:42, marginBottom:10, paddingLeft:5}} />
                   </View>
                   </View>
                   {/* <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:30, borderColor:'#CFCFCF', borderBottomWidth:2, width:'100%'}}>
                       <Text style={{fontSize:20, color:'grey'}}>
                        Name
                       </Text>
                       <Text style={{fontSize:20, color:'grey'}}>
                        Sankalp
                       </Text>
                   </View>
                   <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:30, borderColor:'#CFCFCF', borderBottomWidth:2, width:'100%'}}>
                       <Text style={{fontSize:20, color:'grey'}}>
                        Email
                       </Text>
                       <Text style={{fontSize:20, color:'grey'}}>
                        Sankalp.Jinde@gmail.com
                       </Text>
                   </View>
                   <View style={{flexDirection:'row', justifyContent:'space-between', marginBottom:30, borderColor:'#CFCFCF', borderBottomWidth:2, width:'100%'}}>
                       <Text style={{fontSize:20, color:'grey'}}>
                        Number
                       </Text>
                       <Text style={{fontSize:20, color:'grey'}}>
                        1234567890
                       </Text>
                   </View> */}
               </View>
        </View>
        

        {/* <View>
            <View style={{justifyContent:'center', alignItems:'center', marginTop:200}}>
                <TouchableOpacity style={{width:'80%', backgroundColor:'orange', borderRadius:5, height:52, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:18, fontWeight:'bold'}}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </View> */}
   </SafeAreaView >
  )
}

export default EditUserProfileScreen
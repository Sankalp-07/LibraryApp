import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, Image, TextInput } from 'react-native'
import Header from './Header'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';


const EditUserProfile = (props) => {
    const [photo,setPhoto] = useState();
    const [show,setShow] = useState(true);
    const [ifImage,setIfImage] = useState(false)
    const [name,setName] = useState('');
    const [email,setEmail] = useState('');
    const [number,setNumber] = useState('');
    const [address,setAddress] = useState('');
    const [userId,setUserId] = useState();
    const [loginToken, setLoginToken] = useState('')
    const [userDetails, setUserDetails] = useState([])

        useEffect (async() =>  {
        // console.log('userprofile screen :', props.userData )
        // console.log('props UserProfile :', props)
        // console.log('props UserProfile Id :', props.route.params.data._id)
        const token = await AsyncStorage.getItem('token')
        const id = await AsyncStorage.getItem('_id')
        const stringId = id.toString()
        console.log('Edit user login token :', token)
        console.log('Edit user login id :', id)
        setLoginToken(token)
        setUserId(id)
        getUserDetails(id)
        },[])
    
        const getUserDetails = async(id) => {
        console.log('set id : ', id)
        const response = await fetch(
            `http://192.168.43.99:3000/${id}/register`
          );
          const jsondata = await response.json();
          // jsondata.map(function(item) {
          //   console.log('item ', item)
          // })
          if(jsondata.profile){
            setShow(false)
            console.log('profile')
          }
          else{
            setShow(true)
          }
    
          console.log('json User Details. ', jsondata)
          // console.log('messageArry ', messageArray)
          setUserDetails(jsondata)
          setName(jsondata.name)
          setEmail(jsondata.email)
          setNumber(jsondata.number)
          setAddress(jsondata.address)
          setPhoto(jsondata.profile)
        //   return jsondata;
        }

       
       const navigation = useNavigation()
  




  

 

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

 


    const updateProfile = () => {
        console.log('name :' + name + 'email :' + email + 'number :' + number + 'address :' + address)
        fetch(`http://192.168.43.99:3000/${userId}/update`,{
          method:"PUT",
          headers:{
              Accept: "application/json",
              'Content-Type':'application/json'
          },
          body: JSON.stringify({
              "profile":photo,
              "name":name,
              "email":email,
              "number":number,
              "address":address,
              "password":'123'
          })
      })
      .then(res=>res.json())
      .then(data=>{
          console.log('data',data)
          try {
            //  AsyncStorage.setItem('token', data.token)
          console.log('edit data',data)
            //  navigation.navigate('LoginScreen', props.registerUserHandler({name:name, email:email, number:number, address:address, password:password}))
          navigation.navigate('UserProfile')  
        } catch (e) {
            console.log('e',e)
          }
      }).catch((err)=>{
          console.log('err ',err)
      })
    }

  return (
    <SafeAreaView style={{flex:1, backgroundColor:'#fff'}}>
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
                     <View style={{width:80, height:80, marginBottom:0, bottom:0, left:0, borderRadius:50, borderWidth:1}}>
                     <Image style={{width:80, height:80,borderRadius:50, marginBottom:0, right:1, bottom:1, borderWidth:1}} source={{uri:photo}} />
                     </View>
                     </TouchableOpacity>
               }
               {/* {
                ifImage ?
                <TouchableOpacity onPress={() => uploadImage()}>   
                <Image style={{width:80, height:80, marginLeft:0}} source={require('../assets/userprofile.png')} />
                </TouchableOpacity>:
                  <TouchableOpacity onPress={() => uploadImage()}>   
                  <View style={{width:80, height:80, marginBottom:0, bottom:0, left:0, borderRadius:50, borderWidth:1}}>
                  <Image style={{width:80, height:80,borderRadius:50, marginBottom:0, right:1, bottom:1, borderWidth:1}} source={{uri:photo}} />
                  </View>
                  </TouchableOpacity>
               } */}
        {/* //    <TouchableOpacity onPress={() => uploadImage()}>   
        //    <Image style={{width:80, height:80, marginLeft:0}} source={require('../assets/userprofile.png')} />
        //    <View style={{width:80, height:80, borderRadius:50, borderWidth:1}}>
        //    <Image style={{width:80, height:80,borderRadius:50}} source={{uri:photo}} />
        //    </View>
        //    </TouchableOpacity> */}
           </View>
           <Text>User Profile</Text>
           {/* <View style={{position:'absolute', bottom:'78%',marginLeft:200, backgroundColor:'white', width:25, height:25, borderRadius:50, justifyContent:'center', alignItems:'center'}}>
           <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}}>   
           <Image style={{width:15, height:15, marginLeft:0, position:'fixed'}} source={require('../assets/draw.png')} resizeMode='contain' />
           </TouchableOpacity>
           </View> */}
            <View style={{position:'relative', bottom:'26%',Left:'24%', marginLeft:48, backgroundColor:'white', width:25, height:25, borderRadius:50, justifyContent:'center', alignItems:'center'}}>
           <TouchableOpacity > 
           <Image style={{width:15, height:15, marginLeft:0}} source={require('../assets/draw.png')} resizeMode='contain' />
           </TouchableOpacity>
           </View>
       </View>
       <View>
               <View style={{margin:20}}>
                   <View>
                   <View>
                       <Text>Name</Text>
                   </View>
                   <View>
                       <TextInput 
                       style={{width:'100%', borderWidth:1, borderRadius:5, height:42, marginBottom:10, paddingLeft:5, borderColor:'#E1A02F'}} 
                       value={name}
                       onChangeText={text => setName(text)}
                       />
                   </View>
                   </View>
                   <View>
                   <View>
                       <Text>Email</Text>
                   </View>
                   <View>
                       <TextInput  
                       style={{width:'100%', borderWidth:1, borderRadius:5, height:42, marginBottom:10, paddingLeft:5, borderColor:'#E1A02F'}} 
                       value={email}
                       onChangeText={text => setEmail(text)}
                       />
                   </View>
                   </View>
                   <View>
                   <View>
                       <Text>Number</Text>
                   </View>
                   <View>
                       <TextInput  
                       style={{width:'100%', borderWidth:1, borderRadius:5, height:42, marginBottom:10, paddingLeft:5, borderColor:'#E1A02F'}} 
                       value={number}
                       onChangeText={text => setNumber(text)}
                       />
                   </View>
                   </View>
                   <View>
                   <View>
                       <Text>Address</Text>
                   </View>
                   <View>
                       <TextInput  
                       style={{width:'100%', borderWidth:1, borderRadius:5, height:42, marginBottom:10, paddingLeft:5, borderColor:'#E1A02F'}} 
                       value={address}
                       onChangeText={text => setAddress(text)}
                       />
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
       {/* <View style={{position:'absolute', bottom:'78%',marginLeft:200, backgroundColor:'white', width:25, height:25, borderRadius:50, justifyContent:'center', alignItems:'center'}}>
           <TouchableOpacity style={{justifyContent:'center', alignItems:'center'}}>   
           <Image style={{width:15, height:15, marginLeft:0, position:'fixed'}} source={require('../assets/draw.png')} resizeMode='contain' />
           </TouchableOpacity>
        </View> */}
        <View>
            <View style={{justifyContent:'center', alignItems:'center', marginTop:10}}>
                <TouchableOpacity style={{width:'80%', backgroundColor:'orange', borderRadius:5, height:52, justifyContent:'center', alignItems:'center'}} onPress={() => updateProfile()}>
                    <Text style={{fontSize:18, fontWeight:'bold'}}>Update Profile</Text>
                </TouchableOpacity>
            </View>
        </View>
    {/* <View>
      <Text>EditUserProfile</Text>
    </View> */}
    </SafeAreaView>
  )
}

export default EditUserProfile
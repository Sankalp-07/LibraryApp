import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
const RegisterScreen = (props) => {
  const navigation = useNavigation()  
  const [name,setName] = useState('')
  const [email,setEmail] = useState('')
  const [number,setNumber] = useState('')
  const [address,setAddress] = useState('')
  const [password,setPassword] = useState('')


  useEffect (() =>  {
    console.log('props :', props)
  })

  const registerUser = () => {
      console.log(name + "" + email + "" + number + "" + address + "" + password)
    console.log('registerUser')
      fetch("http://192.168.43.99:3000/register",{
          method:"POST",
          headers:{
              Accept: "application/json",
              'Content-Type':'application/json'
          },
          body: JSON.stringify({
              "name":name,
              "email":email,
              "number":number,
              "address":address,
              "password":password
          })
      })
      .then(res=>res.json())
      .then(data=>{
          console.log('data',data)
          try {
             AsyncStorage.setItem('token', data.token)
             navigation.navigate('LoginScreen', props.registerUserHandler({name:name, email:email, number:number, address:address, password:password}))
          } catch (e) {
            console.log('e',e)
          }
      }).catch((err)=>{
          console.log('err ',err)
      })
    //   navigation.navigate('LoginScreen')
  } 
  
  return (
    <View style={styles.mainView}>
      <View style={styles.topView}>
      <Image style={{width:220, height:220}} source={require('../assets/bookshel.png')} />
      </View>  
      <View style={styles.bottomView}>

      <Text style={styles.Heading}>Create Account</Text>
      <View style={styles.formView}>
      <TextInput placeholder='Name*' style={styles.textInput} value={name} onChangeText={text => setName(text)}/>
      <TextInput placeholder='Email*' style={styles.textInput} value={email} onChangeText={text => setEmail(text)}/>
      <TextInput placeholder='Number*' style={styles.textInput} value={number} onChangeText={text => setNumber(text)}/>
      <TextInput placeholder='Address*' style={styles.textInput} value={address} onChangeText={ text => setAddress(text)}/>
      <TextInput placeholder='Password*' style={styles.textInput} value={password} onChangeText={text => setPassword(text)}/>
      <TouchableOpacity style={styles.signupBotton}   onPress={() => registerUser()}>
          <Text style={styles.signupText}>Sign Up</Text>
      </TouchableOpacity>
      </View>
      </View>   
    </View>
  )
}            

export default RegisterScreen




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
        height:'30%',
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    bottomView: {
        width:'100%',
        height:'70%',
        backgroundColor:'#83BDF7',
        borderTopLeftRadius:30,
        borderTopRightRadius:30
    },
    Heading: {
        fontSize:30,
        // fontWeight:'bold',
        marginLeft:15,
        marginTop:20,
        color:'#fff'
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
    signupBotton: {
        width:'90%',
        color:'#000',
        height:52,
        backgroundColor:'#fff',
        borderRadius:10,
        marginTop:10,
        display:'flex',
        justifyContent:'center',
        alignItems:'center'
    },
    signupText: {
        fontWeight:'bold',
        fontSize:18
    }
})
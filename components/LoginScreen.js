import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = (props) => {
    const navigation = useNavigation() 
    const [email,setEmail] = useState('')
    const [password,setPassword] = useState('')
    const [token,setToken] = useState()

  const [address,setAddress] = useState('')
    // useEffect (async() =>  {
    //     const token =  AsyncStorage.getItem('token')
    //     console.log('login token :', token)
    //     console.log('login screen :', props )
    //     try {
    //         const response = await fetch(
    //           'http://192.168.1.105:3000/getRegisterUser'
    //         );
    //         const json = await response.json();
    //         console.log('json ', json)
    //         return json;
    //       } catch (error) {
    //         console.error(error);
    //       }
    // })
    useEffect (() =>  {
        console.log('Login props :', props.route.params.data.name)
    })

    const loginUser = () => {
        console.log(email + "" + password)
        fetch("http://192.168.43.99:3000/login",{
          method:"POST",
          headers:{
              Accept: "application/json",
              'Content-Type':'application/json'
          },
          body: JSON.stringify({
              "email":email,
              "password":password
          })
      })
      .then(res=>res.json())
      .then(data=>{
          console.log('login data',data)
          try {
             console.log('login data',data)
             AsyncStorage.setItem('token', data.token)
             AsyncStorage.setItem('_id' , data.userID)
             AsyncStorage.setItem('name' , props.route.params.data.name)
             navigation.navigate('HomeScreen', props.userLoginHandler({userid:data.userID}))
          } catch (e) {
            console.log('e',e)
          }
      }).catch((err)=>{
          console.log('err ',err)
      })
    // navigation.navigate('HomeScreen')
    }
    return (
      <View style={styles.mainView}>
        <View style={styles.topView}>
        <Image style={{width:220, height:220}} source={require('../assets/bookshel.png')} />
        </View>  
        <View style={styles.bottomView}>
        <Text style={styles.Heading}>Welcome Back</Text>
        <View style={styles.formView}>
        <TextInput placeholder='Email*' style={styles.textInput} value={email} onChangeText={text => setEmail(text)}/>
        <TextInput placeholder='Password*' style={styles.textInput} value={password} onChangeText={text => setPassword(text)}/>
        <TouchableOpacity style={styles.signinBotton} onPress={() => loginUser()}>
            <Text style={styles.signinText}>Sign In</Text>
        </TouchableOpacity>
        </View>
        </View>   
      </View>
    )
}

export default LoginScreen












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
        justifyContent:'center',
        alignItems:'center'
    },
    bottomView: {
        width:'100%',
        height:'60%',
        backgroundColor:'#83BDF7',
        borderTopLeftRadius:30,
        borderTopRightRadius:30
    },
    Heading: {
        fontSize:36,
        fontWeight:'bold',
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
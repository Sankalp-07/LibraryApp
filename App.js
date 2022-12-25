import React, { useState, useEffect } from 'react'
import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import IntroScreen from './components/IntroScreen';
import HomeScreen from './components/HomeScreen';
import UserProfile from './components/UserProfile';
import EditUserProfileScreen from './components/EditUserProfileScreen';
import RegisterScreen from './components/RegisterScreen';
import LoginScreen from './components/LoginScreen';
import SeatBookingScreen from './components/SeatBookingScreen';
import HomeContainer from './container/HomeContainer';
import LoginContainer from './container/LoginContainer';
import RegisterContainer from './container/RegisterContainer';
import SeatBookingContainer from './container/SeatBookingContainer';
import EditUserProfileContainer from './container/EditUserProfileContainer';
import UserProfileContainer from './container/UserProfileContainer';
import MessageContainer from './container/MessageContainer';
import EditUserProfile from './components/EditUserProfile';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import {createStore} from 'redux'
import {Provider} from 'react-redux'
import rootReducer from './services/reducers/index'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Stack = createNativeStackNavigator();
const navOptionHandler = () => ({
  headerShown : false
})


const store = createStore(rootReducer)
console.log('store ',store)

export default function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  useEffect (() =>  {
        // const token = await AsyncStorage.getItem('token')
        // console.log('App of login token :', token)
        // if(token){
        //   setIsLoggedIn(true)
        // }
        getToken()
  })

  const getToken = async() => {
    const token = await AsyncStorage.getItem('token')
        console.log('App of login token :', token)
        if(token){
          setIsLoggedIn(true)
        }
  }
  return (
    <Provider store={store}>
    <NavigationContainer>
      {/* <Stack.Navigator initialRouteName='Intro'> */}
        {
          isLoggedIn ? 
          <Stack.Navigator initialRouteName='HomeScreen'>
          <Stack.Screen options={navOptionHandler} name="HomeScreen" component={HomeContainer} />
      <Stack.Screen options={navOptionHandler} name="UserProfile" component={UserProfileContainer} />
      <Stack.Screen options={navOptionHandler} name="EditProfile" component={EditUserProfile} />
      <Stack.Screen options={navOptionHandler} name="EditUserProfile" component={EditUserProfileContainer} />
      <Stack.Screen options={navOptionHandler} name="SeatBookingScreen" component={SeatBookingContainer} />
      <Stack.Screen options={navOptionHandler} name="Message" component={MessageContainer} />
      </Stack.Navigator>
      :
      <Stack.Navigator initialRouteName='Intro'>
      <Stack.Screen options={navOptionHandler} name="Intro" component={IntroScreen} />
      <Stack.Screen options={navOptionHandler} name="RegisterScreen" component={RegisterContainer} />
      <Stack.Screen name="LoginScreen" component={LoginContainer} />
      <Stack.Screen options={navOptionHandler} name="HomeScreen" component={HomeContainer} />
      <Stack.Screen options={navOptionHandler} name="UserProfile" component={UserProfileContainer} />
      <Stack.Screen options={navOptionHandler} name="EditProfile" component={EditUserProfile} />
      <Stack.Screen options={navOptionHandler} name="EditUserProfile" component={EditUserProfileContainer} />
      <Stack.Screen options={navOptionHandler} name="SeatBookingScreen" component={SeatBookingContainer} />
      <Stack.Screen options={navOptionHandler} name="Message" component={MessageContainer} />
      </Stack.Navigator>
        }
      {/* <Stack.Screen options={navOptionHandler} name="Intro" component={IntroScreen} />
      <Stack.Screen options={navOptionHandler} name="RegisterScreen" component={RegisterContainer} />
      <Stack.Screen name="LoginScreen" component={LoginContainer} />
      <Stack.Screen options={navOptionHandler} name="HomeScreen" component={HomeContainer} />
      <Stack.Screen options={navOptionHandler} name="UserProfile" component={UserProfileContainer} />
      <Stack.Screen options={navOptionHandler} name="EditUserProfile" component={EditUserProfileContainer} />
      <Stack.Screen options={navOptionHandler} name="SeatBookingScreen" component={SeatBookingContainer} />
      <Stack.Screen options={navOptionHandler} name="Message" component={MessageContainer} /> */}
      {/* </Stack.Navigator> */}
    </NavigationContainer>
    </Provider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

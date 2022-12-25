import React, { useState, useEffect, useRef } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, TextInput, SafeAreaView, StatusBar, ToastAndroid, FlatList } from 'react-native'
import CalendarPicker from 'react-native-calendar-picker';
import Header from './Header';
import * as Device from 'expo-device';
import * as Notifications from 'expo-notifications';
import { MaterialCommunityIcons, FontAwesome5, FontAwesome, AntDesign} from '@expo/vector-icons';
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

Notifications.setNotificationHandler({
  handleNotification: async () => ({
    shouldShowAlert: true,
    shouldPlaySound: false,
    shouldSetBadge: false,
  }),
});

// async function schedulePushNotification() {
//   await Notifications.scheduleNotificationAsync({
//     content: {
//       title: "You've got notification! 📬",
//       body: 'Here is the notification body',
//       data: { data: 'goes here' },
//     },
//     trigger: { seconds: 2 },
//   });
// }

// async function registerForPushNotificationsAsync() {
//   let token;
//   if (Device.isDevice) {
//     const { status: existingStatus } = await Notifications.getPermissionsAsync();
//     let finalStatus = existingStatus;
//     if (existingStatus !== 'granted') {
//       const { status } = await Notifications.requestPermissionsAsync();
//       finalStatus = status;
//     }
//     if (finalStatus !== 'granted') {
//       alert('Failed to get push token for push notification!');
//       return;
//     }
//     token = (await Notifications.getExpoPushTokenAsync()).data;
//     console.log(token);
//   } else {
//     alert('Must use physical device for Push Notifications');
//   }

//   if (Platform.OS === 'android') {
//     Notifications.setNotificationChannelAsync('default', {
//       name: 'default',
//       importance: Notifications.AndroidImportance.MAX,
//       vibrationPattern: [0, 250, 250, 250],
//       lightColor: '#FF231F7C',
//     });
//   }

//   return token;
// }

const SeatBookingScreen = (props) => {
  const navigation = useNavigation()  
  const [expoPushToken, setExpoPushToken] = useState('');
  const [notification, setNotification] = useState(false);
  const [showNotiIcon, setShowNotiIcon] = useState(false);
  const [userMsgData, setUserMsgData] = useState({});
  const [showBell, setShowBell] = useState(false);
  // const [allMessage, setAllMessage] = useState([]);

  const notificationListener = useRef();
  const responseListener = useRef();

  // console.log('props seatBokking :', props.route.params.data.libtitle)
  // console.log('props SeatBookingScreen :', props.userData.name)
  // console.log('props UserId :', props.route.params.data.userid)



  const schedulePushNotification = async() =>{
    const msgdata = await Notifications.scheduleNotificationAsync({
      content: {
        title: "You've got notification! 📬",
        body: `Hello ${props.userData.name}`,
        data: { data: 'goes here' },
      },
      trigger: { seconds: 2 },
    });
    // setShowNotiIcon(false)
    setUserMsgData(notification)
    setShowBell(true)
    // navigation.navigate('Header')
    // console.log('notification :',notification)
    const id = await AsyncStorage.getItem('_id')
    console.log('idid ', id)
    const libName = await AsyncStorage.getItem('libraryName')
    // console.log('Library Name :', libName)
    // const libName = await AsyncStorage.getItem('libraryName')

    userMessage(id,libName)
  }

  const userMessage = (id,libName) => {
    const userSelectedSeats = userSeats.toString() 
    // console.log('user Selected Seat ', userSelectedSeats)
    // console.log('user message userSelectedLibraryName ', libName)
    console.log('user message user seats', userSeats.toString)
    fetch(`http://192.168.43.99:3000/${id}/message`,{
          method:"POST",
          headers:{
              'Content-Type':'application/json',
              'Accept': 'application/json',
          },
          body: JSON.stringify({
            "libraryName":libName,
            "userName":'props.userData.name',
            "fromDate":fromDate,
            "toDate":toDate,
            "selectedSeats":userSeats
          })
      })
      .then(res=>res.json())
      .then(data=>{
          console.log('data message',data)
          try {
            console.log('userdatamessage')
            //  AsyncStorage.setItem('token', data.token)
            //  navigation.navigate('LoginScreen', props.registerUserHandler({name:name, email:email, number:number, address:address, password:password}))
          } catch (e) {
            console.log('e',e)
          }
      }).catch((err)=>{
          console.log('err ',err)
      })
  }

 const registerForPushNotificationsAsync = async() =>{
    let token;
    if (Device.isDevice) {
      const { status: existingStatus } = await Notifications.getPermissionsAsync();
      let finalStatus = existingStatus;
      if (existingStatus !== 'granted') {
        const { status } = await Notifications.requestPermissionsAsync();
        finalStatus = status;
      }
      if (finalStatus !== 'granted') {
        alert('Failed to get push token for push notification!');
        return;
      }
      token = (await Notifications.getExpoPushTokenAsync()).data;
      console.log(token);
    } else {
      alert('Must use physical device for Push Notifications');
    }
  
    if (Platform.OS === 'android') {
      Notifications.setNotificationChannelAsync('default', {
        name: 'default',
        importance: Notifications.AndroidImportance.MAX,
        vibrationPattern: [0, 250, 250, 250],
        lightColor: '#FF231F7C',
      });
    }
  
    return token;
  }


  const sendMessage = () => {
    console.log('notifiction :', notification)
    navigation.navigate('Message', props.UserMessageHandler({msg:notification, fromDate:fromDate, toDate:toDate, userSeats:userSeats, libName:userSelectedLibraryName, userIDForMessage:userID}))
    // props.UserMessageHandler({msg:this.state.notification})
    setShowBell(false)

    console.log('User Details : ', props.userData.name + ' ' + fromDate + ' ' + toDate + ' ' + userSeats + ' ' + userSelectedLibraryName)
  }






  const [statusseatColor, setstatusseatColor] = useState('#FE8D01') 
  const [seatColor, setseatColor] = useState('#444451') 
  const [selectSeatColor, setSelectSeatColor] = useState('#FE8D01')
  const [checkTF, setCheckTF] = useState(false)
  const [seat2Color, setseat2Color] = useState('#444451') 
  const [seat3Color, setseat3Color] = useState('#444451')  
  const [seat4Color, setseat4Color] = useState('#444451')  
  const [seat5Color, setseat5Color] = useState('#444451')  
  const [seat6Color, setseat6Color] = useState('#444451')  
  const [seat7Color, setseat7Color] = useState('#444451')  
  const [seat8Color, setseat8Color] = useState('#444451') 
  const [seat9Color, setseat9Color] = useState('#444451')  
  const [seat10Color, setseat10Color] = useState('#444451')  
  const [seat11Color, setseat11Color] = useState('#444451')  
  const [seat12Color, setseat12Color] = useState('#444451')  
  const [seat13Color, setseat13Color] = useState('#444451')  
  const [seat14Color, setseat14Color] = useState('#444451')  
  const [seat15Color, setseat15Color] = useState('#444451')  
  const [seat16Color, setseat16Color] = useState('#444451')  
  const [seat17Color, setseat17Color] = useState('#444451')  
  const [seat18Color, setseat18Color] = useState('#444451')  
  const [seat19Color, setseat19Color] = useState('#444451')  
  const [seat20Color, setseat20Color] = useState('#444451')  
  const [seat21Color, setseat21Color] = useState('#444451')  
  const [seat22Color, setseat22Color] = useState('#444451')  
  const [seat23Color, setseat23Color] = useState('#444451')  
  const [seat24Color, setseat24Color] = useState('#444451')  
  const [seat25Color, setseat25Color] = useState('#444451')  
  const [seat26Color, setseat26Color] = useState('#444451')  
  const [seat27Color, setseat27Color] = useState('#444451')  
  const [seat28Color, setseat28Color] = useState('#444451')  
  const [seat29Color, setseat29Color] = useState('#444451')  
  const [seat30Color, setseat30Color] = useState('#444451')  
  const [seat31Color, setseat31Color] = useState('#444451')  
  const [seat32Color, setseat32Color] = useState('#444451')  
  const [seat33Color, setseat33Color] = useState('#444451')  
  const [seat34Color, setseat34Color] = useState('#444451')  
  const [seat35Color, setseat35Color] = useState('#444451')  
  const [seat36Color, setseat36Color] = useState('#444451')  
  const [seat37Color, setseat37Color] = useState('#444451')  
  const [seat38Color, setseat38Color] = useState('#444451')  
  const [seat39Color, setseat39Color] = useState('#444451')  
  const [seat40Color, setseat40Color] = useState('#444451')  
  const [seat41Color, setseat41Color] = useState('#444451')  
  const [seat42Color, setseat42Color] = useState('#444451')  
  const [seat43Color, setseat43Color] = useState('#444451')  
  const [seat44Color, setseat44Color] = useState('#444451')  
  const [seat45Color, setseat45Color] = useState('#444451')  
  const [seat46Color, setseat46Color] = useState('#444451')  
  const [seat47Color, setseat47Color] = useState('#444451')  
  const [seat48Color, setseat48Color] = useState('#444451')  
  const [selectedStartDate, setselectedStartDate] = useState(null)
  const [userSeats, setUserSeats] = useState([]);
  const [allMessage, setAllMessage] = useState([]);
  const [seats, setSeats] = useState([]);
  const [ss, setS] = useState([]);
  var [seatImage,setSeatsImage] = useState([])


  const [seatNo1, setSeatNo1] = useState(1);
  const [userSelectedLibraryName, setUserSelectedLibraryName] = useState()
  const [userID, setUserId] = useState()
  // console.log('1 :', seatNo1)  



  useEffect(() => {
    getAllSeatImages();
  }, []);


  const getAllSeatImages = async() => {
    const token = await AsyncStorage.getItem('token')
    const id = await AsyncStorage.getItem('_id')
    // const stringId = id.toString()
    console.log('logout user login token :', token)
    // console.log('SeatBookingScreen id :', stringId)
    const libName = await AsyncStorage.getItem('libraryName')
    const libId = await AsyncStorage.getItem('libraryId')
    const libSeats = await AsyncStorage.getItem('librarySeats')
    //getmsg(libSeats)
    console.log('Library Name :', libName)
    console.log('Library Id :', libId)
    console.log('Library Seats :', libSeats)
    var Number = parseInt(libSeats)
    // console.log('stt :', stt)

    let items = Array.apply(null, Array(Number)).map((v, i) => {
      return {
        id: i,
        isSelected: false
        //src: '../assets/chair.png'
      };
    });
    setSeatsImage(items);

    Message()
    // getUserMessages(id)
    // setUserSelectedLibraryName(props.route.params.data.libtitle)
    setUserSelectedLibraryName(libName)

    // setUserId(props.route.params.data.userid)
    setUserId(id)
    registerForPushNotificationsAsync().then(token => setExpoPushToken(token));

    notificationListener.current = Notifications.addNotificationReceivedListener(notification => {
      setNotification(notification);
    });

    responseListener.current = Notifications.addNotificationResponseReceivedListener(response => {
      console.log(response);
    });

    return () => {
      Notifications.removeNotificationSubscription(notificationListener.current);
      Notifications.removeNotificationSubscription(responseListener.current);
    };
  }

  // const Message = async() => {
  //   console.log('Coming Messages')
  //   const response = await fetch(
  //     'http://192.168.43.99:3000/getMessages'
  //   );
  //   const res = await response.json();
  //   console.log('Coming Messages ', res.result)
  //   setAllMessage(res.result)
  //   selectedSeats()
  // }

  const  getmsg = async(libseets) => {
    //const libseatimg = require('../assets/chair.png')
    //console.log('libseets : ', libseets)
    const libSets = await AsyncStorage.getItem('librarySeats')
    console.log('libseetsssss : ', libSets)
    //let st = libseets
    let seatNo = libSets
    let items = Array.apply(null, Array(libSets)).map((v, i) => {
      return {
        id: i,

        //src: '../assets/chair.png'
      };
    });
    setSeatsImage(items);
    
  }

  // const onlyseats = () => {
  //   console.log('onlyseats ', seatImage)
  //   seatImage.map((item) => {
  //     //seats.push(item.selectedSeats)
  //     console.log('library seats : ', item.url)
  //   })
  //   // seatgets()
  // }

  const seatgets = () => {
    const ar = []
    const arr = []
    console.log('seatgets ', seats)
    for(var i=0; i<seats.length; i++){
      const v = seats[i].toString()
      setS(...v, v)
      ar.push(v)
      // ss.push(v)
      // if(seats[i] == "12,28,21"){
      //   const v = seats[i].toString()
      //   console.log('vvvv ', v)
      // }
      // else{
      //   console.log('not got')
      // }
      console.log('ssss ', ss)
      console.log('arra', ar)
      // const bb = ar.toString
      arr.push(ar.toString)
      console.log('arr ', arr)
    }
  }

  // const selectedSeats = () => {
  //   console.log('selectedSeats :', allMessage)
  //   allMessage.map((item) => {
  //     console.log('itemSelectedSeats :', item.selectedSeats)
  //     // setSeats(item.selectedSeats)
  //     setSeats(seats.push(item.selectedSeats))
  //   })
  //   checkSeats()
  // }


  // const checkSeats = () => {
  //   console.log('checkSeats :', seats.toString())
  //   const seet = seats.toString()
  //   // seet.map((item => {
  //   //   setS(item)
  //   // }))
  //   console.log('seet', seet)
  //   // setS(seet) 
  //   ss.push(seet)
  //   for(var i=0; i< seet.length; i++){
  //      if(seet[i] == '12,28,21,12,28,21,12,28,21,35,36,37,46,47,48,28,21,30,4,5,6,30,31,29,29,30,31,41,42,43'){
  //       console.log('12')
  //      }
  //      else{
  //       console.log('seatserr')
  //      }
  //   }
  //   yess()
  // }

  // const yess = () => {
  //   console.log('yess', ss)
  // }


  // const getUserMessages = async(id) => {
    // console.log('seats id :', id)
    // navigation.addListener('focus', async() => {
    // const response = await fetch(
      // 'http://192.168.43.99:3000/getMessages'
    // );
    // const jsondata = await response.json();
    // jsondata.map(function(item) {
    //   console.log('item ', item)
    // })


    // console.log('Message Screen ', jsondata.messages)
    // console.log('messageArry ', messageArray)
    // setAllMessage(jsondata.messages)
    // return jsondata;
  // })
  // }


  

  // const seat1 = (colorName,val) => {
  //   // setseatColor('#FE8D01')
  //   const limit =  checkArrayLimit()
  //   console.log('limit :', limit)
  //   console.log('val :', val)
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   const seatNo = 1;
  //   if(color1 === colorName && val === 1){
  //     if(limit === true){
  //       setseatColor('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       // console.log('....Alert....')
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
  //   }
  //   else if(color2 === '#FE8D01' && val === 1){
  //       console.log('color2')
  //       setseatColor('#444451')
  //       // userSeats.splice(val,1)
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
   
  // }
  // console.log('userSeatssss :', userSeats)
  
  // const seat2 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   console.log('limit :', limit)
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 2){
  //     if(limit === true){
  //       setseat2Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
       
  //   }
  //   else if(color2 === '#FE8D01'){
  //       console.log('color2')
  //       setseat2Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  //   // checkArrayLimit()
  // }

  // const seat3 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   console.log('limit :', limit)
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 3){
  //     if(limit === true){
  //       setseat3Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
       
  //   }
  //   else if(color2 === '#FE8D01'){
  //       console.log('color2')
  //       setseat3Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  //   // checkArrayLimit()
  // }

  // const seat4 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   console.log('limit :', limit)
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 4){
  //     if(limit === true){
  //       setseat4Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
        
  //   }
  //   else if(color2 === '#FE8D01'){
  //       console.log('color2')
  //       setseat4Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat5 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 5){
  //     if(limit === true){
  //       setseat5Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
        
  //   }
  //   else if(color2 === '#FE8D01'){
  //       console.log('color2')
  //       setseat5Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat6 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 6){
  //     if(limit === true){
  //       setseat6Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
       
  //   }
  //   else if(color2 === '#FE8D01'){
  //       console.log('color2')
  //       setseat6Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat7 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 7){
  //     if(limit === true){
  //       setseat7Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
       
  //   }
  //   else if(color2 === '#FE8D01'){
  //       console.log('color2')
  //       setseat7Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat8 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 8){
  //     if(limit === true){
  //       setseat8Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
        
  //   }
  //   else if(color2 === '#FE8D01'){
  //       console.log('color2')
  //       setseat8Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat9 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 9){
  //     if(limit === true){
  //       setseat9Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
        
  //   }
  //   else if(color2 === '#FE8D01'){
  //       console.log('color2')
  //       setseat9Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat10 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 10){
  //     if(limit === true){
  //       setseat10Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
       
  //   }
  //   else if(color2 === '#FE8D01' && val === 10){
  //       console.log('color2')
  //       setseat10Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat11 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 11){
  //     if(limit === true){
  //       setseat11Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
      
  //   }
  //   else if(color2 === '#FE8D01' && val === 11){
  //       console.log('color2')
  //       setseat11Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat12 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 12){
  //     if(limit === true){
  //       setseat12Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
       
  //   }
  //   else if(color2 === '#FE8D01' && val === 12){
  //       console.log('color2')
  //       setseat12Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat13 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 13){
  //     if(limit === true){
  //       setseat13Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
     
  //   }
  //   else if(color2 === '#FE8D01' && val === 13){
  //       console.log('color2')
  //       setseat13Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat14 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 14){
  //     if(limit === true){
  //       setseat14Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
       
  //   }
  //   else if(color2 === '#FE8D01' && val === 14){
  //       console.log('color2')
  //       setseat14Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat15 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 15){
  //     if(limit === true){
  //       setseat15Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
       
  //   }
  //   else if(color2 === '#FE8D01' && val === 15){
  //       console.log('color2')
  //       setseat15Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat16 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 16){
  //     if(limit === true){
  //       setseat16Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
       
  //   }
  //   else if(color2 === '#FE8D01' && val === 16){
  //       console.log('color2')
  //       setseat16Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat17 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 17){
  //     if(limit === true){
  //       setseat17Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
       
  //   }
  //   else if(color2 === '#FE8D01' && val === 17){
  //       console.log('color2')
  //       setseat17Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat18 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 18){
  //     if(limit === true){
  //       setseat18Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
        
  //   }
  //   else if(color2 === '#FE8D01' && val === 18){
  //       console.log('color2')
  //       setseat18Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat19 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 19){
  //     if(limit === true){
  //       setseat19Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
      
  //   }
  //   else if(color2 === '#FE8D01' && val === 19){
  //       console.log('color2')
  //       setseat19Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat20 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 20){
  //     if(limit === true){
  //       setseat20Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
       
  //   }
  //   else if(color2 === '#FE8D01' && val === 20){
  //       console.log('color2')
  //       setseat20Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat21 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 21){
  //     if(limit === true){
  //       setseat21Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
        
  //   }
  //   else if(color2 === '#FE8D01' && val === 21){
  //       console.log('color2')
  //       setseat21Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat22 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 22){
  //     if(limit === true){
  //       setseat22Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
        
  //   }
  //   else if(color2 === '#FE8D01' && val === 22){
  //       console.log('color2')
  //       setseat22Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat23 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 23){
  //     if(limit === true){
  //       setseat23Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
        
  //   }
  //   else if(color2 === '#FE8D01' && val === 23){
  //       console.log('color2')
  //       setseat23Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat24 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 24){
  //     if(limit === true){
  //       setseat24Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
       
  //   }
  //   else if(color2 === '#FE8D01' && val === 24){
  //       console.log('color2')
  //       setseat24Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat25 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 25){
  //     if(limit === true){
  //       setseat25Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
       
  //   }
  //   else if(color2 === '#FE8D01' && val === 25){
  //       console.log('color2')
  //       setseat25Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat26 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 26){
  //     if(limit === true){
  //       setseat26Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
       
  //   }
  //   else if(color2 === '#FE8D01' && val === 26){
  //       console.log('color2')
  //       setseat26Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat27 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 27){
  //     if(limit === true){
  //       setseat27Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
       
  //   }
  //   else if(color2 === '#FE8D01' && val === 27){
  //       console.log('color2')
  //       setseat27Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat28 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 28){
  //     if(limit === true){
  //       setseat28Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
      
  //   }
  //   else if(color2 === '#FE8D01' && val === 28){
  //       console.log('color2')
  //       setseat28Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat29 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 29){
  //     if(limit === true){
  //       setseat29Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
      
  //   }
  //   else if(color2 === '#FE8D01' && val === 29){
  //       console.log('color2')
  //       setseat29Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat30 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 30){
  //     if(limit === true){
  //       setseat30Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
       
  //   }
  //   else if(color2 === '#FE8D01' && val === 30){
  //       console.log('color2')
  //       setseat30Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat31 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 31){
  //     if(limit === true){
  //       setseat31Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
       
  //   }
  //   else if(color2 === '#FE8D01' && val === 31){
  //       console.log('color2')
  //       setseat31Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat32 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 32){
  //     if(limit === true){
  //       setseat32Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
       
  //   }
  //   else if(color2 === '#FE8D01' && val === 32){
  //       console.log('color2')
  //       setseat32Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat33 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 33){
  //     if(limit === true){
  //       setseat33Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
        
  //   }
  //   else if(color2 === '#FE8D01' && val === 33){
  //       console.log('color2')
  //       setseat33Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat34 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 34){
  //     if(limit === true){
  //       setseat34Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
        
  //   }
  //   else if(color2 === '#FE8D01' && val === 34){
  //       console.log('color2')
  //       setseat34Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat35 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 35){
  //     if(limit === true){
  //       setseat35Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
        
  //   }
  //   else if(color2 === '#FE8D01' && val === 35){
  //       console.log('color2')
  //       setseat35Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat36 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 36){
  //     if(limit === true){
  //       setseat36Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
       
  //   }
  //   else if(color2 === '#FE8D01' && val === 36){
  //       console.log('color2')
  //       setseat36Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat37 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 37){
  //     if(limit === true){
  //       setseat37Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
       
  //   }
  //   else if(color2 === '#FE8D01' && val === 37){
  //       console.log('color2')
  //       setseat37Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat38 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 38){
  //     if(limit === true){
  //       setseat38Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
        
  //   }
  //   else if(color2 === '#FE8D01' && val === 38){
  //       console.log('color2')
  //       setseat38Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat39 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 39){
  //     if(limit === true){
  //       setseat39Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
        
  //   }
  //   else if(color2 === '#FE8D01' && val === 39){
  //       console.log('color2')
  //       setseat39Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat40 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 40){
  //     if(limit === true){
  //       setseat40Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
       
  //   }
  //   else if(color2 === '#FE8D01' && val === 40){
  //       console.log('color2')
  //       setseat40Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat41 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 41){
  //     if(limit === true){
  //       setseat41Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
      
  //   }
  //   else if(color2 === '#FE8D01' && val === 41){
  //       console.log('color2')
  //       setseat41Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat42 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 42){
  //     if(limit === true){
  //       setseat42Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
      
  //   }
  //   else if(color2 === '#FE8D01' && val === 42){
  //       console.log('color2')
  //       setseat42Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat43 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 43){
  //     if(limit === true){
  //       setseat43Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
        
  //   }
  //   else if(color2 === '#FE8D01' && val === 43){
  //       console.log('color2')
  //       setseat43Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat44 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 44){
  //     if(limit === true){
  //       setseat44Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
       
  //   }
  //   else if(color2 === '#FE8D01' && val === 44){
  //       console.log('color2')
  //       setseat44Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat45 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 45){
  //     if(limit === true){
  //       setseat45Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
       
  //   }
  //   else if(color2 === '#FE8D01' && val === 45){
  //       console.log('color2')
  //       setseat45Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat46 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 46){
  //     if(limit === true){
  //       setseat46Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
        
  //   }
  //   else if(color2 === '#FE8D01' && val === 46){
  //       console.log('color2')
  //       setseat46Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat47 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 47){
  //     if(limit === true){
  //       setseat47Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
      
  //   }
  //   else if(color2 === '#FE8D01' && val === 47){
  //       console.log('color2')
  //       setseat47Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

  // const seat48 = (colorName, val) => {
  //   const limit =  checkArrayLimit()
  //   // setseatColor('#FE8D01')
  //   console.log('color', colorName)
  //   const color1 = '#444451';
  //   const color2 = '#FE8D01';
  //   if(color1 === colorName && val === 48){
  //     if(limit === true){
  //       setseat48Color('#FE8D01')
  //       userSeats.push(val)
  //     }
  //     if(limit === false){
  //       ToastAndroid.show("You can choose only Three Seats",
  //       ToastAndroid.SHORT,
  //       ToastAndroid.BOTTOM
  //       )
  //     }
       
  //   }
  //   else if(color2 === '#FE8D01' && val === 48){
  //       console.log('color2')
  //       setseat48Color('#444451')
  //       for(var i=0; i< userSeats.length; i++){
  //         if(userSeats[i] === val)
  //         {
  //           userSeats.splice(i,1)
  //         }
  //       }
  //   }
  // }

//   const seat8 = (colorName) => {
//     // setseatColor('#FE8D01')
//     console.log('color', colorName)
//     const color1 = '#444451';
//     const color2 = '#FE8D01';
//     if(color1 === colorName){
//         setseat8Color('#FE8D01')
//     }
//     else if(color2 === '#FE8D01'){
//         console.log('color2')
//         setseat8Color('#444451')
//     }
//   9
const [showfromCalender, setShowfromCalender] = useState(false)
const [showtoCalender, setShowtoCalender] = useState(false)
const [fromDate, setFromDate] = useState('')
const [toDate, setToDate] = useState('')
const onDateChange = (date) => {
      setselectedStartDate(date);
      setShowfromCalender(false)

      const frmdate = date ? date.toString() : '';
      convertFormDate(frmdate)
}

const onToDateChange = (date) => {
    setselectedStartDate(date);
    setShowtoCalender(false)

    const frmdate = date ? date.toString() : '';
    convertToDate(frmdate)
}

const convertFormDate = (str) => {
    var mnths = {
        Jan: '01',
        Feb: '02',
        Mar: '03',
        Apr: '04',
        May: '05',
        Jun: '06',
        Jul: '07',
        Aug: '08',
        Sep: '09',
        Oct: '10',
        Nov: '11',
        Dec: '12'
    },
    date = str.split(" ");
    const Fromdt = [date[3], mnths[date[1]], date[2]].join("-");
    setFromDate(Fromdt)
    return [date[3], mnths[date[1]], date[2]].join("-")
}


const convertToDate = (str) => {
    var mnths = {
        Jan: '01',
        Feb: '02',
        Mar: '03',
        Apr: '04',
        May: '05',
        Jun: '06',
        Jul: '07',
        Aug: '08',
        Sep: '09',
        Oct: '10',
        Nov: '11',
        Dec: '12'
    },
    date = str.split(" ");
    const Fromdt = [date[3], mnths[date[1]], date[2]].join("-");
    setToDate(Fromdt)
    return [date[3], mnths[date[1]], date[2]].join("-")
}
  console.log('noti :', showNotiIcon)
  // console.log('usermsgdata :', userMsgData)

  const Item = ({ title, image, id, seats }) => (
    <TouchableOpacity style={{flex:1}}>
    <View>
      {/* <Text>{title}</Text> */}
      <Image style={{width:25, height:25, marginLeft:0, tintColor:'yellow', backgroundColor:'yellow'}} source={image} />
    </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Item title={item.libraryName} image={item.url} id={item._id} seats={item.seats}/>
  );


  const selectedSeet = (id) => {
    console.log('selectedId : ', id)
 
    

    let limit = checkArrayLimit();
      if(limit === true){
        userSeats.push(id)
        let arr = seatImage.map((item,index) => {
          if(id == index){
          item.isSelected = !item.isSelected
          }
          return {...item}
        })
        setSeatsImage(arr)
      }
      if(limit === false){
        ToastAndroid.show("You can choose only Three Seats",
        ToastAndroid.SHORT,
        ToastAndroid.BOTTOM
        )
      }
      // else if(userSeats.length == 3){
      //          console.log('color3')
      //         // setseat48Color('#444451')

      //         for(var i=0; i< userSeats.length; i++){
      //           if(userSeats[i] === id)
      //           {
      //             userSeats.splice(i,1)
      //           }
      //         }
      //     }

      console.log('userSeats :', userSeats)
  } 

  const checkArrayLimit = () => {
    console.log('checkArrayLimit')
    if(userSeats.length == 3){
      return false;
    }
    return true;
  }

  return (
    <SafeAreaView style={styles.mainView}>
      <StatusBar />
      <Header isUserMessage={true} title="Library Room"/>
      {
        showBell ?
        <View style={{position:'relative', left:114, bottom:32}}>
        <TouchableOpacity onPress={() => sendMessage()}>  
        <Image style={{width:15, height:15, marginLeft:60, tintColor:'#FFB668'}} source={require('../assets/notification.png')} resizeMode='contain' />
        <View style={{width:8,height:8,backgroundColor:'red', borderRadius:50, position:'absolute', left:67}}/>
        </TouchableOpacity>
        </View>       
        :
        null
      }
         
      <View style={styles.seatBookingText}>
      <Text style={{fontSize:22,fontWeight:'bold'}}>Book Your Seat</Text>
      </View>
      <Image style={{width:100, height:100, marginBottom:25}} source={require('../assets/chair.png')} />
      <Text style={{fontSize:22,fontWeight:'bold'}}>Status</Text>
      <View style={styles.seatStatus}>
      <View style={{width:20,height:20,backgroundColor:'#444451', borderTopLeftRadius:10,borderTopRightRadius:10}}/>
       <View style={{justifyContent:'center', marginRight:10}}>
           <Text style={{marginLeft:5}}>N/A</Text>
    </View>
       <View style={{width:20,height:20,backgroundColor:'#FE8D01', borderTopLeftRadius:10,borderTopRightRadius:10}}/>
       <View style={{justifyContent:'center', marginRight:10}}>
           <Text style={{marginLeft:5}}>Selected</Text>
       </View>
       <View style={{width:20,height:20,backgroundColor:'#FFD8B2', borderTopLeftRadius:10,borderTopRightRadius:10}}/>
       <View style={{justifyContent:'center', marginRight:10}}>
           <Text style={{marginLeft:5}}>Occupied</Text>
       </View>
      </View>

     
     {/* <View> */}
     <FlatList
        data={seatImage}
        renderItem={({item}) => (
          <View
            style={{
              flex: 0,
              flexDirection: 'column',
              margin: 1,
              justifyContent:'center'
            }}
            
            >
            <TouchableOpacity onPress={() => selectedSeet(item.id)}>
            <Image
              // style={styles.imageThumbnail}
              style={[styles.imageThumbnail, {tintColor: item.isSelected ? '#FE8D01' : '#444451'}]}
              source={require('../assets/chair.png')}
            />
            </TouchableOpacity>
          </View>
        )}
        //Setting the number of column
        numColumns={8}
        keyExtractor={(item, index) => index}
      />
     {/* <FlatList
        data={seatImage}
        renderItem={renderItem}
        keyExtractor={item => item.seatNo}
        numColumns={2} /> */}
     {/* </View> */}


      {/* <View style={styles.row}>
       <TouchableOpacity onPress={()=> seat1(seatColor,1)}>
  
      <Image style={{width:25, height:25, marginBottom:0, tintColor:seatColor, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat2(seat2Color,2)}>
      
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat2Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat3(seat3Color,3)}>
      
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat3Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat4(seat4Color,4)}>
      
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat4Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat5(seat5Color,5)}>
      
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat5Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
      <TouchableOpacity onPress={()=> seat6(seat6Color,6)}>
      
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat6Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat7(seat7Color,7)}>
      
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat7Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat8(seat8Color,8)}>
      
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat8Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       
      </View>
      <View style={styles.row}>
      <TouchableOpacity onPress={()=> seat9(seat9Color,9)}>
      
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat9Color, margin:5}} source={require('../assets/chair.png')} />
      </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat10(seat10Color,10)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat10Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat11(seat11Color,11)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat11Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat12(seat12Color,12)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat12Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat13(seat13Color,13)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat13Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat14(seat14Color,14)}>
      
      <Image style={{width:25, height:25, marginBottom:0, tintColor:seat14Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat15(seat15Color,15)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat15Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat16(seat16Color,16)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat16Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
      </View>
      <View style={styles.row}>
      <TouchableOpacity onPress={()=> seat17(seat17Color,17)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat17Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat18(seat18Color,18)}>
      
      <Image style={{width:25, height:25, marginBottom:0, tintColor:seat18Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat19(seat19Color,19)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat19Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat20(seat20Color,20)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat20Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat21(seat21Color,21)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat21Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat22(seat22Color,22)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat22Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
      <TouchableOpacity onPress={()=> seat23(seat23Color,23)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat23Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat24(seat24Color,24)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat24Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
      </View>
      <View style={styles.row}>
      <TouchableOpacity onPress={()=> seat25(seat25Color,25)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat25Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat26(seat26Color,26)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat26Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
      <TouchableOpacity onPress={()=> seat27(seat27Color,27)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat27Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat28(seat28Color,28)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat28Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat29(seat29Color,29)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat29Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat30(seat30Color,30)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat30Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat31(seat31Color,31)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat31Color, margin:5}} source={require('../assets/chair.png')} />
      </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat32(seat32Color,32)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat32Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
      </View>
      <View style={styles.row}>
      <TouchableOpacity onPress={()=> seat33(seat33Color,33)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat33Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat34(seat34Color,34)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat34Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat35(seat35Color,35)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat35Color, margin:5}} source={require('../assets/chair.png')} />
      </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat36(seat36Color,36)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat36Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat37(seat37Color,37)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat37Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat38(seat38Color,38)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat38Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat39(seat39Color,39)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat39Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat40(seat40Color,40)}>
      
      <Image style={{width:25, height:25, marginBottom:0, tintColor:seat40Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
      </View>
      <View style={styles.row}>
      <TouchableOpacity onPress={()=> seat41(seat41Color,41)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat41Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat42(seat42Color,42)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat42Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat43(seat43Color,43)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat43Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat44(seat44Color,44)}>
      
      <Image style={{width:25, height:25, marginBottom:0, tintColor:seat44Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat45(seat45Color,45)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat45Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat46(seat46Color,46)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat46Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat47(seat47Color,47)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat47Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
       <TouchableOpacity onPress={()=> seat48(seat48Color,48)}>
       
       <Image style={{width:25, height:25, marginBottom:0, tintColor:seat48Color, margin:5}} source={require('../assets/chair.png')} />
       </TouchableOpacity>
     </View> */}

     {
         showfromCalender ? 
         <CalendarPicker
          onDateChange={onDateChange}
        />
        : null
     }

    {
         showtoCalender ? 
         <CalendarPicker
          onDateChange={onToDateChange}
        />
        : null
     }

     <View style={{margin:20}}>
     <Text style={{fontSize:18, fontWeight:'bold', marginBottom:10}}>Select Date</Text>    
     <View style={{flexDirection:'row', justifyContent:'space-between'}}>
        <View> 
        <TouchableOpacity style={{marginTop:0, flexDirection:'row'}} onPress={() => setShowfromCalender(true)}>
          <AntDesign name='calendar' size={24} color="black" />
          <Text style={{marginTop:5, marginLeft:5}}>From</Text>
        </TouchableOpacity>
        <TextInput editable={false} value={fromDate} style={{height:20,width:100, borderWidth:1, }} />
        </View>
        <View style={{marginLeft:35, marginRight:35}} />
        <View>
        <TouchableOpacity style={{marginTop:0, flexDirection:'row', justifyContent:'flex-end'}} onPress={() => setShowtoCalender(true)}>
          <Text style={{marginTop:5, marginLeft:5}}>To</Text>
          <AntDesign name='calendar' size={24} color="black" />
        </TouchableOpacity>
        <TextInput editable={false} value={toDate} style={{height:20,width:100, borderWidth:1, }} />
        </View>
        </View>
     </View>
     <TouchableOpacity 
     style={{width:'80%', height:52, backgroundColor:'#FFB668', borderRadius:10, display:'flex', justifyContent:'center', alignItems:'center'}}
     onPress={async () => {
      await schedulePushNotification();
    }}
     >
         <Text style={{fontSize:18, fontWeight:'bold'}}>Book</Text>
     </TouchableOpacity>

     {/* <TouchableOpacity 
     style={{width:'80%', height:52, backgroundColor:'#FFB668', borderRadius:10, display:'flex', justifyContent:'center', alignItems:'center'}}
     onPress={async () => {
      await getmsg();
    }}
     >
         <Text style={{fontSize:18, fontWeight:'bold'}}>GET</Text>
     </TouchableOpacity> */}
    
    </SafeAreaView>
  )
}

export default SeatBookingScreen




const styles = StyleSheet.create({
    mainView: {
      flex:0,
      justifyContent:'center',
      alignItems:'center',
      // marginTop:10
  },
    seatBookingText: {
        marginTop:10
    },
    seatStatus: {
        flexDirection:'row',
        backgroundColor:'gray',
        width:'70%',
        height:25,
        justifyContent:'center',
        alignItems:'center',
        borderRadius:5,
        marginBottom:20
    },
   row: {
        flexDirection:'row'
   },
    // seat: {
    //     backgroundColor:'#444451', height:25, width:25, margin:5, borderTopLeftRadius:10, borderTopRightRadius:10,
  //39
  imageThumbnail: {
    justifyContent: 'center',
    alignItems: 'center',
    height: 25,
    width:25,
   // backgroundColor:'red',
    margin:5
  },
  selected: {
    tintColor:'#FE8D01'
  },
  notSelected: {
    tintColor:'#444451'
  }
})
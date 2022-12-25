import React, { useState, useEffect } from 'react'
import { View, Text, SafeAreaView, StatusBar, TouchableOpacity, Image, TextInput, FlatList, Item, ScrollView } from 'react-native'
import Header from './Header'
import * as ImagePicker from 'expo-image-picker'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';

const Message = (props) => {
  const navigation = useNavigation() 
  const [message, setMessage] = useState([]);
  const [messageArray, setMessageArray] = useState([]);
  const [allMessage, setAllMessage] = useState([]);
  const [seats, setSeats] = useState([]);
  const [libName, setLibName] = useState('');
  console.log('props Message UserId :', props)
  console.log('props Message fromDate :', props.route.params.data.fromDate)
  console.log('props Message toDate :', props.route.params.data.toDate)
  console.log('props Message userSeats :', props.route.params.data.userSeats[0,1,2])

  useEffect(async() => {
    // Update the document title using the browser API
    setMessage(props.route.params.data.msg.request.content)   
    setSeats(props.route.params.data.userSeats)
    setLibName(props.route.params.data.libName)
    const token = await AsyncStorage.getItem('token')
    const id = await AsyncStorage.getItem('_id')
    const stringId = id.toString()
    console.log('logout user login token :', token)
    console.log('logout user login id :', stringId)
    // setLoginToken(token)
    // setUserId(id)
    // getUserDetails(id) 
    //     const token =  AsyncStorage.getItem('token')
    //     console.log('login token :', token)
    //     console.log('login screen :', props )
        // try {
        //     const response = fetch(
        //       `http://192.168.1.106:3000/${props.route.params.data.userIDForMessage}/message`
        //     );
        //     const json = response.json();
        //     console.log('json ', json.messages[0])
        //     setAllMessage(json.messages)
        //     return json;
        //   } catch (error) {
        //     console.error(error);
        //   }
        getMessages(id)
    
  },[]);




  const getMessages = async(id) => {
    
      const response = await fetch(
        `http://192.168.43.99:3000/${id}/message`
      );
      const jsondata = await response.json();
      // jsondata.map(function(item) {
      //   console.log('item ', item)
      // })


      console.log('Message Screen ', jsondata.messages)
      // console.log('messageArry ', messageArray)
      setAllMessage(jsondata.messages)
      return jsondata;
   
  }



  // const renderItem = ({ item }) => (
  //   // <Item title={item.title} />
  //   <View>
  //    <Text>{item.title}</Text>
  //   </View>
  // );


  // console.log(' comming message :', message)
  // console.log(' comming message :', seats[0],seats[1])
  // console.log(' comming all message :', allMessage.libraryName)
  // const seatList = () => {
  //   return seats.map((data) => {
  //     return (
  //       <View><Text>{data}</Text></View>
  //     )
  //   })
  // }
  return (
    <SafeAreaView style={{flex:1, }}>
       <StatusBar />
       <Header title="Message" navigation={navigation}/>
       <ScrollView>
       {/* <View style={{width: 400, padding: 10, height: 160}}>
       <View 

       style={{position: 'relative', marginLeft: 20, marginBottom: 10, padding: 10, backgroundColor: '#A8DDFD', width: 200, height: 160, textAlign: 'left', font: 400, 
   
    borderRadius: 10,

    }}
       >
          <Text>Message</Text>
          <Text>{props.route.params.data.msg.request.content.title} from {props.route.params.data.libName}</Text>
         
          <View style={{margin:5}}/>
          <Text>{props.route.params.data.msg.request.content.body},Your Library seat booking has been confirmed.</Text>
          <View style={{margin:5}}/>
          <Text>From Date :{props.route.params.data.fromDate}</Text>
          <Text>To Date :{props.route.params.data.toDate}</Text>
          <View style={{margin:5}}/>
          <Text>Your Seat :{seats[0]},{seats[1]},{seats[2]}</Text>
        
       </View>
       </View> */}
       {
        allMessage.map((item) => {
          return (
            <View>
              {/* <Text>{item.libraryName}</Text> */}
             
              <View style={{width: 600, padding: 10, height: 160}}>
       <View 
      //  style={{flex:0, justifyContent:'center', alignItems:'center', marginBottom:20}}
       style={{position: 'relative', marginLeft: 20, marginBottom: 10, padding: 10, backgroundColor: '#A8DDFD', width: 300, height: 160, textAlign: 'left', font: 400, 
    // border: 1px solid #97C6E3,
    borderRadius: 10,
    // borderTopLeftRadius:'10px', borderTopRightRadius:'10px', borderBottomLeftRadius:'10px',
    }}
       >
          <Text>Message</Text>
          <Text>{props.route.params.data.msg.request.content.title} from {item.libraryName}</Text>
          {/* <Text>Library Name :{props.route.params.data.libName}</Text> */}
          <View style={{margin:5}}/>
          <Text>{item.userName},Your Library seat booking has been confirmed.</Text>
          <View style={{margin:5}}/>
          <Text>From Date :{item.fromDate}</Text>
          <Text>To Date :{item.toDate}</Text>
          <View style={{margin:5}}/>
          <Text>Your Seat :{item.selectedSeats}</Text>
         {/* {seats.map((st) => {
            <Text>st{st}</Text>
          })} */}
       </View>
       </View>
      
            </View>
          )
        })
       }
       {/* <FlatList
        data={message}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      /> */}

        {/* <View>
            <View style={{justifyContent:'center', alignItems:'center', marginTop:200}}>
                <TouchableOpacity style={{width:'80%', backgroundColor:'orange', borderRadius:5, height:52, justifyContent:'center', alignItems:'center'}}>
                    <Text style={{fontSize:18, fontWeight:'bold'}}>Sign Out</Text>
                </TouchableOpacity>
            </View>
        </View> */}
         </ScrollView>
   </SafeAreaView >
  )
}

export default Message
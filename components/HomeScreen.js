import React, {useState, useEffect} from 'react';
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, SafeAreaView, StatusBar, FlatList, Dimensions } from 'react-native'
import { useNavigation } from '@react-navigation/native'
import AsyncStorage from '@react-native-async-storage/async-storage';
// const DATA = [
//   {
//     id: '1',
//     title: 'Gurukul Library',
//     img: require('../assets/gurukullib.png')
//   },
//   {
//     id: '2',
//     title: 'Second Item',
//     img: require('../assets/gurukullib.png')
//   },
//   {
//     id: '3',
//     title: 'Third Item',
//   },
//   {
//     id: '4',
//     title: 'Fourth Item',
//   },
//   {
//     id: '5',
//     title: 'Fifth Item',
//   },
//   {
//     id: '6',
//     title: 'Sixth Item',
//   },
// ];

// const numColumns =2

// const selectedLibrary = (title) =>{
//     console.log('selectedLibrary', title)
//     navigation.navigate('SeatBookingScreen')
// }

// const Item = ({ title, image }) => (
//   <TouchableOpacity style={{flex:1}} onPress={()=> selectedLibrary(title)}>
//   <View style={styles.item}>
//     <Text style={styles.title}>{title}</Text>
//     <Image style={{width:100, height:100, marginLeft:0}} source={image} />
//   </View>
//   </TouchableOpacity>
// );
const WIDTH = Dimensions.get('window').width
const HomeScreen = (props) => {
  const navigation = useNavigation()
  const [currentDate, setCurrentDate] = useState('');
  const [status,setStatus] = useState();
  const [userId,setUserId] = useState();
  const [userName,setUserName] = useState();
  const [photo,setPhoto] = useState();
  const [show,setShow] = useState(true);
  const [userDetails, setUserDetails] = useState([])
  const [DATA, setDATA] = useState([])

  console.log('HomeScreen :', props.userData.name)
  // console.log('HomeScreen Id:', props.route.params.data.userid)
  // console.log(props.route.params.data.userid)
  const numColumns =2
  useEffect(() => {
    
     (async function getResponse() {
      console.log('num1')
      const id = await AsyncStorage.getItem('_id')
      console.log('num3', id)
      // const id = await AsyncStorage.getItem('_id')
      var date = new Date().getDate(); //Current Date
      var month = new Date().getMonth() + 1; //Current Month
      var year = new Date().getFullYear(); //Current Year
      var hours = new Date().getHours(); //Current Hours
      var min = new Date().getMinutes(); //Current Minutes
      var sec = new Date().getSeconds(); //Current Seconds
      setCurrentDate(
      hours + ':' + min + ':' + sec
      );
      if (hours >= 0 && hours < 12) {
              setStatus("Good Morning!");
          } else if (hours == 12) {
              setStatus("Good Noon!");
          } else if (hours >= 12 && hours <= 17) {
              setStatus("Good Afternoon!");
          }
          else {
              setStatus("Good Evening!");
          }
  
          console.log('num2')
          const token = await AsyncStorage.getItem('token')
          // const id = await AsyncStorage.getItem('_id')
          const stringId = id.toString()
          const uName = await AsyncStorage.getItem('name')
          setUserId(id)
          setUserName(uName)
          getUserDetails(id)
          getLibraries()
      
          console.log('App of login token and id :', stringId)
          const response = await fetch(
            `http://192.168.43.99:3000/${id}/register`
          );
          const jsondata = await response.json();
          // jsondata.map(function(item) {
          //   console.log('item ', item)
          // })
    
    
          console.log('HomeSceen User Details. ', jsondata)
          // if(token){
          //   setIsLoggedIn(true)
          // }
          if(jsondata.profile == ""){
            setShow(false)
            console.log('profile')
            setPhoto(jsondata.profile)
          }
          else if(jsondata.profile){
            setShow(false)
            setPhoto(jsondata.profile)
          }  
          else{
            setShow(true)
          }
        })
        getResponse()
      // fetchData()
  },[]);

  const getResponse = async() => {
    console.log('num1')
    const id = await AsyncStorage.getItem('_id')
    console.log('num3', id)
    // const id = await AsyncStorage.getItem('_id')
    var date = new Date().getDate(); //Current Date
    var month = new Date().getMonth() + 1; //Current Month
    var year = new Date().getFullYear(); //Current Year
    var hours = new Date().getHours(); //Current Hours
    var min = new Date().getMinutes(); //Current Minutes
    var sec = new Date().getSeconds(); //Current Seconds
    setCurrentDate(
    hours + ':' + min + ':' + sec
    );
    if (hours >= 0 && hours < 12) {
            setStatus("Good Morning!");
        } else if (hours == 12) {
            setStatus("Good Noon!");
        } else if (hours >= 12 && hours <= 17) {
            setStatus("Good Afternoon!");
        }
        else {
            setStatus("Good Evening!");
        }

        console.log('num2')
        const token = await AsyncStorage.getItem('token')
        // const id = await AsyncStorage.getItem('_id')
        const stringId = id.toString()
        const uName = await AsyncStorage.getItem('name')
        setUserId(id)
        setUserName(uName)
        getUserDetails(id)
        getLibraries()
    
        console.log('App of login token and id :', stringId)
        const response = await fetch(
          `http://192.168.43.99:3000/${id}/register`
        );
        const jsondata = await response.json();
        // jsondata.map(function(item) {
        //   console.log('item ', item)
        // })
  
  
        console.log('HomeSceen User Details. ', jsondata)
        // if(token){
        //   setIsLoggedIn(true)
        // }
        if(jsondata.profile == ""){
          setShow(false)
          console.log('profile')
          setPhoto(jsondata.profile)
        }
        else if(jsondata.profile){
          setShow(false)
          setPhoto(jsondata.profile)
        }  
        else{
          setShow(true)
        }
      }
  
  
  

  const getLibraries = async() => {
    const response = await fetch('http://192.168.43.99:3000/getLibraries');
    const jsondata = await response.json()
    console.log('All Libraries : ', jsondata.result[0])
    setDATA(jsondata.result)
  }

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
      setUserName(jsondata.name)
    //   return jsondata;
  })
  }

  const selectedLibrary = (title,id,seats) =>{
    console.log('selectedLibrary', title)
    console.log('selectedID', id)
    console.log('SelectedSeats', seats)
    AsyncStorage.setItem('libraryName', title)
    AsyncStorage.setItem('libraryId', id)
    AsyncStorage.setItem('librarySeats', seats)
    navigation.navigate('SeatBookingScreen')
    // , props.userSelectedLibraryHandler({libtitle: title, userid:props.route.params.data.userid})
  }

  const Item = ({ title, image, id, seats }) => (
    <TouchableOpacity style={{flex:1}} onPress={()=> selectedLibrary(title,id, seats)}>
    <View style={styles.item}>
      <Text style={styles.title}>{title}</Text>
      <Image style={{width:100, height:100, marginLeft:0}} source={image} />
    </View>
    </TouchableOpacity>
  );

  const renderItem = ({ item }) => (
    <Item title={item.libraryName} image={item.img} id={item._id} seats={item.seats}/>
  );


  return (
    <SafeAreaView style={styles.mainView}>
      <StatusBar />
      <View style={styles.topView}>
      <View style={{position:'absolute', marginTop:10, marginLeft:280, width:60,height:60,borderRadius:30,backgroundColor:'#7EB2DF', justifyContent:'center', alignItems:'center'}}>
      {/* <Text>hello</Text> */}
      <TouchableOpacity onPress={() => navigation.navigate('UserProfile', props.userSelectedIdHandler({_id:userId}))}>
      {
        show ?
        <Image style={{width:40, height:40, marginLeft:0}} source={require('../assets/userprofile.png')} />
        :
        <View style={{width:40, height:40, marginBottom:0, bottom:0, left:0, borderRadius:50, borderWidth:1}}>
        <Image style={{width:40, height:40,borderRadius:50, marginBottom:0, right:1, bottom:1, borderWidth:1}} source={{uri:photo}} />
        </View>
      }
      </TouchableOpacity>
      </View> 
      <View style={{marginTop:150, flexDirection:'row'}}>
      
      <View style={{marginLeft:10}}> 
      <Text style={{fontSize:18, fontWeight:'bold', margin:10}}>{status}</Text>   
      <Text style={{fontSize:18, fontWeight:'bold', margin:10}}>{userName}</Text>  
      </View> 
      <Image style={{width:100, height:100, marginLeft:128}} source={require('../assets/bookrack.png')} />
      </View>  
      </View>  
      <View style={styles.bottomView}>
          {/* <View style={{width:140,height:140,backgroundColor:'#FFB668', bottom:320,position:'absolute',marginLeft:20, borderRadius:10}}>
          <TouchableOpacity onPress={() => navigation.navigate('SeatBookingScreen')}>
          <View style={{justifyContent:'center', alignItems:'center'}}> */}
          <View style={{bottom:40, margin:10}}>
          <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item._id}
        numColumns={2}
      />
      </View>
          {/* <Text style={{marginTop:10, fontSize:18}}>Gurukul Library</Text>  
          <Image style={{width:100, height:100, marginLeft:0}} source={require('../assets/gurukullib.png')} /> */}
          {/* </View>
          </TouchableOpacity>
          </View> */}
      {/* <Text style={styles.Heading}>Welcome Back</Text>
      <View style={styles.formView}>
      <TextInput placeholder='Email*' style={styles.textInput} />
      <TextInput placeholder='Password*' style={styles.textInput} />
      <TouchableOpacity style={styles.signinBotton} onPress={() => navigation.navigate('HomeScreen')}>
          <Text style={styles.signinText}>Sign In</Text>
      </TouchableOpacity>
      </View> */}
       {/* <FlatList
        data={DATA}
        renderItem={renderItem}
        keyExtractor={item => item.id}
      /> */}
      </View>   
    </SafeAreaView>
  )
}

export default HomeScreen












const styles = StyleSheet.create({
  mainView: {
      marginTop:0,
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
      backgroundColor:'#218ADB',
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
  },
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#7EB2DF',
    // padding: 20,
    // marginVertical: 8,
    // marginHorizontal: 16,
    alignItems:'center',
    justifyContent:'center',
    height:100,
    margin:1,
    height: WIDTH / 2,
    flex:1,
    borderRadius:10
  },
  title: {
    fontSize: 32,
  },
})
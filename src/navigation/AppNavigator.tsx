import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Image } from 'react-native';

// Import screens (we'll create these next)
import HomeScreen from '../screens/HomeScreen';
import SearchScreen from '../screens/SearchScreen';
import BookingsScreen from '../screens/BookingsScreen';
import ProfileScreen from '../screens/ProfileScreen';
import LoginScreen from '../screens/LoginScreen';
import CreateAccountScreen from '../screens/CreateAccountScreen';
import SeatBookingScreen from '../screens/SeatBookingScreen';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const MainTabs = () => (
  <Tab.Navigator
    screenOptions={({ route }) => ({
      tabBarIcon: ({ focused }) => {
        let iconSource;

        if (route.name === 'Home') {
          iconSource = focused
            ? require('../assets/home_filled.png')
            : require('../assets/home.png');
        } else if (route.name === 'Bookings') {
          iconSource = focused
            ? require('../assets/open-book.png')
            : require('../assets/book.png');
        } else if (route.name === 'Profile') {
          iconSource = require('../assets/Profile.png');
        }

        return (
          <Image
            source={iconSource}
            style={{ width: 24, height: 24, resizeMode: 'contain', tintColor: focused ? '#6366F1' : '#808080' }}
          />
        );
      },
      tabBarShowLabel: true,
      headerShown: false,
      tabBarActiveTintColor: '#6366F1', 
    })}
  >
    <Tab.Screen 
      name="Home" 
      component={HomeScreen}
      options={{ headerShown: false,}}
    />
    {/* <Tab.Screen 
      name="Search" 
      component={SearchScreen}
      options={{ headerShown: false }}
    /> */}
    <Tab.Screen 
      name="Bookings" 
      component={BookingsScreen}
      options={{ headerShown: false }}
    />
    <Tab.Screen 
      name="Profile" 
      component={ProfileScreen}
      options={{ headerShown: false }}
    />
  </Tab.Navigator>
);

const AppNavigator = () => {
  // TODO: Replace with real auth logic
  const isLoggedIn = true;

  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {!isLoggedIn ? (
          <>
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="CreateAccount" component={CreateAccountScreen} />
          </>
        ) : (
          <>
            <Stack.Screen name="MainTabs" component={MainTabs} />
            <Stack.Screen name="SeatBooking" component={SeatBookingScreen} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default AppNavigator; 
import 'react-native-gesture-handler';
import React, { useState, useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { 
  SignupScreen, 
  LoginScreen, 
  HomeScreen, 
  AddMoneyScreen, 
  SendMoneyScreen, 
  ViewStatementScreen, 
  AddAccountScreen, 
  HelpScreen } from './src/screens/screensLib';
import { firebase } from './src/firebase/config';

////////////////////////////////////////
// ignore yellow error 'setting a timer'
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);
// ignore child element key prop
LogBox.ignoreLogs(['Warning']);
/////////////////////////////////////////

const Stack = createStackNavigator();


export default function App() {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);


  // if the device has ready-access to firebase because of previous successful login
  // set the user to firebase uid, this will help to load the app directly the home & other action pages 
  useEffect(() => {
    const usersRef = firebase.firestore().collection('users');
    firebase.auth().onAuthStateChanged(user => {
      if (user) {
        usersRef.doc(user.uid)
          .get()
          .then(doc => {
            const userData = doc.data()
            setUser(userData);
          })
          .catch(() => {
            setLoading(false)
          });
      } else {
        setLoading(false)
      }
    });
  }, []);



  // if the user is logged in, display home screen with other action screens
  // if the user is not logged in, display login screen with signup page navigation
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerStyle: { backgroundColor: 'orange' }, headerTitleStyle: { color: 'black' }, cardStyle: { backgroundColor: 'white' } }}>
        {user ? (
          <>
            <Stack.Screen name="Home" component={HomeScreen} options={{ title: "Cash File", headerTitleAlign:"center" }} />
            <Stack.Screen name="AddMoney" component={AddMoneyScreen} options={{ title: "Add money", headerTitleAlign:"center", headerTitleStyle:{color:'white'}, headerStyle:{backgroundColor:'#28B463'} }} />
            <Stack.Screen name="SendMoney" component={SendMoneyScreen} options={{ title: "Send money", headerTitleAlign:"center", headerTitleStyle:{color:'white'}, headerStyle:{backgroundColor:'#F5311C'} }} />
            <Stack.Screen name="ViewStatement" component={ViewStatementScreen} options={{ title: "View Statement", headerTitleAlign:"center", headerTitleStyle:{color:'white'}, headerStyle:{backgroundColor:'dodgerblue'} }}/>
            <Stack.Screen name="Account" component={AddAccountScreen} options={{ title: "Add Accounts", headerTitleAlign:"center" }} />
            <Stack.Screen name="Help" component={HelpScreen} options={{ title: "Privacy Policy + Helpline", headerTitleAlign:"center" }}/>
          </>

        ) : (
          <>
            <Stack.Screen name="Login" component={LoginScreen} options={{ title: "Login" }} />
            <Stack.Screen name="Signup" component={SignupScreen} options={{ title: "Sign up" }} />
          </>
        )}
      </Stack.Navigator>
    </NavigationContainer>
  );
}

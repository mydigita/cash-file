# React Native (Expo) and Firebase App
A simple cash management android app built with expo and firebase


## Firebase configuration
1. Add firebase `npm install firebase` or `yarn add firebase`
2. Create a `src` folder in the root directory 
3. Create a `firebase` folder inside the `src` folder
4. Create a `config.js` file in the `firebase` folder
5. Add the following codes to the `config.js` file

```javascript
import * as firebase from 'firebase';
import '@firebase/auth';
import '@firebase/firestore';

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
  };


firebase.initializeApp(firebaseConfig);

export { firebase };

```
* Rremember, we need to replace the `firebaseConfig={}` data. To get the valid data please follow the below steps now

## Register an app with firebase and configure
1. Signin on the  Firebase Console [https://console.firebase.google.com](https://console.firebase.google.com)
2. Create a new project (you also can use your exising project) - click on `+ Add Project`
3. After creating it, the Project Overview screen, click on `</>` `web`  to register an app
4. Give a name to your app, click on `Register app` and complete it
5. Setup `Authentication` from the firebase menubar and for this time select `email and password` option
6. Now you will get the `firebaseConfig` data in the app console, there are two options, `CDN` and `Config`, select config and copy the full code like 

```javascript
const firebaseConfig = {
  apiKey: "AIzaSyDcCMBuqjQN_your_project_api_key_here",
  authDomain: "your_app_name.firebaseapp.com",
  databaseURL: "https://your_app_database_url_here.firebaseio.com",
  projectId: "your_project_id_here",
  storageBucket: "your_app_storage_bucket_here.appspot.com",
  messagingSenderId: "your_app_message_sender_id_here",
  appId: "your_app_id_here",
  measurementId: "your_app_measurement_id_here"
};

```
7. Then paste/replace the code to the `config.js` for the `const firebaseConfig={}`

## Create Screen components
Create required Screens


## Signup screen

```javascript
import React, { useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { firebase } from '../firebase/config';
import { NativeBaseProvider, VStack, Heading, Box, Text, Input, Button } from 'native-base';

export default function SignupScreen({ navigation }) {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [mobile, setMobile] = useState("");
  const [password, setPassword] = useState("");
  const [errorList, setErrorList] = useState([]);
  const validFirstName = /../.test(firstName);  // minimum 2 chars
  const validLastName = /../.test(lastName); // minimum 2 chars
  const validEmail = /.....@gmail.com/.test(email); // only gmail accepted
  const validMobile = /01[3-9]......../.test(mobile); // valid only for mobile operators in Bangladesh
  const validPassword = () => {
    // minimum 8 digit password with uppercase, lowercase and numbers pattern
    if ((/......../).test(password)
      && (/[A-Z]/).test(password)
      && (/[a-z]/).test(password)
      && (/[0-9]/).test(password)) {
      return true;
    } else {
      return false;
    }
  }

  // Check if all data is valid
  const isDataValid = () => {
    if (validFirstName && validLastName && validEmail && validMobile && validPassword()) {
      return true;
    } else {
      return false
    }
  }

  // On change input event handlers 
  function onChangeFirstName(e) {
    setFirstName(e.replace(/[^A-Za-z]/g, ''));
  }
  function onChangeLastName(e) {
    setLastName(e.replace(/[^A-Za-z]/g, ''));
  }
  function onChangeEmail(e) {
    setEmail(e)
  }
  function onChangeMobile(e) {
    setMobile(e.replace(/[^0-9]/g, ''));
  }
  function onChangePassword(e) {
    setPassword(e);
  }

  // check invalid input data and make a list of them
  function inputDataCheckPoint() {

    let invalidData = [];
    if (!validFirstName) {
      invalidData.push("Invalid first name")
    }
    if (!validLastName) {
      invalidData.push("Invalid last name")
    }
    if (!validEmail) {
      invalidData.push("Invalid gmail address")
    }

    if (!validMobile) {
      invalidData.push("Invalid mobile number")
    }
    if (!validPassword()) {
      invalidData.push("Use password longer than 8, combining capital and small letters and numbers")
    }
    setErrorList(invalidData);
  }

  // Show list of invaid input data if any
  function showInvalidDataList() {
    return (errorList.map((e, i) => {
      return (<Text key={i} style={{ color: "red" }}>{i + 1}. {e}.{"\n"}</Text>)
    }))
  }

  // Send data to firebase if all information is given
  // if not, send error alert and a list of invalid input

  function onPressSignup() {

    //check and send input error if any
    inputDataCheckPoint();

    // send data to firebase if everything is ok
    if (isDataValid()) {
      firebase.auth()
        .createUserWithEmailAndPassword(email, password)
        .then(response => {
          const uid = response.user.uid;
          const data = { _id: uid, firstName, lastName, email, mobile, accountList: [] };
         // console.log(data);

          const usersRef = firebase.firestore().collection('users');
          usersRef.doc(uid)
            .set(data)
            .then((e) => {
              alert("success");
              navigation.navigate("Home")
            })
            .catch(() => alert("System Error! Please try again later."))
        })
        .catch(() => alert("Could not connect to server! Please try again later"))
    } else {
      alert("Please provide correct information!")
    }
  }

  return (
    <NativeBaseProvider>

      <VStack p={5} space={3}>
        <Text mb={15}>{errorList.length ? showInvalidDataList() : <Heading size='md'>Signup to continue</Heading>}</Text>

        <Input placeholder='First name' value={firstName} onChangeText={onChangeFirstName} size='lg' />
        <Input placeholder='Last name' value={lastName} onChangeText={onChangeLastName} size='lg' />
        <Input placeholder='Gmail address' onChangeText={onChangeEmail} maxLength={35} size='lg' />
        <Input placeholder='Mobile number' value={mobile} keyboardType="number-pad" maxLength={11} onChangeText={onChangeMobile} size='lg' />
        <Input placeholder='Password' onChangeText={onChangePassword} secureTextEntry={true} size='lg' />
        <Button onPress={onPressSignup} _text={{ fontSize: 20 }} size='lg' colorScheme={'yellow'}>Signup</Button>

        <Box mt={5}>
          <TouchableOpacity onPress={() => navigation.navigate("Login")}>
            <Text>
              Have an account? <Text bold fontSize={16} color={'orange.700'}>Login here</Text>
            </Text>
          </TouchableOpacity>
        </Box>

      </VStack>

    </NativeBaseProvider>
  )
}
```

## Login screen

```javascript

import React, { useState } from 'react';
import { NativeBaseProvider, VStack, Icon, Heading, Box, Text, Input, Button } from 'native-base';
import { TouchableOpacity } from 'react-native';
import { firebase } from '../firebase/config';
import { MaterialIcons } from "@expo/vector-icons"

// ignore yellow error for setting a timer...
import { LogBox } from 'react-native';
LogBox.ignoreLogs(['Setting a timer']);


// app login
export default function LoginScreen({ navigation }) {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    function onChangeEmail(e) {
        setEmail(e)
    }

    function onChangePassword(e) {
        setPassword(e)
    }

    function onPressLogin() {
        firebase.auth()
            .signInWithEmailAndPassword(email, password)
            .then(response => {
                const uid = response.user.uid;
                const usersRef = firebase.firestore().collection("users");
                usersRef.doc(uid)
                    .get()
                    .then(firebaseData => {
                        if (!firebaseData.exists) {
                            alert("No record found! Try with another email");
                            return;
                        }
                        const user = firebaseData.data();
                        //navigate to Home page and send user data
                        navigation.navigate("Home", { user });
                    })
                    .catch(err => alert(err))
            })
            .catch(err => alert(err))

    }

    return (
        <NativeBaseProvider>
            <VStack p={5} flex={1} space={4}>
                <Heading size={'md'} mb={15}>Login to continue</Heading>

                <Input placeholder='Gmail address' onChangeText={onChangeEmail} value={email} maxLength={35} size={'lg'}
                    InputLeftElement={
                        <Icon
                            as={<MaterialIcons name="email" />}
                            size={7}
                            ml="2"
                            color="yellow.500"
                        />
                    } />
                <Input placeholder='Password / max 24' onChangeText={onChangePassword} value={password} secureTextEntry={true} maxLength={24} size={'lg'}
                    InputLeftElement={
                        <Icon
                            as={<MaterialIcons name="lock" />}
                            size={7}
                            ml="2"
                            color="yellow.500"
                        />
                    } />
                <Button onPress={onPressLogin} size={'lg'} colorScheme={'yellow'} mt={8} _text={{fontSize:20}}>Login</Button>

                <Box mt={5}>                    
                        <TouchableOpacity onPress={() => navigation.navigate("Signup")}>

                            <Text>
                                Not registered? <Text bold color={'orange.700'} fontSize={16}>Signup</Text>
                            </Text>

                        </TouchableOpacity>                    
                </Box>
            </VStack>
        </NativeBaseProvider>
    )
}

```



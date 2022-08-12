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
  // on successful signup/login, users will see homeScreen based on code on app.js

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
        <Box>
        <Text>Please use valid information and REMEMBER it. Otherwise you will have no options to recover your data.
              You also can access your data from other mobiles using registered email and password.
            </Text>
        </Box>
      </VStack>

    </NativeBaseProvider>
  )
}
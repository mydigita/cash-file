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

    
     // on successful login, users will see homeScreen based on code on app.js
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

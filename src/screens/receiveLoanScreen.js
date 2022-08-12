import React from 'react';
import { Text, Input, Button } from 'react-native-elements';
import { TouchableOpacity } from 'react-native';
import { Col, Row, Grid } from 'react-native-easy-grid';
import { firebase } from '../firebase/config';



export default function ReceiveLoanScreen(){
    const uid = firebase.auth().currentUser.uid;



    return(
        <>
        </>
    )
}
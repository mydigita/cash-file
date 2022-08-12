import React, { useState, useEffect } from 'react';
import { firebase } from '../firebase/config';
import { NativeBaseProvider, VStack, Box, Heading, Text, Button, Input, ScrollView } from 'native-base';


export default function AddAccountScreen(props) {
  const uid = firebase.auth().currentUser.uid;

  const [mobileAccount, setMobileAccount] = useState("");
  const [accountType, setAccountType] = useState("");
  const [accountList, setAccountList] = useState([]);
  const accountRef = firebase.firestore().collection('users').doc(uid).collection(`${mobileAccount}-${accountType}`);
  const currentUserProfile = firebase.firestore().collection('users').doc(uid);
  const validMobile = /01[3-9]......../.test(mobileAccount); // valid only for mobile operators in Bangladesh
  const [filteredAccountList, setFilteredAccountList] = useState([]);
  const [filterKey, setFilterKey] = useState("");

  
  function onChangeMobileAccount(e) {
    // allow only numbers
    setMobileAccount(e.replace(/[^0-9]/g, ''))
  }

  function onChangeAccountType(e) {
    // allow only alphabets
    setAccountType(e.replace(/[^A-Za-z]/g, ''))
  }


  // display existing account list one time
  useEffect(() => {
    currentUserProfile.get()
      .then((doc) => {
        const accounts = doc.data().accountList;
        setAccountList([...accounts]);
      })
      .catch((err) => { alert(`Sorry! System failed! Pls try again later.`) })
  }, []); // run useEffect only once to prevent memory leak error // I don't know how it leaks memory and this prevents from // but it works

  async function onPressAddAccount(e) {
    e.preventDefault();
    const accountData = {
      uid,
      myAccount: `${mobileAccount}-${accountType}`,
      customerAccount: "",
      cashIn: 0,
      cashOut: 0,
      refId: "",
      balance: 0,
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };


    // check if the collection already exist
    const snapshot = await accountRef.get();
    if (accountType.length < 3) {
      alert("Please enter an account name")

    } else if (!validMobile) {
      alert("Please enter a valid mobile number")
    } else if (snapshot.size > 0) {
      alert("Account already exist")
    } else {
      accountRef.add(accountData)
        .then(doc => {
          // add doc id to the document as a field
          accountRef.doc(doc.id).set({ refId: doc.id }, { merge: true });

          // add every mobileAccount name created by the current user 
          // in the accountList array field in the main user profile-document
          currentUserProfile.set({ accountList: firebase.firestore.FieldValue.arrayUnion(`${mobileAccount}-${accountType}`) }, { merge: true });

          alert(`Congratulations! ${mobileAccount}-${accountType} account registered successfully.`);
          setMobileAccount("");
          setAccountType("");

          //////////////////////////////////////////
          // this code run manually again to prevent memory leak error in useEffect for dependancy array
          // showing update account list on submit info but without from useEffect
          currentUserProfile.get()
            .then((doc) => {
              const accounts = doc.data().accountList;
              setAccountList([...accounts]);
            })
            .catch((err) => { alert(`Sorry! System failed! Pls try again later.`) })
          //////////////////////////////////////////


        })
        .catch((err) => { alert(`Sorry! Operation failed. Pls try again later.`) })
    }

  }

    // filter the account to help find an existing account
    function filterAccount(elem) {
      setFilterKey(elem);
      if(filterKey.length>5){
      const x = [...accountList].filter((e) => e.toLowerCase().includes(filterKey.toLowerCase()));
      setFilteredAccountList(x);
    } else{
      setFilteredAccountList([])
    }
      setMobileAccount(elem);
    }

  
  return (
    <NativeBaseProvider>

      <VStack p={5} space={3}>
        <Heading size={'md'} mb={5}>Add / create an account</Heading>
        <Box>
          <Text>Account Name</Text>
          <Input size={'lg'} placeholder="Name / company name" keyboardType={'default'} maxLength={13} value={accountType} onChangeText={onChangeAccountType} />
        </Box>
        <Box>
          <Text>Account Number</Text>
          <Input size={'lg'} keyboardType={'numeric'} placeholder="Mobile number" value={mobileAccount} onChangeText={filterAccount} maxLength={11} />
        </Box>
        <Button size={'lg'} onPress={onPressAddAccount} _text={{ fontSize: 18 }} mt={'5'} colorScheme={'yellow'}>{`Add ${mobileAccount}-${accountType}`}</Button>
        <Heading size={'sm'} my={2}>{filteredAccountList.length?"Found in your account list:":""}</Heading>
        {/* <ScrollView>
          {accountList.map((e, i) => (<Box key={i} pb={'2'}>{`${i + 1}. ${e}`}</Box>))}
          <Box h={'400'} w={'100'}></Box>
        </ScrollView> */}
        <ScrollView>
          {filteredAccountList.map((e, i) => (<Box key={i} pb={'3'}>{`${i + 1}. ${e}`}</Box>))}
          <Box h={'400'} w={'100'}></Box>
        </ScrollView>

      </VStack>

    </NativeBaseProvider>
  )
}
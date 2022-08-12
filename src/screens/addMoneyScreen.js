import React, { useEffect, useState } from 'react';
import { TouchableOpacity } from 'react-native';
import { NativeBaseProvider, VStack, Box, Heading, Text, Button, Input, ScrollView, Divider } from 'native-base';
import { firebase } from '../firebase/config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default function AddMoneyScreen() {
  const uid = firebase.auth().currentUser.uid;

  const [myAccount, setMyAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [customerAccount, setCustomerAccount] = useState("");
  const [accountList, setAccountList] = useState([]);
  const [balance, setBalance] = useState("");
  const [filteredAccountList, setFilteredAccountList] = useState([]);
  const [filterKey, setFilterKey] = useState("");

  const currentUserProfile = firebase.firestore().collection("users").doc(uid);
  const validCustomerAccount = /01[3-9]......../.test(customerAccount); // valid only for mobile operators in Bangladesh

  function onChangeAmount(e) {
    setAmount(e.replace(/[^0-9]/g, ''))
  }

  // filter the account to help find an existing account
  function filterAccount(elem) {
    setFilterKey(elem);
    const x = [...accountList].filter((e) => e.toLowerCase().includes(filterKey.toLowerCase()));
    setFilteredAccountList(x);
  }


  function onChangeCustomerAccount(e) {
    if (e.length > 11) {
      // allow only 11 digit mobile number
      e = e.slice(0, 11)
    }
    setCustomerAccount(e.replace(/[^0-9]/g, ''))
  }

  function currentAccountBalance(e) {
    currentUserProfile.collection(myAccount).orderBy("createdAt", "desc").limit(1).get()
      .then((snapshot) => snapshot.forEach((doc) => { setBalance(doc.data().balance) }))
      .catch((err) => console.log(err))

  }
  if (myAccount) {
    currentAccountBalance();
  }


  function onPressAddMoney(e) {
    e.preventDefault();
    const accountData = {
      uid,
      myAccount,
      customerAccount,
      cashIn: parseInt(amount),
      cashOut: 0,
      refId: "",
      balance: (balance + parseInt(amount)),
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    if (myAccount && amount && customerAccount && validCustomerAccount) {
      currentUserProfile.collection(myAccount).add(accountData)
        .then((doc) => {
          currentUserProfile.collection(myAccount).doc(doc.id).set({ refId: doc.id }, { merge: true });
          alert(`Tk ${amount} added to ${myAccount} from ${customerAccount}.`);
          setAmount("");
          setMyAccount("");
          setCustomerAccount("");
          setFilterKey("");
          currentAccountBalance()

        })
        .catch((e) => { alert(`Sorry! Operation failed! Pls try again later.`) })
    } else {
      if (!amount) {
        alert("Please enter Amount")
      } else if (!customerAccount) {
        alert("Please enter Customer Account")
      } else if (!validCustomerAccount) {
        alert("Please enter a valid customer mobile")
      }
      else {
        alert("Please select Your Account")
      }
    }
  }

  // display existing account list
  useEffect(() => {
    currentUserProfile.get()
      .then((doc) => {
        const accounts = doc.data().accountList;
        setAccountList([...accounts]);
      })
      .catch((err) => err);
  }, []);



  return (
    <NativeBaseProvider>
      <KeyboardAwareScrollView>
      <VStack p={'5'} space={'2'}>
        <Heading size={'md'}>Add/ Receive money</Heading>
        <Divider />
        <Box>
          <Text>Amount:</Text>
          <Input size={'lg'} placeholder="Amount" keyboardType="numeric" maxLength={8} value={amount} onChangeText={onChangeAmount} />
        </Box>
        <Box>
          <Text >From (customer mobile):</Text>
          <Input size={'lg'} placeholder="Customer mobile" keyboardType="numeric" value={customerAccount} maxLength={11} onChangeText={onChangeCustomerAccount} />
        </Box>
        <Box>
          <Text>To (main account) : {myAccount ? myAccount : "No Account Selected"} </Text>
          <Box>
          <Input size={'lg'} maxLength={20} placeholder="Type, search and select" value={filterKey} onChangeText={filterAccount} />
        </Box>
        <ScrollView>
          {filteredAccountList.map((e, i) => (<TouchableOpacity onPress={() => {setMyAccount(e); setFilteredAccountList([]), setFilterKey(e)}}><Box key={i} p={'2'}>{`${i + 1}. ${e}`}</Box></TouchableOpacity>))}
         
        </ScrollView>
        </Box>
        <Button size={'lg'} _text={{ fontSize: 18 }} mt={'5'} colorScheme={'green'} onPress={onPressAddMoney}>{`Add ${amount > 0 ? amount : 0} Taka`}</Button>
        
      </VStack>
      </KeyboardAwareScrollView>
    </NativeBaseProvider>
  )
}

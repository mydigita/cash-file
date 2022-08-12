import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { NativeBaseProvider, VStack, Box, ScrollView, Heading, Divider, Text, Button, Input } from 'native-base';
import { firebase } from '../firebase/config';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default function SendMoneyScreen() {
  const uid = firebase.auth().currentUser.uid;

  const [customerAccount, setCustomerAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [myAccount, setMyAccount] = useState("");
  const [accountList, setAccountList] = useState([]);
  const [balance, setBalance] = useState("");
  const [filteredAccountList, setFilteredAccountList] = useState([]);
  const [filterKey, setFilterKey] = useState("");
  const validCustomerAccount = /01[3-9]......../.test(customerAccount); // valid only for mobile operators in Bangladesh

  const currentUserProfile = firebase.firestore().collection("users").doc(uid);

  function onChangeAmount(e) {
    setAmount(e.replace(/[^0-9]/g, ''))
  }

  function onChangeCustomerAccount(e) {
    if (e.length > 11) {
      // allow maximum number 11 digit
      e = e.slice(0, 11)
    }
    setCustomerAccount(e.replace(/[^0-9]/g, ''))
  }



  // filter the account to help find an existing account
  function filterAccount(elem) {
    setFilterKey(elem);
    const x = [...accountList].filter((e) => e.toLowerCase().includes(filterKey.toLowerCase()));
    setFilteredAccountList(x);
  }

  // get current account balance of the selected account for calculation

  function currentAccountBalance(e) {
    currentUserProfile.collection(myAccount).orderBy("createdAt", "desc").limit(1).get()
      .then((snapshot) => snapshot.forEach((doc) => { setBalance(doc.data().balance) }))
      .catch((err) => console.log(err))

  }
  // call currentAccountBalance only if set myAccount to avoid fatal error
  if (myAccount) {
    currentAccountBalance();
  }


  // submit actions
  function onPressSendMoney(e) {
    e.preventDefault();
    const accountData = {
      uid,
      myAccount,
      customerAccount,
      cashIn: 0,
      cashOut: parseInt(amount),
      balance: (balance - parseInt(amount)),
      refId: "",
      createdAt: firebase.firestore.FieldValue.serverTimestamp()
    };

    if (myAccount && amount && customerAccount && validCustomerAccount) {
      currentUserProfile.collection(myAccount).add(accountData)
        .then((doc) => {
          currentUserProfile.collection(myAccount).doc(doc.id).set({ refId: doc.id }, { merge: true });
          alert(`Tk ${amount} sent to ${customerAccount} from ${myAccount}.`);
          setAmount("");
          setMyAccount("");
          setCustomerAccount("");
          setFilterKey("");
          setBalance("");

        })
        .catch((e) => { alert(`Sorry! Operation failed! Pls try again later.`) })
    } else {
      if (!amount) {
        alert("Please enter Amount")
      } else if (!customerAccount) {
        alert("Please enter Customer Account")
      } else if (!validCustomerAccount) {
        alert("Please enter valid customer mobile")
      }
      else {
        alert("Please select Your Account")
      }
    }

  }

  // get existing account list from database and set project account list
  useEffect(() => {
    currentUserProfile.get()
      .then((doc) => {
        const accounts = doc.data().accountList;
        setAccountList([...accounts]);
      })
      .catch((err) => err)
  }, []);

  return (
    <NativeBaseProvider>
      <KeyboardAwareScrollView>
        <VStack p="5" space="3">
          <Heading size="md">Send / Lend money</Heading>
          <Divider />
          <Box>
            <Text>Amount:</Text>
            <Input size="lg" placeholder="Amount" keyboardType="numeric" value={amount} maxLength={8} onChangeText={onChangeAmount} />
          </Box>
          <Box>
            <Text>Customer mobile:</Text>
            <Input size="lg" placeholder="Customer mobile/ to" keyboardType="numeric" value={customerAccount} maxLength={11} onChangeText={onChangeCustomerAccount} />
          </Box>
          <Box>
          <Text>From (Main Account) : {myAccount ? myAccount : "No Account Selected"} </Text>            
          </Box>
          <Box>
            
            <Input size="lg" placeholder="Type, search and select" maxLength={20} value={filterKey} onChangeText={filterAccount} />
          </Box>
          <ScrollView>
            {filteredAccountList.map((e, i) => (<TouchableOpacity onPress={() => {setMyAccount(e), setFilteredAccountList([]), setFilterKey(e)}}><Box key={i} p={'2'}>{`${i + 1}. ${e}`}</Box></TouchableOpacity>))}
           
          </ScrollView>
          <Button size="lg" _text={{ fontSize: 18 }} colorScheme="red" onPress={onPressSendMoney}>{`Send ${amount ? amount : 0} Taka`}</Button>
        </VStack>
      </KeyboardAwareScrollView>
    </NativeBaseProvider>
  )
}

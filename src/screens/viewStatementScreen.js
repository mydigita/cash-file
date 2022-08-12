import React, { useState, useEffect } from 'react';
import { TouchableOpacity } from 'react-native';
import { firebase } from '../firebase/config';
import { Table, Row, TableWrapper } from 'react-native-table-component';
import { NativeBaseProvider, VStack, HStack, Box, ScrollView, Heading, Divider, Button, ChevronLeftIcon, ChevronRightIcon, } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


////////////////////////////////////////
// ignore yellow error 'Warning Each Child '
import { LogBox } from 'react-native';

LogBox.ignoreLogs(['Warning: ...']);
LogBox.ignoreAllLogs();//Ignore all log notifications
///////////////////////////////////////



export default function ViewStatementScreen() {
    const uid = firebase.auth().currentUser.uid;
    const [accountData, setAccountData] = useState([]);
    const [accountList, setAccountList] = useState([]);
    const [statementFor, setStatementFor] = useState("");
    const thirtyDays= 30*24*60*60*1000;
    const [openingDate, setOpeningDate] = useState(new Date() - thirtyDays);
    const [closingDate, setClosingDate] = useState(new Date() - (0 * 24 * 60 * 60 * 1000));

    const tableHead = ["Date", "Client", "Received", "Sent", "Balance"];
    const currentUserProfile = firebase.firestore().collection("users").doc(uid);

    // display existing account list
    useEffect(() => {

        currentUserProfile.get()
            .then((doc) => {
                const accounts = doc.data().accountList;
                setAccountList([...accounts]);
            })
            .catch((err) => { alert("Error loading account list!") })
    }, []);



    function onPressCloserOpeningDays() {
        if (openingDate <(closingDate-thirtyDays)) {
           setOpeningDate(openingDate + thirtyDays)
        }
    }
    function onPressPastOpeningDays() {
        if (openingDate <(closingDate+thirtyDays)) {
            setOpeningDate(openingDate -thirtyDays)
        }
    }
    
    function onPressRecentClosingDays(){
        if(closingDate+thirtyDays<new Date()){
            setClosingDate(closingDate+thirtyDays)

        }
    }

    function onPressPastClosingDays(){
        if(closingDate-thirtyDays>openingDate){
            setClosingDate(closingDate-thirtyDays)
        }
    }



    // Generate statement

    function generateStatement(e) {
        setStatementFor(e);
        currentUserProfile.collection(e).orderBy("createdAt", "desc").get()
            .then((snapshot) => {
                let contents = [];
                snapshot.forEach((doc) => {
                    let data = doc.data();

                    // retrieve account data and update accountData state.
                    // we will view data from the accountData

                    if (data.cashIn > 0) {
                        contents.push({
                            Date: data.createdAt.toDate().toLocaleDateString(),
                            CashIn: data.cashIn,
                            Client: data.customerAccount,
                            Balance: data.balance
                        })
                    }
                    if (data.cashOut > 0) {
                        contents.push({
                            Date: data.createdAt.toDate().toLocaleDateString(),
                            CashOut: data.cashOut,
                            Client: data.customerAccount,
                            Balance: data.balance
                        })
                    }
                })
                setAccountData(contents);

            })
            .catch((err) => err)
    }

    return (

        <NativeBaseProvider>
            <KeyboardAwareScrollView>
                <VStack>

                    {accountData.length ? (
                        <>
                            <Heading size={'sm'} p='3'>* Statement for {statementFor} *</Heading>
                            <HStack flex={'1'} justifyContent={'space-between'} pl={'2'} pr={'2'} >
                                <Box>
                                    <HStack flex={'1'}>
                                        <Button onPress={onPressPastOpeningDays}><ChevronLeftIcon size='4' color="white"/></Button>
                                        <Button>{new Date(openingDate).toISOString().slice(0, 10)}</Button>
                                        <Button onPress={onPressCloserOpeningDays} ><ChevronRightIcon size='4' color="white"/></Button>
                                    </HStack>
                                </Box>
                                <Box alignItems={'center'} alignSelf={'center'}>TO</Box>
                                <Box>
                                    <HStack flex={'1'}>
                                        <Button onPress={onPressPastClosingDays} ><ChevronLeftIcon size='4' color="white"/></Button>
                                        <Button>{new Date(closingDate).toISOString().slice(0, 10)}</Button>
                                        <Button onPress={onPressRecentClosingDays} ><ChevronRightIcon size='4' color="white"/></Button>
                                    </HStack>
                                </Box>
                            </HStack>

                            <Table style={{ padding: 5 }} borderStyle={{ borderWidth: 1, borderColor: 'silver' }}>
                                <Row data={tableHead} flexArr={[1, 1.5, 1, 1, 1]} style={{ height: 35, backgroundColor: 'pink' }} textStyle={{ textAlign: 'center', fontWeight: 'bold' }} />
                                <TableWrapper style={{ flex: 1 }}>
                                    {accountData.map((e, i) => {
                                        const trxdata = [];
                                        // trxdata -- transaction data
                                        if (new Date(e.Date) >= openingDate && new Date(e.Date) <= closingDate) {
                                            trxdata.push(e.Date)
                                            trxdata.push(e.Client)
                                            trxdata.push(e.CashIn)
                                            trxdata.push(e.CashOut)
                                            trxdata.push(e.Balance)
                                        }

                                        return (
                                            <Row data={trxdata} flexArr={[1, 1.5, 1, 1, 1]} style={[{ height: 25 }, i % 2 && { backgroundColor: '#EBF5FB' }]} textStyle={{ textAlign: 'right' }} />
                                        )

                                    })}
                                </TableWrapper>
                            </Table>
                        </>) : (
                        <>
                            <Heading size="sm" p='3'>Select an account</Heading>
                            <Divider />
                            <ScrollView>
                                {accountList.map((e, i) => (<TouchableOpacity onPress={() => { return generateStatement(e) }}><Box key={i} p={2}>{`${i + 1}. ${e}`}</Box></TouchableOpacity>))}
                            </ScrollView>
                        </>)}
                </VStack>
            </KeyboardAwareScrollView>
        </NativeBaseProvider>

    )
}

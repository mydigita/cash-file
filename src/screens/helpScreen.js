import React from 'react';
import { NativeBaseProvider, VStack, Box, Heading, Text, Button, Input, ScrollView, Divider } from 'native-base';
import { KeyboardAwareScrollView } from 'react-native-keyboard-aware-scroll-view';


export default function HelpScreen() {
    return (
        <NativeBaseProvider>
            <KeyboardAwareScrollView>
                <VStack p='5'>

                    <Box pt='3' pb='3'>
                        <Heading size='sm'>Warning and Privacy Policy:</Heading>
                        <Text>
                            This app only keeps the submitted records by the user
                            and it will not be a legal document for any case.
                            The app owners will not be liable for any data loss in any ways.
                            This app stores data in Google's Firebase/Firestore by free of charge.
                            So, all terms and conditions by Google will be applicable for storing data in Firebase/Firestore
                            and using data from this source. If you start using this app, this privacy policy will be
                            applicable for you automatically without any further notice.

                        </Text>
                        <Heading size='sm'>গোপনীয়তা নীতি ও সতর্কতা</Heading>
                        <Text>এই এ্য্যপ শুধুমাত্র ব্যবহারকারীর দাখিলকৃত তথ্য ধারন করে।
                            এটি কোনভাবেই কোন আইনগত বা বিচারিক বিষয়ের পক্ষে বা বিপক্ষের প্রমানপত্র হিসাবে বিবেচিত হবেনা।
                            যেহেতু এই এ্যাপ Google এর নিজস্ব প্লাটফর্ম এ বিনামূল্যে প্রকাশিত ও সংরক্ষিত সেহেতু এই এ্যাপ ব্যবহারের 
                            ক্ষেত্রে তথ্য সংরক্ষন ও তার ব্যবহার বিষয়ক Google এর সকল প্রাইভেসি পলিসি ব্যবহারকারীর জন্য আবশ্যিকভাবে প্রযোজ্য হবে। 
                            
                        </Text>
                    </Box>
                    <Divider />
                    <Heading size='sm'>Helpline</Heading>
                    <Divider />
                    <Box pt='3' pb='3'>
                        <Text>
                            You can keep your Personal or Business financial records here. Specially designed for
                            Mobile banking transaction records for agents or shop owners.
                        </Text>
                        <Heading size='sm'>এ্য্যপ এর ব্যবহার</Heading>
                        <Text>
                            এই এ্যাপের মাধ্যমে আপনার ব্যক্তিগত ও ব্যবসায়িক লেনদেনের তথ্য সংরক্ষণ করতে পারেন। 
                            তবে এটি মোবাইল ব্যাংক এজেন্ট ও দোকানের লেনদেনের হিসাব রাখার জন্য বিশেষ ভাবে তৈরি করা হয়েছে।
                        </Text>
                    </Box>
                    <Divider />
                    <Divider />
                    <Box pt='3' pb='3'>
                        <Heading size='sm'>Sign up:</Heading>
                        <Text>
                            Provide all valid information to signup.
                            Remember or keep it in a safe place. Email or password is not changeable.
                            Technical support is only available for Enterprise (paid) version. This app does not allow users to delete/edit any data.
                            So, put only correct information. For any wrong records, make a reversed entry to solve it.
                        </Text>
                        <Text>Or, just login if yor already have an account.</Text>
                        <Heading size='sm'>সাইনআপ করার সময় সঠিক তথ্য প্রদান করুন।</Heading>
                        <Text>

                            নিরাপদ স্থানে ইমেইল ও পাসওয়ার্ড এর তথ্য সংরক্ষণ করুন যেন প্রয়োজনের সময় তা ব্যবহার করতে পারেন। এই তথ্য পরিবর্তনের কোন সুযোগ নেই।
                            পরবর্তীতে লগইন করার সময় সঠিক ইমেইল ও পাসওয়ার্ড দিতে না পারলে ওই এ্যাকাউন্ট আর ব্যবহার করার সুযোগ থাকবেনা।
                            একবার সাইনআপ সফল হলে যেকোন সময় লগইন করে এটি ব্যবহার করতে পারবেন।
                        </Text>
                    </Box>
                    <Divider />
                    <Box pt='3' pb='3'>
                        <Heading size='sm'>How to create an account?</Heading>
                        <Text>If you are logged in... </Text>
                        <Text>* Press on Set Account</Text>
                        <Text>* Give an account Name (like- yourName, customerName, yourShopName, uCash, bKash etc.)</Text>
                        <Text>* Provide a valid mobile number (remember- this mobile number will be your main account,
                            you can use same or multiple mobile numbers for multiple accounts.).</Text>
                        <Text>* Duplicate account is restricted. Do not create unnecessary account. You can see the existing account with the same mobile
                            number when you'll start typing few digits of the mobile number.</Text>
                        <Text>* Finally press Add- button if you want to create that account. Then go back screen and work it with AddMoney, SendMoney, ViewStatement</Text>
                        <Heading size='sm'>সাইনআপ করার পর কিভাবে এ্যাকাউন্ট করবেন?</Heading>
                        <Text>* Set Account এ যান</Text>
                        <Text>* এ্যাকাউন্ট এর নাম - যেমন uCash, bKash ইত্যাদি অথবা আপনার নাম অথবা দোকানের নাম অথবা অন্য কারো নাম সংক্ষেপে দিন।</Text>
                        <Text>* সঠিক মোবাইল নম্বর দিন।</Text>
                        <Text>* ডুপ্লিকেট এ্যাকাউন্ট গ্রহণযোগ্য নয়। মোবাইল নম্বর দেওয়ার সময় নিচের দিকে খেয়াল করন নতুন যে এ্যাকাউন্ট যুক্ত করতে চাচ্ছেন তা আগেই করা হয়েছে কিনা।</Text>
                        <Text>* এবার Add- বাটনে চেপে এ্যাকাউন্ট ওপেন নিশ্চিত করুন।</Text>
                    </Box>
                    <Divider />
                    <Box pt='3' pb='3'>
                        <Heading size='sm'>How to add money?</Heading>
                        <Text>* Go to Add Money screen</Text>
                        <Text>* Enter an amount</Text>
                        <Text>* Enter a customer mobile number or a number from where it's coming</Text>
                        <Text>* Enter your account number (start typing your mobile number,
                            you will see a list of your accouts, select one from there</Text>
                        <Text>* Press on Add button</Text>
                        <Text>* You can see this transaction from ViewStatement</Text>
                        <Heading size='sm'>কিভাবে Add Money রেকর্ড করবেন?</Heading>
                        <Text>* Add Money পেজ এ যান</Text>
                        <Text>* টাকার অংক দিন। </Text>
                        <Text>* কাস্টমার মোবাইল নম্বর বা যে নম্বর থেকে টাকা ট্রান্সফার হয়েছে সেই নম্বরটি দিন</Text>
                        <Text>* যে এ্যাকাউন্ট বা নম্বরে টাকা যোগ হয়েছে সেই এ্যাকাউন্ট বাছাই করুন</Text>
                        <Text>* Add- বাটনে চেপে রেকর্ড নিশ্চিত করুন</Text>
                        <Text>* লেনদেনের রেকর্ড দেখার জন্য View Statement থেকে দেখে নিন।</Text>
                    </Box>
                    <Divider />
                    <Box pt='3' pb='3'>
                        <Heading size='sm'>How to send money?</Heading>
                        <Text>* Go to Send Money screen</Text>
                        <Text>* Enter an amount</Text>
                        <Text>* Enter a customer mobile number or a number to transfer to</Text>
                        <Text>* Enter your account number (start typing your mobile number,
                            you will see a list of your accounts, select one from there.
                        </Text>
                        <Text>* Press on Send button</Text>
                        <Text>* You can see this transaction from ViewStatement.</Text>
                        <Heading size='sm'>কিভাবে Send Money রেকর্ড করবেন?</Heading>
                        <Text>* Send Money পেজ এ যান</Text>
                        <Text>* টাকার অংক দিন। </Text>
                        <Text>* কাস্টমার মোবাইল নম্বর বা যে নম্বরে টাকা ট্রান্সফার হয়েছে সেই নম্বরটি দিন</Text>
                        <Text>* যে এ্যাকাউন্ট বা নম্বর থেকে টাকা গেছে সেই এ্যাকাউন্ট বাছাই করুন</Text>
                        <Text>* Send- বাটনে চেপে রেকর্ড নিশ্চিত করুন</Text>
                        <Text>* লেনদেনের রেকর্ড দেখার জন্য View Statement থেকে দেখে নিন।</Text>
                    </Box>
                    <Divider />
                    <Box pt='3' pb='3'>
                        <Heading size='sm'>How to view account statement?</Heading>
                        <Text>* Go to View Statement screen. You will see your account list there</Text>
                        <Text>* Select an account</Text>
                        <Text>* By default it will show you the last one month's transaction statement</Text>
                        <Text>* You will see two date ranges at the top. Change it from left and right if you need old statement</Text>
                        <Heading size='sm'>কিভাবে এ্যাকাউন্ট স্টেটমেন্ট দেখতে হয়?</Heading>
                        <Text>* View Statement  পেজ এ যান</Text>
                        <Text>* একটি এ্যাকাউন্ট নির্বাচন করুন</Text>
                        <Text>* শুরুতেই এটি বর্তমান সময় হতে এক মাসের হিসাব দেখাবে</Text>
                        <Text>* উপরের দিক থেকে ডানে বা বামে বাটন চেপে প্রয়োজন মত তারিখ পরিবর্তন করুন। তাহলে পরিবর্তিত সময়ের হিসাব দেখাবে।</Text>
                    </Box>
                    <Divider />
                    <Box pt='3' pb='3'>
                        <Heading size='sm'>Contact us for:</Heading>
                        <Text>* Technical Support (for enterprise version)</Text>
                        <Text>* Custom Software</Text>
                        <Text>* Design and Build Mobile Apps</Text>
                        <Text>* Design and Build Websites</Text>
                        <Text>* Essetial IT Training for Office Management</Text>
                        <Text>* Learning Software Development</Text>
                        <Text>* Learning Website Development</Text>
                        <Text>* Learning Mobile App Development (Android & iOS)</Text>
                    </Box>
                    <Divider />
                    <Box pt='3' pb='2'> 
                        <Text>Contact:</Text>
                        <Divider />
                        <Text bold>CYBER KING IT</Text>                        
                        <Text>www.cyberkingit.com</Text>
                        <Text>cykiapps@gmail.com</Text>
                    </Box>
                    <Divider />

                    <Divider />
                    <Box pt='3' pb='2'>
                        <Heading size='sm'>Other information:</Heading>
                        <Text>App idea: Sk Mosharaf (DCI TELECOM)</Text>
                        <Text>Developed by: Mamun Abdullah (CYBER KING IT)</Text>
                        <Text>Tech support: CYBER KING IT (CyKi)</Text>
                        <Text>App version: 2.0.0</Text>
                    </Box>
                    <Divider />
                    <Box pb="2" pt="2">
                        <Text bold>Thank you for using CykiApps.</Text>
                    </Box>
                    <Divider />
                </VStack>
            </KeyboardAwareScrollView>
        </NativeBaseProvider>
    )
}
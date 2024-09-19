import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
import { appColors } from '../../constants/colos'
import { width, height } from 'react-native-dimension'
import { Spacer, Wspacer } from '../../components/spacer'
import { TextBar } from '../../components/textBar'
import { CustomButton } from '../../components/button'
import { saveData, uniqueID } from '../../../android/app/src/firebasefunction/Utility'
import Modal from "react-native-modal";
import { Button } from 'react-native-elements'
import Attendance from '../TeacherFlow/Attendance/Attendance'

const addStudent = (props) => {
    let previousData = props?.route?.params?.item
    console.log('2222', previousData)
    const [name, setName] = useState(previousData?.name ?? '')
    const [fatherName, setFatherName] = useState(previousData?.fatherName ?? '')
    const [cnic, setCNIC] = useState(previousData?.cnic ?? '')
    const [contactnumber, setContectNumber] = useState(previousData?.contactnumber ?? '')
    const [email, setEmail] = useState(previousData?.email ?? '')
    const [address, setAddress] = useState(previousData?.address ?? '')
    const [classes, setClasses] = useState(previousData?.class ?? '')
    const [passWord, setPassWord] = useState(previousData?.passWord ?? '')
    const [section, setSection] = useState(previousData?.section ?? '')
    const [isModalVisible, setModalVisible] = useState(false);
    const [sectionModel, setsectionModel] = useState(false);

    const AddStudents = async () => {
        if (name && fatherName && cnic && contactnumber && email && address && classes && passWord && section) {
            try {
                let id = uniqueID()
                let data = {
                    id: id,
                    name: name,
                    fatherName: fatherName,
                    cnic: cnic,
                    contactnumber: contactnumber,
                    email: email,
                    address: address,
                    class: classes,
                    passWord: passWord,
                    section: section,
                    attendance: [],
                    result: [],
                }
                console.log("123", data)
                saveData('Student', id, data).then(res => {
                    console.log("res", res)
                    setName('')
                    setFatherName('')
                    setCNIC('')
                    setContectNumber('')
                    setEmail('')
                    setAddress('')
                    setClasses('')
                    setPassWord('')
                    setSection('')
                    props.navigation.goBack()

                }).catch(error => {
                    console.log("error", error)
                })
            } catch (error) {
                console.log("erroroor", error)
            }
        } else {
            setErrorMessage('All fields are mandatory!')

        }
    }
    const EditStudent = async () => {
        if (name && fatherName && cnic && contactnumber && email && address && classes && passWord && section) {
            try {
                let data = {
                    id: previousData?.id,
                    name: name,
                    fatherName: fatherName,
                    cnic: cnic,
                    contactnumber: contactnumber,
                    email: email,
                    address: address,
                    class: classes,
                    passWord: passWord,
                    section: section,
                    attendance: previousData?.attendance,
                    result: previousData?.result,
                }

                console.log("0dfsgsdfgdsf", data)

                saveData('Student', data?.id, data).then(res => {
                    console.log("res", res)
                    setName('')
                    setFatherName('')
                    setCNIC('')
                    setContectNumber('')
                    setEmail('')
                    setAddress('')
                    setPassWord('')
                    setClasses('')
                    setSection('')
                    props.navigation.goBack()


                }).catch(error => {
                    console.log("error", error)
                })
            } catch (error) {
                console.log("erroroor", error)
            }
        } else {
            setErrorMessage('All fields are mandatory!')
            // SimpleToast.show('All fields are mandatory!')
        }
    }

    const subjects = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8",];
    const classsection = ["Section A", "Section B", "Section C", "Section D",];

    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.header}>
                {previousData?.title ? 'Edit Student' : 'Add Student'}
            </Text>
            <Spacer />
            <ScrollView style={styles.scrollBar}>
                <Text style={styles.boxName}>Name</Text>
                <TextBar placeHolder={'Name'} value={name} onChangeText={(text) => {
                    setName(text)
                    // setErrorMessage('')
                }} />
                <Text style={styles.boxName}>Father Name</Text>
                <TextBar placeHolder={'Father Name'} value={fatherName} onChangeText={(text) => setFatherName(text)} />
                <Text style={styles.boxName}>CNIC</Text>
                <TextBar placeHolder={'CNIC'} value={cnic} onChangeText={(text) => setCNIC(text)} />
                <Text style={styles.boxName}>Contact Number</Text>
                <TextBar placeHolder={'Contact Number'} value={contactnumber} onChangeText={(text) => setContectNumber(text)} />
                <Text style={styles.boxName}>Email</Text>
                <TextBar placeHolder={'Email'} value={email} onChangeText={(text) => setEmail(text)} />
                <Text style={styles.boxName}>Address</Text>
                <TextBar placeHolder={'Address'} value={address} onChangeText={(text) => setAddress(text)} />
                <Text style={styles.boxName}>Classes</Text>
                <TouchableOpacity style={{ ...styles.searchBar, }}
                    onPress={() => setModalVisible(!isModalVisible)}>
                    <Text style={{ paddingLeft: 4 }}>{classes == '' ? 'Select Classes' : classes}</Text>
                </TouchableOpacity>

                <Text style={styles.boxName}>Section</Text>
                <TouchableOpacity style={{ ...styles.searchBar, }}
                    onPress={() => setsectionModel(!sectionModel)}>
                    <Text style={{ paddingLeft: 4 }}>{section == '' ? 'Select Section' : section}</Text>
                </TouchableOpacity>

                <Text style={styles.boxName}>Password</Text>
                <TextBar placeHolder={'password'} value={passWord} onChangeText={(text) => setPassWord(text)} />


            </ScrollView>
            <CustomButton disabled={name && fatherName && cnic && contactnumber && email && address && classes && passWord ? false : true}
                buttonText={previousData?.name ? 'Edit Student' : 'Add Student'}
                onPress={() => {
                    if (previousData?.name) {
                        EditStudent()
                    } else {
                        AddStudents()
                    }
                }} />
            <Modal
                isVisible={isModalVisible}
                onBackdropPress={() => setModalVisible(!isModalVisible)}
                style={{
                    backgroundColor: "transparent",
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',

                }}
            >
                <View style={{ backgroundColor: "white", paddingVertical: height(2), width: width(80), borderRadius: height(1), }}>
                    <Text style={{ alignSelf: 'center', fontSize: 18, marginBottom: 8 }}>Select Subjects</Text>
                    {subjects?.map((sub) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                setClasses(sub)
                                setModalVisible(!isModalVisible)
                            }}
                                style={{
                                    flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderColor: 'gray', paddingHorizontal: 20,
                                    paddingVertical: 10,
                                }}>
                                <Text >
                                    {sub}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}

                </View>
            </Modal >
            <Modal
                isVisible={sectionModel}
                onBackdropPress={() => setsectionModel(!sectionModel)}
                style={{
                    backgroundColor: "transparent",
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',

                }}
            >
                <View style={{ backgroundColor: "white", paddingVertical: height(2), width: width(80), borderRadius: height(1), }}>
                    <Text style={{ alignSelf: 'center', fontSize: 18, marginBottom: 8 }}>Select Section</Text>
                    {classsection?.map((sub) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                setSection(sub)
                                setsectionModel(!sectionModel)
                            }}
                                style={{
                                    flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderColor: 'gray', paddingHorizontal: 20,
                                    paddingVertical: 10,
                                }}>
                                <Text >
                                    {sub}
                                </Text>
                            </TouchableOpacity>
                        )
                    })}

                </View>
            </Modal >
        </View>
    )
}
const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
    },
    header: {
        fontSize: 26,
        alignSelf: 'center',
        fontWeight: 'bold',
        color: appColors.blue,
        margin: 10,
    },
    boxName: {
        marginHorizontal: width(5),
        marginVertical: height(0.5),
    },
    scrollBar: {
        marginBottom: height(15),
    },
    searchBar: {
        height: height(8),
        width: width(90),
        alignSelf: 'center',
        borderRadius: 10,
        borderColor: appColors.black,
        backgroundColor: appColors.lightgrey,
        justifyContent: 'center',
        padding: 8,

    },
})
export default addStudent
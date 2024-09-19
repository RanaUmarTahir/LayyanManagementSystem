import { View, Text, StyleSheet, TextInput, ScrollView, TouchableOpacity, Button } from 'react-native'
import React, { useState } from 'react'
import { appColors } from '../../constants/colos'
import { width, height } from 'react-native-dimension'
import { Spacer, Wspacer } from '../../components/spacer'
import { TextBar } from '../../components/textBar'
import { CustomButton } from '../../components/button'
import { saveData, uniqueID } from '../../../android/app/src/firebasefunction/Utility'
import SimpleToast from 'react-native-simple-toast';
import Modal from "react-native-modal";
import { Icon } from 'react-native-elements'

const addTeacher = (props) => {

    let previousData = props?.route?.params?.item
    console.log('2222', previousData)
    const [name, setName] = useState(previousData?.name ?? '')
    const [fatherName, setFatherName] = useState(previousData?.fathername ?? '')
    const [cnic, setCNIC] = useState(previousData?.cnic ?? '')
    const [contactnumber, setContactNumber] = useState(previousData?.contactnumber ?? '')
    const [email, setEmail] = useState(selectclass?.email ?? '')
    const [address, setAddress] = useState(previousData?.address ?? '')
    const [passWord, setPassWord] = useState(previousData?.passWord ?? '')
    const [subject, setSubject] = useState(previousData?.subject ?? '')
    const [section, setSection] = useState(previousData?.section ?? '')
    const [classes, setClasses] = useState(previousData?.class ?? '')
    const [selectedClass, setSelectedClass] = useState(previousData?.class ?? '')
    const [errorMessage, setErrorMessage] = useState('')
    const [selectedSubjects, setSelectedSubjects] = useState(previousData?.subject ?? []);
    const [isModalVisible, setModalVisible] = useState(false);
    const [sectionModel, setsectionModel] = useState(false);
    const [classModel, setClassModel] = useState(false);

    const AddTeacher = async () => {

        if (name && fatherName && cnic && contactnumber && email && address && passWord && selectedSubjects && selectedClass && section?.length > 0) {

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
                    passWord: passWord,
                    subject: selectedSubjects,
                    class: selectedClass,
                    section: section,
                }

                console.log("0dfsgsdfgdsf", data)

                saveData('Teacher', id, data).then(res => {
                    console.log("res", res)
                    setName('')
                    setFatherName('')
                    setCNIC('')
                    setContactNumber('')
                    setEmail('')
                    setAddress('')
                    setPassWord('')
                    setSelectedSubjects([])
                    setSelectedClass('')
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

    const EditTeacher = async () => {
        if (name && fatherName && cnic && contactnumber && email && address && passWord && selectedSubjects && selectedClass && section?.length > 0) {
            try {
                let data = {
                    id: previousData?.id,
                    name: name,
                    fatherName: fatherName,
                    cnic: cnic,
                    contactnumber: contactnumber,
                    email: email,
                    address: address,
                    passWord: passWord,
                    subject: selectedSubjects,
                    class: selectedClass,
                    section: section,
                }

                console.log("0dfsgsdfgdsf", data)

                saveData('Teacher', data?.id, data).then(res => {
                    console.log("res", res)
                    setName('')
                    setFatherName('')
                    setCNIC('')
                    setContactNumber('')
                    setEmail('')
                    setAddress('')
                    setPassWord('')
                    setSelectedSubjects([])
                    setSelectedClass('')
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
    const subjects = ["Math", "Science", "Pakistan Studies", "English", "Computer Studies", "Islamiyat", "Urdu",];
    const toggleSubject = (subject) => {
        if (selectedSubjects.includes(subject)) {
            setSelectedSubjects(selectedSubjects.filter(item => item !== subject));
        } else {
            setSelectedSubjects([...selectedSubjects, subject]);
        }
    };

    const selectclass = ["Class 1", "Class 2", "Class 3", "Class 4", "Class 5", "Class 6", "Class 7", "Class 8",];
    const classsection = ["Section A", "Section B", "Section C", "Section D",];

    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.header}>
                {previousData?.title ? 'Edit Teacher' : 'Add teacher'}
            </Text>
            <Spacer />
            <ScrollView contentContainerStyle={{ paddingBottom: height(20) }}>
                <Text style={styles.boxName}>Name</Text>
                <TextBar placeHolder={'Name'} value={name} onChangeText={(text) => {
                    setName(text)
                    setErrorMessage('')
                }} />
                <Text style={styles.boxName}>Father Name</Text>
                <TextBar placeHolder={'Father Name'} value={fatherName} onChangeText={(text) => setFatherName(text)} />
                <Text style={styles.boxName}>CNIC</Text>
                <TextBar placeHolder={'CNIC'} value={cnic} onChangeText={(text) => setCNIC(text)} />
                <Text style={styles.boxName}>Contact Number</Text>
                <TextBar placeHolder={'Contact Number'} value={contactnumber} onChangeText={(text) => setContactNumber(text)} />
                <Text style={styles.boxName}>Email</Text>
                <TextBar placeHolder={'Email'} value={email} onChangeText={(text) => setEmail(text)} />
                <Text style={styles.boxName}>Address</Text>
                <TextBar placeHolder={'Address'} value={address} onChangeText={(text) => setAddress(text)} />
                <Text style={styles.boxName}>Subject</Text>
                <TouchableOpacity style={{ ...styles.searchBar, }}
                    onPress={() => setModalVisible(!isModalVisible)}>
                    <ScrollView horizontal contentContainerStyle={{
                        flexDirection: 'row', alignItems: 'center', flex: 1
                    }}>
                        {selectedSubjects?.map((res) => {
                            return (
                                <Text style={{ paddingLeft: 4 }}>{res},</Text>
                            )
                        })}
                    </ScrollView>
                </TouchableOpacity>

                <Text style={styles.boxName}>Classes</Text>
                <TouchableOpacity style={{ ...styles.searchBar, }}
                    onPress={() => setClassModel(!classModel)}>
                    <Text style={{ paddingLeft: 4 }}>{selectedClass == '' ? 'Select Classes' : selectedClass}</Text>
                </TouchableOpacity>

                <Text style={styles.boxName}>Section</Text>
                <TouchableOpacity style={{ ...styles.searchBar, }}
                    onPress={() => setsectionModel(!sectionModel)}>
                    <Text style={{ paddingLeft: 4 }}>{section == '' ? 'Select Section' : section}</Text>
                </TouchableOpacity>


                <Text style={styles.boxName}>Password</Text>
                <TextBar placeHolder={'password'} value={passWord} onChangeText={(text) => setPassWord(text)} />

                {/* <Text>{errorMessage}</Text> */}
            </ScrollView>
            <CustomButton disabled={name && fatherName && cnic && contactnumber && email && address && passWord && selectedSubjects?.length > 0 ? false : true}
                buttonText={previousData?.name ? 'Edit Teacher' : 'Add Teacher'}

                onPress={() => {
                    if (previousData?.name) {
                        EditTeacher()
                    } else {
                        AddTeacher()
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
                            <TouchableOpacity onPress={() => toggleSubject(sub)}
                                style={{
                                    flexDirection: 'row', justifyContent: 'space-between', borderWidth: 1, borderColor: 'gray', paddingHorizontal: 20,
                                    paddingVertical: 10,
                                }}>
                                <Text >
                                    {sub}
                                </Text>
                                {selectedSubjects.includes(sub) && <Icon name='check' type='feather' />}
                            </TouchableOpacity>
                        )
                    })}
                    <View style={{ flexDirection: 'row', padding: width(5), alignSelf: 'center' }}>
                        <Button title="Ok" onPress={() => setModalVisible(!isModalVisible)} />
                        <Wspacer />
                        <Button title="Cancel" onPress={() => {
                            setModalVisible(!isModalVisible)
                        }} />
                    </View>
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
            <Modal
                isVisible={classModel}
                onBackdropPress={() => setClassModel(!classModel)}
                style={{
                    backgroundColor: "transparent",
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',

                }}
            >
                <View style={{ backgroundColor: "white", paddingVertical: height(2), width: width(80), borderRadius: height(1), }}>
                    <Text style={{ alignSelf: 'center', fontSize: 18, marginBottom: 8 }}>Select Class</Text>
                    {selectclass?.map((sub) => {
                        return (
                            <TouchableOpacity onPress={() => {
                                setSelectedClass(sub)
                                setClassModel(!classModel)
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
        </View >
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
export default addTeacher
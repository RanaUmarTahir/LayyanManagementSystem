import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Markresult from '../../../components/Markresult/Markresult'
import { getAllOfCollection, saveData, uniqueID } from '../../../../android/app/src/firebasefunction/Utility'
import Modal from 'react-native-modal'
import { width, height } from 'react-native-dimension'
import SimpleToast from 'react-native-simple-toast';

const resultView = (props) => {
    const className = props?.route?.params?.className
    const section = props?.route?.params?.section
    const teacherData = props?.route?.params?.teacherData
    console.log(teacherData, 'teacherData');

    const [showStudents, setShowStudents] = useState([])
    const [isModalVisible, setModalVisible] = useState(false)
    const [selectedSubject, setSelectedSubject] = useState('')



    useEffect(() => {
        setTimeout(() => {
            setModalVisible(!isModalVisible)
        }, 1000);
    }, [])

    // const transformSubjects = (subjects) => {
    //     return subjects.map((subject, index) => ({
    // subject: subject,
    // obtainMarks: 0,
    // totalMarks: 0,
    //         id: index + 1
    //     }));
    // }

    const getResults = (selectedSubject) => {
        let id = uniqueID()
        getAllOfCollection('Student')
            .then((result) => {

                let data = {
                    subject: selectedSubject,
                    obtainMarks: 0,
                    totalMarks: 0,
                    id: id
                }


                let filteredData = result?.filter((student) => student?.class === className && student?.section === section);
                console.log('filteredData', filteredData);

                let updateData = filteredData?.map((student) => ({
                    ...student,
                    result: student.result ?
                        student.result.find(res => res?.subject == selectedSubject) == undefined ?
                            [...student.result, data] : student.result
                        : [data]
                }));

                setShowStudents(updateData);
                console.log('yahya', updateData[0]);
            })
            .catch((error) => {
                console.log('get getResults error', error);
            });
    };

    const renderItem = ({ item, index }) => {
        console.log(';item?.result[index]', item?.result);
        return (
            <View style={{ marginVertical: 10 }}>
                {item?.result?.map((resultItem, subjectIndex) => (
                    <Markresult
                        key={subjectIndex}
                        selectedSubject={selectedSubject}
                        subject={resultItem?.subject}
                        name={item?.name + ` (${resultItem?.subject}) `}
                        obtainMarks={resultItem?.obtainMarks}
                        totalMarks={resultItem?.totalMarks}
                        onChangeTextObtain={(text) => {
                            const updatedStudents = [...showStudents];
                            const updatedStudent = { ...updatedStudents[index] };
                            const updatedResults = [...updatedStudent.result];
                            updatedResults[subjectIndex] = { ...updatedResults[subjectIndex], ['obtainMarks']: text };
                            updatedStudent.result = updatedResults;
                            updatedStudents[index] = updatedStudent;
                            setShowStudents(updatedStudents)
                        }}
                        onChangeTextTotal={(text) => {
                            const updatedStudents = [...showStudents];
                            const updatedStudent = { ...updatedStudents[index] };
                            const updatedResults = [...updatedStudent.result];
                            updatedResults[subjectIndex] = { ...updatedResults[subjectIndex], ['totalMarks']: text };
                            updatedStudent.result = updatedResults;
                            updatedStudents[index] = updatedStudent;
                            setShowStudents(updatedStudents)
                        }}
                        onPressView={() => props.navigation.navigate('resultView')}
                    />
                ))}
            </View>
        )
    }

    const onPressSubmit = async () => {
        await showStudents?.map((stu, index) => {
            saveData('Student', stu?.id, showStudents[index])
        })

        SimpleToast.show('Result submitted successfully!')

        setTimeout(() => {
            props.navigation.goBack()
        }, 1000);
    }

    return (
        <View style={{ marginHorizontal: 20 }}>
            <View style={styles.header}>
                <View style={{ ...styles.adbtn, backgroundColor: 'transparent' }} />
                <Text style={styles.Testa}>
                    Result
                    {`\n`}
                    Subject: {selectedSubject}
                </Text>
                <TouchableOpacity
                    onPress={() => onPressSubmit()}
                    style={styles.adbtn}>
                    <Text style={styles.addtext}>
                        Submit
                    </Text>
                </TouchableOpacity>
            </View>

            <View style={styles.Testb}>
                <FlatList data={showStudents} renderItem={renderItem} />

            </View>


            <Modal
                isVisible={isModalVisible}
                style={{
                    backgroundColor: "transparent",
                    alignItems: 'center',
                    alignSelf: 'center',
                    justifyContent: 'center',
                }}
            >
                <View
                    style={{ backgroundColor: 'gray', borderRadius: 20, width: width(60), alignItems: 'center' }}>
                    {teacherData?.subject?.map((res, index) => {
                        return (
                            <Text
                                onPress={async () => {
                                    setSelectedSubject(res)
                                    await getResults(res)
                                    setModalVisible(!isModalVisible)
                                }}
                                style={styles.textView}>
                                {res}</Text>
                        )
                    })}
                </View>

            </Modal>
        </View>
    )
}
const styles = StyleSheet.create({
    Testa: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
        textAlign: 'center'
    },
    adbtn: {
        borderRadius: 10,
        height: 35,
        width: 90,
        backgroundColor: "white",
        alignItems: "center",
        justifyContent: 'center'

    },
    addtext: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'Black',
        textAlign: 'center',
        // flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // marginHorizontal: 15,
        marginTop: 10
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // marginHorizontal: 15,
        marginTop: 10
    },
    textView: {
        borderRadius: 10,
        backgroundColor: "white",
        width: width(50),
        textAlign: 'center',
        padding: 15,
        fontWeight: 'bold',
        fontSize: 20,
        marginHorizontal: 20,
        marginVertical: 6,
        marginTop: 7
    }
})
export default resultView
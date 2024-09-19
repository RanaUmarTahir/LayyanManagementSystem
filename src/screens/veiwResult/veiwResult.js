import { View, Text, StyleSheet, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { width, height } from "react-native-dimension";
import Modal from 'react-native-modal'
import { getAllOfCollection } from '../../../android/app/src/firebasefunction/Utility';

const veiwResult = (props) => {
    const className = props?.route?.params?.className
    const section = props?.route?.params?.section
    const screenType = props?.route?.params?.screenType

    const [isModalVisible, setModalVisible] = useState(false)
    const [studentList, setStudentList] = useState([])
    const [selectedStudent, setSelectedStudent] = useState({})
    const [totalMarks, setTotalMarks] = useState(0)
    const [obtainMarks, setObtainMarks] = useState(0)
    const [percentage, setPercentage] = useState(0);
    const [grade, setGrade] = useState('');

    useEffect(() => {
        getAllOfCollection('Student')
            .then((result) => {
                let filteredData = result?.filter((student) => student?.class === className && student?.section === section);
                console.log('filteredData:::::', filteredData[0]?.result);
                setStudentList(filteredData)
                if (screenType == 'student') {
                    setSelectedStudent(filteredData[0])
                } else {
                    setTimeout(() => {
                        setModalVisible(true)
                    }, 1000);
                }
            })
    }, [])

    useEffect(() => {
        if (selectedStudent?.result) {
            const total = selectedStudent?.result.reduce((acc, record) => acc + parseInt(record.totalMarks), 0);
            const totalObtain = selectedStudent?.result.reduce((acc, record) => acc + parseInt(record.obtainMarks), 0);

            setTotalMarks(total)
            setObtainMarks(totalObtain)

            const calculatedPercentage = (totalObtain / total) * 100;
            console.log('23456789', calculatedPercentage);

            setPercentage(isNaN(calculatedPercentage) ? 0 : calculatedPercentage);

            let calculatedGrade = '';
            if (calculatedPercentage >= 90) {
                calculatedGrade = 'A';
            } else if (calculatedPercentage >= 75) {
                calculatedGrade = 'B';
            } else if (calculatedPercentage >= 50) {
                calculatedGrade = 'C';
            } else if (calculatedPercentage >= 40) {
                calculatedGrade = 'D';
            } else {
                calculatedGrade = 'F';
            }
            setGrade(calculatedGrade);
        }
    }, [selectedStudent])

    return (
        <View style={{ flex: 1, paddingHorizontal: width(4) }}>
            <Text style={styles.TextA}>Result Card</Text>

            <View>
                <Text>Name: {selectedStudent?.name}</Text>
                <Text>Class: {className} / {section}</Text>
            </View>

            <View style={styles.flatlistView}>
                <View style={styles.mainView}>
                    <Text>Subject</Text>
                    <View style={styles.secondView}>
                        <Text>Total</Text>
                        <Text>Obtain</Text>
                    </View>
                </View>

                <FlatList
                    data={selectedStudent?.result}
                    renderItem={({ item, index }) => {
                        return (
                            <View style={{ ...styles.mainView, marginVertical: 10 }}>
                                <Text>{item?.subject}</Text>
                                <View style={styles.secondView}>
                                    <Text>{item?.totalMarks}</Text>
                                    <Text>{item?.obtainMarks}</Text>
                                </View>
                            </View>
                        )
                    }}
                />

                <View style={{ ...styles.mainView, marginTop: 30 }}>
                    <Text>Total</Text>
                    <View style={styles.secondView}>
                        <Text>{totalMarks}</Text>
                        <Text>{obtainMarks}</Text>
                    </View>
                </View>

                <View style={styles.gradeView}>
                    <View>
                        <Text>Grade</Text>
                        <Text style={{ marginTop: height(2) }}>Percentage</Text>
                    </View>

                    <View>
                        <Text>{grade}</Text>
                        <Text style={{ marginTop: height(2) }}>{percentage.toFixed(2)}%</Text>
                    </View>
                </View>
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
                    {studentList?.map((res, index) => {
                        return (
                            <Text
                                onPress={async () => {
                                    setSelectedStudent(res)
                                    setModalVisible(!isModalVisible)
                                }}
                                style={styles.textView}>
                                {res?.name}</Text>
                        )
                    })}
                </View>

            </Modal>

        </View>
    )
}

export default veiwResult

const styles = StyleSheet.create({
    TextA: {
        alignSelf: 'center',
        fontWeight: 'bold',
        marginTop: 10,
        fontSize: 20,
    },
    flatlistView: {
        backgroundColor: "gray",
        padding: width(4),
        borderRadius: 10,
        marginTop: 20
    },
    mainView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10
    },
    secondView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: "center",
        width: width(35)
    },
    gradeView: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        backgroundColor: "white",
        padding: 15,
        borderRadius: 10,
        marginTop: height(5),
        width: width(60),
        alignSelf: 'center'
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
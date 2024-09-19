import { View, Text, StyleSheet, TouchableOpacity, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import { MarkAttendace } from '../../../components/markAttendance/markAttendance'
import { getAllOfCollection, saveData } from '../../../../android/app/src/firebasefunction/Utility'
import { useIsFocused } from '@react-navigation/native'
import { height, width } from 'react-native-dimension'
import moment from 'moment'
import SimpleToast from 'react-native-simple-toast';

const addAttendance = (props) => {

    const className = props?.route?.params?.className
    const section = props?.route?.params?.section
    console.log('classNameclassNameclassName', className, 'and sction is', section);

    const [showstudentList, setShowStudentList] = useState([])
    const [nextScreenData, setNextScreenData] = useState([])

    useEffect(() => {
        getAttendance()
    }, [])

    const getAttendance = () => {
        getAllOfCollection('Student')
            .then((result) => {
                let data = {
                    status: 'P',
                    date: moment(new Date()).format('l')
                };

                let filteredData = result?.filter((student) => student?.class === className && student?.section === section);
                console.log('filteredData', filteredData);
                setNextScreenData(filteredData)

                let updateData = filteredData?.map((student) => ({
                    ...student,
                    attendance: student.attendance ?
                        student.attendance.find(res => res?.date == moment(new Date()).format('l')) == undefined ?
                            [...student.attendance, data] : student.attendance
                        : [data]
                }));

                setShowStudentList(updateData);
                console.log('yahya', updateData);
            })
            .catch((error) => {
                console.log('get Student error', error);
            });
    };


    const updateAttendance = (id) => {
        setShowStudentList(prevAttendance =>
            prevAttendance.map(item =>
                item.id === id ?
                    {
                        ...item,
                        attendance: item.attendance.map(record =>
                            ({ ...record, status: record.status === 'P' ? 'A' : 'P' })
                        )
                    }
                    : item
            )
        );
    };

    const addAttendace = async () => {
        await showstudentList?.map(res => saveData('Student', res?.id, res))
        SimpleToast.show('Attendance saved successfully!')

        setTimeout(() => {
            props.navigation.goBack()
        }, 1000);
    }

    const renderItem = ({ item, index }) => {
        return (
            <View style={{ marginVertical: 10 }}>
                <MarkAttendace
                    name={item?.name}
                    attendance={item?.attendance[item?.attendance?.length - 1]?.status}
                    onPressView={() => props.navigation.navigate('veiwAttendance', { attendance: nextScreenData[0]?.attendance ?? [] })}
                    onPressAttendace={() => updateAttendance(item?.id)}
                />
            </View>
        )
    }


    return (
        <View style={{ marginHorizontal: 20 }}>
            <View style={styles.header}>
                <View style={{ ...styles.adbtn, backgroundColor: 'transparent' }} />
                <Text style={styles.Testa}>
                    Add Attendance
                </Text>
                <TouchableOpacity style={styles.adbtn} onPress={() => addAttendace()}>
                    <Text style={styles.addtext}>
                        Add
                    </Text>
                </TouchableOpacity>
            </View>


            <Text style={styles.Testb}>
                Date: {moment(new Date()).format('ll')}
            </Text>
            <View style={styles.Testb}>
                <FlatList data={showstudentList}
                    renderItem={renderItem}
                    contentContainerStyle={{ paddingBottom: height(20) }}
                    ListEmptyComponent={() => {
                        return (
                            <Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 10 }}>No Student found!</Text>
                        )
                    }}

                />

            </View>
        </View>
    )
}

const styles = StyleSheet.create({
    Testa: {
        alignSelf: 'center',
        fontSize: 20,
        fontWeight: 'bold',
    },
    adbtn: {
        borderRadius: 10,
        height: 35,
        width: 90,
        backgroundColor: "gray",
        // borderRadius: 10,
        alignItems: "center",
        justifyContent: 'center'

    },
    addtext: {
        fontSize: 16,
        fontWeight: 'bold',
        color: '#fff',
        textAlign: 'center'
    },
    header: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        // marginHorizontal: 15,
        marginTop: 10
    }
    // Testb: {
    // //     fontWeight: 10,
    // //     alignSelf: 'left'
    //     //
    // },
})
export default addAttendance
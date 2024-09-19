import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useEffect, useState } from 'react'
import { height, width } from 'react-native-dimension'
import { Spacer } from '../../components/spacer'
import { appColors } from '../../colors'
import { Header } from '../../components/header'
import { Textlist } from '../../components/nameBar'
import { useIsFocused } from '@react-navigation/native'
import { getAllOfCollection } from '../../../android/app/src/firebasefunction/Utility'

const Classdetail = (props) => {
    const className = props?.route?.params?.className
    const section = props?.route?.params?.section
    console.log('classNameclassNameclassName', className, 'and sction is', section);

    const [headertype, setHeadertype] = useState('Teachers')
    const [showstudentList, setShowStudentList] = useState([])
    const [showTeacherList, setShowTeacherList] = useState([])

    // const renderitem = ({ item, index }) => {
    console.log('itemmmmm:::::', showstudentList);
    useEffect(() => {
        getAllStudent()
        getAllTeacher()


    }, [])

    const getAllStudent = () => {
        getAllOfCollection('Student').then((result) => {

            let filteredData = result?.filter((student) => student?.class == className && student?.section == section)
            setShowStudentList(filteredData)
        }).catch((error) => {
            console.log('get student error', error);
        })
    }

    const getAllTeacher = () => {
        getAllOfCollection('Teacher').then((result) => {
            let filteredData = result?.filter((Teacher) => Teacher?.class == className && Teacher?.section == section)
            setShowTeacherList(filteredData)
        }).catch((error) => {
            console.log('get teachers error', error);
        })

    }
    const teacherData = [
        {
            name: 'Teacher 01',
        },
        {
            name: 'Teacher 02',
        },
        {
            name: 'Teacher 03',
        },
        {
            name: 'Teacher 04',
        },
        {
            name: 'Teacher 05',
        },
        {
            name: 'Teacher 06',
        },
        {
            name: 'Teacher 07',
        },
        {
            name: 'Teacher 08',
        },

    ]

    const studentData = [
        {
            name: 'Student 01',
        },
        {
            name: 'Student 02',
        },
        {
            name: 'Student 03',
        },
        {
            name: 'Student 04',
        },
        {
            name: 'Student 05',
        },
        {
            name: 'Student 06',
        },
        {
            name: 'Student 07',
        },
        {
            name: 'Student 08',
        },
        {
            name: 'Student 09',
        },
        {
            name: 'Student 10',
        },
    ]

    const Play = ['English', 'Urdu', 'Math', 'Gernal knowledge']
    const Nursery = ['English', 'Urdu', 'Math', 'Gernal knowledge', 'Drawing']
    const prep = ['English', 'Urdu', 'Math', 'Gernal knowledge', 'Drawing']
    const One = ['English', 'Urdu', 'Math', 'Islmiyat', 'Waqfiyaat-e-amma']
    const Two = ['English', 'Urdu', 'Math', 'Waqfiyaat-e-amma', 'Islmiyat']
    const Three = ['English', 'Urdu', 'Math', 'Islmiyat', 'Social Studies', 'Computer Science']
    const Four = ['English', 'Urdu', 'Math', 'Science', 'Islmiyat', 'Social Studies']
    const Five = ['English', 'Urdu', 'Math', 'Islmiyat', 'Genral Science', 'Social Studies']
    const Six = ['English', 'Urdu', 'Math', 'Socail Studies', 'Islmiyat', 'Science', 'English Grammer']
    const Seven = ['English', 'Urdu A/B', 'Math', 'Islmiyat', 'Computer Science', 'Social Studies', 'History']
    const eight = ['English', 'Urdu A/B', 'Math', 'Socail Studies', 'Islmiyat', 'Science', 'English Grammer', 'History']

    const renderItem = ({ item }) => {
        return <Textlist name={item.name} />
    }

    const renderItem1 = ({ item }) => {
        return <Textlist name={item} />
    }

    return (
        <View>
            <Header name={'Class Details'} />
            <Spacer />
            <View style={styles.topView}>
                <View style={{ ...styles.lineStyle, borderBottomWidth: headertype == 'Teachers' ? 2 : 0 }}>
                    <TouchableOpacity onPress={() => setHeadertype('Teachers')} style={styles.Button}>
                        <Text style={styles.text}>Teachers</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ ...styles.lineStyle, borderBottomWidth: headertype == 'Students' ? 2 : 0 }}>
                    <TouchableOpacity onPress={() => setHeadertype('Students')} style={styles.Button}>
                        <Text style={styles.text}>Students</Text>
                    </TouchableOpacity>
                </View>

                <View style={{ ...styles.lineStyle, borderBottomWidth: headertype == 'Subject' ? 2 : 0 }}>
                    <TouchableOpacity onPress={() => setHeadertype('Subject')} style={styles.Button}>
                        <Text style={styles.text}>Subject</Text>
                    </TouchableOpacity>
                </View>
            </View>
            <Spacer />
            {headertype == 'Teachers' ?
                <FlatList data={showTeacherList} renderItem={renderItem} contentContainerStyle={{ paddingBottom: height(20) }} />
                : headertype == 'Students' ?
                    <FlatList
                        data={showstudentList}
                        renderItem={renderItem}
                        contentContainerStyle={{ paddingBottom: height(20) }}
                        ListEmptyComponent={() => {
                            return (
                                <Text style={{ textAlign: 'center', fontWeight: 'bold', marginTop: 10 }}>No Student found!</Text>
                            )
                        }}
                    />
                    :
                    <FlatList data={className == 'Play' ? Play : className == 'Nursery' ? Nursery : className == 'Prep' ? prep : className == 'Class 1' ? One : className == 'Class 2' ? Two :
                        className == 'Class 3' ? Three : className == 'Class 4' ? Four : className == 'Class 5' ? Five : className == 'Class 6' ? Six :
                            className == 'Class 7' ? Seven : className == 'Class 8' ? eight : null}
                        renderItem={renderItem1} contentContainerStyle={{ paddingBottom: height(20) }} />
            }
        </View>
    )
}
const styles = StyleSheet.create({
    topView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
    },
    lineStyle: {
        width: width(30),
        paddingBottom: 8,
        borderColor: 'gray',
    },
    Button: {
        width: width(30),
        height: height(4),
        // backgroundColor: appColors.blue,
        backgroundColor: 'gray',
        borderRadius: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    text: {
        color: appColors.white,
    },
})


// }
export default Classdetail
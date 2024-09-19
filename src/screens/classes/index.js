import { View, Text, StyleSheet, FlatList, TouchableOpacity } from 'react-native'
import React, { useState } from 'react'
// import { appColors } from '../../colors'
import { Header } from '../../components/header'

import { Spacer } from '../../components/spacer'
import { Namebar, Textlist, Texxtlist } from '../../components/nameBar'
import Modal from 'react-native-modal'
import { width, height } from 'react-native-dimension'



const Classes = (props) => {
    const className = props?.route?.params?.className
    const section = props?.route?.params?.section
    const teacherData = props?.route?.params?.teacherData
    console.log('classNameclassNameclassName', className, 'and sction is', section);


    const type = props?.route?.params?.type || ''

    const [isModalVisible, setModalVisible] = useState(false);
    const [selectedClass, setSelectedClass] = useState('');
    const [classSection, setClassSection] = useState('');


    const data = [
        {
            name: 'Play',
            route: 'Classdetail',
        },
        {
            name: 'Nursery',
            route: 'Classdetail',
        },
        {
            name: 'Prep',
            route: 'Classdetail',
        },
        {
            name: 'Class 1',
            route: 'Classdetail',
        },
        {
            name: 'Class 2',
            route: 'Classdetail',
        },
        {
            name: 'Class 3',
            route: 'Classdetail',
        },
        {
            name: 'Class 4',
            route: 'Classdetail',
        },
        {
            name: 'Class 5',
            route: 'Classdetail',
        },
        {
            name: 'Class 6',
            route: 'Classdetail',
        },
        {
            name: 'Class 7',
            route: 'Classdetail',
        },
        {
            name: 'Class 8',
            route: 'Classdetail',
        },
    ]

    const renderItem = ({ item }) => {
        return <Textlist
            name={item.name}
            route={() => {
                setSelectedClass(item?.name)
                // setClassSection(item?.route)
                setModalVisible(!isModalVisible)
            }}
        // route={() => props.navigation.navigate(type == 'Result' ? 'veiwResult' : type == 'AddResult' ? 'resultView' : 'Classdetail')}
        />
    }

    return (
        <View style={styles.sectionContainer}>
            <Header name={'Classes'} />
            <View style={styles.background}>
                <FlatList data={data} renderItem={renderItem} />
            </View>
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
                <View
                    style={{ backgroundColor: 'gray', borderRadius: 20, width: width(60), alignItems: 'center' }}>
                    <Text
                        onPress={() => {
                            props.navigation.navigate(type == 'Result' ? 'veiwResult' : type == 'AddResult' ? 'resultView' : 'Classdetail', { className: selectedClass, section: 'Section A', teacherData: teacherData })
                            setModalVisible(!isModalVisible)
                        }}
                        style={styles.textView}>
                        Section A</Text>
                    <Text
                        onPress={() => {
                            props.navigation.navigate(type == 'Result' ? 'veiwResult' : type == 'AddResult' ? 'resultView' : 'Classdetail', { className: selectedClass, section: 'Section B', teacherData: teacherData })
                            setModalVisible(!isModalVisible)
                        }}
                        style={styles.textView}>
                        Section B</Text>
                    <Text
                        onPress={() => {
                            props.navigation.navigate(type == 'Result' ? 'veiwResult' : type == 'AddResult' ? 'resultView' : 'Classdetail', { className: selectedClass, section: 'Section C', teacherData: teacherData })
                            setModalVisible(!isModalVisible)
                        }}
                        style={styles.textView}>
                        Section C</Text>
                    <Text
                        onPress={() => {
                            props.navigation.navigate(type == 'Result' ? 'veiwResult' : type == 'AddResult' ? 'resultView' : 'Classdetail', { className: selectedClass, section: 'Section D', teacherData: teacherData })
                            setModalVisible(!isModalVisible)
                        }}
                        style={styles.textView}>
                        Section D</Text>
                </View>
            </Modal >
        </View >
    )
}

const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
    },
    background: {
        // backgroundColor: appColors.gray,
        backgroundColor: 'gray',
        margin: 20,
        padding: 10,
        borderRadius: 10,
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
export default Classes
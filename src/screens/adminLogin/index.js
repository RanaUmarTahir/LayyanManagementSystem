import { View, Text, StyleSheet, Image, TouchableOpacity, FlatList, Button } from 'react-native'
import React, { useState } from 'react'
import { height, width } from "react-native-dimension"
import { appImages } from '../../constants'
import { appColors } from '../../constants/colos'
import { Spacer, Wspacer } from '../../components/spacer'
import { HomeCard } from '../../components/homeCard'
import teacherList from '../teacherlList'
import Modal from "react-native-modal";


const adminLogin = (props) => {
    const [isModalVisible, setModalVisible] = useState(false);
    const homeCard = [

        {
            name: 'Teacher',
            icon: appImages.profile,
            route: 'teacherList',
        },
        {
            name: 'Student',
            icon: appImages.profile,
            route: 'studentList',
        },
        {
            name: 'Classes',
            icon: appImages.profile,
            route: 'Classes',
        },
        {
            name: 'Attendance',
            icon: appImages.attendance,
            route: 'ShowClasses',
        },
        {
            name: 'Result',
            icon: appImages.result,
            route: 'Classes'
        },
        {
            name: 'Announcements',
            icon: appImages.announcement,
            route: 'AdminAnnouncement',
        },
    ]
    const renderItem = ({ item }) => {

        return <HomeCard name={item.name}
            icon={item.icon}
            onPress={() => props.navigation.navigate(item.route, { type: item?.name })} />
    }
    return (
        <View style={styles.sectionContainer} >
            <View style={styles.header}>
                <Text style={styles.texta}>Hi, Admin</Text>

                <Text style={styles.textb} onPress={() => setModalVisible(!isModalVisible)}>
                    Logout
                </Text>

                {/* <Image style={styles.profile} source={appImages.profile} /> */}
            </View>
            <View style={styles.backgound}>
                <FlatList data={homeCard} renderItem={renderItem} />
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
                <View style={{ backgroundColor: "white", paddingVertical: height(5), width: width(80), height: height(20), borderRadius: height(1), }}>
                    <Text style={{ alignSelf: 'center', fontSize: 18 }}>Are you sure, you want to logout?</Text>
                    <View style={{ flexDirection: 'row', padding: width(5), alignSelf: 'center' }}>
                        <Button title="Logout" onPress={() => setModalVisible(!isModalVisible)} />
                        <Wspacer />
                        <Button title="Cancel" onPress={() => setModalVisible(!isModalVisible)} />
                    </View>
                </View>
            </Modal >
        </View>
    )
}
const styles = StyleSheet.create({
    sectionContainer: {
        flex: 1,
        margin: 10,
    },
    header: {
        height: 40,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    texta: {
        fontWeight: 'bold',
        fontSize: 20,
    },
    textb: {
        fontWeight: 'bold',
        fontSize: 16,
        color: 'red',
        alignSelf: 'center'
    },
    profile: {
        height: 80,
        width: 80,
    },
    backgound: {
        margin: 10,
        padding: 10,
        backgroundColor: "gray",
        borderRadius: 20,
        alignItems: 'center',

    },
    card: {
        height: height(30),
        width: width(80),
        backgroundColor: appColors.white,
        borderRadius: 20,
        margin: 10,
        padding: 10,
        alignItems: 'center',
        justifyContent: 'center',
    },
    cardImage: {
        height: height(20),
        width: height(20),
        resizeMode: 'contain',
        tintColor: appColors.blue,
    },
    cardText: {
        fontWeight: 'bold',
        fontSize: 20,
        color: appColors.blue,
    },
})
export default adminLogin
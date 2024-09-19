import { View, Text, StyleSheet, Image, ScrollView, TouchableOpacity, Button } from 'react-native'
import React, { useEffect, useState } from 'react'
import { width, height } from 'react-native-dimension'
import { appColors } from '../../colors'
import { appImages } from '../../constants'
import Modal from "react-native-modal";
import { Wspacer } from '../../components/spacer'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { getAllOfCollection } from '../../../android/app/src/firebasefunction/Utility'
import { StackActions } from '@react-navigation/native'


const Home = (props) => {
  const [isModalVisible, setModalVisible] = useState(false);
  const [studentData, setStudentData] = useState({});

  useEffect(() => {
    testingFun()
  }, [])

  const testingFun = async () => {
    const userData = await AsyncStorage.getItem("userData")
    console.log('12345678', userData?.email);
    if (userData != null) {
      let data = JSON.parse(userData)

      getAllOfCollection('Student').then((result) => {
        let findStudent = result?.find(res => res?.email == data?.email && res?.passWord == data?.password)
        setStudentData(findStudent)
        console.log('findStudentfindStudent', findStudent);
        console.log('12345678', userData)
      }
      )
    }
  }

  const handleLogout = async () => {
    try {
      // Remove the "userData" item from AsyncStorage
      await AsyncStorage.removeItem("userData");
      setModalVisible(!isModalVisible)
      props.navigation.dispatch(StackActions.replace('AuthStack', {
        screen: 'Splash'
      }))
      // Other logout logic here, such as navigating to the login screen
    } catch (error) {
      // Handle error
      console.error('Error clearing AsyncStorage:', error);
    }
  };

  return (
    <View>
      <View style={styles.topView}>
        <View style={styles.headers}>
          <Text style={styles.textA}>
            Hi, {studentData?.name}
          </Text>
          <Text style={styles.textB} onPress={() => setModalVisible(!isModalVisible)}>logout</Text>
        </View>
        <TouchableOpacity onPress={() => props.navigation.navigate('studentProfile', { data: studentData })}>
          <Image style={styles.image}
            resizeMode='contain'
            tintColor={appColors.black}
            source={appImages.profile} />

        </TouchableOpacity>
      </View>

      <ScrollView contentContainerStyle={{ paddingBottom: height(10) }}>
        <View style={styles.background}>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('viewAnnouncement')} style={styles.mainView}>
            <Image source={appImages.announcement} resizeMode='contain' style={styles.imageA} />
            <Text>
              View Announcment
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('veiwAttendance', { attendance: studentData?.attendance })}
            style={styles.mainView}>
            <Image source={appImages.attendance} resizeMode='contain' style={styles.imageA} />
            <Text>
              View Attendance
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('veiwResult', { screenType: 'student', className: studentData?.class, section: studentData?.section })}
            style={styles.mainView}>
            <Image source={appImages.result} resizeMode='contain' style={styles.imageA} />
            <Text>
              View Result
            </Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => props.navigation.navigate('ContactUs')} style={styles.mainView}>
            <Image source={appImages.contactUs} resizeMode='contain' style={styles.imageA} />
            <Text>
              Contact Us
            </Text>
          </TouchableOpacity>


        </View>
      </ScrollView>

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
            <Button title="Logout" onPress={() => {
              setModalVisible(!isModalVisible)
              handleLogout()
            }} />
            <Wspacer />
            <Button title="Cancel" onPress={() => setModalVisible(!isModalVisible)} />

          </View>
        </View>
      </Modal >

    </View >
  )
}
const styles = StyleSheet.create({
  mainView: {
    alignItems: 'center',
    backgroundColor: 'white',
    marginHorizontal: 20,
    marginTop: 20,
    borderRadius: 10,
    padding: 20,
  },
  topView: {
    flexDirection: "row",
    justifyContent: 'space-between',
    margin: 10,
  },
  textA: {
    fontWeight: 'bold',
  },
  textB: {
    color: 'red',
  },
  image: {
    height: width(15),
    width: width(15),
    // marginRight: 7,
  },
  headers: {
    marginLeft: 10,
  },
  background: {
    // height: 5000,
    borderRadius: 20,
    weight: 40,
    marginVertical: 30,
    paddingBottom: 20,
    margin: 10,
    backgroundColor: 'gray',
  },
  imageA: {
    height: width(30),
    weight: width(30),
    alignSelf: 'center',
    margin: 10,

  },
  textC: {
    align: 'content',
  }

})
export default Home

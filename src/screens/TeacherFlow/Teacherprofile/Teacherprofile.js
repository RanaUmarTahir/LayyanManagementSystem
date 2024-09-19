import { View, Text, StyleSheet } from 'react-native'
import React, { useState } from 'react'
import { height, width } from 'react-native-dimension'
import { Image } from 'react-native'
import { appImages } from '../../../constants'

const Teacherprofile = (props) => {

    const [teacherProfile, setTeacherProfile] = useState(props?.route?.params?.data ?? {});
    console.log('[poiuyiop', teacherProfile)
    6
    return (
        <View>
            <Text style={styles.header}>Teacher Profile</Text>
            <View style={styles.mainView} >

                <Image style={styles.image} resizeMode='contain'
                    source={appImages.profile} />

                <View style={styles.textView}>
                    <View style={{ width: width(20), }}>
                        <Text>Name</Text>
                        <Text>Phone No.</Text>
                        <Text>Subject</Text>
                        <Text>Email</Text>
                    </View>

                    <View style={{ width: width(50), }}>
                        <Text>{teacherProfile?.name} {teacherProfile?.fatherName}</Text>
                        <Text>{teacherProfile?.contactnumber}</Text>
                        <View style={{ flexDirection: 'row' }}>
                            {teacherProfile?.subject?.map((sub) => {
                                return (
                                    <Text>{sub}, </Text>
                                )
                            })}
                        </View>
                        <Text>{teacherProfile?.email}</Text>
                    </View>
                </View>





            </View>
        </View>
    )
}


const styles = StyleSheet.create({
    header: {
        alignSelf: 'center',
        fontSize: 24,
        fontWeight: 'bold',
        marginTop: 10,

    },
    mainView: {
        marginTop: 50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black',
        // backgroundColor: "red",
        padding: 10,
        width: width(85),
        alignSelf: 'center'
    },
    image: {
        height: width(12),
        width: width(12),
        alignSelf: 'center',
    },
    textView: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 10,

    },
})

export default Teacherprofile
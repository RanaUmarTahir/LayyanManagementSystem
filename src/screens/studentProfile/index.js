import { View, Text, StyleSheet, Image } from 'react-native'
import React, { useState } from 'react'
import { width } from "react-native-dimension";
import { appImages } from '../../constants';

const studentProfile = (props) => {
    const [studentProfile, setStudentProfile] = useState(props?.route?.params?.data ?? {});
    console.log('[studentProfile', studentProfile)

    return (
        <View>
            <Text style={styles.header}>Student Profile</Text>
            <View style={styles.mainView} >

                <Image style={styles.image} resizeMode='contain'
                    source={appImages.profile} />

                <View style={styles.textView}>
                    <View>
                        <Text>Name</Text>
                        <Text>Phone No.</Text>
                        <Text>Class</Text>
                        <Text>Email</Text>
                    </View>

                    <View>
                        <Text>{studentProfile?.name} {studentProfile?.fatherName}</Text>
                        <Text>{studentProfile?.contactnumber}</Text>
                        <Text>{studentProfile?.class}/{studentProfile?.section}</Text>
                        <Text>{studentProfile?.email}</Text>
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
        margin: 50,
        borderRadius: 10,
        borderWidth: 2,
        borderColor: 'black',
        // backgroundColor: "red",
        padding: 10,
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
export default studentProfile
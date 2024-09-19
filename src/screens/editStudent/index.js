import { View, Text, StyleSheet, TextInput, ScrollView } from 'react-native'
import React from 'react'
import { appColors } from '../../constants/colos'
import { width, height } from 'react-native-dimension'
import { Spacer } from '../../components/spacer'
import { TextBar } from '../../components/textBar'
import { CustomButton } from '../../components/button'

const editStudent = (props) => {
    return (
        <View style={styles.sectionContainer}>
            <Text style={styles.header}>Edit Student</Text>
            <Spacer />
            <ScrollView style={styles.scrollBar}>
                <Text style={styles.boxName}>Name</Text>
                <TextBar placeHolder={'Name'} />
                <Text style={styles.boxName}>Father Name</Text>
                <TextBar placeHolder={'Father Name'} />
                <Text style={styles.boxName}>CNIC</Text>
                <TextBar placeHolder={'CNIC'} />
                <Text style={styles.boxName}>Contact Number</Text>
                <TextBar placeHolder={'Contact Number'} />
                <Text style={styles.boxName}>Email</Text>
                <TextBar placeHolder={'Email'} />
                <Text style={styles.boxName}>Address</Text>
                <TextBar placeHolder={'Address'} />
                <Text style={styles.boxName}>Class</Text>
                <TextBar placeHolder={'Class'} />
            </ScrollView>
            <CustomButton buttonText={'Save'} />
        </View>
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
    scrollBar: {
        marginBottom: height(15),
    },
})
export default editStudent
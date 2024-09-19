import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import React from 'react'
import { width, height } from 'react-native-dimension'
import { appImages } from '../../constants'
import { appColors } from '../../constants/colos'
import { Wspacer } from '../spacer'
import editTeacher from '../../screens/editTeacher'

export const Namebar = ({ name, srnum, onPressEdit, onPressDelete }) => {
    return (
        <View style={styles.nameBar}>
            <View style={styles.iconView}>
                <Text style={styles.nameText}>{srnum}.</Text>
                <Wspacer />
                <Text style={styles.nameText}>{name}</Text>
            </View>
            <View style={styles.iconView}>
                <TouchableOpacity onPress={onPressEdit}>
                    <Image source={appImages.edit} style={styles.iconStyle}
                    // onPressEdit={() => props.navigation.navigate('AddStudent', { item })}
                    />
                </TouchableOpacity>
                <Wspacer />
                <TouchableOpacity onPress={onPressDelete}>
                    <Image source={appImages.delete} style={styles.iconStyleb} />
                </TouchableOpacity>
            </View>
        </View>
    )
}

export const Textlist = ({ name, route }) => {

    return (
        <View>
            <TouchableOpacity style={styles.nameBar} onPress={route}>
                <Text style={styles.nameText}>{name}</Text>
            </TouchableOpacity>
        </View>
    )
}

const styles = StyleSheet.create({
    nameBar: {
        height: height(8),
        width: width(80),
        alignSelf: 'center',
        flexDirection: 'row',
        alignItems: 'center',
        borderRadius: 10,
        borderColor: appColors.black,
        backgroundColor: appColors.lightgrey,
        padding: 10,
        justifyContent: 'space-between',
        margin: 5,
    },
    nameText: {
        fontSize: 18,
        fontWeight: 'bold',
        color: appColors.blue,
    },
    iconView: {
        flexDirection: 'row',
    },
    iconStyle: {
        height: height(4),
        width: height(4),
        tintColor: appColors.blue,
    },
    iconStyleb: {
        height: height(4),
        width: height(4),
        tintColor: appColors.red,
    },
})
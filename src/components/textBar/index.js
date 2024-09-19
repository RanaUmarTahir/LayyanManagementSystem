import { View, Text, StyleSheet, TextInput } from 'react-native'
import React from 'react'
import { width, height } from 'react-native-dimension'
import { appColors } from '../../constants/colos'

export const TextBar = ({ placeHolder, onChangeText, value }) => {
  return (
    <View>
      <TextInput
        style={styles.searchBar}
        placeholder={placeHolder}
        value={value}
        onChangeText={onChangeText}
      />
    </View>
  )
}
const styles = StyleSheet.create({
  searchBar: {
    height: height(8),
    width: width(90),
    alignSelf: 'center',
    borderRadius: 10,
    borderColor: appColors.black,
    backgroundColor: appColors.lightgrey,
    padding: 10,
  },
})

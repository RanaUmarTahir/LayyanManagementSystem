import { View, Text, LogBox } from 'react-native'
import React from 'react'
import Navigation from './src/Navigations'

const App = () => {
  LogBox.ignoreAllLogs()
  return (
    <View style={{ flex: 1 }}>
      <Navigation />
    </View>
  )
}

export default App
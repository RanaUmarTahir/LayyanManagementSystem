import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import AuthStack from './Authstock';
import mainStack from './mainStack';


const { Navigator, Screen } = createNativeStackNavigator()
const Navigation = () => {
  return (
    <NavigationContainer>
      <Navigator screenOptions={{ headerShown: false }} >
        <Screen name={'AuthStack'} component={AuthStack} />
        <Screen name={'mainStack'} component={mainStack} />
      </Navigator>
    </NavigationContainer>
  );
};

export default Navigation;
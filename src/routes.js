import * as React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import Main from './pages/Main';
import User from './pages/User';

const { Navigator, Screen } = createStackNavigator();

export default function Routes() {
  const globalStylesHeader = {
    headerStyle: {
      backgroundColor: '#7159C1',
    },
    headerTintColor: '#FFF',
  };

  return (
    <NavigationContainer>
      <Navigator screenOptions={globalStylesHeader}>
        <Screen name="Main" component={Main} />
        <Screen name="User" component={User} />
      </Navigator>
    </NavigationContainer>
  );
}

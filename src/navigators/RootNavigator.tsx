import { NavigatorScreenParams } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

import HomeScreen from '../screens/HomeScreen';
import MapScreen, { StackParamList } from '../screens/MapScreen';

export type RootStackParamList = {
  Home: undefined;
  Map: NavigatorScreenParams<StackParamList>;
  Eat: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();

const RootNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={HomeScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Map" component={MapScreen} options={{ headerShown: false }} />
      <Stack.Screen name="Eat" component={MapScreen} options={{ headerShown: false }} />
    </Stack.Navigator>
  );
};

export default RootNavigator;

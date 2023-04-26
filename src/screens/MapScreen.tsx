import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import {
  createNativeStackNavigator,
  NativeStackNavigationProp,
} from '@react-navigation/native-stack';
import { Icon } from '@rneui/themed';
import React from 'react';
import { TouchableOpacity, View } from 'react-native';

import Map from '../components/Map';
import NavigateCard from '../components/NavigateCard';
import RideOptionsCard from '../components/RideOptionsCard';
import { RootStackParamList } from '../navigators/RootNavigator';

export type StackParamList = {
  NavigateCard: undefined;
  RideOptionsCard: undefined;
};

const Stack = createNativeStackNavigator<StackParamList>();

type NavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<StackParamList, 'NavigateCard'>,
  NativeStackNavigationProp<RootStackParamList>
>;
const MapScreen = () => {
  const navigation = useNavigation<NavigationProp>();
  return (
    <View>
      <TouchableOpacity
        onPress={() => navigation.navigate('Home')}
        className="absolute top-16 left-8 bg-gray-100 z-10 p-3 rounded-full shadow-lg"
      >
        <Icon name="menu" />
      </TouchableOpacity>
      <View className="h-1/2">
        <Map />
      </View>
      <View className="h-1/2">
        <Stack.Navigator initialRouteName="NavigateCard">
          <Stack.Screen
            name="NavigateCard"
            component={NavigateCard}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="RideOptionsCard"
            component={RideOptionsCard}
            options={{ headerShown: false }}
          />
        </Stack.Navigator>
      </View>
    </View>
  );
};

export default MapScreen;

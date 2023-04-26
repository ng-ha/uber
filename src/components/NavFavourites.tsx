import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '@rneui/themed';
import React from 'react';

import { FlatList, Text, TouchableOpacity, View } from 'react-native';
import { RootStackParamList } from '../navigators/RootNavigator';
import { StackParamList } from '../screens/MapScreen';
import { useAppDispatch } from '../store/hooks';
import { Place, setDestination, setOrigin } from '../store/slices/navSlice';

const data = [
  {
    id: '1',
    icon: 'home',
    location: 'Home',
    description: 'Cầu Giấy, Hà Nội, Việt Nam',
    place: {
      location: {
        lat: 21.0362368,
        lng: 105.7905825,
      },
      description: 'Cầu Giấy, Hanoi, Vietnam',
    },
  },
  {
    id: '2',
    icon: 'briefcase',
    location: 'Work',
    description: 'Tây Hồ, Hà Nội, Việt Nam',
    place: {
      location: {
        lat: 21.0811211,
        lng: 105.8180306,
      },
      description: 'Tây Hồ, Hanoi, Vietnam',
    },
  },
  {
    id: '3',
    icon: 'barbell',
    location: 'Gym',
    description: 'Đống Đa, Hà Nội, Việt Nam',
    place: {
      location: { lat: 21.0180725, lng: 105.8299495 },
      description: 'Đống Đa, Hanoi, Vietnam',
    },
  },
  {
    id: '4',
    icon: 'school',
    location: 'School',
    description: 'Thanh Xuân, Hà Nội, Việt Nam',
    place: {
      location: { lat: 20.9959819, lng: 105.8097244 },
      description: 'Thanh Xuân, Hanoi, Vietnam',
    },
  },
];

type NavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'Home'>,
  NativeStackNavigationProp<StackParamList>
>;
type Props = {
  screen: 'Home' | 'Map';
};
const NavFavourites = ({ screen }: Props) => {
  const navigation = useNavigation<NavigationProp>();
  const dispatch = useAppDispatch();

  const onPress = (place: Place) => {
    if (screen === 'Home') {
      dispatch(setOrigin(place));
      navigation.navigate('Map', { screen: 'NavigateCard' });
    } else {
      dispatch(setDestination(place));
    }
  };
  return (
    <FlatList
      data={data}
      keyExtractor={(item) => item.id}
      ItemSeparatorComponent={() => <View className="bg-gray-200 h-[0.5px]" />}
      renderItem={({ item: { location, description, icon, place } }) => (
        <TouchableOpacity onPress={() => onPress(place)} className="flex-row items-center p-5">
          <Icon
            name={icon}
            type="ionicon"
            color="white"
            size={18}
            style={{
              marginRight: 16,
              borderRadius: 9999,
              backgroundColor: '#E5E7EB',
              padding: 12,
            }}
          />
          <View>
            <Text className="font-semibold text-lg">{location}</Text>
            <Text className="text-gray-500">{description}</Text>
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavFavourites;

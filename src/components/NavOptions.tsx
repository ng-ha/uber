import { useNavigation } from '@react-navigation/native';
import { Icon } from '@rneui/themed';
import React from 'react';
import { FlatList, Image, ImageSourcePropType, Text, TouchableOpacity, View } from 'react-native';

import { HomeScreenNavigationProp } from '../screens/HomeScreen';
import { useAppSelector } from '../store/hooks';
import { selectOrigin } from '../store/slices/navSlice';

type data = {
  id: string;
  title: string;
  image: ImageSourcePropType;
  screen: 'Map' | 'Eat';
};
const data: data[] = [
  {
    id: '1',
    title: 'Get a ride',
    image: require('../../assets/images/UberX.webp'),
    screen: 'Map',
  },
  {
    id: '2',
    title: 'Order food',
    image: require('../../assets/images/4feb745209cf7aba57463b20d27b61e3.png'),
    screen: 'Eat',
  },
];

const NavOptions = () => {
  const navigation = useNavigation<HomeScreenNavigationProp>();
  const origin = useAppSelector(selectOrigin);

  return (
    <FlatList
      data={data}
      horizontal
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TouchableOpacity
          disabled={!origin}
          onPress={() => {
            if (item.screen === 'Map') {
              navigation.navigate('Map', { screen: 'NavigateCard' });
            } else {
              navigation.navigate('Eat');
            }
          }}
          className="p-2 pl-6 pb-8 pt-4 bg-gray-200 m-2 w-40"
        >
          <View className={!origin ? 'opacity-30' : ''}>
            <Image source={item.image} className="w-[120px] h-[120px]" resizeMode="contain" />
            <Text className="mt-2 text-lg font-semibold">{item.title}</Text>
            <Icon
              type="antdesign"
              name="arrowright"
              color="white"
              style={{
                padding: 8,
                backgroundColor: 'black',
                borderRadius: 99,
                width: 40,
                marginTop: 16,
              }}
            />
          </View>
        </TouchableOpacity>
      )}
    />
  );
};

export default NavOptions;

import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '@rneui/themed';
import React, { useState } from 'react';
import {
  FlatList,
  Image,
  ImageSourcePropType,
  SafeAreaView,
  Text,
  TouchableOpacity,
  View,
} from 'react-native';

import { RootStackParamList } from '../navigators/RootNavigator';
import { StackParamList } from '../screens/MapScreen';
import secondsToHms from '../secondsToHms';
import { useAppSelector } from '../store/hooks';
import { selectTravelTimeInformation } from '../store/slices/navSlice';

type NavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<StackParamList, 'RideOptionsCard'>,
  NativeStackNavigationProp<RootStackParamList>
>;
type Item = {
  id: string;
  title: string;
  multiplier: number;
  image: ImageSourcePropType;
};
const data: Item[] = [
  {
    id: 'Uber-X',
    title: 'UberX',
    multiplier: 1,
    image: require('../../assets/images/UberX.webp'),
  },
  {
    id: 'Uber-XL',
    title: 'Uber XL',
    multiplier: 1.2,
    image: require('../../assets/images/UberXL.webp'),
  },
  {
    id: 'Uber-LUX',
    title: 'Uber LUX',
    multiplier: 1.75,
    image: require('../../assets/images/Lux.webp'),
  },
];
const SURGE_CHARGE_RATE = 1.5;

const RideOptionsCard = () => {
  const navigation = useNavigation<NavigationProp>();
  const [selected, setSelected] = useState<Item | null>(null);
  const travelTimeInformation = useAppSelector(selectTravelTimeInformation);
  return (
    <SafeAreaView className="bg-white flex-grow">
      <View>
        <TouchableOpacity
          onPress={() => navigation.navigate('NavigateCard')}
          className="absolute top-3 left-5 p-1 rounded-full z-10 bg-black"
        >
          <Icon name="chevron-left" type="fontawesome" color="white" size={28} />
        </TouchableOpacity>
        <Text className="text-center py-5 text-xl">
          Select a Ride - {travelTimeInformation?.distance.toFixed(2)}km
        </Text>
      </View>
      <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({ item: { id, image, multiplier, title }, item }) => (
          <TouchableOpacity
            onPress={() => setSelected(item)}
            className={`flex-row items-center justify-between px-10 ${
              id === selected?.id && 'bg-gray-200'
            }`}
          >
            <Image source={image} resizeMode="contain" className="w-[100px] h-[100px]" />
            <View className="-ml-6">
              <Text className="text-xl font-semibold">{title}</Text>
              <Text className="text-xs italic text-gray-500 ">
                {secondsToHms(travelTimeInformation?.duration! * 60)} Travel time
              </Text>
            </View>
            <Text className="text-xl">
              {new Intl.NumberFormat('en-us', {
                style: 'currency',
                currency: 'USD',
              }).format(
                (travelTimeInformation?.duration! * 60 * SURGE_CHARGE_RATE * multiplier) / 100
              )}
            </Text>
          </TouchableOpacity>
        )}
      />
      <View>
        <TouchableOpacity
          disabled={!selected}
          className={` bg-black py-3 m-3 rounded-lg ${!selected && 'bg-gray-400'}`}
          onPress={() => navigation.navigate('Home')}
        >
          <Text className="text-center text-white text-xl">Choose {selected?.title}</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default RideOptionsCard;

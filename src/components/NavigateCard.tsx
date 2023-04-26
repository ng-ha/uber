import { GOOGLE_MAP_APIKEY } from '@env';
import { CompositeNavigationProp, useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Icon } from '@rneui/themed';
import React from 'react';
import { SafeAreaView, Text, TouchableOpacity, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';

import { RootStackParamList } from '../navigators/RootNavigator';
import { StackParamList } from '../screens/MapScreen';
import { useAppDispatch } from '../store/hooks';
import { Place, setDestination } from '../store/slices/navSlice';
import NavFavourites from './NavFavourites';

type NavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<StackParamList, 'NavigateCard'>,
  NativeStackNavigationProp<RootStackParamList>
>;
const NavigateCard = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NavigationProp>();
  return (
    <SafeAreaView className="bg-white flex-1 ">
      <Text className="text-center py-5 text-xl">Good Morning, Nguyen Ha</Text>
      <View className="flex-shrink">
        <View>
          <GooglePlacesAutocomplete
            placeholder="Where to?"
            debounce={400}
            nearbyPlacesAPI="GooglePlacesSearch"
            fetchDetails
            enablePoweredByContainer={false}
            query={{
              key: GOOGLE_MAP_APIKEY,
              language: 'en',
            }}
            minLength={2}
            // returnKeyType="search"
            styles={{
              container: {
                backgroundColor: 'white',
                paddingTop: 0,
                flex: 0,
              },
              textInput: {
                backgroundColor: '#DDDDDF',
                borderRadius: 8,
                fontSize: 18,
              },
              textInputContainer: {
                paddingHorizontal: 20,
                paddingBottom: 0,
              },
            }}
            onPress={(data, details) => {
              dispatch(
                setDestination({
                  location: details?.geometry.location,
                  description: data.description,
                } as Place)
              );
              navigation.navigate('RideOptionsCard');
            }}
          />
        </View>
        <NavFavourites screen="Map" />
      </View>

      <View className="flex-row bg-white justify-evenly py-2 mt-auto">
        <TouchableOpacity
          onPress={() => navigation.navigate('RideOptionsCard')}
          className="flex-row justify-between bg-black w-24 px-4 py-3 rounded-full"
        >
          <Icon name="car" type="font-awesome" color="white" size={16} />
          <Text className="text-white text-center">Rides</Text>
        </TouchableOpacity>

        <TouchableOpacity className="flex-row justify-between w-24 px-4 py-3 rounded-full">
          <Icon name="fast-food-outline" type="ionicon" color="black" size={16} />
          <Text className="text-center">Eats</Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
};

export default NavigateCard;

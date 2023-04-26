import { GOOGLE_MAP_APIKEY } from '@env';
import { CompositeNavigationProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import React from 'react';
import { Image, SafeAreaView, View } from 'react-native';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import NavFavourites from '../components/NavFavourites';

import NavOptions from '../components/NavOptions';
import { RootStackParamList } from '../navigators/RootNavigator';
import { useAppDispatch } from '../store/hooks';
import { Place, setDestination, setOrigin } from '../store/slices/navSlice';
import { StackParamList } from './MapScreen';

export type HomeScreenNavigationProp = CompositeNavigationProp<
  NativeStackNavigationProp<RootStackParamList, 'Home'>,
  NativeStackNavigationProp<StackParamList>
>;

const HomeScreen = () => {
  const dispatch = useAppDispatch();
  return (
    <SafeAreaView className="bg-white h-full">
      <View className="p-5">
        <Image
          source={require('../../assets/images/2560px-Uber_logo_2018.svg.png')}
          className="w-[100px] h-[100px]"
          resizeMode="contain"
        />
        <GooglePlacesAutocomplete
          nearbyPlacesAPI="GooglePlacesSearch"
          debounce={400}
          placeholder="Where from?"
          query={{ key: GOOGLE_MAP_APIKEY, language: 'en' }}
          styles={{ container: { flex: 0 }, textInput: { fontSize: 18 } }}
          minLength={2}
          enablePoweredByContainer={false}
          fetchDetails
          onPress={(data, details) => {
            dispatch(
              setOrigin({
                location: details?.geometry.location,
                description: data.description,
              } as Place)
            );
            dispatch(setDestination(null));
          }}
        />
        <NavOptions />
        <NavFavourites screen="Home" />
      </View>
    </SafeAreaView>
  );
};

export default HomeScreen;

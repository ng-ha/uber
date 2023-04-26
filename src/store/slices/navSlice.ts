import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from '..';

interface navState {
  origin: Place | null;
  destination: Place | null;
  travelTimeInformation: TravelTimeInformation | null;
}
export type Place = {
  location: {
    lat: number;
    lng: number;
  };
  description: string;
};
export type TravelTimeInformation = {
  duration: number;
  distance: number;
};
const initialState: navState = {
  origin: null,
  destination: null,
  travelTimeInformation: null,
};

export const navSlice = createSlice({
  name: 'nav',
  initialState,
  reducers: {
    setOrigin: (state, action: PayloadAction<Place | null>) => {
      // console.log({ origin: action.payload });
      state.origin = action.payload;
    },
    setDestination: (state, action: PayloadAction<Place | null>) => {
      // console.log({ destination: action.payload });
      state.destination = action.payload;
    },
    setTravelTimeInformation: (state, action: PayloadAction<TravelTimeInformation | null>) => {
      state.travelTimeInformation = action.payload;
    },
  },
});
export const { setOrigin, setDestination, setTravelTimeInformation } = navSlice.actions;

export const selectOrigin = (state: RootState) => state.nav.origin;
export const selectDestination = (state: RootState) => state.nav.destination;
export const selectTravelTimeInformation = (state: RootState) => state.nav.travelTimeInformation;

export default navSlice.reducer;

import { configureStore } from '@reduxjs/toolkit';
import countriesSlice from '../features/countries/countriesSlice.tsx';
import favouritesSlice from '../features/countries/favoriteSlice'
import modalSlice from '../features/countries/modalSlice'

export default configureStore({
  reducer: {
    countries: countriesSlice,
    favourites: favouritesSlice,
    modal: modalSlice
  },
}); 

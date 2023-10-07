import { addFavouriteToFirebase, auth, clearFavoritesFromFirebase, db, removeFavouriteFromFirebase } from "../../auth/firebase"
import { collection, getDocs } from "firebase/firestore";

import { createSlice } from "@reduxjs/toolkit"

export const favouritesSlice = createSlice({
  name: 'favourites',
  initialState: {
    favourites: [],
    isLoading: true
  },
  reducers: {
    isLoading(state, action) {
      state.isLoading = action.payload;
    },
    getFavourites(state, action) {
      state.favourites = action.payload;
    },

    addFavourite: (state, action) => {
      if (state.favourites.some(fav => fav === action.payload)) state.favourites = [...state.favourites]
      state.favourites = [...state.favourites, action.payload]
      const user = auth.currentUser;
      if (user) addFavouriteToFirebase(user.uid, action.payload)
    },
    removeFavourite: (state, action) => {
      const newArray = [...state.favourites]
      newArray.splice(newArray.findIndex(e => e === action.payload), 1)
      state.favourites = newArray
      const user = auth.currentUser;
      if (user) removeFavouriteFromFirebase(user.uid, action.payload)
    },
    clearFavourites: (state, action) => {
      state.favourites = []
      const user = auth.currentUser;
      if (user) clearFavoritesFromFirebase(user.uid)
    }
  }
})
export const getFavouritesFromFirbase = () => async (dispatch) => {
  const user = auth.currentUser;
  if (user) {
    const q = await getDocs(collection(db, `users/${user.uid}/favourites`))
    const favourites = q.docs.map((doc) => doc.data().countryName);
    dispatch(getFavourites(favourites));
    dispatch(isLoading(false));
  }
}

export const { getFavourites, isLoading, addFavourite, removeFavourite, clearFavourites } = favouritesSlice.actions
export default favouritesSlice.reducer


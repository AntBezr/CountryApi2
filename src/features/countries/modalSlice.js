import { createSlice } from "@reduxjs/toolkit";

export const modalSlice = createSlice({
  name: 'modal',
  initialState: {
    modalShow: false,
  },
  reducers: {
    setModalShow: (state, action) => {
      state.modalShow = action.payload
    }
  }
})

export const { setModalShow } = modalSlice.actions;
export default modalSlice.reducer
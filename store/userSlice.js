import { createSlice } from "@reduxjs/toolkit";

const name = "user";

export const userSlice = createSlice({
  name: "user",
  initialState: {
    userInfo: null,
    address: null,
    credentials: null,
  },
  reducers: {
    setUserInfo: (state, action) => {
      state.userInfo = action.payload;
    },
    deleteUserInfo: (state) => {
      state.userInfo = null;
    },
    updateUserInfo: (state, action) => {
      const user = state.userInfo;
      const { key, value } = action.payload;

      if (user) {
        state.userInfo[key] = value;
      }
    },
    updateAddress: (state, action) => {
      state.address = action.payload;
    },
    updateCredentials: (state, action) => {
      state.credentials = action.payload;
    },
  },
  extraReducers: {},
});

// Action creators are generated for each case reducer function
export const {
  setUserInfo,
  deleteUserInfo,
  updateUserInfo,
  updateAddress,
  updateCredentials,
} = userSlice.actions;

export const selectUserAddress = (state) => state[name].address;
export const selectUserCredentials = (state) => state[name].credentials;
// export default cartSlice.reducer;

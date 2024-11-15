import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  userType: "Tutor",
  user: null,
  userImage: null,
  userEmail: null,
  otpFlag: null,
  userData: null,
  refreshToken: null,
  accessToken: null,
  userOtp: null,
  deviceId: null,
  deviceToken: null,
  isLogin: false,
};

export const userDataSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUserType: (state, action) => {
      state.userType = action.payload;
    },
    setUserLogin: (state, action) => {
      state.isLogin = true;
    },
    setDeviceId: (state, action) => {
      state.deviceId = action.payload;
    },
    setDeviceToken: (state, action) => {
      state.deviceToken = action.payload;
    },
    setUser: (state, action) => {
      state.user = action.payload;
    },
    setUserImage: (state, action) => {
      state.userImage = action.payload;
    },
    setUserEmail: (state, action) => {
      state.userEmail = action.payload;
    },
    setOTPFlag: (state, action) => {
      state.otpFlag = action.payload;
    },
    setAccessToken: (state, action) => {
      state.accessToken = action.payload;
    },
    setRefreshToken: (state, action) => {
      state.refreshToken = action.payload;
    },
    setUserData: (state, action) => {
      state.userData = action.payload;
    },
    setUserOtp: (state, action) => {
      state.userOtp = action.payload;
    },
    setClearUserReducer: (state, action) => {
      (state.userType = "Tutor"),
        (state.user = null),
        (state.userImage = null),
        (state.otpFlag = null),
        (state.userData = null),
        (state.refreshToken = null),
        (state.accessToken = null),
        (state.userOtp = null),
        (state.deviceId = null),
        (state.deviceToken = null);
      state.isLogin = null;
    },
  },
});

export const {
  setUserType,
  setDeviceId,
  setDeviceToken,
  setUser,
  setUserImage,
  setUserEmail,
  setOTPFlag,
  setAccessToken,
  setRefreshToken,
  setUserData,
  setUserOtp,
  setClearUserReducer,
  setUserLogin,
} = userDataSlice.actions;
export default userDataSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";
import type { RootState } from "../index";

// Define a type for the slice state
interface authState {
    token: null | string;
    profileImage: null | string;
    userName: string;
}

// Define the initial state using that type
const initialState: authState = {
    token: "",
    profileImage: null,
    userName: ""
};

const authSlice = createSlice({
    name: "auth",
    initialState,
    reducers: {
        resetState: () => {
            return initialState;
        },
        setCredentials: (state, action) => {
            const { access_token } = action.payload;
            state.token = access_token;
        },
        setProfileData: (state, action) => {
            const { userName, profileImage } = action.payload;
            state.profileImage = profileImage;
            state.userName = userName;
        }
    }
});

export const { setCredentials, resetState, setProfileData } = authSlice.actions;

export default authSlice.reducer;

export const selectCurrentToken = (state: RootState) => state.auth.token;
export const selectProfileImage = (state: RootState) => state.auth.profileImage;
export const selectUserName = (state: RootState) => state.auth.userName;

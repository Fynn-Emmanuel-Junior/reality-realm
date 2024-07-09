import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface ProfileData {
  firstname: string;
  surname: string;
  role: string;
  phoneNumber: string;
}

interface ProfileState {
  data: ProfileData | null; 
}

const initialState: ProfileState = {
  data: null,
};

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    setProfileData: (state, action: PayloadAction<ProfileData>) => {
      state.data = action.payload;
    },
    removeProfileData: (state) => {
      state.data = null;
    },
  },
});

export const { setProfileData, removeProfileData } = profileSlice.actions;

export default profileSlice.reducer;

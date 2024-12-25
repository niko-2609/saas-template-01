import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';

interface ProfileState {
  username?: string;
  phone?: string;
  country?: string;
  language?: string;
  timezone?: string;
  isLoading: boolean;
  error: string | null;
}

const initialState: ProfileState = {
  isLoading: false,
  error: null,
};

export const fetchProfile = createAsyncThunk(
  'profile/fetchProfile',
  async (userId: string) => {
    const response = await fetch(`/api/profile/${userId}`);
    return response.json();
  }
);

export const updateProfileData = createAsyncThunk(
  'profile/updateProfile',
  async ({ userId, data }: { userId: string; data: Partial<ProfileState> }) => {
    const response = await fetch(`/api/profile/${userId}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });
    return response.json();
  }
);

const profileSlice = createSlice({
  name: 'profile',
  initialState,
  reducers: {
    resetProfile: () => initialState,
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchProfile.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProfile.fulfilled, (state, action) => {
        state.isLoading = false;
        return { ...state, ...action.payload };
      })
      .addCase(updateProfileData.fulfilled, (state, action) => {
        return { ...state, ...action.payload };
      });
  },
}); 


export const { resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
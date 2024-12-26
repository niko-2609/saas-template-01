import { createSlice, createAsyncThunk } from '@reduxjs/toolkit';
import { getProfile, updateProfile, ProfileFormData } from '@/features/profile/server/actions';

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
    const response = await getProfile(userId);
    if (response.error) {
      throw new Error(response.error);
    }
    return response.user;
  }
);

export const updateProfileData = createAsyncThunk(
  'profile/updateProfile',
  async ({ userId, data }: { userId: string; data: ProfileFormData }) => {
    const response = await updateProfile(userId, data);
    if (response.error) {
      throw new Error(response.error);
    }
    return response.user;
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
        state.username = action.payload?.username || undefined;
        state.phone = action.payload?.phone || undefined;
        state.country = action.payload?.country || undefined;
        state.language = action.payload?.language || undefined;
        state.timezone = action.payload?.timezone || undefined;
        state.error = null;
      })
      .addCase(updateProfileData.fulfilled, (state, action) => {
        state.username = action.payload?.username || undefined;
        state.phone = action.payload?.phone || undefined;
        state.country = action.payload?.country || undefined;
        state.language = action.payload?.language || undefined;
        state.timezone = action.payload?.timezone || undefined;
        state.error = null;
      });
  },
}); 


export const { resetProfile } = profileSlice.actions;
export default profileSlice.reducer;
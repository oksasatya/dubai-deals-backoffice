import {configureStore, createAsyncThunk, createSlice} from "@reduxjs/toolkit";
import {api} from "@/app/api/api";
import {getToken} from "@/app/utils/cookies";
import {getUserProfile} from "@/app/services/authService";

export interface UserState{
	data: {
		id?: string;
		email?: string;
		name?: string;
		phone?: string;
		age?: number;
		address?: string;
	} | null;
	loading: boolean;
	error: string | null;
}

const initialState: UserState = {
	data: null,
	loading: false,
	error: null,
};


export const fetchUserProfile = createAsyncThunk(
	'user/fetchUserProfile',
	async (_, { rejectWithValue }) => {
		try {
			const response = await getUserProfile();
			return response.data;
		} catch (error) {
			return rejectWithValue(error instanceof Error ? error.message : 'Failed to fetch user profile');
		}
	}
);

export const userSlice = createSlice({
	name: 'user',
	initialState,
	reducers:{
		clearUserData: (state) => {
			state.data = null;
		},
	},
	extraReducers:(builder) => {
		builder
			.addCase(fetchUserProfile.pending,(state) => {
			state.loading = true;
			state.error = null;
		})
			.addCase(fetchUserProfile.fulfilled,(state,action) => {
			state.data = action.payload;
			state.loading = false;
			})
			.addCase(fetchUserProfile.rejected,(state,action) => {
			state.loading = false;
			state.error = action.payload as string;
			})
	}
})

export const { clearUserData } = userSlice.actions;
export default userSlice.reducer;


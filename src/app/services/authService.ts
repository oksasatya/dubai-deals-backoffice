import {api} from "@/app/api/api";
import {getToken, removeToken} from "@/app/utils/cookies";
import {clearUserData} from "@/app/redux/slices/userSlice";
import {store} from "@/app/redux/slices/store";

// authService.ts
export const login = async (email: string, password: string) => {
	try {
		const response = await fetch(api.login, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});

		const data = await response.json();

		if (response.ok && data.meta && data.meta.status === "success") {
			return data;
		}

		let errorMessage = "Login Failed";

		if (data.data && data.data.message) {
			errorMessage = data.data.message;
		}
		else if (data.meta && data.meta.message) {
			errorMessage = data.meta.message;
		}

		throw new Error(errorMessage);
	} catch (e) {
		if (e instanceof SyntaxError) {
			console.error("Invalid JSON response:", e);
			throw new Error("Server returned invalid response. Please check API endpoint.");
		}

		console.error("Login Error", e);

		throw e;
	}
}

export const logout = () => {
	removeToken();

	store.dispatch(clearUserData());
}

export const getUserProfile = async () => {
	try {
		const response = await fetch(api.userProfile, {
			method: "GET",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${getToken()}`,
			},
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message || "Failed to get profile");
		}

		return data;
	} catch (e) {
		console.error("Failed To Get Profile", e);
		throw e;
	}
};


export const updateUserProfile = async (userData: {
	id?: string;
	name?: string;
	age?: number;
	phone?: string;
	address?: string;
	avatar?: string;
}) => {
	try {
		const response = await fetch(api.updateProfile, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${getToken()}`,
			},
			body: JSON.stringify(userData),
		});

		const data = await response.json();

		if (!response.ok) {
			throw new Error(data.message || "Failed to update profile");
		}

		return data;
	} catch (e) {
		console.error("Failed To Update Profile", e);
		throw e;
	}
};

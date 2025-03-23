import {api} from "@/app/api/api";
import {getToken, removeToken} from "@/app/utils/cookies";
import {clearUserData} from "@/app/redux/slices/userSlice";
import {store} from "@/app/redux/slices/store";

export const login= async (email: string, password: string) => {
	try{
		const response = await fetch(api.login, {
			method: 'POST',
			headers: {
				'Content-Type': 'application/json',
			},
			body: JSON.stringify({ email, password }),
		});

		const data = await response.json();

		if (!response.ok || data.meta.status !== "success") {
			throw new Error(data.data?.message || data.meta.message || "Login failed");
		}

		return data;
	}catch (e) {
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

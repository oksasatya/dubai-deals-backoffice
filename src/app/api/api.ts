const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL;

export const api  = {
	login: `${API_BASE_URL}/users/login`,
	logout: `${API_BASE_URL}/users/logout`,
	userProfile: `${API_BASE_URL}/users/profile`,
}

export const roles = {
	superADMIN: "SUPERADMIN",
	admin: "ADMIN",
}
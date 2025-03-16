import Cookies from "js-cookie";


// get token
export const getToken = () => Cookies.get("token");

// set token
export const setToken = (token: string) => {
	Cookies.set("token", token, { expires: 1 });
};


// remove token
export const removeToken = () => Cookies.remove("token");
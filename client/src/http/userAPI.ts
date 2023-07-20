import { UserI } from "../store/slices/userSlice";
import { $authHost, $host } from "./index";
import jwtDecode from "jwt-decode";

export const register = async (email: string, password: string) => {
  try {
    const { data } = await $host.post("user/register", { email, password });
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
  } catch (e) {
    console.log(e);
  }
};

export const login = async (email: string, password: string) => {
  try {
    const { data } = await $host.post("user/login", { email, password });
    localStorage.setItem("token", data.token);
    return jwtDecode(data.token);
  } catch (e) {
    console.log(e);
  }
};

export const check = async (): Promise<UserI> => {
  const { data } = await $authHost.get<{ token: string }>("user/auth");
  localStorage.setItem("token", data.token);
  return jwtDecode(data.token);
};

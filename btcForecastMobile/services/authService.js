import {apiPost} from './apiService'
import AsyncStorage from '@react-native-async-storage/async-storage';

// handle user signup
export const signup = async (name, email, password) => {
  try{
    const response = await apiPost("auth/signup", { name, email, password });
    if (response?.token) {
      await AsyncStorage.setItem("token", response.token);
      await AsyncStorage.setItem("id", response.userID);
      return response;
    }else{
      throw new Error("error while fetcing");
    }
  }catch(error){
    throw new Error(error);
  }
};

// handle user signin
export const signin = async (email, password) => {
  try{
    const response = await apiPost("auth/signin", { email, password });
    if (response?.token) {
      await AsyncStorage.setItem("token", response.token);
      await AsyncStorage.setItem("id", response.userID);
      return response;
    }else{
      throw new Error("error while fetcing");
    }
  }catch(error){
    throw new Error(error);
  }
};

// log the user out
export const logout = async () => {
    await AsyncStorage.removeItem("token");
};

// check if the user is authenticated (by checking the token)
export const isAuthenticated = async () => {
  const token = await AsyncStorage.getItem("token");
  return !!token;
};
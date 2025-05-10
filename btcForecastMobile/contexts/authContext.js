import React, { createContext, useState, useContext } from "react";
import { signup, signin, logout, isAuthenticated } from "../services/authService";
import { getUserByID } from "../services/userServices";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router'


const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  const handleSignup = async (name, email, password) => {
    try{
      const response = await signup(name, email, password);
      setUser(response.user);
    }catch(error){
      throw new Error(error);
    }
  };

  const handleSignin = async (email, password) => {
    try{
      const response = await signin(email, password);
      setUser(response.user);
    }catch(error){
      throw new Error(error);
    }
  };

  const handleLogout = () => {
    logout();
    setUser(null);
    router.replace("/signin")
  };

  const checkAuthStatus = async () => {
    if (isAuthenticated()) {
      if(!user?.id){
        try{
          const id = await AsyncStorage.getItem("id");
          const userData = await getUserByID(id)
          if (userData.user.id) {
            setUser(userData.user);
          } else {
            console.error("No user data found for this ID");
          }
        }catch(error){
          console.error("error in checkaAuthStatus",error)
        }
      }
    }else{
      setUser(null);
    }
    setLoading(false);
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        handleSignup,
        handleSignin,
        handleLogout,
        checkAuthStatus,
        loading,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
import AsyncStorage from '@react-native-async-storage/async-storage';

export const BASE_URL = "http://IP:8080"; //use local ip here
export const WS_URL = "ws://IP:8080";//use local ip here

const getRequestHeaders = async () => {
  const token = await AsyncStorage.getItem("token");
  return {
    "Content-Type": "application/json",
    Authorization: `Bearer ${token}`,
  };
};

export const apiPost = async (endpoint, data) => {
  try {
    const headers = await getRequestHeaders();
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(data),
    });

    //check if response is ok
    if (!response.ok) {
      throw new Error("Server error, response is not ok")
    }

    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error("Server error")
  }
};

export const apiGet = async (endpoint) => {
  try {
    const headers = await getRequestHeaders();
    const response = await fetch(`${BASE_URL}/${endpoint}`, {
      method: "GET",
      headers: headers,
    });

    // Check if response is ok
    if (!response.ok) {
      throw new Error("Server error, response is not ok");
    }

    const json = await response.json();
    return json;
  } catch (error) {
    throw new Error("Server error");
  }
};
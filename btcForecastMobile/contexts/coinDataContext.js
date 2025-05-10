import React, { createContext, useState, useContext, useEffect } from "react";
import AsyncStorage from '@react-native-async-storage/async-storage';
import { WS_URL, apiPost } from '../services/apiService';

const CoinDataContext = createContext();

export const CoinDataProvider = ({ children }) => {
  const [coins, setCoins] = useState(null);
  const [wsConnection, setWsConnection] = useState(null); // Track WebSocket connection

  const getCoinHistory = async (symbol) => {
    try{
      symbol = symbol+"USDT"
      const response = await apiPost(`coin/coinHistory/${symbol}`, {});
      if (response?.coinHist) {
        return response;
      }else{
        throw new Error("error while fetcing");
      }
    }catch(error){
      console.log("symbol -->>>>  ",error)
      throw new Error(error);
    }
  }
 
  useEffect(() => {
    const fetchTokenAndConnect = async () => {
      const token = await AsyncStorage.getItem("token");
      if (!token) {
        console.log('No token found, cannot connect to WebSocket');
        return;
      }

      const connectWebSocket = () => {
        const ws = new WebSocket(`${WS_URL}/ws?token=${token}`);

        ws.onopen = () => {
          console.log('WebSocket connection opened');
          setWsConnection(ws); // Save connection reference
        };

        ws.onmessage = (event) => {
          const data = event.data;
          try {
            const parsedCoins = JSON.parse(data);
            setCoins(parsedCoins);
          } catch (error) {
            console.error('Error parsing data:', error);
          }
        };

        ws.onclose = (e) => {
          console.log('WebSocket connection closed', e.code, e.reason);
          setWsConnection(null); // Mark WebSocket as closed
        };

        ws.onerror = (e) => {
          console.error('WebSocket error:', e.message);
          setWsConnection(null); // Handle error and mark as closed
        };

        return ws;
      };

      // Connect to WebSocket initially
      let ws = connectWebSocket();

      // Check WebSocket connection every minute and reconnect if closed
      const interval = setInterval(() => {
        if (!ws || ws.readyState === WebSocket.CLOSED) {
          console.log('Reconnecting WebSocket...');
          ws = connectWebSocket();
        }
      }, 60000); // Check every 60 seconds

      // Clean up the WebSocket connection and interval when the component unmounts
      return () => {
        clearInterval(interval);
        if (ws) ws.close();
      };
    };

    fetchTokenAndConnect();
  }, []);

  return (
    <CoinDataContext.Provider value={{ coins, getCoinHistory }}>
      {children}
    </CoinDataContext.Provider>
  );
};

export const useCoinData = () => useContext(CoinDataContext);


















// const datas = [
  //   {
  //     "id": "1",
  //     "symbol": "BTC",
  //     "name": "Bitcoin",
  //     "price": 48000.00,
  //     "percent_change_24h": 1.25,
  //     "market_cap": 900000000000,
  //     "volume_24h": 35000000000
  //   },
  //   {
  //     "id": "2",
  //     "symbol": "ETH",
  //     "name": "Ethereum",
  //     "price": 3200.00,
  //     "percent_change_24h": 0.85,
  //     "market_cap": 380000000000,
  //     "volume_24h": 20000000000
  //   },
  //   {
  //     "id": "3",
  //     "symbol": "XRP",
  //     "name": "Ripple",
  //     "price": 1.00,
  //     "percent_change_24h": -0.5,
  //     "market_cap": 50000000000,
  //     "volume_24h": 1500000000
  //   },
  //   {
  //     "id": "4",
  //     "symbol": "LTC",
  //     "name": "Litecoin",
  //     "price": 180.00,
  //     "percent_change_24h": 2.10,
  //     "market_cap": 12000000000,
  //     "volume_24h": 1000000000
  //   },
  //   {
  //     "id": "5",
  //     "symbol": "ADA",
  //     "name": "Cardano",
  //     "price": 2.00,
  //     "percent_change_24h": 1.75,
  //     "market_cap": 65000000000,
  //     "volume_24h": 3000000000
  //   }
  // ]
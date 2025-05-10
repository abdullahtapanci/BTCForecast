import { View, Text } from 'react-native'
import React, {useEffect, useState} from 'react'
import { color } from '../../../constants/color'
import {formatNumber} from '../../../utils/formatNumber'
import { useLocalSearchParams } from 'expo-router'
import { useCoinData } from '../../../contexts/coinDataContext'
import { Dimensions } from "react-native";
import {LineChart} from "react-native-chart-kit";
import { Colors } from 'react-native/Libraries/NewAppScreen'

const CryptoInfo = ({ sign, name, price, change24h}) => {
  return (
    <View className="flex flex-col justify-center h-auto m-5">
      <View className="flex flex-col w-full">
        <View className="m-2 flex flex-row items-center">
          <Text style={{ color: color.white }} className="text-xl mr-4">{sign}</Text>
          <Text style={{ color: color.white }} className="text-sl">{name}</Text>
        </View>
        <View className="m-2 flex flex-row items-center">
          <Text style={{ color: color.white }} className="text-xl mr-4">${price}</Text>
          <Text style={{ color: change24h < 0 ? color.red : color.green }}  className="text-lg">{change24h}%</Text>
        </View>
      </View>
    </View>
  );
};

const CoinInfo = () => {

  const {coins, getCoinHistory} = useCoinData();
  //const {datas} = useCoinData();
  const [dataHist, setDataHist] = useState(null);

  const {id, symbol} = useLocalSearchParams(); 

  const coin = coins ? coins.find(c => c.id === Number(id)) : null;

  useEffect(() => {
    // Fetch the coin's historical data
    const fetchData = async () => {
      const response=await getCoinHistory(symbol);
      const historicalData = JSON.parse(response.coinHist);
      const formattedData = {
        labels: historicalData.map((item, index) => " "),
        datasets: [
          {
            data: historicalData.map(item => parseFloat(item.close)),
            color: () => color.yellow,
            strokeWidth: 3
          }
        ]
      };
      setDataHist(formattedData);
    };
    fetchData();

  }, []);

  const screenWidth = Dimensions.get("window").width;
  const chartConfig = {
    backgroundGradientFrom: color.dark,
    backgroundGradientTo: color.dark,
    color: () => color.yellow,
    propsForBackgroundLines: {
      strokeDasharray: "" // Removes any dashed background lines
    },
    propsForVerticalLabels: {
      fontSize: 10, // Adjust the font size for better visibility
    },
  };

  return (
    <View style={{ backgroundColor: color.dark , flex:1 }}>
      <Text style={{ color: color.yellow }} className="mt-5 ml-5 mb-2 text-xl">Forecasts</Text>
      {coin &&
        <CryptoInfo
          sign={coin.symbol}
          name={coin.name}
          price={formatNumber(coin.price)}
          change24h={formatNumber(coin.percent_change_24h)}
        />
      }
      {dataHist &&
        <View style={{borderColor:color.yellow}} className="flex flex-column items-center mt-10 border-solid border-2 rounded-xl p-5 m-2">
          <LineChart
            data={dataHist}
            width={screenWidth-20}
            height={400}
            withInnerLines={false}
            withVerticalLabels={false}
            withHorizontalLabels={true}
            chartConfig={chartConfig}
            bezier
          />
          <Text style={{color:color.white}} className="text-sm">1 Month Data Graph</Text>
        </View>
      }
    </View>
  )
}

export default CoinInfo
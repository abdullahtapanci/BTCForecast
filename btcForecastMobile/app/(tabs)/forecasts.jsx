import { View, Text } from 'react-native'
import React from 'react'
import { color } from '../../constants/color'
import { useCoinData } from '../../contexts/coinDataContext'
import {formatNumber} from '../../utils/formatNumber'

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

const Forecasts = () => {

  const {coins} = useCoinData();

  var btcData = coins[0]

  return (
    <View style={{ backgroundColor: color.dark , flex:1 }}>
      <Text style={{ color: color.yellow }} className="mt-5 ml-5 mb-2 text-xl">Forecasts</Text>
      {btcData &&
        <CryptoInfo
          sign={btcData.symbol}
          name={btcData.name}
          price={formatNumber(btcData.price)}
          change24h={formatNumber(btcData.percent_change_24h)}
        />
      }
    </View>
  )
}

export default Forecasts
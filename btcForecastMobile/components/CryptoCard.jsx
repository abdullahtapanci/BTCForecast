import { Text, View, TouchableOpacity } from 'react-native'
import React from 'react'
import { color } from '../constants/color'
import numeral from 'numeral';
import { router } from 'expo-router'

const CryptoCard = ({ id=0, sign="", name="", price=0, change24h=0, volume24h=0, marketCap=0 }) => {

    const handlePress = (id) => {
        router.push(`/coin/${id}/${sign}`);
    }

  return (
    <TouchableOpacity onPress={()=>handlePress(id)}>
        <View style={{ borderColor: color.white }} className="flex flex-col justify-center border-2 rounded-3xl h-auto m-5">
            <View className="flex flex-row justify-between items-center w-full">
            <View className="m-4">
                <Text style={{ color: color.white }} className="text-xl">{sign}</Text>
                <Text style={{ color: color.white }} className="text-sl">{name}</Text>
            </View>
            <View className="m-4 items-center">
                <Text style={{ color: color.white }} className="text-sl">Price</Text>
                <Text style={{ color: color.white }} className="text-xl">${price}</Text>
            </View>
            </View>
            <View className="flex flex-row justify-between items-center w-full">
            <View className="m-4 items-center">
                <Text style={{ color: color.white }} className="text-xs">24h Change</Text>
                <Text style={{ color: change24h < 0 ? color.red : color.green }}  className="text-lg">{numeral(change24h).format('0,0.00')}%</Text>
            </View>
            <View className="m-4 items-center">
                <Text style={{ color: color.white }} className="text-xs">24h Volume</Text>
                <Text style={{ color: color.white }} className="text-lg">${volume24h}</Text>
            </View>
            <View className="m-4 items-center">
                <Text style={{ color: color.white }} className="text-xs">Market Cap</Text>
                <Text style={{ color: color.white }} className="text-lg">${marketCap}</Text>
            </View>
            </View>
        </View>
    </TouchableOpacity>
  )
}

export default CryptoCard
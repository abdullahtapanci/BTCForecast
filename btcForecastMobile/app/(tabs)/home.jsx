import { View, Text, ScrollView } from 'react-native'
import React, { useEffect } from 'react'
import { color } from '../../constants/color'
import { useAuth } from '../../contexts/authContext'
import CryptoCard from '../../components/CryptoCard'
import { useCoinData } from '../../contexts/coinDataContext'
import {formatNumber} from '../../utils/formatNumber'

const Home = () => {

  const { checkAuthStatus , user } = useAuth();
  const { coins } = useCoinData();
  //const {datas} =useCoinData();

  useEffect(()=>{
    checkAuthStatus();
  },[])

  return (
    <View style={{ backgroundColor: color.dark , flex:1 }}>
      {user?.id ? (
        <>
          <View className="flex flex-row justify-between">
            <View>
              <Text style={{ color: color.yellow }} className="mt-5 ml-5 mb-2 text-xl" >Home</Text>
              <Text style={{ color: color.white }} className="ml-5 mt-2 mb-2 text-sl" >Coins</Text>
            </View>
            <Text style={{ color: color.yellow }} className="mt-5 mr-5 mb-2 text-xl" >{user.name}</Text>
          </View>
          {
            coins ? 
            <ScrollView contentContainerStyle={{ flexGrow: 1 }}>
              {Object.values(coins).map((item, index) => (
                <CryptoCard
                  key={index}
                  id={item.id}
                  sign={item.symbol}
                  name={item.name}
                  price={formatNumber(item.price)}
                  change24h={formatNumber(item.percent_change_24h)}
                  volume24h={formatNumber(item.volume_24h)}
                  marketCap={formatNumber(item.market_cap)}
                />
              ))}
            </ScrollView>
            :
            <View>

            </View>
          }
        </>
      ):(
        <View>
          <Text style={{ color: color.white, textAlign: 'center', marginTop: 20 }}>Please sign in to view the content.</Text>
        </View>
      )}
    </View>
  )
}

export default Home;

import { View, Text, ScrollView, Image } from 'react-native'
import { StatusBar } from 'expo-status-bar'
import { SafeAreaView } from 'react-native-safe-area-context'
import React , {useEffect} from 'react'
import { router, Link } from 'expo-router'
import { color } from '../constants/color'
import { images } from '../constants/images'
import CustomButton from '../components/CustomButton'

export default function App() {
  return (
    <>
      <SafeAreaView style={{backgroundColor:color.dark}} className="h-full">
        <ScrollView contentContainerStyle={{height:"100%"}}>
          <View className="w-full min-h-[85h] justify-center items-center">
            <Text style={{color:color.yellow}} className="text-3xl mb-10">BTC Forecast</Text>
            <Image source={images.BTC} className="w-[200px] h-[200px] mt-10" resizeMode='contain'/>
            <View className="justify-center items-center my-20 ">
              <Text style={{color:color.white}}> <Text className="text-3xl">Discover</Text> the <Text className="text-3xl">AI</Text> based</Text>
              <Text style={{color:color.white}}><Text className="text-3xl">Bitcoin forecaster</Text>, follow</Text>
              <Text style={{color:color.white}}>up the coins and see the</Text>
              <Text style={{color:color.white}}>future values of <Text className="text-3xl">Bitcoin</Text>.</Text>
            </View>
            <Text style={{color:color.white}}>Don't have an account?</Text>
            <CustomButton 
              title="Signup"
              handlePress={()=> router.push("/signup")}
            />
            <Text style={{color:color.white}} className="my-10">You have an account <Link href="/signin" style={{color:color.yellow}}>Signin</Link></Text>
          </View>
        </ScrollView>
        <StatusBar backgroundColor={color.dark} style="light" />
      </SafeAreaView>
    </>
  )
}

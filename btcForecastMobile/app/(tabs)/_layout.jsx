import { View, Text, Image } from 'react-native'
import React from 'react'
import { Tabs } from 'expo-router'
import { icons } from '../../constants/icons'
import { color } from '../../constants/color'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthProvider } from '../../contexts/authContext'
import { CoinDataProvider } from '../../contexts/coinDataContext'

const TabIcon = ({icon,color,name,focused}) => {
  return(
    <View className="items-center justify-center gap-1">
      <Image
        source={icon}
        resizeMode='Contain'
        tintColor={color}
        className="w-6 h-6"
      />
      <Text className={`${focused ? 'text-#CFAF35-500' : 'text-white-500'} text-sl`} style={ color={color} }>
        {name}
      </Text>
    </View>
  )
}

const TabsLayout = () => {
  return (
    <AuthProvider>
      <CoinDataProvider>
        <SafeAreaView style={{flex:1}}>
          <Tabs
            screenOptions={{ 
              tabBarShowLabel:false,
              tabBarActiveTintColor:color.yellow,
              tabBarInactiveTintColor:color.white,
              tabBarStyle:{
                backgroundColor:color.dark,
                borderTopWidth:1,
                borderTopColor:color.white,
                borderTopLeftRadius: 20,
                borderTopRightRadius: 20,
                overflow: "hidden",
                height:80,
              },
              tabBarIconStyle:{
                marginTop:10,
              }
            }}
          >
            <Tabs.Screen
              name="home"
              options={{
                title: 'Home',
                headerShown: false,
                tabBarIcon : ({color,focused}) => (
                  <TabIcon
                    icon={icons.home}
                    color={color}
                    name={"Home"}
                    focused={focused}
                  />
                )
              }}
            />
            <Tabs.Screen
              name="forecasts"
              options={{
                title: 'Forecasts',
                headerShown: false,
                tabBarIcon : ({color,focused}) => (
                  <TabIcon
                    icon={icons.forecasts}
                    color={color}
                    name={"Forecasts"}
                    focused={focused}
                  />
                )
              }}
            />
            <Tabs.Screen
              name="profile"
              options={{
                title: 'Profile',
                headerShown: false,
                tabBarIcon : ({color,focused}) => (
                  <TabIcon
                    icon={icons.profile}
                    color={color}
                    name={"Profile"}
                    focused={focused}
                  />
                )
              }}
            />
          </Tabs>
        </SafeAreaView>
      </CoinDataProvider>
    </AuthProvider>
  )
}

export default TabsLayout;
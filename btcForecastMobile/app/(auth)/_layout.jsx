import React from 'react'
import { Stack } from 'expo-router'
import { StatusBar } from 'expo-status-bar';
import { color } from '../../constants/color'
import { AuthProvider } from '../../contexts/authContext'

const _layout = () => {
  return (
    <AuthProvider>
      <Stack screenOptions={{headerShown:false}}>
        <Stack.Screen name="signup" options={{headerShown:false}}/>
        <Stack.Screen name="signin" options={{headerShown:false}}/>
      </Stack>
      <StatusBar backgroundColor={color.dark} style="light" />
    </AuthProvider>
  )
}

export default _layout
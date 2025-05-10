import React from 'react'
import { SafeAreaView } from 'react-native-safe-area-context'
import { AuthProvider } from '../../contexts/authContext'
import { CoinDataProvider } from '../../contexts/coinDataContext'
import { StatusBar } from 'expo-status-bar';
import { color } from '../../constants/color'
import CoinInfo from './[id]/[symbol]';

const CoinInfoLayout = () => {
  return (
    <AuthProvider>
      <CoinDataProvider>
        <SafeAreaView style={{ flex: 1 }}>
            <CoinInfo></CoinInfo>
        </SafeAreaView>
        <StatusBar backgroundColor={color.dark} style="light" />
      </CoinDataProvider>
    </AuthProvider>
  )
}

export default CoinInfoLayout;
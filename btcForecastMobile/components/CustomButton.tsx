import { TouchableOpacity, Text } from 'react-native'
import React from 'react'
import { color } from '../constants/color'

const CustomButton = ({title="", handlePress=()=>{}, containerStyles={}, textStyles={}, isLoading=false}) => {
  return (
    <TouchableOpacity 
        style={[
            { 
            backgroundColor: color.yellow, 
            justifyContent: "center", 
            alignItems: "center", 
            borderRadius: 20, 
            paddingVertical: 10, 
            paddingHorizontal: 80, 
            margin: 4,
            opacity: isLoading ? 0.5 : 1,
            },
            containerStyles
        ]}
        onPress={handlePress}
        activeOpacity={0.7}
        disabled={isLoading} 
    >
      <Text style={[{ color: color.dark }, textStyles]} >{title}</Text>
    </TouchableOpacity>
  )
}

export default CustomButton
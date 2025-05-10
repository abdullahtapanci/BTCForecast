import { View, Text, SafeAreaView, ScrollView, TextInput, Image, TouchableOpacity, Alert } from 'react-native'
import React , {useState} from 'react'
import { color } from '../../constants/color'
import { icons } from '../../constants/icons'
import CustomButton from '../../components/CustomButton'
import { Link, router } from 'expo-router'
import { useAuth } from '../../contexts/authContext'

const Signup = () => {

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const { handleSignup } = useAuth();

  const onSubmit = async () => {
    try {
      await handleSignup(name, email, password);
      router.replace("/home")
    } catch (error) {
      console.error(error);
      Alert.alert('Signup failed');
    }
  };

  return (
    <SafeAreaView style={{backgroundColor:color.dark}} className="h-full">
      <ScrollView>
        <View className="w-full min-h-[100vh] justify-center items-center">
          <Text style={{color:color.yellow}} className="text-3xl mb-10">BTC Forecast</Text>
          <View style={{borderColor:color.white}} className="border-2 rounded-2xl w-auto h-auto p-5 w-80">
            <Text style={{color:color.white}} className="my-2">WELCOME to</Text>
            <Text style={{color:color.yellow}} className="text-3xl my-2">BTC Forecast</Text>
            <Text style={{color:color.white}} className="my-2">Signup</Text>
            <View>
              <TextInput
                style={{color:color.white, borderColor:color.white}}
                value={name}
                onChangeText={setName}
                placeholder={"Full name"}
                placeholderTextColor={color.white}
                className="border-2 my-2 rounded-xl p-2"
              />
              <TextInput
                style={{color:color.white, borderColor:color.white}}
                value={email}
                onChangeText={setEmail}
                placeholder={"Email"}
                placeholderTextColor={color.white}
                className="border-2 my-2 rounded-xl p-2"
              />
              <View style={{borderColor:color.white}} className="flex flex-row border-2 rounded-xl my-2 p-2 items-center justify-between">
                <TextInput
                  style={{color:color.white, borderColor:color.white}}
                  value={password}
                  onChangeText={setPassword}
                  placeholder={"Password"}
                  placeholderTextColor={color.white}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={()=>{
                  setShowPassword(!showPassword)
                }}>
                  <Image
                    source={!showPassword ? icons.eyeHide : icons.eye}
                    className="w-6 h-6"
                    resizeMode='contain'
                  />
                </TouchableOpacity>
              </View>
              <View style={{borderColor:color.white}} className="flex flex-row border-2 rounded-xl my-2 p-2 items-center justify-between">
                <TextInput
                  style={{color:color.white, borderColor:color.white}}
                  value={confirmPassword}
                  onChangeText={setConfirmPassword}
                  placeholder={"Confirm Password"}
                  placeholderTextColor={color.white}
                  secureTextEntry={!showPassword}
                />
                <TouchableOpacity onPress={()=>{
                  setShowPassword(!showPassword)
                }}>
                  <Image
                    source={!showPassword ? icons.eyeHide : icons.eye}
                    className="w-6 h-6"
                    resizeMode='contain'
                  />
                </TouchableOpacity>
              </View>
            </View>
            <CustomButton
              title='Signup'
              handlePress={onSubmit}
            />
          </View>
          <Text style={{color:color.white}} className="my-10">or  <Link href="/signin" style={{color:color.yellow}}>Signin</Link></Text>
        </View>
      </ScrollView>
    </SafeAreaView>
  )
}

export default Signup
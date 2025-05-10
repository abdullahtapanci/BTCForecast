import { View, Text, Image, TouchableOpacity, TextInput, Platform, KeyboardAvoidingView, TouchableWithoutFeedback, Keyboard, Alert} from 'react-native'
import React, {useState, useEffect} from 'react'
import { color } from '../../constants/color'
import { icons } from '../../constants/icons'
import { useAuth } from '../../contexts/authContext'
import { UpdateUserName, UpdateUserEmail } from '../../services/userServices'
import { BASE_URL } from '../../services/apiService'
import { uploadImageService } from '../../services/imageUploadService'
import * as ImagePicker from "expo-image-picker";
import CustomButton from '../../components/CustomButton'

const Profile = () => {

  const { checkAuthStatus , user, setUser, handleLogout } = useAuth();

  useEffect(()=>{
    checkAuthStatus();
  },[])

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [whichButtonClicked, setWhichButtonClicked] = useState("");
  const [selectedImage, setSelectedImage] = useState(null);

  const pickImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();
    
    if (status !== 'granted') {
      Alert.alert(
        'Permission Denied',
        'Sorry, we need camera roll permission to upload images.'
      );
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [1, 1],
      quality: 1,
    });

    if (!result.canceled) {
      setSelectedImage(result.assets[0].uri);
    }
  };


  const handleEditToggle = async (clickedButton) => {
    if(whichButtonClicked==="name" && clickedButton==="name"){
      setWhichButtonClicked("")
      try{
        const response = await UpdateUserName(user.id, name)
        if(response.message){
          const updatedUser = { ...user, name: name }; 
          setUser(updatedUser)
          Alert.alert(response?.message)
        }else{
          throw new Error("couldnt update user name")
        }
      }catch(error){
        Alert.alert("couldnt update user name")
      }
    }else if(whichButtonClicked==="email" && clickedButton==="email"){
      setWhichButtonClicked("")
      try{
        const response = await UpdateUserEmail(user.id, email)
        if(response.message){
          const updatedUser = { ...user, email: email }; 
          setUser(updatedUser)
          Alert.alert(response?.message)
        }else{
          throw new Error("couldnt update user email")
        }
      }catch(error){
        Alert.alert("couldnt update user email")
      }
    }else if(clickedButton==="image"){
      await pickImage();
      if (!selectedImage) {
        Alert.alert('No Image Selected', 'Please select an image to upload.');
        return;
      }
      try {
        const response = await uploadImageService(user.id, selectedImage);
        if (response.file) {
          Alert.alert('Success', `Image uploaded: ${response.file}`);
          const updatedUser = { ...user, image: response.file }; 
          setUser(updatedUser)
        } else {
          throw new Error('Failed to upload image');
        }
      } catch (error) {
        Alert.alert('Error', 'Failed to upload image');
      }
    }
  };

  return (
    <KeyboardAvoidingView style={{flex:1}} behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
      <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
        <View style={{ backgroundColor: color.dark, flex:1 }}>
          {user ? 
            <>
              <Text style={{ color: color.yellow }} className="mt-5 ml-5 mb-5 text-xl" >Profile</Text>
              <View className="flex flex-col justify-center items-center">
                {whichButtonClicked==="" ?
                  <View style={{borderColor:color.dark, width:260, height:260 }} className="m-4 mb-10 border-2 justify_center items-center overflow-hidden">
                    {user?.image ? (
                      <View className="flex flex-row justify-between items-center w-full h-full">
                        <Image
                          source={{uri : BASE_URL+`/userImages/${user.image}` }}
                          className="w-4/5 h-4/5 rounded-full"
                          resizeMode="cover"
                        />
                        <TouchableOpacity onPress={()=>handleEditToggle("image")}>
                          <Image source={icons.change} className="w-5 h-5" />
                        </TouchableOpacity>
                      </View>
                    ) : (
                      <View >
                        <View>
                          <Text>Arrange here!</Text>
                        </View>
                      </View>
                    )}
                  </View>
                :
                  <View>
                    <Text>Keep Editing</Text>
                  </View>
                }
                <View style={{borderColor: whichButtonClicked==="name" ? color.yellow : color.white}} className="flex flex-row justify-between items-center p-2 m-2 mb-6 w-80 border-2 rounded-2xl">
                  {whichButtonClicked==="name" ?
                    <TextInput
                      style={{color:color.white}}
                      value={name}
                      onChangeText={setName}
                      placeholder={user.name}
                      placeholderTextColor={color.white}
                    />
                  :
                    <Text style={{color:color.white}}>{user.name}</Text>
                  }
                  <TouchableOpacity onPress={()=>handleEditToggle("name")}>
                    <Image source={icons.change} className="w-5 h-5" />
                  </TouchableOpacity>
                </View>
                <View style={{borderColor: whichButtonClicked==="email" ? color.yellow : color.white}} className="flex flex-row justify-between items-center p-2 m-2 mb-6 w-80 border-2 rounded-2xl">
                  {whichButtonClicked==="email" ?
                    <TextInput
                      style={{color:color.white}}
                      value={email}
                      onChangeText={setEmail}
                      placeholder={user.email}
                      placeholderTextColor={color.white}
                    />
                  :
                    <Text style={{color:color.white}}>{user.email}</Text>
                  }
                  <TouchableOpacity onPress={()=>handleEditToggle("email")}>
                    <Image source={icons.change} className="w-5 h-5" />
                  </TouchableOpacity>
                </View>
                <CustomButton
                  title='Log out'
                  handlePress={handleLogout}
                />
              </View>
            </> 
            :
            <View>
              <Text style={{ color: color.white, textAlign: 'center', marginTop: 20 }}>Please sign in to view the content.</Text>
            </View>
          }
          
        </View>
      </TouchableWithoutFeedback>
    </KeyboardAvoidingView>
  )
}

export default Profile;
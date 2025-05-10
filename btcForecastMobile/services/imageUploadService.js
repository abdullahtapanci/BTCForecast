import AsyncStorage from '@react-native-async-storage/async-storage';
import {BASE_URL} from './apiService'

export const uploadImageService = async (id, image) => {
  const formData = new FormData();
//   console.log(image)
//   const imageUri = image.startsWith('file://') ? image.replace('file://', '') : image;
//   console.log(imageUri)
  formData.append('image', {
    uri: image,
    type: 'image/jpeg',
    name: 'photo.jpg',
  });

  //console.log(formData)

  try {
    const token = await AsyncStorage.getItem("token");
    const response = await fetch(`${BASE_URL}/user/imageUpload/${id}`, {
      method: 'POST',
      headers: {
        'Content-Type': 'multipart/form-data',
        Authorization: `Bearer ${token}`,
      },
      body: formData,
    });

    if (!response.ok) {
      throw new Error('Failed to upload image');
    }

    const jsonResponse = await response.json();
    return jsonResponse;
  } catch (error) {
    console.error(error);
    throw error;
  }
};
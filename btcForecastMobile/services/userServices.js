import {apiGet, apiPost} from './apiService'

export const getUserByID = async (id) => {
    try{
        const response = await apiGet(`user/getByID/${id}`);
        if (response?.user) {
          return response;
        }else{
          throw new Error("error while fetcing");
        }
    }catch(error){
        throw new Error(error);
    }
}

export const UpdateUserName = async (id, name) => {
    try{
        const response = await apiPost(`user/updateUserName/${id}`,{name});
        if (response.message) {
          return response;
        }else{
          throw new Error("error while updating");
        }
    }catch(error){
        throw new Error(error);
    }
}

export const UpdateUserEmail = async (id, email) => {
    try{
        const response = await apiPost(`user/updateUserEmail/${id}`,{email});
        if (response.message) {
          return response;
        }else{
          throw new Error("error while updating");
        }
    }catch(error){
        throw new Error(error);
    }
}
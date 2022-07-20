import axios from "axios"
import { axiosInstance } from "../Resources/Constants"

class UserProfileService{

  getUserProfile = async (userId: string) => {
    const response = await axiosInstance.get(`/profile/${userId}`, {
      headers: {
      'Content-Type': 'application/json'
      }
    })
        return(response.data)
  }

  updateUserProfile = async (userId: string, data: object) => {
    const response = await axiosInstance.put(`/profile/${userId}`, data, {
      headers: {
        "Content-Type":"application/json"
      }
    })
  }

  addUserProfile = async (jwt:string, data:object) => {
    return axiosInstance.post('/project', data, {
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
  }
}
export default new UserProfileService;
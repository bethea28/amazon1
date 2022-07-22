import axios from "axios"
import { axiosInstance } from "../Resources/Constants"

class UserProfileService{

  getUserProfile = async (userId: string, jwt:string) => {
    console.log("jwt")
    console.log(jwt)
    
      const response = await axios.get(`http://localhost:8080/profile/${userId}`, {
      headers: {
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json'
      }      
    })
    console.log("response data from getUserProfile")
    console.log(response.data)
    return(response)
  }

  updateUserProfile = async (userId: string, data: object) => {
    const response = await axiosInstance.put(`/profile/${userId}`, data, {
      headers: {
        "Content-Type":"application/json"
      }
    })
  }

  addUserProfile = async (jwt:string, data:object) => {
    const response = await axiosInstance.post('/profile/', data, {
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
    return response.data
  }
}
export default new UserProfileService;
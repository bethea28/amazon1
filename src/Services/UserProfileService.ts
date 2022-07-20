import axios from "axios"
import { axiosInstance } from "../Resources/Constants"

class UserProfileService{

  get = async (userId: string) => {
    const response = await axiosInstance.get(`/profile/${userId}`)
        return(response.data)
  }

  update = async (userId: string, data: object) => {
    const response = await axiosInstance.put(`/profile/${userId}`, data, {
      headers: {
        "Content-Type":"application/json"
      }
    })
  }
}
export default new UserProfileService;
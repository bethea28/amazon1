import { axiosInstance } from "../Resources/Constants"

class UserProfileService{

  getUserProfile = async (userId: string, jwt:string) => {
    const response = await axiosInstance.get(`/profile/${userId}`, {
      headers: {
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json'
      }      
    })
    return(response)
  }

  viewUserProfile = async (userId: string) => {
    const response = await axiosInstance.get(`/profile/view/${userId}`, {
      headers: {
      'Content-Type': 'application/json'
      }      
    })
    return(response)
  }

  showUserProfile = async (userId: string, jwt:string) => {
    const response = await axiosInstance.get(`/profile/view/${userId}`, {
      headers: {
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json'
      }      
    })
    return(response)
  }

  updateUserProfile = async (userId: string, jwt: string, data: object) => {
    const response = await axiosInstance.put(`/profile/${userId}`, data, {
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
    return(response)
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
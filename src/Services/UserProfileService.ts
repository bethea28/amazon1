import { axiosInstance } from "../Resources/Constants"

/**
 * CRUD services for user data
 */
class UserProfileService{

  /**
   * Get user profile data
   * @params userId The current user's id
   * @params jwt    The jwt token
   */
  getUserProfile = async (userId: string, jwt:string) => {
    const response = await axiosInstance.get(`/profile/${userId}`, {
      headers: {
      'Authorization': `Bearer ${jwt}`,
      'Content-Type': 'application/json'
      }      
    })
    return(response)
  }

  /**
   * Update user profile data
   * @params userId The current user's id
   * @params jwt    The jwt token
   * @params data   The object that stores the updated information
   */
  updateUserProfile = async (userId: string, jwt: string, data: object) => {
    const response = await axiosInstance.put(`/profile/${userId}`, data, {
      headers: {
        'Authorization': `Bearer ${jwt}`,
        'Content-Type': 'application/json'
      }
    })
    return(response)
  }

  /**
   * Add user profile to database
   * @params jwt  The jwt token
   * @params data The object that stores the updated information
   */
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
import { axiosInstance, User } from "../Resources/Constants";

/**
 * CRUD services for user data
 */
class UserService{
  
  /**
   * Add user to the database
   * @params jwt  The jwt token
   * @params data The object that stores the updated information
   */
   addUser = async (jwt:string, data:object) => {
     try {
      const response = await axiosInstance.post<User>('/users/', data, {
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        }
      })
      return response.data
    }catch (error){
      console.log(error);
    }
  }

  /**
   * Get user data
   * @params userId The current user's id
   * @params jwt    The jwt token
   */
   getUser = async (userId: string) => {
     try {
      const response = await axiosInstance.get<User>(`/users/${userId}`, {
        headers: {
        'Content-Type': 'application/json'
        }      
      })
      return(response)
    } catch (error) {
      console.log(error);
    }
  }

  /**
     * Update user data
     * @params userId The current user's id
     * @params jwt    The jwt token
     * @params data   The object that stores the updated information
     */
  updateUser = async (userId: string, jwt: string, data: object) => {
    try {
      const response = await axiosInstance.patch<User>(`/users/${userId}`, data, {
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        }
      })

      return(response)
    }catch (error) {
      console.log(error);
    }
  }
}
export default new UserService;
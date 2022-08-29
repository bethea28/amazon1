import { axiosInstance, User } from "../Resources/Constants";

/**
 * CRUD services for user data
 */
class UserService {

  /**
   * Add user to the database
   * @params jwt  The jwt token
   * @params data The object that stores the updated information
   */
  addUser = async (jwt: string, data: object) => {
    try {
      const response = await axiosInstance.post<User>('/users/', data, {
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        }
      })
      return response.data
    } catch (error) {
      return error
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
      return response.data
    } catch (error) {
      return error
    }
  }

  /**
     * Update user data
     * @params userId The current user's id
     * @params jwt    The jwt token
     * @params data   The object that stores the updated information
     */
  updateUser = async (userId: string, jwt: string, data: Partial<User>) => {
    const currentDate = new Date();
    data.updatedAt = currentDate.toLocaleString();
    try {
      const response = await axiosInstance.patch<User>(`/users/${userId}`, data, {
        headers: {
          'Authorization': `Bearer ${jwt}`,
          'Content-Type': 'application/json'
        }
      })

      return response.data
    } catch (error) {
      return error
    }
  }

  /**
   * Upload new avatar for the user
   * @params userId The current user's id
   * @params file The image file to be saved via form data
   */
  uploadAvatar = async (id: string, jwt: string, file: FormData) => {
    try {
      const response = await axiosInstance.post(`/users/${id}/avatar`, file, {
        headers: {
          'Authorization': `Bearer ${jwt}`,
        }
      });

      if (response.status === 200) {
        alert('Upload successful!');
      }

    } catch (error) {
      console.log(error);
      alert('Upload failed! Please try again.')
    }
  }

  /**
   * Delete user's avatar
   * @params userId The current user's id
   * @params filename The image file to delete
   */
  deleteAvatar = async (id: String, jwt: string) => {
    try {
      const response = await axiosInstance.delete(`/users/${id}/avatar/`, {
        headers: {
          'Authorization': `Bearer ${jwt}`,
        }
      });

      if (response.status === 200) {
        alert('Delete successful!');
      }

    } catch (error) {
      console.log(error);
      alert('Failed to delete! Please try again.')
    }
  }
}
export default new UserService;
import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:8080/api/users'
});

export default {

  //Upload new avatar for a user
  async uploadAvatar(userId: String, file: FormData) {

    try {

      const response = await http.post(`/${userId}/uploadAvatar`, file);

      if (response.status === 201) {
        alert('Upload successful!');
      }

    } catch(error) {
        console.log(error);
        alert('Upload failed! Please try again.')
      }

      window.location.reload();

  },

  //Get user's avatar (Component is currently calling axios get directly, not yet this service)
  async getAvatar(userId: String, filename: String) { 

    try {

      const response = await http.get(`/getAvatar/${userId}/${filename}`);
      return response;

    } catch(error) {
      console.log(error);
    }
  },

  //Delete user's avatar
  async deleteAvatar(userId: String, filename: String) { 

    try {

      const response = await http.delete(`/deleteAvatar/${userId}/${filename}`);

      if (response.status === 204) {
        alert('Delete successful!');
      }
      
    } catch(error) {
        console.log(error);
        alert('Failed to delete! Please try again.')
      }

      window.location.reload();

  }

}
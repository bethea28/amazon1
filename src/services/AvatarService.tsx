import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:8080/api'
});

// export default class UserService {

export default {
  //Upload new avatar for a user
  async uploadAvatar(userId: String, file: String) {

        try {

          const response = await http.post(`/uploadAvatar/${userId}`, file);

          if (response.status === 201) {
            alert('Upload successful!');
          }

        } catch(error) {
          console.log(error);
        }

  },

  //Delete user's avatar
  async deleteAvatar(userId: String, filename: String) { 

          try {

            const response = await http.delete(`/deleteAvatar/${userId}/${filename}`);

            if (response.status === 200) {
              alert('Delete successful!');
            }
            
          } catch(error) {
            console.log(error);
          }
    
  }

}
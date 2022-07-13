import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:8080/api'
});

// export default class UserService {

export default {
  //Upload new avatar for a user
  async getProject(id: String) {

    try {

      const response = await http.get(`/project/${id}`);
      
      console.log(response.data);
      

    } catch(error) {
      console.log(error);
    }

  }

}
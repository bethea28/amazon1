import axios from "axios"
import { axiosInstance } from "../Resources/Constants"
// import { Auth } from 'aws-amplify';

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

  signUp = async (username: string, password: string, email:string) => {
    //    const user = await Auth.signUp({
    //   username:"Cohort9",
    //   password:"Nada1998!",
    //   attributes: {
    //     email:"c@email.com"
    //   }
    // })
    // const response = await axiosInstance.put(`/profile/${userId}`, data, {
    //   headers: {
    //     "Content-Type":"application/json",
    //     "Authorization": `Bearer ${token}`
    //   }
    // })
  }
}
export default new UserProfileService;
import axios from "axios"

class ProfileService{

  get = async (userId: string) => {
   
      const res = await axios.get('http://localhost:8081/profile/001')
      return(res.data)
  }

  update = (data: object) => {
    axios.put('http://localhost:8081/profile/001', data, {
      headers: {
        "Content-Type":"application/json"
      }
    })
  }
}

export default new ProfileService;
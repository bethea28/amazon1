import axios from "axios"

class ProfileService{

  get = async (userId: string) => {
    const token = "eyyyyy"
      const res = await axios.get('http://localhost:8080/profile/001', {
        headers: {
          "Content-Type":"application/json",
          "Authorization": `Bearer $(token)`
        }
      })
    return(res.data)
  }

  // update = (data: object) => {
  //   axios.put('http://localhost:8080/profile/001', data, {
  //     headers: {
  //       "Content-Type":"application/json"
  //     }
  //   })
  // }
}

export default new ProfileService;
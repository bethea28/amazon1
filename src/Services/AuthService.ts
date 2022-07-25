import { Auth } from 'aws-amplify';

class AuthService{

  SignIn = async (username:string, password:string) => {
    const response = await Auth.signIn(username, password)
    const jwt = await this.getCurrentUser()
    console.log("newUser")
    console.log(jwt)
    const returns = {jwt, response}
    return returns
  }


  SignUp = async (username:string, password: string, email:string) => {
    const response = await Auth.signUp({username, password, attributes: {
      email
    }
    });
    const newUser = await this.getCurrentUser()
    const returns = {newUser, response}
    return returns
  }

  logout = () => {
  };

  getCurrentUser = async () => {
    const token = await Auth.currentSession().then(res=>{
      let accessToken = res.getAccessToken();
      let jwt = accessToken.getJwtToken();
      return jwt
    })
    return token
  };

}
export default new AuthService
import { Auth } from 'aws-amplify';
import { useContext } from 'react'
import { AuthContext } from '../Context/AuthProvider'

class AuthService{

  SignIn = async (username:string, password:string) => {
    const response = await Auth.signIn(username, password)
    const jwt = await this.getCurrentUser()
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

  getCurrentUser = async () => {
    const token = await Auth.currentSession().then(res=>{
      let accessToken = res.getAccessToken();
      let id = accessToken.payload.sub;
      let jwt = accessToken.getJwtToken();
      return {id, jwt}
    })
    return token
  };

  isLogged = async () => {
    const token = await Auth.currentAuthenticatedUser().then(response => {
      return(true)
  }).catch(e => {
      return(false)
  });
    return token
  };

  SignOut = async () => {
    const response = await Auth.signOut()
    return response
  }
}
export default new AuthService
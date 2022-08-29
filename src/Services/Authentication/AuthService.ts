import { Auth } from 'aws-amplify';

/**
 * Cognito authentication services
 */
class AuthService{

  /**
   * Allow user to sign in
   * @params username The username of the user
   * @params password The user's password
   */
  signIn = async (username:string, password:string) => {
    await Auth.signIn(username, password)
    const response = await this.getCurrentUser()
    return response
  }

  /**
   * Allow user to sign up
   * @params username The username of the user
   * @params password The user's password
   * @params email    The user's email
   */
  signUp = async (username:string, password: string, email:string) => {
    const response = await Auth.signUp({username, password, attributes: {
      email
    }
    });
  }

  /**
   * Get the current signed in user
   */
  getCurrentUser = async () => {
    const token = await Auth.currentSession().then(res=>{
      let accessToken = res.getAccessToken();
      let userId = accessToken.payload.sub;
      let jwt = accessToken.getJwtToken();
      return {userId, jwt}
    })
    return token
  };

  /**
   * Check if the current user is logged in
   */
  isLogged = async () => {
    const token = await Auth.currentAuthenticatedUser().then(response => {
      return(true)
  }).catch(e => {
      return(false)
  });
    return token
  };

  /**
   * Allow the current user to sign out
   */
  signOut = async () => {
    const response = await Auth.signOut()
    return response
  }
}
export default new AuthService
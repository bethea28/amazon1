import axios from 'axios';
import { Auth } from 'aws-amplify';

export default async function SetAuthorizationToken() {

  const session = await Auth.currentSession().then((result) => {
    const token = result.getAccessToken().getJwtToken();
    return token;
  })

  if (session) {
    axios.defaults.headers.common['authorization'] = 'Bearer ${token}';
  } else {
    delete axios.defaults.headers.common['authorization'];
  }
  return session
}
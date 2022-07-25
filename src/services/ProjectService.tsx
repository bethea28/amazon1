import axiosInstance from '../apiConfig';
import { Auth } from 'aws-amplify';

export const postData = async (state:any) => {
    const res = await Auth.currentSession()
    let jwt = res.getAccessToken().getJwtToken();    
    return await axiosInstance.post('project', state, {
        headers: {
            'Authorization': `Bearer ${jwt}`,
            'Content-Type': 'application/json'
        }
    }) 
}
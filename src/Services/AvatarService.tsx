import axios from "axios";
import { Auth } from 'aws-amplify';


/**
 * Special case - own config since content types include form-data and binary
 */
const http = axios.create({
    baseURL: 'http://localhost:8080/users'
});

/**
 * Get user's avatar
 * @params userId The current user's id
 * @params filename The image file to fetched by filename
 */
export async function getAvatar(id: String, filename: String) { 
  try {
    const res = await Auth.currentSession()
    let jwt = res.getAccessToken().getJwtToken(); 
    const { data } = await http.get(`/getAvatar/${id}/${filename}`, {
      headers: {
          'Authorization': `Bearer ${jwt}`,
      }
  });
    return data;
  } catch(error) {
    console.log(error);
  }
}

/**
 * Upload new avatar for the user
 * @params userId The current user's id
 * @params file The image file to be saved via form data
 */
export async function uploadAvatar(id: String, file: FormData) {
  try {
    const res = await Auth.currentSession()
    let jwt = res.getAccessToken().getJwtToken(); 
    const response = await http.post(`/${id}/uploadAvatar`, file, {
      headers: {
          'Authorization': `Bearer ${jwt}`,
      }
  });

    if (response.status === 200) {
      alert('Upload successful!');
    }

  } catch(error) {
      console.log(error);
      alert('Upload failed! Please try again.')
    }
}

/**
 * Delete user's avatar
 * @params userId The current user's id
 * @params filename The image file to delete
 */
export async function deleteAvatar(id: String, filename: String) { 
  try {
    const res = await Auth.currentSession()
    let jwt = res.getAccessToken().getJwtToken(); 
    const response = await http.delete(`/deleteAvatar/${id}/${filename}`, {
      headers: {
          'Authorization': `Bearer ${jwt}`,
      }
  });

    if (response.status === 200) {
      alert('Delete successful!');
    }
    
  } catch(error) {
      console.log(error);
      alert('Failed to delete! Please try again.')
    }
}
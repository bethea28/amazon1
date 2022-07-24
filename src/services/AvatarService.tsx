import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:8080/api/users'
});

/**
 * Get user's avatar
 * @params userId The current user's id
 * @params filename The image file to fetched by filename
 */
export async function getAvatar(userId: String, filename: String) { 

  try {

    const { data } = await http.get(`/getAvatar/${userId}/${filename}`);
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
export async function uploadAvatar(userId: String, file: FormData) {

  try {

    const response = await http.post(`/${userId}/uploadAvatar`, file);

    if (response.status === 201) {
      alert('Upload successful!');
    }

  } catch(error) {
      console.log(error);
      alert('Upload failed! Please try again.')
    }

    window.location.reload();

}

/**
 * Delete user's avatar
 * @params userId The current user's id
 * @params filename The image file to delete
 */
export async function deleteAvatar(userId: String, filename: String) { 

  try {

    const response = await http.delete(`/deleteAvatar/${userId}/${filename}`);

    if (response.status === 204) {
      alert('Delete successful!');
    }
    
  } catch(error) {
      console.log(error);
      alert('Failed to delete! Please try again.')
    }

    window.location.reload();

}
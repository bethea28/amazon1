import axios from "axios";

const http = axios.create({
    baseURL: 'http://localhost:8080/api'
});

// export default class UserService {

export default {
  //Upload new avatar for a user
  async uploadAvatar(userId: String, file: FormData) {


        // var reader = new FileReader();
        // reader.readAsDataURL(file); 
        // reader.onloadend = function() {
        //   var base64data = reader.result;                
        //   console.log(base64data);
        // }
        // const text = await (new Response(file));
        console.log("BEYONCE", file);

        try {

        //   const response = await http.post(`users/${userId}/uploadAvatar`, file, {
        //     params: {
        //       userId: 'userId'
        //     },
        //     data: 'bodyFormData',
        //     headers: {
        //       'Content-Type': 'multipart/form-data'
        //     }
        // });


        const response = await http.post(`users/${userId}/uploadAvatar`, file, {
          // params: {
          //   userId: 'userId'
          // },
          // headers: {
          //   'Content-Type': 'multipart/form-data'
          // },
          // data: {
          //   file: file
          // }
        });

        if (response.status === 200) {
          alert('Upload successful!');
        }

      } catch(error) {
          console.log(error);
        }

  },

  //Delete user's avatar
  async deleteAvatar(userId: String, filename: String) { 

          try {

            const response = await http.delete(`/deleteAvatar/${userId}/${filename}`);

            if (response.status === 200) {
              alert('Delete successful!');
            }
            
          } catch(error) {
            console.log(error);
          }
    
  }

}
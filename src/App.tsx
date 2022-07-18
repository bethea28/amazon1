import { Auth } from 'aws-amplify';
import { useState, useEffect } from 'react';
import axios from "axios"

const SignIn = () => {
    
  useEffect(() => {
    // declare the data fetching function
    const fetchData = async () => {
      // const { user } = await Auth.signUp({
      //   username:"Cohort11",
      //   password:"Nada1998!",
      //   attributes: {
      //     email:"bri@email.com"
      //   }
      // })
      // console.log(user);
    
    const user2 = await Auth.signIn("Cohort11", "Nada1998!");
    console.log(user2.signInUserSession.jwtToken)

    Auth.currentSession().then(res=>{
                let accessToken = res.getAccessToken()
                let jwt = accessToken.getJwtToken()
                //You can print them to see the full objects
                console.log(`myAccessToken: ${JSON.stringify(accessToken)}`)
                console.log(`myJwt: ${jwt}`)

                // const get = async (userId: string) => {
   
                //   const res = await axios.get('http://localhost:8081/profile/001', {
                //     headers: {
                //           "Access-Control-Allow-Origin": "*",
                //       //     // "Content-Type": "application/json",
                //           "Authorization": `Bearer ${jwt}`
                //         }
                //   })
                // }

                // axios.post('http://localhost:8081/profile/001', {
                //   headers: {
                //     "Access-Control-Allow-Origin": "*",
                //     // "Content-Type": "application/json",
                //     "Authorization": `Bearer ${jwt}`
                //   }
                // }) 
              })

                          
    }
  
    // call the function
    fetchData()
      // make sure to catch any error
      .catch(console.error);
  }, [])
  
  return(
    <>
    </>
  )
}
export default SignIn
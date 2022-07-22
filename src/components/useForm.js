import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core';
import axiosInstance from '../apiConfig';
import { Auth } from 'aws-amplify';
import { ConsoleLogger } from '@aws-amplify/core';


export function useForm(initialValues, validateOnChange = false, validate) {

    
    const[values, setValues] = useState(initialValues);
    const[errors, setErrors] = useState({});
    
    //save and validate the onChange info
    const handleInputChange = (e)=> {
        const {name, value} = e.target
        setValues({
            ...values,
            [name]:value
        })
        if(validateOnChange)
        validate({[name]:value})
    }
    //reset form info
    const resetForm = ()=>{
      setValues(initialValues);
      setErrors({})
    }
    // use axios call sever endpoint
    const postData = async (state) => {

        const res = await Auth.currentSession()
        let jwt = res.getAccessToken().getJwtToken();    
        return await axiosInstance.post('project', state, {
            headers: {
                'Authorization': `Bearer ${jwt}`,
                'Content-Type': 'application/json'
            }
        }) 
    }
//     const postData = async (state) => {
//       return Auth.currentSession().then(res=>{
//         let accessToken = res.getAccessToken();
//         let jwt = accessToken.getJwtToken();
//         return axiosInstance.post('project', state, {
//           headers: {
//                   'Authorization': `Bearer ${jwt}`,
//                   'Content-Type': 'application/json'
//                    }
//         })
//       })
 
// }

    return {
      values,
      setValues,
      errors,
      setErrors,
      handleInputChange,
      resetForm,
      postData
    }
    
  
}
//set theme style
const useStyles = makeStyles (theme =>({
    root: {
        '& .MuiFormControl-root': {
            width:'80%',
            margin: theme.spacing(1),
            background: "rgb(166, 223, 139)",
            borderRadius:10
        }
    }
   
}))

// set Form style
export function Form(props) {
    const classes = useStyles();
    const {children,...other} = props
    return (
      <form className={classes.root} autoComplete = "off"{...other}>
        {props.children}
      </form>
    )
}


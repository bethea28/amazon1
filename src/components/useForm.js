import React,{useState} from 'react'
import { makeStyles } from '@material-ui/core';


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
    return {
      values,
      setValues,
      errors,
      setErrors,
      handleInputChange,
      resetForm
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


import React from 'react'
import { FormControl, InputLabel, MenuItem, Button,
  Select, Grid, TextField, Paper, makeStyles } from '@material-ui/core';
import { useForm, Controller} from "react-hook-form";
import {postTransacData} from '../../Services/AddTransactionService';

interface TransactionFormInput {
    projectId: string;
    amount: number;
}
const useStyles = makeStyles (theme =>({
  root: {
      '& .MuiFormControl-root': {
          width:'80%',
          margin: theme.spacing(1),
          background: "rgb(166, 223, 139)",
          borderRadius:10,
          padding: '0 30px',
          
      },
      "& .MuiFormLabel-root": {
          padding: '0 30px',
      }
  }
}))

export default function AddTransaction() {
  const classes = useStyles();
  const { reset, control, register, handleSubmit,formState: { errors }} = useForm<TransactionFormInput>();
  const onSubmit = async (data: TransactionFormInput) => {
    const{projectId, amount} = data

    let state = {
        projectId,
        amount
    }
    try{
      await postTransacData(state)
      reset() 
  }
  catch(error){
      console.log(error)
  }
  }
  return (
    <Paper>
    <form className={classes.root} onSubmit={handleSubmit(onSubmit)}
        onReset={() => reset()} autoComplete = "off">

    </form>
    </Paper>
    
  )
}

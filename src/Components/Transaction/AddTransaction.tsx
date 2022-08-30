import React, { useContext } from "react";
import { Transaction } from "../../Resources/Constants";
import { Typography, Button, Grid, TextField, Paper } from "@mui/material";
import {
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  makeStyles,
} from "@material-ui/core";
import { useForm, Controller } from "react-hook-form";
import { postTransacData } from "../../Services/AddTransactionService";
import {
  ProjectIdContext,
  TransactionContext,
} from "../Transaction/TransactionTable";

interface TransactionFormInput {
  projectId: string;
  amount: number;
}
const useStyles = makeStyles((theme) => ({
  root: {
    "& .MuiFormControl-root": {
      width: "80%",
      margin: theme.spacing(1),
      background: "rgb(166, 223, 139)",
      borderRadius: 10,
      padding: "0 30px",
    },
    "& .MuiFormLabel-root": {
      padding: "0 30px",
    },
  },
}));

interface Props {
  onTransactionCreated: (transaction: Transaction) => void;
}

export default function AddTransaction({ onTransactionCreated }: Props) {
  const projectIdTrans = useContext<string>(ProjectIdContext);
  console.log("hi", projectIdTrans);

  const classes = useStyles();
  const {
    reset,
    control,
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TransactionFormInput>();

  const onSubmit = async (data: TransactionFormInput) => {
    //const{projectId, amount} = data

    let state = {
      projectId: projectIdTrans,
      amount: data.amount.toString(),
    };

    try {
      const data = await postTransacData(state);
      console.log(data);
      onTransactionCreated(data);
      reset();
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <Paper>
      <form
        onSubmit={handleSubmit(onSubmit)}
        onReset={() => reset()}
        autoComplete="off"
      >
        <Grid container>
          <Grid
            item
            xs={6}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Typography margin={"0.5em"} variant="h4">
              Fund a project
            </Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid
            item
            xs={4}
            style={{
              display: "flex",
              justifyContent: "flex-end",
              alignItems: "center",
            }}
          >
            <TextField
              {...register("amount", { min: 0.01 })}
              type="number"
              label="Input funding amount"
              defaultValue={0}
              error={errors.amount !== undefined}
            />
            {errors.amount && (
              <Typography variant="body2" color="red">
                Funding amount must be valid
              </Typography>
            )}
          </Grid>
          <Grid
            item
            xs={0}
            style={{
              display: "flex",
              justifyContent: "flex-start",
              alignItems: "center",
            }}
          >
            <Typography>(USD) Funding Amount</Typography>
          </Grid>
        </Grid>
        <Grid container>
          <Grid item xs={4}>
            <Button variant="contained" color="primary" type="reset">
              <Typography variant="button">Reset</Typography>
            </Button>
          </Grid>
          <Grid item xs={0}>
            <Button variant="contained" color="primary" type="submit">
              <Typography variant="button">Submit</Typography>
            </Button>
          </Grid>
        </Grid>
      </form>
    </Paper>
  );
}

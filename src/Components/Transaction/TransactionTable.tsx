import React,{ useState,useEffect } from 'react';
import { Transaction } from '../../Resources/Constants';
import { TableContainer,Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material'
import {getNewestTransaction} from '../../Services/TransactionService';
import AddTransaction from './AddTransaction';
export const TransactionTable = () => {
  const [transactions, updateList] = useState<Transaction[]>([]);

  const getTransactionList = async () => {
    const response = await getNewestTransaction();
    //let list: Transaction[] = response!;
    //console.log(list);
    updateList(response!);
    console.log(transactions);
    
  }
  
  useEffect(()=>{
      getTransactionList();
  },[])
  return (
    <><AddTransaction />
    <TableContainer component={Paper} sx={{ maxHeight: '300px' }}>
      <Table aria-label='simple table' stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell> User Name</TableCell>
            <TableCell> Transaction Amount</TableCell>
            <TableCell> Created At</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {transactions && transactions.map((transaction) => (
            <TableRow
              key={transaction.transactionId}
              sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
            >
              <TableCell>{transaction.username}</TableCell>
              <TableCell>{transaction.amount}</TableCell>
              <TableCell>{transaction.createdAt}</TableCell>
            </TableRow>

          ))}
        </TableBody>
      </Table>
    </TableContainer></>
  )
}
const tableData = [{
    "transactionId": "bfc8048a-19ad-49a3-9f86-28bdbcc6ed36",
    "projectId": "a3b946df-b709-494a-8ff3-07e2095542ca",
    "userId": "1fd45ddf-7dd2-4c8f-bbc5-b91b5ded5359",
    "amount": "$2.32",
    "createdAt": "2021-08-25T09:07:37Z",
    "lastUpdatedAt": "2022-02-09T12:04:06Z"
  }, {
    "transactionId": "c3f2d415-7b27-4e9e-99a1-268807eb4595",
    "projectId": "6b1961be-82a0-408b-9937-fe4a20c08c3d",
    "userId": "f1867380-d1f3-468c-bad5-4c01d6f365e4",
    "amount": "$4.47",
    "createdAt": "2021-07-30T14:01:39Z",
    "lastUpdatedAt": "2021-11-14T08:04:59Z"
  }, {
    "transactionId": "fe767460-5384-428e-9e92-ae510bd1a1a2",
    "projectId": "3e9ba4db-65ec-45d6-88ce-ad7050a07088",
    "userId": "a9e15320-31dd-4c96-af3b-ef8399745806",
    "amount": "$0.83",
    "createdAt": "2022-02-28T07:06:40Z",
    "lastUpdatedAt": "2022-06-21T15:54:17Z"
  }, {
    "transactionId": "02c25462-9cb3-4c34-9191-c43321ac110a",
    "projectId": "50d21283-b2ea-40bc-be7e-a2d5aa04fe21",
    "userId": "579b189b-d761-4f42-bbbc-16d7e79833b2",
    "amount": "$0.89",
    "createdAt": "2022-04-06T07:45:52Z",
    "lastUpdatedAt": "2022-04-15T21:22:16Z"
  }, {
    "transactionId": "670f68bc-e28f-406f-9fa3-0f29da315777",
    "projectId": "b641374c-bb87-4088-a16e-54fb10b845af",
    "userId": "71a7e6b1-e45e-45e1-9295-4064fae62d9c",
    "amount": "$3.54",
    "createdAt": "2021-09-14T03:12:58Z",
    "lastUpdatedAt": "2022-02-15T16:28:14Z"
  }, {
    "transactionId": "c6471d07-08bb-4a50-9f4c-84e997b03e48",
    "projectId": "7cb7255b-a802-45b0-9e6c-3fa8e8fd029e",
    "userId": "1055056a-9a6a-44d9-ad6c-115682468f7c",
    "amount": "$9.83",
    "createdAt": "2021-09-29T12:04:10Z",
    "lastUpdatedAt": "2022-01-05T05:51:30Z"
  }, {
    "transactionId": "c41726e9-b0e3-4fbf-b7e7-df86c9600318",
    "projectId": "786cd9a9-4a0f-49ca-9b14-7d8b2a78e810",
    "userId": "aea971b3-7e48-488b-b69c-6ff116e1506f",
    "amount": "$9.58",
    "createdAt": "2021-09-15T18:20:24Z",
    "lastUpdatedAt": "2021-08-20T23:11:13Z"
  }, {
    "transactionId": "6a9c248b-586f-4bba-890e-dc8d4f971e81",
    "projectId": "d7a67534-5aee-40a7-9fa3-1b373918c0d5",
    "userId": "10075677-76a1-41ff-aaf8-7cdaf3688d8b",
    "amount": "$4.59",
    "createdAt": "2022-07-01T20:02:57Z",
    "lastUpdatedAt": "2021-10-26T03:30:48Z"
  }, {
    "transactionId": "8ee49015-97ac-463e-bab8-6308cd883ec8",
    "projectId": "7af63273-c204-49ba-9218-bfe9f21941ec",
    "userId": "d5d8047a-02a4-4626-a664-a66791ed2d75",
    "amount": "$3.26",
    "createdAt": "2021-09-25T07:28:38Z",
    "lastUpdatedAt": "2022-07-02T03:42:16Z"
  }, {
    "transactionId": "02a9eb7f-99c7-4c90-a45c-559d9bf1e851",
    "projectId": "b0d04075-e0c5-4edb-bad1-04f2e8ff8ada",
    "userId": "f258f781-04bf-4df4-a328-c00d465e4d4f",
    "amount": "$9.53",
    "createdAt": "2022-07-19T09:57:03Z",
    "lastUpdatedAt": "2022-01-10T06:35:09Z"
  }]

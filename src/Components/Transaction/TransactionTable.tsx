import React,{ useState,useEffect,createContext} from 'react';
import { Transaction } from '../../Resources/Constants';
import { TableContainer,Table, TableHead, TableBody, TableRow, TableCell, Paper } from '@mui/material'
import {getNewestTransaction} from '../../Services/TransactionService';
import AddTransaction from './AddTransaction';
import { useParams} from 'react-router-dom';


export const ProjectIdContext = createContext<string>('')

export const TransactionTable = () => {

  const { id } = useParams();
 
  console.log("transactiontable",id);
  const [transactions, updateList] = useState<Transaction[]>();
  
  useEffect(()=>{
      const fetchTransaction = async() =>{
        const response = await getNewestTransaction();
        updateList(response);
      }
      if (!transactions) {
        fetchTransaction();
    }
    console.log(transactions);
      
  },[transactions])

  return (
    <div className="container">
    
    <ProjectIdContext.Provider value={id!}>
    <AddTransaction
    //  transactions = {transactions}
    //  listUpdated = {listUpdated}
    />
    </ProjectIdContext.Provider>
    <TableContainer component={Paper} sx={{ maxHeight: '600px' }}>
      <Table aria-label='simple table' stickyHeader>
        <TableHead>
          <TableRow>
            <TableCell> User Name</TableCell>
            <TableCell> Funding Amount(USD)</TableCell>
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
    </TableContainer>
    </div>
  )
}


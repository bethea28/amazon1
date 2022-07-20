import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
<<<<<<< HEAD
import SignIn from './Components/Signup';
import awsconfig from './aws-exports';
import { Amplify, Auth } from 'aws-amplify';
Amplify.configure(awsconfig);

 const root = ReactDOM.createRoot(
   document.getElementById('root') as HTMLElement
 );
 root.render(
   <React.StrictMode>
     <BrowserRouter>
     <Routes>
      <Route path="/" element={<App />} />
      <Route path="profile" element={<Profile />} />
      {/* <Route path="signup" element={<SignIn authState={'signIn'} loading={false}/>} /> */}
     </Routes>
   </BrowserRouter>
   </React.StrictMode>
 );
=======
import reportWebVitals from './reportWebVitals';
import { BrowserRouter } from 'react-router-dom';

const root = ReactDOM.createRoot(
  document.getElementById('root') as HTMLElement
);
root.render(
  <BrowserRouter>
    <React.StrictMode>
      <App />
    </React.StrictMode>
  </BrowserRouter>
);
>>>>>>> amzn1-44


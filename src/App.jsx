import { useEffect, useRef, useState } from 'react';
import axios from 'axios';
import { Modal } from 'bootstrap';
import LoginPage from './pages/LoginPage';
import ProductPage from './pages/ProductPage';

const BASE_URL = import.meta.env.VITE_BASE_URL;
const API_PATH = import.meta.env.VITE_API_PATH;

function App() {
 
  const [isAuth, setIsAuth] = useState(false); //是否是可以使用的權限

  return (
    <>

      {isAuth ? <ProductPage isAuth={isAuth} /> : <LoginPage  setIsAuth={setIsAuth} />}

     

    </>
  )
}
export default App

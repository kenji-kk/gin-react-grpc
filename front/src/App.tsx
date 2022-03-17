import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';
import { AuthPage } from './components/pages/AuthPage';

function App() {
  const [message, setMessage] = useState<string>()

  useEffect(() => {
    axios.get('http://localhost:8080/ping', { headers: { 'Content-Type': 'application/json' } })
    .then(res => {
      setMessage(res.data.message)
    })
    .catch(err => {
      console.log(err)
    })
  }, [])

  return (
    <>
      <AuthPage />
    </>
  );
}

export default App;

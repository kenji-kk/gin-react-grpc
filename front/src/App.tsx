import './App.css';
import { useState, useEffect } from 'react';
import axios from 'axios';

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
    <div className="App">
      <p>{message}</p>
    </div>
  );
}

export default App;

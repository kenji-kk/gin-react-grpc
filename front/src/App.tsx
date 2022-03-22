import './App.css';
import { useState, useEffect, createContext } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate} from "react-router-dom"
import axios from 'axios';
import Cookies from 'js-cookie';
import { AuthPage } from './components/pages/AuthPage';
import { Home } from './components/pages/Home';


interface User {
  id: number
  userName: string
  email: string
}

export const AuthContext = createContext({} as {
  loading: boolean
  setLoading: React.Dispatch<React.SetStateAction<boolean>>
  isSignedIn: boolean
  setIsSignedIn: React.Dispatch<React.SetStateAction<boolean>>
  currentUser: User | undefined
  setCurrentUser: React.Dispatch<React.SetStateAction<User | undefined>>
  jwt: string | undefined
  setJwt: React.Dispatch<React.SetStateAction<string | undefined>>
})

function App() {
  const [loading, setLoading] = useState<boolean>(false)
  const [isSignedIn, setIsSignedIn] = useState<boolean>(false)
  const [currentUser, setCurrentUser] = useState<User | undefined>()
  const [jwt, setJwt] = useState<string | undefined>()


  const Private = ({ children }: { children: React.ReactElement }) => {
    if (!loading) {
      if (isSignedIn) {
        return children
      } else {
        if (Cookies.get("_access_token")) {
          setJwt(Cookies.get("_access_token"))
          setIsSignedIn(true)
          return children
        } else {
          return <Navigate to="/auth" />
        }
      }
    } else {
      return <></>
    }
  }


  return (
    <Router>
      <AuthContext.Provider value={{ loading, setLoading, isSignedIn, setIsSignedIn, currentUser, setCurrentUser, jwt, setJwt}}>
          <Routes>
            <Route path="/auth" element={<AuthPage />} />
            <Route path="/" element={<Private><Home /></Private>} />
          </Routes>
      </AuthContext.Provider>
    </Router>
  );
}

export default App;

import { useState } from 'react'

import './App.css'
import SignupForm from './pages/AuthPages/SignUp'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
   <SignupForm/>
    </>
  )
}

export default App

import { useState, useEffect } from 'react'


function App() {

  const [message, setMessage] = useState("Loading...")
  const API_BASE = import.meta.env.VITE_API_URL || 'http://localhost:3001'

  useEffect(()=>{
    getGreeting()
    async function getGreeting(){
      const response = await fetch(`${API_BASE}/greet`)
      if(response.ok){
        const json = await response.json()
        setMessage(json.message)
      }
    }
})

    
 



  return(
    <>
      <h1>{message}</h1>
    </>
  )
}
export default App


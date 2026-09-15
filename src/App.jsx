import { useState, useEffect } from 'react'
import axios from 'axios'
import './App.css'
import NowPlaying from './pages/NowPlaying'

function App() {
  const [data, setData] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  const fetchData = async () => {
    setLoading(true)
    setError(null)
    
    try {
      const response = await axios.get(`${import.meta.env.VITE_API_URL}/`)
      setData(response.data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <NowPlaying />
  )
}

export default App
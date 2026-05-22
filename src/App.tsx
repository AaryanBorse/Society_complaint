import { useState } from 'react'
import Navbar from './components/Navbar'
import ResidentDashboard from './pages/ResidentDashboard'
import AdminDashboard from './pages/AdminDashboard'
import Login from './Login'
import { ComplaintProvider } from './context/ComplaintContext'

function App() {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isAdmin, setIsAdmin] = useState(false)
  const [flatNo, setFlatNo] = useState('')

  const handleLogin = (adminMode: boolean, flat: string) => {
    setIsAdmin(adminMode)
    setFlatNo(flat)
    setIsLoggedIn(true)
  }

  const handleLogout = () => {
    setIsLoggedIn(false)
    setIsAdmin(false)
    setFlatNo('')
  }

  if (!isLoggedIn) {
    return <Login onLogin={handleLogin} />
  }

  return (
    <ComplaintProvider>
      <div className="min-h-screen bg-gray-50">
        <Navbar 
          isAdmin={isAdmin} 
          setIsAdmin={setIsAdmin} 
          flatNo={flatNo}
          onLogout={handleLogout}
        />
        
        <div>
          {isAdmin ? <AdminDashboard /> : <ResidentDashboard flatNo={flatNo} />}
        </div>
      </div>
    </ComplaintProvider>
  )
}

export default App
import { LogOut } from 'lucide-react'

type NavbarProps = {
  isAdmin: boolean
  setIsAdmin: (value: boolean) => void
  flatNo: string
  onLogout: () => void
}

export default function Navbar({ isAdmin, setIsAdmin, flatNo, onLogout }: NavbarProps) {
  return (
    <nav className="bg-white shadow-sm border-b sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-3">
          <h1 className="text-3xl font-bold text-blue-600">SocietyFix</h1>
          <span className="text-sm bg-gray-100 px-3 py-1 rounded-full">Flat: {flatNo}</span>
        </div>
        
        <div className="flex items-center gap-4">
          <button
            onClick={() => setIsAdmin(!isAdmin)}
            className="px-5 py-2.5 rounded-2xl bg-blue-600 hover:bg-blue-700 text-white font-medium transition"
          >
            Switch to {isAdmin ? "Resident" : "Admin"} Mode
          </button>
          
          <button 
            onClick={onLogout}
            className="flex items-center gap-2 text-red-600 hover:text-red-700 font-medium"
          >
            <LogOut size={20} /> Logout
          </button>
        </div>
      </div>
    </nav>
  )
}
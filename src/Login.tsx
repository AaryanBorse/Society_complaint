import { useState } from 'react'

type LoginProps = {
  onLogin: (isAdmin: boolean, flatNo: string) => void
}

export default function Login({ onLogin }: LoginProps) {
  const [flatNo, setFlatNo] = useState('')
  const [role, setRole] = useState<'resident' | 'admin'>('resident')
  const [error, setError] = useState('')

  const handleLogin = () => {
    if (!flatNo.trim()) {
      setError("Please enter Flat Number")
      return
    }

    // Simple validation
    if (role === 'admin' && flatNo !== "ADMIN123") {
      setError("Invalid Admin Code. Use ADMIN123")
      return
    }

    setError('')
    onLogin(role === 'admin', flatNo)
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center">
      <div className="bg-white p-10 rounded-3xl shadow-2xl w-full max-w-md">
        <h1 className="text-4xl font-bold text-center mb-2 text-blue-600">SocietyFix</h1>
        <p className="text-center text-gray-500 mb-8">Society Complaint Management</p>

        <div className="space-y-6">
          <div>
            <label className="block text-sm font-medium mb-2">Select Role</label>
            <div className="flex gap-4">
              <button
                onClick={() => setRole('resident')}
                className={`flex-1 py-4 rounded-2xl font-medium ${role === 'resident' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
              >
                Resident
              </button>
              <button
                onClick={() => setRole('admin')}
                className={`flex-1 py-4 rounded-2xl font-medium ${role === 'admin' ? 'bg-blue-600 text-white' : 'bg-gray-100'}`}
              >
                Admin
              </button>
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-2">
              {role === 'admin' ? "Admin Code" : "Flat Number"}
            </label>
            <input
              type="text"
              placeholder={role === 'admin' ? "ADMIN123" : "A-101"}
              value={flatNo}
              onChange={(e) => setFlatNo(e.target.value.toUpperCase())}
              className="w-full p-4 border border-gray-300 rounded-2xl focus:outline-none focus:border-blue-500 text-lg"
            />
          </div>

          {error && <p className="text-red-500 text-center">{error}</p>}

          <button
            onClick={handleLogin}
            className="w-full bg-blue-600 hover:bg-blue-700 text-white py-4 rounded-2xl font-semibold text-lg transition"
          >
            Login
          </button>
        </div>

        <p className="text-center text-xs text-gray-400 mt-8">
          Demo: Use <strong>ADMIN123</strong> for Admin
        </p>
      </div>
    </div>
  )
}
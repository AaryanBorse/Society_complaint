import { createContext, useContext, useState, useEffect } from 'react'
import type { ReactNode } from 'react'
import type { Complaint } from '../types'

type ComplaintContextType = {
  complaints: Complaint[]
  addComplaint: (data: any) => void
  updateComplaint: (id: string, updates: any) => void
  refreshComplaints: () => void
}

const ComplaintContext = createContext<ComplaintContextType | undefined>(undefined)

export function ComplaintProvider({ children }: { children: ReactNode }) {
  const [complaints, setComplaints] = useState<Complaint[]>([])

  const loadComplaints = () => {
    const saved = localStorage.getItem('complaints')
    if (saved) {
      setComplaints(JSON.parse(saved))
    }
  }

  useEffect(() => {
    loadComplaints()
  }, [])

  const addComplaint = (data: any) => {
    const newComplaint: Complaint = {
      ...data,
      id: Date.now().toString(),
      status: 'Open',
      residentName: 'Aaryan Sharma',
      createdAt: new Date().toISOString(),
    }
    const updated = [...complaints, newComplaint]
    setComplaints(updated)
    localStorage.setItem('complaints', JSON.stringify(updated))
  }

  const updateComplaint = (id: string, updates: any) => {
    const updated = complaints.map(c =>
      c.id === id ? { ...c, ...updates } : c
    )
    setComplaints(updated)
    localStorage.setItem('complaints', JSON.stringify(updated))
  }

  const refreshComplaints = () => loadComplaints()

  return (
    <ComplaintContext.Provider value={{ complaints, addComplaint, updateComplaint, refreshComplaints }}>
      {children}
    </ComplaintContext.Provider>
  )
}

export const useComplaints = () => {
  const context = useContext(ComplaintContext)
  if (!context) throw new Error('useComplaints must be used within ComplaintProvider')
  return context
}
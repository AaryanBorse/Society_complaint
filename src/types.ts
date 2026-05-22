export type Complaint = {
  id: string
  title: string
  type: string
  description: string
  priority: 'Low' | 'Medium' | 'High'
  status: 'Open' | 'In Progress' | 'Resolved'
  residentName: string
  assignedTo?: string
  remarks?: string
  createdAt: string
}
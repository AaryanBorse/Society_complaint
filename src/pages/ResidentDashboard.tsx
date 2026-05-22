import ComplaintForm from '../components/ComplaintForm'
import ComplaintList from '../components/ComplaintList'
import { useComplaints } from '../context/ComplaintContext'

type ResidentDashboardProps = {
  flatNo?: string
}

export default function ResidentDashboard({ flatNo = 'A-101' }: ResidentDashboardProps) {
  const { complaints, addComplaint } = useComplaints()

  return (
    <div className="max-w-7xl mx-auto px-6 py-10">
      <div className="flex justify-between items-center mb-10">
        <h2 className="text-4xl font-bold">Resident Portal</h2>
        <p className="text-lg text-gray-600 font-medium">Flat No: <span className="text-blue-600">{flatNo}</span></p>
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
        <ComplaintForm onSubmit={addComplaint} />
        <ComplaintList complaints={complaints} isAdmin={false} />
      </div>
    </div>
  )
}
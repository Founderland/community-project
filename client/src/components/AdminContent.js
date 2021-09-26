import AdminDashboard from './AdminDashboard'

const AdminContent = ({view}) => {
    return (
        <main className="overflow-x-hidden">
            <div className="items-center mx-auto px-4 py-2">
                <div className="flex justify-center px-3 h-screen">
                    {view === 'Dashboard' ? <AdminDashboard /> : view}
                </div>
            </div>
        </main>
    )
}

export default AdminContent
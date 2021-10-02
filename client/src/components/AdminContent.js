import AddQuestionForm from './AddQuestionForm'
import AdminDashboard from './AdminDashboard'

const AdminContent = ({ view }) => {
    return (
        <main className="overflow-x-hidden">
            <div className="items-center mx-auto px-4 py-2">
                <div className="flex justify-center h-screen">
                    {view === 'Dashboard' && <AdminDashboard />}
                    {/* {view === 'Founders Form' && (
                        <AddQuestionForm memberType={'founder'} />
                    )}
                    {view === 'Investors Form' && (
                        <AddQuestionForm memberType={'investor'} />
                    )} */}
                </div>
            </div>
        </main>
    )
}

export default AdminContent

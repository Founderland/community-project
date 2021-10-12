import { useContext } from 'react'
import AdminContext from '../../contexts/Admin'
import QuestionsList from './QuestionsList'
import Dashboard from './Dashboard'
import Profile from './Profile'
import Settings from './Settings'

const Content = () => {
  const { view, views } = useContext(AdminContext)
  return (
    <main className="overflow-x-hidden">
      <div className="items-center mx-auto md:px-4 py-2">
        <div className="flex justify-center h-screen">
          {views[view] === 'Dashboard' && <Dashboard />}
          {views[view].includes('Form') && (
            <QuestionsList
              memberType={views[view].toLowerCase().split(' ')[0]}
            />
          )}
          {/* {view === 'Investors Form' && (
            <AddQuestionForm memberType={'investor'} />
          )} */}
          {views[view] === 'Profile' && <Profile />}
          {views[view] === 'Settings' && <Settings />}
        </div>
      </div>
    </main>
  )
}

export default Content

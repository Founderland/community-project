import FounderWidget from './FounderWidget'
import InvestorWidget from './InvestorWidget'
import AllyWidget from './AllyWidget'


const AdminDashboard = () => {
    return (
        <div className="flex flex-col w-full">
            <div class=" md:flex lg:flex w-full">
                <FounderWidget />
                <InvestorWidget />
                <AllyWidget />
            </div>
            <div class=" md:flex lg:flex w-full">
                <FounderWidget />
                <InvestorWidget />
            </div>
            <div class=" md:flex lg:flex w-full">
                
            </div>
        </div>
    )
}

export default AdminDashboard
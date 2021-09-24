import CompactWidget from './CompactWidget'
import ListWidget from './ListWidget'


const AdminDashboard = () => {
    return (
        <div className="flex flex-col w-full">
            <div class=" md:flex lg:flex w-full">
                <CompactWidget data={{label:'Founders', value: 124, change:0, percent: '▼ 42.8%'}} />
                <CompactWidget data={{label:'Founders', value: 200, change:0, percent: '▼ 42.8%'}} />
                <CompactWidget data={{label:'Founders', value: 124, change:1, percent: '▲ 57.1%'}} />
            </div>
            <div class=" md:flex lg:flex w-full">
                <CompactWidget data={{label:'Founders', value: 50, change:1, percent: '▲ 57.1%'}} />
                <CompactWidget data={{label:'Founders', value: 124, change:0, percent: '▼ 42.8%'}} />
            </div>
            <div class=" md:flex lg:flex w-full">
                <ListWidget data={[]} />
            </div>
        </div>
    )
}

export default AdminDashboard
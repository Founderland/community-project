import ChartWidget from './ChartWidget'
import CompactWidget from './CompactWidget'
import ListWidget from './ListWidget'
import {
  founders,
  investors,
  allies,
  listData,
  approved,
  rejected,
  applicants,
  members,
} from './_DummyData'

const AdminDashboard = () => {
  return (
    <div className="flex flex-col w-full px-3">
      <div class=" md:flex lg:flex w-full">
        <CompactWidget data={founders} />
        <CompactWidget data={investors} />
        <CompactWidget data={allies} />
      </div>
      <div class=" md:flex lg:flex w-full">
        <CompactWidget data={approved} />
        <CompactWidget data={rejected} />
      </div>
      <div class="md:flex lg:flex w-full">
        <ListWidget title="Pending Final Review" data={listData} />
      </div>
      <div class="md:flex lg:flex w-full justify-around">
        <div className="h-40 w-1/3">
          <ChartWidget data={members} />
        </div>
        <div className="h-40 w-1/3">
          <ChartWidget data={applicants} />
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard

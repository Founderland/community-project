import CompactWidget from './CompactWidget'
import ListWidget from './ListWidget'

const founders = {
    label: 'Founders',
    value: 124,
    change: 0,
    percent: '▼ 42.8%',
}

const investors = {
    label: 'Investors',
    value: 200,
    change: 0,
    percent: '▼ 42.8%',
}

const allies = {
    label: 'Allies',
    value: 124,
    change: 1,
    percent: '▲ 57.1%',
}

const approved = {
    label: 'Approved',
    value: 50,
    change: 1,
    percent: '▲ 57.1%',
}

const rejected = {
    label: 'Rejected',
    value: 124,
    change: 0,
    percent: '▼ 42.8%',
}

const listData = {
    header: [
        { title: 'Role', style: 'text-left' },
        { title: 'Name', style: 'text-left' },
        { title: 'Reviewed By', style: 'text-center sm:block hidden' },
        { title: 'Status', style: 'text-center' },
        { title: 'Actions', style: 'text-center' },
    ],
    data: [
        {
            role: 'Founder',
            name: 'Eshal Rosas1',
            reviews: [
                {
                    name: 'Stephanie von Behr',
                    avatar_url:
                        'https://randomuser.me/api/portraits/women/2.jpg',
                    role: 'admin',
                },
                {
                    name: 'Victor',
                    avatar_url: 'https://randomuser.me/api/portraits/men/1.jpg',
                    role: 'user',
                },
            ],
            status: 'Pending',
        },
        {
            role: 'Founder',
            name: 'Marta Marta2',
            reviews: [
                {
                    name: 'Stephanie von Behr',
                    avatar_url:
                        'https://randomuser.me/api/portraits/women/2.jpg',
                    role: 'admin',
                },
                {
                    name: 'Victor',
                    avatar_url: 'https://randomuser.me/api/portraits/men/1.jpg',
                    role: 'user',
                },
            ],
            status: 'Pending',
        },
        {
            role: 'Founder',
            name: 'Eshal Rosas3',
            reviews: [],
            status: 'New',
        },
        {
            role: 'Investor',
            name: 'Jackeline Jackeline4',
            reviews: [
                {
                    name: 'Stephanie von Behr',
                    avatar_url:
                        'https://randomuser.me/api/portraits/women/2.jpg',
                    role: 'admin',
                },
                {
                    name: 'Victor',
                    avatar_url: 'https://randomuser.me/api/portraits/men/1.jpg',
                    role: 'user',
                },
            ],
            status: 'Pending',
        },
        {
            role: 'Ally',
            name: 'Eshal Rosas5',
            reviews: [],
            status: 'New',
        },
        {
            role: 'Founder',
            name: 'Rosa Rosa6',
            reviews: [
                {
                    name: 'Stephanie von Behr',
                    avatar_url:
                        'https://randomuser.me/api/portraits/women/2.jpg',
                    role: 'admin',
                },
                {
                    name: 'Victor',
                    avatar_url: 'https://randomuser.me/api/portraits/men/1.jpg',
                    role: 'user',
                },
                {
                    name: 'Sasmitha',
                    avatar_url:
                        'https://randomuser.me/api/portraits/women/2.jpg',
                    role: 'user',
                },
            ],
            status: 'Reviewed',
        },
        {
            role: 'Ally',
            name: 'Eshal Rosas7',
            reviews: [],
            status: 'New',
        },
        {
            role: 'Ally',
            name: 'Beatrice Beatrice8',
            reviews: [],
            status: 'New',
        },
        {
            role: 'Founder',
            name: 'Eshal Rosas9',
            reviews: [
                {
                    name: 'Stephanie von Behr',
                    avatar_url:
                        'https://randomuser.me/api/portraits/women/2.jpg',
                    role: 'admin',
                },
                {
                    name: 'Victor',
                    avatar_url: 'https://randomuser.me/api/portraits/men/1.jpg',
                    role: 'user',
                },
            ],
            status: 'Pending',
        },
    ],
}

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
            <div class=" md:flex lg:flex w-full">
                <ListWidget title="Pending Final Review" data={listData} />
            </div>
        </div>
    )
}

export default AdminDashboard

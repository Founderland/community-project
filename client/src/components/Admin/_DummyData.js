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
    {
      title: 'Role',
      key: 'role',
      style: 'py-3 px-6 text-center whitespace-nowrap',
    },
    { title: 'Name', key: 'name', style: 'text-center' },
    {
      title: 'Reviewed By',
      key: 'reviews',
      style: 'text-center sm:block hidden',
    },
    { title: 'Status', key: 'status', style: 'text-center' },
    { title: 'Actions', key: '-', style: 'text-center' },
  ],
  data: [
    {
      role: 'Founder',
      name: 'Eshal Rosas1',
      reviews: [
        {
          name: 'Stephanie von Behr',
          avatar_url: 'https://randomuser.me/api/portraits/women/2.jpg',
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
          avatar_url: 'https://randomuser.me/api/portraits/women/2.jpg',
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
          avatar_url: 'https://randomuser.me/api/portraits/women/2.jpg',
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
          avatar_url: 'https://randomuser.me/api/portraits/women/2.jpg',
          role: 'admin',
        },
        {
          name: 'Victor',
          avatar_url: 'https://randomuser.me/api/portraits/men/1.jpg',
          role: 'user',
        },
        {
          name: 'Sasmitha',
          avatar_url: 'https://randomuser.me/api/portraits/women/2.jpg',
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
          avatar_url: 'https://randomuser.me/api/portraits/women/2.jpg',
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

const applicants = {
  type: 'line',
  label: 'New Applicants',
  data: {
    labels: ['Fev', 'Mar', 'Apr', 'Mai', 'Jun', 'Jul'],
    datasets: [
      {
        label: 'New Applicants',
        data: [8, 30, 20, 8, 10, 2],
        backgroundColor: ['rgba(54, 162, 235, 0.4)'],
        borderColor: ['rgb(54, 162, 235)'],
        borderWidth: 1,
      },
    ],
  },
  options: {},
}

const members = {
  type: 'doughnut',
  label: 'Registered Members',
  data: {
    labels: ['Founders', 'Investors', 'Allies'],
    datasets: [
      {
        label: 'Registered Members',
        data: [150, 50, 80],
        backgroundColor: [
          'rgba(0,99,226, 0.4)',
          'rgba(246,51,28, 0.4)',
          'rgba(192,251,3, 0.4)',
        ],
        borderColor: ['rgb(30,58,138)', 'rgb(127,29,29)', 'rgb(6,78,59)'],
        hoverOffset: 4,
      },
    ],
  },
  options: {},
}

module.exports = {
  founders,
  investors,
  allies,
  listData,
  approved,
  rejected,
  applicants,
  members,
}

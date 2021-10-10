import { useEffect, useState } from 'react'
import axios from 'axios'
import ListWidget from './ListWidget'

const AdminFoundersForm = () => {
  const [listData, setListData] = useState({ data: [], header: [] })
  //    {
  //     header: [
  //       {
  //         title: 'Question',
  //         key: 'question',
  //         style: 'py-3 px-6 text-left ',
  //       },
  //       { title: 'Category', key: 'category', style: 'text-left' },
  //       {
  //         title: 'Type',
  //         key: 'type',
  //         style: 'text-left hidden md:table-cell items-center',
  //       },
  //       { title: 'Actions', key: '-', style: 'text-center' },
  //     ],
  //     data: [
  //       {
  //         _id: '614af929a47c96b7a3decf1e',
  //         category: 'About You',
  //         question: 'Name',
  //         rank: 'Not Important - just for info/further context',
  //         type: 'open',
  //         answers: [
  //           {
  //             answer: 'open',
  //             ideal: true,
  //             points: 0,
  //             notes: '',
  //             _id: '614af929a47c96b7a3decf1f',
  //           },
  //         ],
  //         __v: 0,
  //         categoryPage: 1,
  //       },
  //       {
  //         _id: '614af997a47c96b7a3decf21',
  //         category: 'About You',
  //         question: 'Title/Position',
  //         rank: 'Not Important - just for info/further context',
  //         type: 'open',
  //         answers: [
  //           {
  //             answer: 'open',
  //             ideal: true,
  //             points: 0,
  //             notes: '',
  //             _id: '614af997a47c96b7a3decf22',
  //           },
  //         ],
  //         __v: 0,
  //         categoryPage: 1,
  //       },
  //       {
  //         _id: '614af9aaa47c96b7a3decf24',
  //         category: 'About You',
  //         question: 'Contact Information',
  //         rank: 'Not Important - just for info/further context',
  //         type: 'open',
  //         answers: [
  //           {
  //             answer: 'open',
  //             ideal: true,
  //             points: 0,
  //             notes: '',
  //             _id: '614af9aaa47c96b7a3decf25',
  //           },
  //         ],
  //         __v: 0,
  //         categoryPage: 1,
  //       },
  //       {
  //         _id: '614afc27a47c96b7a3decf2c',
  //         category: 'About You',
  //         question:
  //           'Do you identify as a woman who has faced obstacles tied to your ethnicity/race and gender in your entrepreneurial journey? ',
  //         rank: 'Very Important - variable is scrutinized',
  //         type: 'choice',
  //         answers: [
  //           {
  //             answer: 'Continental Europe',
  //             ideal: true,
  //             points: 50,
  //             notes: '',
  //             _id: '614afc27a47c96b7a3decf2d',
  //           },
  //           {
  //             answer: 'United Kingdom',
  //             ideal: true,
  //             points: 50,
  //             notes: '',
  //             _id: '614afc27a47c96b7a3decf2e',
  //           },
  //           {
  //             answer:
  //               'Not in Europe or the UK but planning on relocating to that area',
  //             ideal: true,
  //             points: 200,
  //             notes: '',
  //             _id: '614afc27a47c96b7a3decf2f',
  //           },
  //           {
  //             answer: 'Not in Europe or the UK',
  //             ideal: false,
  //             points: 0,
  //             notes: '',
  //             _id: '614afc27a47c96b7a3decf30',
  //           },
  //         ],
  //         __v: 0,
  //         categoryPage: 2,
  //       },
  //       {
  //         _id: '61504f8f0c2bca9157672caa',
  //         category: 'About Your Business',
  //         question:
  //           'What kind of business have you founded/are you planning to found?',
  //         rank: 'Very Important - variable is scrutinized',
  //         type: 'open',
  //         answers: [
  //           {
  //             answer: 'open',
  //             ideal: true,
  //             points: 0,
  //             notes: '',
  //             _id: '61504f8f0c2bca9157672cab',
  //           },
  //         ],
  //         __v: 0,
  //         categoryPage: 1,
  //       },
  //       {
  //         _id: '615051cd0c2bca9157672cad',
  //         category: 'About Your Business',
  //         question: 'How many employees do you currently have?',
  //         rank: 'Not Important - just for info/further context',
  //         type: 'open',
  //         answers: [
  //           {
  //             answer: 'Just Me',
  //             ideal: false,
  //             points: 0,
  //             notes: '',
  //             _id: '615051cd0c2bca9157672cae',
  //           },
  //           {
  //             answer: '1-5',
  //             ideal: true,
  //             points: 0,
  //             notes: '',
  //             _id: '615051cd0c2bca9157672caf',
  //           },
  //           {
  //             answer: '6-10',
  //             ideal: true,
  //             points: 0,
  //             notes: '',
  //             _id: '615051cd0c2bca9157672cb0',
  //           },
  //           {
  //             answer: '11-20',
  //             ideal: true,
  //             points: 0,
  //             notes: '',
  //             _id: '615051cd0c2bca9157672cb1',
  //           },
  //           {
  //             answer: '21+',
  //             ideal: true,
  //             points: 0,
  //             notes: '',
  //             _id: '615051cd0c2bca9157672cb2',
  //           },
  //         ],
  //         __v: 0,
  //         categoryPage: 1,
  //       },
  //       {
  //         _id: '615052500c2bca9157672cb4',
  //         category: 'About Your Business',
  //         question: 'Are you currently hiring?',
  //         rank: 'Very Important - variable is scrutinized',
  //         type: 'open',
  //         answers: [
  //           {
  //             answer: 'Yes',
  //             ideal: true,
  //             points: 0,
  //             notes: '',
  //             _id: '615052500c2bca9157672cb5',
  //           },
  //           {
  //             answer: 'No',
  //             ideal: false,
  //             points: 0,
  //             notes: '',
  //             _id: '615052500c2bca9157672cb6',
  //           },
  //         ],
  //         __v: 0,
  //         categoryPage: 1,
  //       },
  //       {
  //         _id: '615055580c2bca9157672cb8',
  //         category: 'About Your Business',
  //         question: 'Where is your Business registered (based)',
  //         rank: 'Vital - Deal Maker or Breaker',
  //         type: 'list',
  //         answers: [
  //           {
  //             answer: 'Continental Europe',
  //             ideal: true,
  //             points: 50,
  //             notes: '',
  //             _id: '615055580c2bca9157672cb9',
  //           },
  //           {
  //             answer: 'United Kingdom',
  //             ideal: true,
  //             points: 50,
  //             notes: '',
  //             _id: '615055580c2bca9157672cba',
  //           },
  //           {
  //             answer:
  //               'Not in Europe or the UK but planning on relocating to that area',
  //             ideal: true,
  //             points: 200,
  //             notes: '',
  //             _id: '615055580c2bca9157672cbb',
  //           },
  //           {
  //             answer: 'Not in Europe or UK',
  //             ideal: false,
  //             points: 200,
  //             notes: '',
  //             _id: '615055580c2bca9157672cbc',
  //           },
  //         ],
  //         __v: 0,
  //         categoryPage: 2,
  //       },
  //       {
  //         _id: '6150585c0c2bca9157672cd5',
  //         category: 'Tell Us More',
  //         question: 'How long have you been working on your business project? ',
  //         rank: 'Not Important - just for info/further context',
  //         type: 'open',
  //         answers: [
  //           {
  //             answer: 'open',
  //             ideal: true,
  //             points: 0,
  //             notes: '',
  //             _id: '6150585c0c2bca9157672cd6',
  //           },
  //         ],
  //         __v: 0,
  //         categoryPage: 1,
  //       },
  //       {
  //         _id: '615058830c2bca9157672cd8',
  //         category: 'Tell Us More',
  //         question: 'Are you working on this full time or is it a side hustle? ',
  //         rank: 'Not Important - just for info/further context',
  //         type: 'open',
  //         answers: [
  //           {
  //             answer: 'open',
  //             ideal: true,
  //             points: 0,
  //             notes: '',
  //             _id: '615058830c2bca9157672cd9',
  //           },
  //         ],
  //         __v: 0,
  //         categoryPage: 1,
  //       },
  //       {
  //         _id: '615063c39f7f98705372c034',
  //         category: 'About You',
  //         question: 'Email',
  //         rank: 'Not Important - just for info/further context',
  //         type: 'open',
  //         answers: [
  //           {
  //             answer: 'open',
  //             ideal: true,
  //             points: 0,
  //             notes: '',
  //             _id: '615063c39f7f98705372c035',
  //           },
  //         ],
  //         __v: 0,
  //         categoryPage: 1,
  //       },
  //       {
  //         _id: '6151a99f1c5530521565de70',
  //         category: 'About Your Business',
  //         question: 'testing',
  //         rank: 'Vital - Deal Maker or Breaker',
  //         type: 'list',
  //         answers: [
  //           {
  //             answer: '1 answer',
  //             ideal: true,
  //             points: 100,
  //             _id: '6151a99f1c5530521565de71',
  //           },
  //           {
  //             answer: ' 2nd answer',
  //             ideal: false,
  //             points: 10,
  //             _id: '6151a99f1c5530521565de72',
  //           },
  //           {
  //             answer: ' 3rd',
  //             ideal: false,
  //             points: 100,
  //             _id: '6151a99f1c5530521565de73',
  //           },
  //         ],
  //         categoryPage: 1,
  //         __v: 0,
  //       },
  //       {
  //         _id: '6151aa169ef3d5e834128142',
  //         category: 'About Your Business',
  //         question:
  //           'How much funding do you have access to (regardless of how it was acquired)?',
  //         rank: 'Very Important - variable is scrutinized',
  //         type: 'list',
  //         answers: [
  //           {
  //             answer: ' up to €250k',
  //             ideal: true,
  //             points: 5,
  //             _id: '6151aa169ef3d5e834128143',
  //           },
  //           {
  //             answer: ' €250k-500k',
  //             ideal: false,
  //             points: 0,
  //             _id: '6151aa169ef3d5e834128144',
  //           },
  //           {
  //             answer: ' €500k - 2M',
  //             ideal: false,
  //             points: 0,
  //             _id: '6151aa169ef3d5e834128145',
  //           },
  //           {
  //             answer: ' €2M+',
  //             ideal: false,
  //             points: 0,
  //             _id: '6151aa169ef3d5e834128146',
  //           },
  //         ],
  //         categoryPage: 2,
  //         __v: 0,
  //       },
  //       {
  //         _id: '6152252bbe5804aa4352ef41',
  //         category: 'About You',
  //         question:
  //           'Can you explain one (or more) of the obstacles you have faced? ',
  //         rank: 'Not Important - just for info/further context',
  //         type: 'open',
  //         answers: [
  //           {
  //             answer: 'open',
  //             ideal: true,
  //             points: 0,
  //             notes: '',
  //             _id: '6152252bbe5804aa4352ef42',
  //           },
  //         ],
  //         categoryPage: 2,
  //         __v: 0,
  //       },
  //       {
  //         _id: '6152255abe5804aa4352ef63',
  //         category: 'About You',
  //         question: 'What is your ethnicity? (If you feel comfortable sharing) ',
  //         rank: 'Not Important - just for info/further context',
  //         type: 'open',
  //         answers: [
  //           {
  //             answer: 'open',
  //             ideal: true,
  //             points: 0,
  //             notes: '',
  //             _id: '6152255abe5804aa4352ef64',
  //           },
  //         ],
  //         categoryPage: 2,
  //         __v: 0,
  //       },
  //       {
  //         _id: '61543c0bcc293379990808f0',
  //         category: 'Tell us more',
  //         question: 'test3',
  //         rank: 'Not Important - just for info/further context',
  //         type: 'open',
  //         answers: [],
  //         categoryPage: 2,
  //         __v: 0,
  //       },
  //       {
  //         _id: '61543c71cc293379990808f2',
  //         category: 'About You',
  //         question: 'Gender',
  //         rank: 'Not Important - just for info/further context',
  //         type: 'list',
  //         answers: [
  //           {
  //             answer: 'male',
  //             ideal: false,
  //             points: 0,
  //             _id: '61543c71cc293379990808f3',
  //           },
  //           {
  //             answer: ' female',
  //             ideal: false,
  //             points: 0,
  //             _id: '61543c71cc293379990808f4',
  //           },
  //           {
  //             answer: ' other',
  //             ideal: false,
  //             points: 0,
  //             _id: '61543c71cc293379990808f5',
  //           },
  //         ],
  //         categoryPage: 1,
  //         __v: 0,
  //       },
  //       {
  //         _id: '61544c717680253cce601100',
  //         category: 'Tell us more',
  //         question: 'do u live in UK',
  //         rank: 'Not Important - just for info/further context',
  //         type: 'list',
  //         answers: [
  //           {
  //             answer: ' yes',
  //             ideal: false,
  //             points: 0,
  //             _id: '61544c717680253cce601101',
  //           },
  //           {
  //             answer: ' no',
  //             ideal: false,
  //             points: 0,
  //             _id: '61544c717680253cce601102',
  //           },
  //           {
  //             answer: ' other',
  //             ideal: false,
  //             points: 0,
  //             _id: '61544c717680253cce601103',
  //           },
  //         ],
  //         categoryPage: 1,
  //         __v: 0,
  //       },
  //       {
  //         _id: '61545d977680253cce601237',
  //         category: 'Tell us more',
  //         question: 'do you live in Europe',
  //         rank: 'Not Important - just for info/further context',
  //         type: 'list',
  //         answers: [
  //           {
  //             answer: 'yes',
  //             ideal: false,
  //             points: 0,
  //             _id: '61545d977680253cce601238',
  //           },
  //           {
  //             answer: ' no',
  //             ideal: false,
  //             points: 0,
  //             _id: '61545d977680253cce601239',
  //           },
  //           {
  //             answer: '   other  ',
  //             ideal: false,
  //             points: 0,
  //             _id: '61545d977680253cce60123a',
  //           },
  //         ],
  //         categoryPage: 2,
  //         __v: 0,
  //       },
  //       {
  //         _id: '61546f77b0051cba07c4e183',
  //         category: 'Tell us more',
  //         question: 'mandatory??',
  //         rank: 'Not Important - just for info/further context',
  //         type: 'list',
  //         answers: [
  //           {
  //             answer: 'yes',
  //             ideal: true,
  //             points: 10,
  //             _id: '61546f77b0051cba07c4e184',
  //           },
  //           {
  //             answer: 'no',
  //             ideal: false,
  //             points: 0,
  //             _id: '61546f77b0051cba07c4e185',
  //           },
  //         ],
  //         categoryPage: 1,
  //         mandatory: true,
  //         __v: 0,
  //       },
  //     ],
  //   })

  useEffect(() => {
    const fetchData = async () => {
      try {
        const result = await axios.get('/api/form/founder/questions')
        if (result.data)
          setListData({
            header: [
              {
                title: 'Question',
                key: 'question',
                style: 'py-3 px-6 text-left ',
              },
              { title: 'Category', key: 'category', style: 'text-left' },
              {
                title: 'Type',
                key: 'type',
                style: 'text-left hidden md:table-cell items-center',
              },
              { title: 'Actions', key: '-', style: 'text-center' },
            ],
            data: result.data,
            colSize: [
              <colgroup>
                <col style={{ width: '40vw' }} />
                <col style={{ width: '20vw' }} />
                <col style={{ width: '20vw' }} className="hidden md:flex" />
                <col style={{ width: '20vw' }} />
              </colgroup>,
            ],
          })
      } catch (e) {
        console.log(e)
      }
    }
    fetchData()
  }, [])

  return (
    <div className="w-full">
      <ListWidget
        title="Founders questions list"
        data={listData}
        showing={10}
        colSize={listData.colSize}
        cellAlignment={'justify-start'}
      />
    </div>
  )
}

export default AdminFoundersForm

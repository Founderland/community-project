import React, { useContext } from "react";
import CategoryDisplay from "./CategoryDisplay";
import Resourcebg from "../../../assets/images/resourcebg.png";
import LogoTransform from "../../../assets/images/croppedLogo.gif"
import { CommunityContext } from "../../../contexts/CommunityProvider";
import { useParams } from "react-router";
import DisplayArticles from "./DisplayArticles";

export default function ResourcesList() {
  
  const { category, categoryHandler } = useContext(CommunityContext)

  const {categoryPath} = useParams()
console.log(categoryPath)
  const data = [
    {
      id: 1,
      categoryName: "Welcome Guide",
      path: "welcome-guide",
 
    },
    {
      id: 2,
      categoryName:"Resources",
      path: "resources",
      articles: [
        {
          articleName: "Getting started",
          articleDescription:
            "If you are new to our community, this is for you ",
          articleBody:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat ",
          articleSubmittedDate: "17/10/2021",
        },
        {
          articleName: "Our Future Roadmaps",
          articleDescription:
            "This explains what we are up to inthe near feature",
          articleBody:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat ",
          articleSubmittedDate: "18/10/2021",
        },
      ],
    },
    {
      id: 3,
      categoryName: "Videos",
      path: "videos",
      articles: [
        {
          articleName:
            "Gender equality in the workplace",
          articleDescription: "More women on boards, so what?",
          articleBody:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat ",
          articleSubmittedDate: "19/10/2021",
        },
        {
          articleName: "Need to Nurture Entrepreneurship in Young Girls",
          articleDescription: "More women on boards, so what?",
          articleBody:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat ",
          articleSubmittedDate: "17/10/2021",
        },
        {
          articleName: "The Missing Politics of Female Empowerment",
          articleDescription: "More women on boards, so what?",
          articleBody:
            "At vero eos et accusamus et iusto odio dignissimos ducimus qui blanditiis praesentium voluptatum deleniti atque corrupti quos dolores et quas molestias excepturi sint occaecati cupiditate non provident, similique sunt in culpa qui officia deserunt mollitia animi, id est laborum et dolorum fuga. Et harum quidem rerum facilis est et expedita distinctio. Nam libero tempore, cum soluta nobis est eligendi optio cumque nihil impedit quo minus id quod maxime placeat facere possimus, omnis voluptas assumenda est, omnis dolor repellendus. Temporibus autem quibusdam et aut officiis debitis aut rerum necessitatibus saepe eveniet ut et voluptates repudiandae sint et molestiae non recusandae. Itaque earum rerum hic tenetur a sapiente delectus, ut aut reiciendis voluptatibus maiores alias consequatur aut perferendis doloribus asperiores repellat ",
          articleSubmittedDate: "18/10/2021",
        },
      ],
    },
   
    
  ];

  return (
    <div>
      {/* <div className='fixed top-0 left-0 z-10 right-0 flex justify-center items-center w-full bg-white shadow-lg h-16'>
        <h1 className='text-3xl'> Navbar </h1>
      </div> */}

      <div className='w-full flex h-screen   '>
        <div className='w-1/4  flex flex-col pt-10  pl-16 bg-gray-50 bg-opacity-50' >
         
        <div class="flex items-center justify-center">
    <div class="flex border-2 rounded">
        <input type="text" class="px-4 py-2 w-60" placeholder="Search..." />
        <button class="flex items-center justify-center px-4 border-l">
            <svg class="w-6 h-6 text-gray-600" fill="currentColor" xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24">
                <path
                    d="M16.32 14.9l5.39 5.4a1 1 0 0 1-1.42 1.4l-5.38-5.38a8 8 0 1 1 1.41-1.41zM10 16a6 6 0 1 0 0-12 6 6 0 0 0 0 12z" />
            </svg>
        </button>
    </div>
</div>

<div className="pt-10  mr-2 ">
          {data.map((item) => (
            <CategoryDisplay data={item} active={item.path===categoryPath}/>
          ))}
          {/* <div className=" ">
            <img src={LogoTransform} alt="logo" />
            </div> */}
            </div>
        </div>
        {!categoryPath ?
        <div className='w-3/4 relative'>
          <img className='w-full h-full object-cover' src={Resourcebg} alt='resource' />
          <div className="absolute top-0 flex items-center justify-center w-full h-full">
          <h1 className="text-hanson lg:text-7xl  2xl:text-8xl text-white p-36 "> The Founderland Library</h1>
          </div>
          </div> :
          <div className='w-3/4 relative'>


            {
            <DisplayArticles data={data.filter((item) => 
              item.path===categoryPath)} />
          }
        
       
            </div>
        }


      </div>
    </div>
  );
}

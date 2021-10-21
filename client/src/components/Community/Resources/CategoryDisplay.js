import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import folder from '../../../assets/images/folder.png'
import pinkFolder from '../../../assets/images/pinkFolder.png'
import { CommunityContext } from '../../../contexts/CommunityProvider';

export default function CategoryDisplay(props) {
   const data = props.data;
   let history = useHistory();
   const { view } = useParams()

   const { category, categoryHandler } = useContext(CommunityContext)

   const categoryClickHandler = () => {
      categoryHandler(!category)
      history.push(data.path);
   }
   return (
      <Link to={`/community/resources/${data.path}`}>
         <div className="flex mb-14">
            <img classname=""src={folder} alt="folder" />
            <div className="flex items-center">
               <h1 className="text-black text-grotesk  font-semibold text-3xl p-2 "> {data.categoryName}</h1>
               </div>
         </div>
         
      </Link>
   )
}


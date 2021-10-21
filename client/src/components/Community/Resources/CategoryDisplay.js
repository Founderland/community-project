import React, { useContext } from 'react'
import { useHistory, useParams } from 'react-router';
import { Link } from 'react-router-dom';
import folder from '../../../assets/images/folder.png'
import redFolder from '../../../assets/images/redfolder.png'
import { CommunityContext } from '../../../contexts/CommunityProvider';

export default function CategoryDisplay(props) {
   const data = props.data;
   let history = useHistory();
   const { view } = useParams()

   const { category, categoryHandler } = useContext(CommunityContext)

   const categoryClickHandler = () => {
      categoryHandler(data.path)
      history.push(data.path);
   }
   return (
      <Link to={`/community/resources/${data.path}`}>
         <div className="flex mb-14" onClick={categoryClickHandler }>
         
            {category!==data.path || data.path==="resources" ?  <img classname="" src={folder} alt="folder" /> : <img classname="" src={redFolder} alt="folder" />}
            <div className="flex items-center">
               <h1 className="text-black text-grotesk  font-semibold text-2xl p-2 "> {data.categoryName}</h1>
               </div>
         </div>
         
      </Link>
   )
}


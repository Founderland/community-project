import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const CommunityContext = createContext(null);

function CommunityProvider({ children }) {
const [category,setCategory]=useState(false)


   const categoryHandler = (value) => {
      setCategory(value)
   }
   
   

   return <CommunityContext.Provider
   
      value={{
         categoryHandler: categoryHandler,
         category:category
      }} >
      {children}
   </CommunityContext.Provider>;
}

export default CommunityProvider;

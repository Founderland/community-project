import axios from "axios";
import { createContext, useState, useEffect } from "react";

export const CommunityContext = createContext(null);

function CommunityProvider({ children }) {

   const memberData = [
      {
        firstname: "Ali",
        lasname: "Kakande",
        companyname: "Carib Eats",
        website: "https://www.caribeats.org/",
        city: "London",
        lat: "51.507351",
        lng: "-0.127758",
         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_NKt2dMi4t0vR_dO1OUZew_GtiWoxAmYwoA&usqp=CAU",
         vertical:"D2C, Food"
      },
      {
        firstname: "Alisha",
        lasname: "Morenike Fisher",
        companyname: "Migrant's Bureau",
        website: "www.migrantsbureau.com",
        city: "London",
        lat: "51.507351",
         lng: "-0.127758",
         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcT_NKt2dMi4t0vR_dO1OUZew_GtiWoxAmYwoA&usqp=CAU",
         vertical:"DesignTech"
      },
      {
        firstname: "Alissa",
        lasname: "Del Toro",
        companyname: "Playground Logic",
        website: "www.migrantsbureau.com",
        city: "Berlin",
         lat:"52.520008",
         lng: "13.404954",
         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHYNR_B_LzJmEJ2_jKKXo-Cef0QvDjGDr5_Q&usqp=CAU",
         vertical:"Gaming/Entertainment and HealthTech"
  
      },
  
      {
        firstname: "Antonia",
        lasname: "Opiah",
        companyname: "Un-ruly",
        website: "https://un-ruly.com",
        city: "Paris",
        lat:"48.8566",
         lng: "2.3522",
         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHYNR_B_LzJmEJ2_jKKXo-Cef0QvDjGDr5_Q&usqp=CAU",
         vertical:"E-comm/Marketplaces"
      },
  
      {
        firstname: "Vidya",
        lasname: "munde-muller",
        companyname: "Quantum dice",
        website: "https://www.givetastic.org/",
        city: "Hannover",
        lat: "51.507351",
        lng: "-0.127758",
         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHYNR_B_LzJmEJ2_jKKXo-Cef0QvDjGDr5_Q&usqp=CAU",
         vertical:"MediaTech"
         
      },
  
      {
        firstname: "Sonita",
        lasname: "Soth",
        companyname: "Feniska",
        website: "https://feniska.com/",
        city: "Berlin",
        lat:"52.520008",
         lng: "13.404954",
         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHYNR_B_LzJmEJ2_jKKXo-Cef0QvDjGDr5_Q&usqp=CAU",
         vertical:"Sustainability/D2C/E-Comm"
      },
      {
        firstname: "Tanya",
        lasname: "Sharma",
        companyname:"Wonderpath",
        website: "https://www.wonder-path.com/",
        city: "London",
        lat: "51.507351",
         lng: "-0.127758",
         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHYNR_B_LzJmEJ2_jKKXo-Cef0QvDjGDr5_Q&usqp=CAU",
         vertical:"CyberSecurity/B2B"
      },
  
      {
        firstname: "Shilpa",
        lasname: "Mahajan",
       companyname: "Hobbyt",
         website: "https://hobbYt.fun",
        city: "Amsterdam",
        lat: "52.3676",
         lng: "4.9041",
         img: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSHYNR_B_LzJmEJ2_jKKXo-Cef0QvDjGDr5_Q&usqp=CAU",
         vertical:"FinTech"
      },
     
    ];


   const [category, setCategory] = useState(false)
   const [memberDetails, setMemberDetails] = useState([])
   const [isSidebarSelected, setIssideSelected] = useState(false)


 useEffect(() => {
   setMemberDetails(memberData)
 }, [])
   
   const categoryHandler = (value) => {
      setCategory(value)
   }
   const sidebarHandler = (value) => {
      setIssideSelected(value)
   }
  

   return <CommunityContext.Provider
   
      value={{
         categoryHandler: categoryHandler,
         category: category,
         memberDetails: memberDetails,
         sidebarHandler: sidebarHandler,
         isSidebarSelected: isSidebarSelected,
        
         
      }} >
      {children}
   </CommunityContext.Provider>;
}

export default CommunityProvider;

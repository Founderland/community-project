import React, { useEffect, useRef, useState, useCallback } from 'react';


export default function SelectAnswer({answers, selectedAnswer}) {
   const [showList, setShowList] = useState(false);
   const [selectedItem, setSelectedItem] = useState("")
   const panelResultElement = useRef();
   const selectButton = useRef();

   const handleClickOutside = useCallback((event) => {
       const myHTMLWrapper = panelResultElement.current;
       const searchElement = selectButton.current;
       if (
           myHTMLWrapper &&
           searchElement &&
           !myHTMLWrapper.contains(event.target) &&
           !searchElement.contains(event.target)
       ) {
           setShowList(false);
       }
   }, []);
   useEffect(() => {
       document.addEventListener('mousedown', handleClickOutside);
       return () => {
           document.removeEventListener('mousedown', handleClickOutside);
       };
   }, [handleClickOutside]);


   const itemClicked = (text, index) => {
      setSelectedItem(text)
      setShowList(!showList)
      selectedAnswer(text)
   }

   const listItem = (text,index) => (
      <li
                                id="listbox-item-0"
         role="option"
         onClick={()=> itemClicked(text,index)}
                                className="text-gray-900 cursor-default hover:bg-fblue hover:text-white select-none relative py-2 pl-3 pr-9 border-gray-300 border-b"
                            >
                                <div className="flex items-center ">
            <span className="ml-3 block font-normal  break-word">{text}</span>
                                </div>
                     </li>
   )



   return (
      <div className="w-1/2">
      <div className="mt-1 relative">
          <button
              type="button"
              ref={selectButton}
              onClick={() => setShowList(!showList)}
              className="relative w-full bg-white  border-gray mt-1 border-2  pl-3 pr-10 py-3 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-fblue focus:border-fblue sm:text-sm md:text-lg" >
              <span className="flex items-center">
                  <span className="ml-3 block truncate">{selectedItem ? selectedItem : "Select Item"}</span>
              </span>
              <span className="ml-3 absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
                  <svg
                      className="h-5 w-5 text-gray-400"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                  >
                      <path
                          fillRule="evenodd"
                          d="M10 3a1 1 0 01.707.293l3 3a1 1 0 01-1.414 1.414L10 5.414 7.707 7.707a1 1 0 01-1.414-1.414l3-3A1 1 0 0110 3zm-3.707 9.293a1 1 0 011.414 0L10 14.586l2.293-2.293a1 1 0 011.414 1.414l-3 3a1 1 0 01-1.414 0l-3-3a1 1 0 010-1.414z"
                          clipRule="evenodd"
                      />
                  </svg>
              </span>
            </button>
            {(showList) && (
                    <div ref={panelResultElement} className="absolute mt-1 w-full z-10 rounded-md bg-white shadow-lg">
                        <ul
                            tabIndex={-1}
                            role="listbox"
                            aria-labelledby="listbox-label"
                            aria-activedescendant="listbox-item-3"
                            className="max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm md:text-md xl:text-lg"
                  >
                     
                     {
                        answers.map((item,index) => listItem(item.answer,index))
                     }
                            
                     </ul>
                    </div>
                )}
            </div>
        </div>


   )
}
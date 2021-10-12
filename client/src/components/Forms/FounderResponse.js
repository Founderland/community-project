import axios from 'axios'
import React from 'react'

export default function FounderResponse() {

  const fetchData = async () => {
    try {
      const result = await axios.get(`/api/form/founder/response`)
      if (result.data) {
        console.log("RESPONSE RESULT", result.data)
      }
    }
      catch(e){
        console.log(e)
      }
    }
    fetchData() 
   return (
      <div>
        <table class="table-fixed border w-screen border-solid">
  <thead>
    <tr>
      <th class="w-1/2 ...">Questions</th>
      <th class="w-1/4 ...">Answer</th>
      <th class="w-1/4 ...">Score</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td className="w-1/2 border-2 pl-2 ">Intro to CSS</td>
      <td className="w-1/4 border-2 pl-2">Adam</td>
      <td className="w-1/4 border-2 pl-2 ">858</td>
      </tr>
               
    {/* <tr class="bg-blue-200">
      <td>A Long and Winding Tour of the History of UI Frameworks and Tools and the Impact on Design</td>
      <td>Adam</td>
      <td>112</td>
    </tr>
    <tr>
      <td>Intro to JavaScript</td>
      <td>Chris</td>
      <td>1,280</td>
    </tr> */}
  </tbody>
</table>


      </div>
   )
}

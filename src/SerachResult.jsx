import React, { useEffect, useState } from 'react';
import { useLocation } from 'react-router-dom'
import { BiSearchAlt } from 'react-icons/bi';
import { result } from './src/weight';

function SearchResult() {
   
 const location = useLocation()
 let query = location.state.query;
 const [state, setState] = useState(query)
 const [time ,setTime] = useState(0);
 const [results, setResult] = useState(null)

 useEffect(() => {
    setTime(Date.now())
    setResult(result(query))
    timer()
}, [])


function timer(){
    let tim = Date.now() - time
    let sec =Math.floor(tim*1000)
    setTime(sec)
}

  return (
    <div className='mt-14 px-20 flex flex-col gap-5'>
      <div className='mb-14 flex items-center gap-10'>
      <h1 className='text-2xl'>ምርኩዝ</h1>
      <div className="relative text-gray-600 w-2/4">
            <input
              type="search"
              name="q"
              value={state}
              onChange={(e) => setState(e.target.value)}
              placeholder="ፈልግ..."
              className="w-full border border-gray-300 rounded-md px-4 py-2 pl-12 transition-colors duration-300 ease-in-out focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
              onKeyPress={event => {
                if (event.key === 'Enter') {
                 timer()
                 setResult(result(state))
                }
              }}
           />
            <div className="absolute left-0 top-0 mt-2 ml-3">
               <BiSearchAlt className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
      </div>

      <div>About {results!=null&&  results.length} results ({time} sec) </div>


     <div className='flex flex-col gap-5 w-2/4'>

       {results!=null && results.map(((data,index)=>{
        return <div key={index}>{data}</div>
       }))}        
     </div>

     
    </div>
  );
}

export default SearchResult;

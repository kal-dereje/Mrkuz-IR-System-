import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { BiSearchAlt } from "react-icons/bi";
import { result } from "./src/weight";

function SearchResult() {
  const location = useLocation();
  let query = location.state.query;
  const [state, setState] = useState(query);
  const [time, setTime] = useState(0);
  const [results, setResult] = useState(null);

  useEffect(() => {
    const dateInitial = new Date();
    let msInitial = dateInitial.getMilliseconds();
    setResult(result(query));
    const dateFinal = new Date();
    let msFinal = dateFinal.getMilliseconds();

    setTime( msFinal - msInitial);
  }, []);

 
  

  return (
    <div className="mt-14 px-20 flex flex-col gap-5">
      <div className="mb-14 flex items-center gap-10">
        <h1 className="text-2xl">
          <span className="text-green-700">ም</span>
          <span className="text-yellow-500">ርኩ</span>
          <span className="text-red-600">ዝ</span>
        </h1>
        <div className="relative text-gray-600 w-2/4">
          <input
            type="search"
            name="q"
            value={state}
            onChange={(e) => setState(e.target.value)}
            placeholder="ፈልግ..."
            className="w-full border border-gray-300 rounded-md px-4 py-2 pl-12 transition-colors duration-300 ease-in-out focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            onKeyPress={(event) => {
              if (event.key === "Enter") {
                const dateInitial = new Date();
                let msInitial = dateInitial.getMilliseconds();
                setResult(result(state));
                const dateFinal = new Date();
                let msFinal = dateFinal.getMilliseconds();

                setTime( msFinal - msInitial);
              }
            }}
          />
          <div className="absolute left-0 top-0 mt-2 ml-3">
            <BiSearchAlt className="h-5 w-5" aria-hidden="true" />
          </div>
        </div>
      </div>

      <div className=" font-serif">
        ወደ {results != null && results.length} ሚደርሱ ውጤቶች ({time} ms){" "}
      </div>

      <div className="flex flex-col gap-7 w-[700px]">
        {results != null &&
          results.map((data, index) => {
            return (
              <div className="font-semibold " key={index}>
                {data}
              </div>
            );
          })}
      </div>
    </div>
  );
}

export default SearchResult;

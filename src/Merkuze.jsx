import React from "react";
import { BiSearchAlt } from 'react-icons/bi';
import {  Link } from "react-router-dom"
import classNames from "classnames";

function Merkuze() {
  const [query, setQuery] = React.useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log(`Searching for "${query}"...`);
  };

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col justify-center items-center bg-[url('./assets/images/lalibela.jpg')] bg-cover h-screen">

      <h1 className="text-6xl tracking-tighter"><span className="text-green-700">ም </span><span className="text-yellow-500">ር ኩ</span> <span className="text-red-600">ዝ</span></h1>

      <div className="max-w-lg w-full px-4 mt-14">
        <form onSubmit={handleSubmit}>
          <div className="relative text-gray-600">
            <input
              type="search"
              name="q"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="ፈልግ..."
              className="w-full border border-gray-300 rounded-md px-4 py-2 pl-12 transition-colors duration-300 ease-in-out focus:outline-none focus:border-blue-500 focus:ring-2 focus:ring-blue-200"
            />
            <div className="absolute left-0 top-0 mt-2 ml-3">
               <BiSearchAlt className="h-5 w-5" aria-hidden="true" />
            </div>
          </div>
          <div className="flex justify-end mt-4">
           
            <Link
              to={"/search"}
              state={{query}}
              className={classNames(
                "bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 border border-green-500 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-200",
                {
                  "opacity-50 cursor-not-allowed": query.length === 0,
                }
              )}
              disabled={query.length === 0}
            >
              ምርኰዝ ፈልግ
              </Link>
          </div>
        </form>
      </div>
    </div>
  );
}

export default Merkuze;

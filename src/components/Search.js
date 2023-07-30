import React, {useState} from 'react';
import {useRouter} from 'next/router';
import {FiSearch} from 'react-icons/fi';

const Search = () => {
  const [query, setQuery] = useState('');
  const router = useRouter();

  function handleSearch(e) {
    e.preventDefault();
    if (!query.trim()) {
      console.error('Invalid search query.');
      return;
    }


    const encodedQuery = encodeURIComponent(query);
    if(encodedQuery!="") {
        router.push({
            pathname: '/search',
            query: {searchTerm: encodedQuery},
        })
    }
  }

  return (
    <form onSubmit={handleSearch} autoComplete="off" className="w-[90%] md:w-full p-2 text-gray-400 focus-within:text-gray-600">

      <div className="flex flex-row justify-start items-center">
        <FiSearch aria-hidden="true" className="w-5 h-5 ml-4" />
        <input
          name="search-field"
          autoComplete="on"
          id="search-field"
          className="flex-1  border-none placeholder-dark-1 bg-white/5 bg-opacity-80 backdrop-blur-sm outline-none text-base text-dark-1 p-4"
          placeholder="Search your favourite music... "
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
        />
      </div>
    </form>
  );
};

export default Search;


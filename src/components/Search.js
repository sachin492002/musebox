import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';

const Search = () => {
  const [query, setQuery] = useState('');
  const [searchType, setSearchType] = useState('songs'); 

  const [searchResults, setSearchResults] = useState(null);
  const router = useRouter();

  function handleSearch() {
    if (!query.trim()) {
      console.error('Invalid search query.');
      return;
    }

    console.log('searching');
    const encodedQuery = encodeURIComponent(query);
    const apiUrl = `https://saavn.me/search/${searchType}?query=${encodedQuery}&page=1&limit=20`;

    fetch(apiUrl)
      .then((response) => response.json())
      .then((data) => {
        const encodedSearchResults = encodeURIComponent(JSON.stringify(data));
        router.push({
          pathname: '/search',
          query: { searchResults: encodedSearchResults, type : searchType  },
        });
      })
      .catch((error) => {
        console.error('Error fetching search results:', error);
      });
  }

  return (
    <div className="flex justify-center bg-gray-100">
      <div className="w-3/4 bg-white rounded-lg shadow-lg p-8">
        <h2 className="text-2xl font-bold mb-4">Search for something</h2>
        <div className="flex items-center border rounded-lg p-2">
          <svg
            className="w-6 h-6 text-gray-500 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-5.2-5.2"></path>
            <circle cx="11" cy="11" r="8"></circle>
          </svg>
          <input
            type="text"
            placeholder="Search here..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="w-full border-none focus:outline-none focus:ring-0"
          />

          <select
            className="ml-4 px-4 py-2 bg-blue-600 text-text-1 dark:text-text-1 rounded-lg"
            value={searchType}
            onChange={(e) => setSearchType(e.target.value)}
          >
            <option value="songs">Songs</option>
            <option value="albums">Albums</option>
            <option value="playlists">Playlists</option>
            <option value="artists">Artists</option>
          </select>

          <button
            onClick={handleSearch}
            className="ml-4 px-4 py-2 bg-blue-600 text-text-1 dark:text-text-1 rounded-lg"
            disabled={!query.trim()} // Disable the button when the query is empty or contains only whitespace
          >
            Search
          </button>
        </div>
      </div>
    </div>
  );
};

export default Search;

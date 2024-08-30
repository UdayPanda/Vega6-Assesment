import React, { useState } from 'react';
import axios from 'axios';
import Loading from './Loading';

const SearchBar = ({ onImageSelect }) => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await axios.get('https://api.pexels.com/v1/search', {
        params: {
          query,
          per_page: 5,
        },
        headers: {
          Authorization: `10W9C120RMkjgeUCRCU4llxxmNsk9liSwX9k3XP5hWHVw3OZkG9nymjC`,
        },
      });
      setResults(response.data.photos);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching images:', error);
    }
  };

  return (
    <div>
      <div className='flex justify-center items-center pt-10'>
        <input
          type="text"
          className='p-2 text-lg rounded-md m-2 outline-none'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Search for images..."
        />
        <button
          className='p-2 text-lg bg-blue-400 text-white rounded-md m-2'
          onClick={handleSearch}
        >
          Search
        </button>
      </div>

      {loading ? (
        <Loading />
      ) : (
        <div className="grid grid-cols-1 w-[80%] mt-14 items-center m-auto sm:grid-cols-2 md:grid-cols-3 gap-4">
          {results.map((image) => (
            <div className='flex flex-col items-center' key={image.id}>
              <img className={`w-[${image.width}px] h-[${image.height}px] rounded-md`}src={image.src.small} alt={image.alt} />
              <button className='px-2 text-sm bg-gray-400 text-white rounded-md' onClick={() => onImageSelect(image.src.large)}>Add Captions</button>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default SearchBar;

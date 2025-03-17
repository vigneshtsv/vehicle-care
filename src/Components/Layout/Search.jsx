import { AiOutlineSearch } from 'react-icons/ai';
import { useState } from 'react';

function Search() {
  const [searchQuery, setSearchQuery] = useState('');

  const handleIconClick = () => {
    alert(`Search for: ${searchQuery}`);
    // Perform your search logic here
  };

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        handleIconClick();
      }}
      className="relative"
    >
      <input
        type="text"
        placeholder="Search your Service & Products..."
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        className="hidden lg:inline lg:p-96 border border-gray-300 rounded-lg px-4 py-2"
      />
      <button
        type="button"
        onClick={handleIconClick}
        className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-500 hover:text-gray-800"
      >
        <AiOutlineSearch size={24} />
      </button>
    </form>
  );
}

export default Search;

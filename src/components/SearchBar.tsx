
import { useState, KeyboardEvent } from 'react';
import { Search } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
  expanded: boolean;
}

const SearchBar = ({ onSearch, isSearching, expanded }: SearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter' && query.trim()) {
      onSearch(query);
    }
  };

  const handleSearch = () => {
    if (query.trim()) {
      onSearch(query);
    }
  };

  return (
    <div className={`search-bar-container w-full max-w-3xl mx-auto transition-all duration-500 ${expanded ? 'search-bar-expanded' : ''}`}>
      <div className="relative">
        <div className="relative flex items-center w-full h-16 rounded-full 
          bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 
          bg-size-200 bg-pos-0 
          animate-gradient-border 
          p-[2px] 
          transition-all duration-500 
          hover:bg-pos-100">
          <div className="w-full h-full bg-background rounded-full">
            <div className="relative flex items-center h-full rounded-full">
              <div className="grid place-items-center h-full w-12 text-gray-400">
                <Search className="h-5 w-5" />
              </div>
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                onKeyDown={handleKeyDown}
                className="peer h-full w-full outline-none text-lg text-gray-700 px-2 rounded-full bg-transparent"
                type="text"
                placeholder="Search across the web..."
                disabled={isSearching}
              />
              <button 
                onClick={handleSearch}
                disabled={isSearching || !query.trim()} 
                className={`
                  absolute right-2 h-12 w-24 rounded-full text-white font-medium transition-all
                  ${query.trim() && !isSearching 
                    ? 'bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 cursor-pointer' 
                    : 'bg-gray-300 cursor-not-allowed'}
                `}
              >
                {isSearching ? (
                  <div className="flex items-center justify-center space-x-1">
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce-small"></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce-small" style={{ animationDelay: '0.2s' }}></div>
                    <div className="w-2 h-2 bg-white rounded-full animate-bounce-small" style={{ animationDelay: '0.4s' }}></div>
                  </div>
                ) : 'Search'}
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;


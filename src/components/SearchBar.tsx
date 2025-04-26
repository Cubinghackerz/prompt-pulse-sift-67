
import { useState, KeyboardEvent } from 'react';
import { Search, X } from 'lucide-react';

interface SearchBarProps {
  onSearch: (query: string) => void;
  isSearching: boolean;
  expanded: boolean;
}

const SearchBar = ({ onSearch, isSearching, expanded }: SearchBarProps) => {
  const [query, setQuery] = useState('');
  const [isFocused, setIsFocused] = useState(false);

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

  const handleClear = () => {
    setQuery('');
  };

  return (
    <div className={`search-bar-container w-full max-w-3xl mx-auto transition-all duration-500 ${expanded ? 'search-bar-expanded' : ''}`}>
      <div className="relative">
        <div 
          className={`
            relative flex items-center w-full h-16 rounded-2xl 
            bg-[#1A1F2C]/80 backdrop-blur-sm
            border border-gray-700/50
            transition-all duration-300
            ${query ? 'shadow-[0_0_25px_rgba(147,51,234,0.4)] border-purple-500/50' : ''}
            ${isFocused ? 'shadow-[0_0_20px_rgba(168,85,247,0.35)] border-violet-400/50' : ''}
            hover:border-gray-600/50
          `}
        >
          <div className="relative flex items-center h-full w-full rounded-2xl group">
            <div className="grid place-items-center h-full w-12 text-gray-400 transition-colors group-hover:text-gray-300">
              <Search className={`h-5 w-5 transition-transform duration-300 ${isFocused ? 'scale-110' : ''}`} />
            </div>
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={handleKeyDown}
              onFocus={() => setIsFocused(true)}
              onBlur={() => setIsFocused(false)}
              className="peer h-full w-full outline-none text-lg text-white px-2 bg-transparent placeholder-gray-400 
                transition-all duration-300 placeholder:transition-opacity placeholder:duration-300
                focus:placeholder:opacity-70"
              type="text"
              placeholder="Search across the web..."
              disabled={isSearching}
            />
            {query && !isSearching && (
              <button
                onClick={handleClear}
                className="absolute right-28 h-8 w-8 flex items-center justify-center text-gray-400 
                  hover:text-gray-200 transition-colors rounded-full hover:bg-white/5"
              >
                <X className="h-4 w-4" />
              </button>
            )}
            <button 
              onClick={handleSearch}
              disabled={isSearching || !query.trim()} 
              className={`
                absolute right-2 h-12 w-24 rounded-xl text-white font-medium
                transition-all duration-300
                ${query.trim() && !isSearching 
                  ? 'bg-gradient-to-r from-purple-600 to-purple-800 hover:from-purple-700 hover:to-purple-900 cursor-pointer shadow-lg shadow-purple-900/20 hover:shadow-purple-900/30' 
                  : 'bg-gray-700/50 cursor-not-allowed'}
              `}
            >
              {isSearching ? (
                <div className="flex items-center justify-center space-x-1">
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-[bounce_1s_ease-in-out_infinite]"></div>
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-[bounce_1s_ease-in-out_infinite_0.2s]"></div>
                  <div className="w-1.5 h-1.5 bg-white rounded-full animate-[bounce_1s_ease-in-out_infinite_0.4s]"></div>
                </div>
              ) : 'Search'}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SearchBar;


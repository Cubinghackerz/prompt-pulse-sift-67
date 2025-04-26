import { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import SearchResults, { SearchResult } from '../components/SearchResults';
import { searchAcrossEngines } from '../services/searchService';
import { motion } from 'framer-motion';
import { useToast } from '@/hooks/use-toast';
const Index = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<SearchResult[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [hasSearched, setHasSearched] = useState(false);
  const {
    toast
  } = useToast();
  const handleSearch = async (searchQuery: string) => {
    try {
      setQuery(searchQuery);
      setIsSearching(true);
      setHasSearched(true);
      const searchResults = await searchAcrossEngines(searchQuery);
      setResults(searchResults);
    } catch (error) {
      console.error('Search failed:', error);
      toast({
        title: "Search Error",
        description: "Failed to fetch search results. Please try again.",
        variant: "destructive"
      });
      setResults([]);
    } finally {
      setIsSearching(false);
    }
  };
  return <div className="min-h-screen flex flex-col">
      <header className="py-6 px-4">
        <motion.div initial={{
        opacity: 0,
        y: -20
      }} animate={{
        opacity: 1,
        y: 0
      }} transition={{
        duration: 0.5
      }} className="text-center">
          <h1 className={`text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-blue-600 to-blue-800 mb-2 ${hasSearched ? 'text-2xl' : ''}`}>Prism Search</h1>
          <p className={`text-gray-600 max-w-lg mx-auto ${hasSearched ? 'hidden' : ''}`}>
            Search across the web's top engines for comprehensive results in one place
          </p>
        </motion.div>
      </header>
      
      <main className="flex-1 px-4">
        <div className={`transition-all duration-500 ${hasSearched ? 'mt-4' : 'mt-28'}`}>
          <SearchBar onSearch={handleSearch} isSearching={isSearching} expanded={hasSearched} />
        </div>
        
        {hasSearched && <div className="mt-4">
            <SearchResults results={results} isLoading={isSearching} query={query} />
          </div>}

        {!hasSearched && <motion.div initial={{
        opacity: 0
      }} animate={{
        opacity: 1
      }} transition={{
        delay: 0.5,
        duration: 0.5
      }} className="mt-20 text-center">
            <div className="flex justify-center space-x-8">
              {['Google', 'Bing', 'DuckDuckGo'].map(engine => <div key={engine} className="text-center">
                  <div className={`w-16 h-16 rounded-full mx-auto mb-3 flex items-center justify-center ${engine === 'Google' ? 'bg-blue-100 text-blue-500' : engine === 'Bing' ? 'bg-blue-800 text-white' : 'bg-yellow-100 text-yellow-600'}`}>
                    <span className="text-2xl font-bold">{engine.charAt(0)}</span>
                  </div>
                  <span className="text-sm font-medium text-gray-700">{engine}</span>
                </div>)}
            </div>
            <p className="mt-12 text-gray-500">Type your query above to search across all engines simultaneously</p>
          </motion.div>}
      </main>
      
      <footer className="py-6 text-center text-gray-500 text-sm">
        <p>&copy; {new Date().getFullYear()} MetaSearch. All rights reserved.</p>
      </footer>
    </div>;
};
export default Index;
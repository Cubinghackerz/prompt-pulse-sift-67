
import { motion } from 'framer-motion';
import { LayoutGrid } from 'lucide-react';

export interface SearchResult {
  id: string;
  title: string;
  url: string;
  snippet: string;
  source: string;
}

interface SearchResultsProps {
  results: SearchResult[];
  isLoading: boolean;
  query: string;
}

const SearchResults = ({ results, isLoading, query }: SearchResultsProps) => {
  if (isLoading) {
    return <SearchingAnimation query={query} />;
  }

  if (!results.length) {
    return null;
  }

  // Group results by search engine
  const googleResults = results.filter(result => result.source === 'Google');
  const bingResults = results.filter(result => result.source === 'Bing');
  const duckduckgoResults = results.filter(result => result.source === 'DuckDuckGo');

  return (
    <div className="w-full max-w-[95vw] mx-auto mt-8 pb-12">
      <div className="flex items-center gap-2 mb-6">
        <LayoutGrid className="h-5 w-5 text-blue-600" />
        <h2 className="text-xl font-semibold text-gray-700">Search Results</h2>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Google Column */}
        <SearchEngineColumn 
          title="Google" 
          results={googleResults}
          bgColor="bg-blue-500"
          hoverBorderColor="hover:border-blue-300"
        />

        {/* Bing Column */}
        <SearchEngineColumn 
          title="Bing" 
          results={bingResults}
          bgColor="bg-blue-700"
          hoverBorderColor="hover:border-blue-400"
        />

        {/* DuckDuckGo Column */}
        <SearchEngineColumn 
          title="DuckDuckGo" 
          results={duckduckgoResults}
          bgColor="bg-yellow-600"
          hoverBorderColor="hover:border-yellow-300"
        />
      </div>
    </div>
  );
};

interface SearchEngineColumnProps {
  title: string;
  results: SearchResult[];
  bgColor: string;
  hoverBorderColor: string;
}

const SearchEngineColumn = ({ title, results, bgColor, hoverBorderColor }: SearchEngineColumnProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
      className="bg-white/50 backdrop-blur-sm rounded-xl p-4 border border-gray-200 shadow-lg"
    >
      <div className="flex items-center gap-2 mb-4">
        <div className={`w-8 h-8 ${bgColor} rounded-full flex items-center justify-center`}>
          <span className="text-white font-bold">{title[0]}</span>
        </div>
        <h3 className="text-lg font-semibold text-gray-700">{title}</h3>
      </div>
      
      <div className="space-y-4">
        {results.map((result, index) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className={`result-card p-4 bg-white rounded-lg border border-gray-200 ${hoverBorderColor} transition-all duration-300`}
          >
            <h3 className="text-lg font-medium text-blue-600 mt-1 hover:underline">
              <a href={result.url} target="_blank" rel="noopener noreferrer">
                {result.title}
              </a>
            </h3>
            
            <p className="text-sm text-gray-600 mt-1">{result.snippet}</p>
            
            <div className="mt-2">
              <a 
                href={result.url}
                target="_blank" 
                rel="noopener noreferrer"
                className="text-xs text-gray-500 hover:text-blue-600 transition-colors"
              >
                {result.url.length > 60 ? `${result.url.substring(0, 60)}...` : result.url}
              </a>
            </div>
          </motion.div>
        ))}
        {results.length === 0 && (
          <div className="text-center py-8 text-gray-500">
            No results from {title}
          </div>
        )}
      </div>
    </motion.div>
  );
};

const SearchingAnimation = ({ query }: { query: string }) => {
  return (
    <div className="w-full max-w-4xl mx-auto mt-8">
      <div className="text-center">
        <h2 className="text-xl font-semibold mb-4 text-gray-700">Searching across engines...</h2>
        <p className="text-gray-500 mb-6">Fetching results for: "{query}"</p>
        
        <div className="flex justify-center space-x-12">
          {['Google', 'Bing', 'DuckDuckGo'].map((engine, index) => (
            <div key={engine} className="flex flex-col items-center">
              <div 
                className="w-16 h-16 rounded-full bg-blue-100 flex items-center justify-center mb-3 animate-pulse-light"
                style={{ animationDelay: `${index * 0.2}s` }}
              >
                <span className={`text-2xl font-bold ${
                  engine === 'Google' ? 'text-blue-500' :
                  engine === 'Bing' ? 'text-blue-700' : 'text-yellow-600'
                }`}>
                  {engine.charAt(0)}
                </span>
              </div>
              <span className="text-sm font-medium text-gray-700">{engine}</span>
              <div className="mt-2 flex space-x-1">
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce-small" style={{ animationDelay: `${index * 0.1}s` }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce-small" style={{ animationDelay: `${index * 0.1 + 0.2}s` }}></div>
                <div className="w-2 h-2 bg-blue-500 rounded-full animate-bounce-small" style={{ animationDelay: `${index * 0.1 + 0.4}s` }}></div>
              </div>
            </div>
          ))}
        </div>
        
        <div className="mt-16 w-full h-8 bg-gray-200 rounded-full overflow-hidden">
          <div className="h-full search-gradient animate-gradient-shift" style={{ width: '60%' }}></div>
        </div>
      </div>
    </div>
  );
};

export default SearchResults;

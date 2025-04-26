
import { motion } from 'framer-motion';

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

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 pb-12">
      <h2 className="text-xl font-semibold mb-4 text-gray-700">Search Results</h2>
      <div className="space-y-4">
        {results.map((result, index) => (
          <motion.div
            key={result.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3, delay: index * 0.1 }}
            className="result-card p-4 bg-white rounded-lg border border-gray-200 hover:border-blue-300"
          >
            <div className="flex items-center">
              <div className={`w-6 h-6 rounded flex items-center justify-center mr-2 ${
                result.source === 'Google' ? 'bg-blue-500' :
                result.source === 'Bing' ? 'bg-blue-700' : 'bg-yellow-600'
              }`}>
                <span className="text-white text-xs font-bold">
                  {result.source.charAt(0)}
                </span>
              </div>
              <span className="text-xs font-medium text-gray-500">{result.source}</span>
            </div>
            
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
                className="text-xs text-gray-500 hover:text-blue-600"
              >
                {result.url.length > 60 ? `${result.url.substring(0, 60)}...` : result.url}
              </a>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
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

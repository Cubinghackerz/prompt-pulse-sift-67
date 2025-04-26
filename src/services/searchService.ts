
import { SearchResult } from '../components/SearchResults';

const generateId = () => Math.random().toString(36).substring(2, 15);

export const searchAcrossEngines = async (
  query: string
): Promise<SearchResult[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        // Google mock results
        {
          id: generateId(),
          title: `Google result for "${query}" - Official Website`,
          url: `https://example.com/google-result-${encodeURIComponent(query)}`,
          snippet: `This is a comprehensive resource about ${query} from Google's search index.`,
          source: 'Google',
        },
        
        // Bing mock results
        {
          id: generateId(),
          title: `${query} - Latest News and Updates`,
          url: `https://news.example.com/topics/${encodeURIComponent(query)}`,
          snippet: `Stay updated with the latest information about ${query}.`,
          source: 'Bing',
        },
        
        // DuckDuckGo mock results
        {
          id: generateId(),
          title: `${query} Explained Simply`,
          url: `https://simpleguides.org/${encodeURIComponent(query)}`,
          snippet: `An easy-to-understand explanation of ${query} without unnecessary jargon.`,
          source: 'DuckDuckGo',
        },

        // Brave Search mock results
        {
          id: generateId(),
          title: `${query} - Brave Search Results`,
          url: `https://brave.com/search/${encodeURIComponent(query)}`,
          snippet: `Privacy-focused search results about ${query} from Brave Search.`,
          source: 'Brave',
        },

        // You.com mock results
        {
          id: generateId(),
          title: `${query} - AI-Enhanced Results`,
          url: `https://you.com/search?q=${encodeURIComponent(query)}`,
          snippet: `AI-powered search results about ${query} with enhanced context.`,
          source: 'You.com',
        },
      ];

      resolve(mockResults);
    }, 2500);
  });
};

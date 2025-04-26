
import { SearchResult } from '../components/SearchResults';

// Generate a random ID for each result
const generateId = () => Math.random().toString(36).substring(2, 15);

// Mock search function that simulates fetching from multiple search engines
export const searchAcrossEngines = async (
  query: string
): Promise<SearchResult[]> => {
  // This would be replaced with actual API calls to search engines
  // For now, we'll simulate a delay and return mock results
  return new Promise((resolve) => {
    setTimeout(() => {
      const mockResults: SearchResult[] = [
        // Google mock results
        {
          id: generateId(),
          title: `Google result for "${query}" - Official Website`,
          url: `https://example.com/google-result-${encodeURIComponent(query)}`,
          snippet: `This is a comprehensive resource about ${query} from Google's search index. It provides detailed information about the topic with relevant context and background.`,
          source: 'Google',
        },
        {
          id: generateId(),
          title: `${query} - Wikipedia`,
          url: `https://en.wikipedia.org/wiki/${encodeURIComponent(query.replace(/\s+/g, '_'))}`,
          snippet: `${query} refers to a concept or entity that has been well documented in various sources. This Wikipedia article provides a neutral overview of the subject matter.`,
          source: 'Google',
        },
        {
          id: generateId(),
          title: `Understanding ${query} - An In-depth Analysis`,
          url: `https://research.org/${encodeURIComponent(query.toLowerCase().replace(/\s+/g, '-'))}`,
          snippet: `An academic exploration of ${query}, covering its history, development, and implications in modern contexts. This resource includes citations from peer-reviewed journals.`,
          source: 'Google',
        },
        
        // Bing mock results
        {
          id: generateId(),
          title: `${query} - Latest News and Updates`,
          url: `https://news.example.com/topics/${encodeURIComponent(query.toLowerCase().replace(/\s+/g, '-'))}`,
          snippet: `Stay updated with the latest information about ${query}. Our comprehensive coverage includes recent developments and expert opinions on this trending topic.`,
          source: 'Bing',
        },
        {
          id: generateId(),
          title: `Best Resources to Learn About ${query}`,
          url: `https://learning.example.edu/${encodeURIComponent(query.toLowerCase().replace(/\s+/g, '-'))}`,
          snippet: `Discover curated educational resources about ${query} for all skill levels. This collection includes tutorials, guides, and interactive materials to enhance your understanding.`,
          source: 'Bing',
        },
        
        // DuckDuckGo mock results
        {
          id: generateId(),
          title: `${query} Explained Simply - A Beginner's Guide`,
          url: `https://simpleguides.org/${encodeURIComponent(query.toLowerCase().replace(/\s+/g, '-'))}`,
          snippet: `An easy-to-understand explanation of ${query} without unnecessary jargon. Perfect for beginners who want to grasp the core concepts quickly and efficiently.`,
          source: 'DuckDuckGo',
        },
        {
          id: generateId(),
          title: `Alternative Perspectives on ${query}`,
          url: `https://diverse-views.net/topics/${encodeURIComponent(query.toLowerCase().replace(/\s+/g, '-'))}`,
          snippet: `Explore different viewpoints and alternative approaches to understanding ${query}. This resource aims to provide a balanced perspective on potentially controversial aspects.`,
          source: 'DuckDuckGo',
        },
      ];

      resolve(mockResults);
    }, 2500); // Simulate network delay
  });
};

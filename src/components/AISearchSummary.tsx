
import { useEffect, useState } from 'react';
import { SearchResult } from './SearchResults';
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Bot } from 'lucide-react';

interface AISearchSummaryProps {
  results: SearchResult[];
  query: string;
}

const AISearchSummary = ({ results, query }: AISearchSummaryProps) => {
  const [summary, setSummary] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateSummary = async () => {
      if (!results.length) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const { data, error } = await supabase.functions.invoke('generate-summary', {
          body: { searchResults: results }
        });

        if (error) throw error;
        setSummary(data.summary);
      } catch (err) {
        console.error('Error generating summary:', err);
        setError('Failed to generate AI summary');
      } finally {
        setIsLoading(false);
      }
    };

    generateSummary();
  }, [results]);

  if (!results.length) return null;

  return (
    <div className="w-full max-w-[95vw] mx-auto mb-8">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
        <div className="flex items-center gap-2 mb-4">
          <Bot className="h-5 w-5 text-purple-400" />
          <h2 className="text-lg font-semibold text-gray-100">AI Summary</h2>
        </div>
        
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-purple-950/20" />
            <Skeleton className="h-4 w-3/4 bg-purple-950/20" />
          </div>
        ) : error ? (
          <p className="text-red-400 text-sm">{error}</p>
        ) : (
          <p className="text-gray-300 text-sm leading-relaxed">{summary}</p>
        )}
      </div>
    </div>
  );
};

export default AISearchSummary;

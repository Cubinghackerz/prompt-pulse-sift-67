
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
  const [answer, setAnswer] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const generateAnswer = async () => {
      if (!results.length || !query) return;
      
      setIsLoading(true);
      setError(null);
      
      try {
        const { data, error } = await supabase.functions.invoke('generate-summary', {
          body: { searchResults: results, query }
        });

        if (error) throw error;
        setAnswer(data.answer);
      } catch (err) {
        console.error('Error generating answer:', err);
        setError('Failed to generate AI answer');
      } finally {
        setIsLoading(false);
      }
    };

    generateAnswer();
  }, [results, query]);

  if (!results.length) return null;

  return (
    <div className="w-full max-w-[95vw] mx-auto mb-8">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
        <div className="flex items-center gap-2 mb-4">
          <Bot className="h-5 w-5 text-purple-400" />
          <h2 className="text-lg font-semibold text-gray-100">AI Response</h2>
        </div>
        
        {isLoading ? (
          <div className="space-y-2">
            <Skeleton className="h-4 w-full bg-purple-950/20" />
            <Skeleton className="h-4 w-3/4 bg-purple-950/20" />
          </div>
        ) : error ? (
          <p className="text-red-400 text-sm">{error}</p>
        ) : (
          <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap">{answer}</p>
        )}
      </div>
    </div>
  );
};

export default AISearchSummary;


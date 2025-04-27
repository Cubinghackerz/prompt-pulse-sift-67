
import { useState } from 'react';
import { supabase } from "@/integrations/supabase/client";
import { Skeleton } from "@/components/ui/skeleton";
import { Bot } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

const AISearchSummary = () => {
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState<string>("");
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      const { data, error } = await supabase.functions.invoke('generate-summary', {
        body: { query }
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

  return (
    <div className="w-full max-w-[95vw] mx-auto mb-8">
      <div className="bg-white/5 backdrop-blur-sm rounded-xl p-6 border border-purple-500/20">
        <div className="flex items-center gap-2 mb-4">
          <Bot className="h-5 w-5 text-purple-400" />
          <h2 className="text-lg font-semibold text-gray-100">Ask AI Assistant</h2>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex gap-2">
            <Input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Ask me anything..."
              className="bg-white/10 border-purple-500/20"
            />
            <Button type="submit" disabled={isLoading}>
              Ask
            </Button>
          </div>
        </form>
        
        {isLoading ? (
          <div className="space-y-2 mt-4">
            <Skeleton className="h-4 w-full bg-purple-950/20" />
            <Skeleton className="h-4 w-3/4 bg-purple-950/20" />
          </div>
        ) : error ? (
          <p className="text-red-400 text-sm mt-4">{error}</p>
        ) : answer && (
          <p className="text-gray-300 text-sm leading-relaxed whitespace-pre-wrap mt-4">{answer}</p>
        )}
      </div>
    </div>
  );
};

export default AISearchSummary;

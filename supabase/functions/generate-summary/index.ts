
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { GoogleGenerativeAI } from "https://esm.sh/@google/generative-ai@0.1.3"

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { searchResults, query } = await req.json()
    
    const genAI = new GoogleGenerativeAI(Deno.env.get('GEMINI_API_KEY'));
    const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

    const prompt = `As a helpful AI assistant, answer the following question: "${query}"
    Use the information from these search results to provide a clear, direct answer:
    ${JSON.stringify(searchResults)}
    
    If the search results don't contain enough relevant information to answer the question fully, acknowledge this and provide the best possible answer based on the available information.
    Keep your response conversational and friendly, but concise and focused on answering the question.`;

    const result = await model.generateContent(prompt);
    const response = await result.response;
    const answer = response.text();

    return new Response(
      JSON.stringify({ answer }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  } catch (error) {
    console.error('Error:', error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})


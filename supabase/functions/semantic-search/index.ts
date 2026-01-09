/// <reference types="https://esm.sh/@supabase/functions-js/src/edge-runtime.d.ts" />
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.49.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { query } = await req.json();

    if (!query || typeof query !== "string") {
      return new Response(
        JSON.stringify({ error: "Query is required" }),
        { status: 400, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }

    const supabaseUrl = Deno.env.get("SUPABASE_URL")!;
    const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY")!;
    const lovableApiKey = Deno.env.get("LOVABLE_API_KEY")!;

    const supabase = createClient(supabaseUrl, supabaseKey);

    // Fetch discussions and replies from the database
    const { data: discussions, error: discError } = await supabase
      .from("discussions")
      .select("id, title, content, hall, upvotes, views, created_at")
      .order("created_at", { ascending: false })
      .limit(50);

    if (discError) throw discError;

    const { data: replies, error: repliesError } = await supabase
      .from("discussion_replies")
      .select("id, content, discussion_id, upvotes, created_at")
      .order("created_at", { ascending: false })
      .limit(100);

    if (repliesError) throw repliesError;

    // Build context for AI search
    const contentContext = discussions?.map(d => ({
      type: "discussion",
      id: d.id,
      title: d.title,
      content: d.content,
      hall: d.hall,
      upvotes: d.upvotes,
      views: d.views
    })) || [];

    const replyContext = replies?.map(r => ({
      type: "reply",
      id: r.id,
      content: r.content,
      discussion_id: r.discussion_id,
      upvotes: r.upvotes
    })) || [];

    // Use AI to perform semantic search
    const aiResponse = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${lovableApiKey}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          {
            role: "system",
            content: `You are a semantic search assistant for a philosophical discussion forum called ṚTA (Cosmic Order). 
Your task is to find the most relevant discussions and replies based on the user's query.
Consider philosophical concepts, Sanskrit terms, and the deeper meaning of questions.

Available content:
${JSON.stringify([...contentContext, ...replyContext], null, 2)}

Return a JSON response with the following structure:
{
  "results": [
    {
      "type": "discussion" | "reply",
      "id": "uuid",
      "relevance_score": 0.0-1.0,
      "reason": "Brief explanation of why this is relevant"
    }
  ],
  "summary": "A brief philosophical insight about the search query",
  "related_concepts": ["concept1", "concept2"]
}

Return only the most relevant results (max 5). If no content matches, return empty results with a helpful summary.`
          },
          {
            role: "user",
            content: query
          }
        ],
        temperature: 0.3,
      }),
    });

    if (!aiResponse.ok) {
      const errorText = await aiResponse.text();
      throw new Error(`AI Gateway error: ${errorText}`);
    }

    const aiData = await aiResponse.json();
    const aiContent = aiData.choices?.[0]?.message?.content || "{}";

    // Parse AI response (handle potential markdown code blocks)
    let searchResults;
    try {
      const cleanContent = aiContent.replace(/```json\n?|\n?```/g, "").trim();
      searchResults = JSON.parse(cleanContent);
    } catch {
      searchResults = { results: [], summary: "Unable to parse search results", related_concepts: [] };
    }

    // Enrich results with full data
    const enrichedResults = await Promise.all(
      (searchResults.results || []).map(async (result: { type: string; id: string; relevance_score: number; reason: string }) => {
        if (result.type === "discussion") {
          const disc = discussions?.find(d => d.id === result.id);
          return disc ? { ...result, data: disc } : null;
        } else {
          const reply = replies?.find(r => r.id === result.id);
          if (reply) {
            const parentDisc = discussions?.find(d => d.id === reply.discussion_id);
            return { ...result, data: reply, parent_discussion: parentDisc };
          }
          return null;
        }
      })
    );

    return new Response(
      JSON.stringify({
        query,
        results: enrichedResults.filter(Boolean),
        summary: searchResults.summary,
        related_concepts: searchResults.related_concepts || [],
      }),
      { headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  } catch (error: unknown) {
    console.error("Search error:", error);
    const message = error instanceof Error ? error.message : "An error occurred";
    return new Response(
      JSON.stringify({ error: message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});

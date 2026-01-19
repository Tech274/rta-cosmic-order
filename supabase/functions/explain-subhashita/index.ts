import { serve } from "https://deno.land/std@0.190.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface ExplainRequest {
  sanskrit: string;
  transliteration: string;
  translation: string;
  meaning: string;
  source?: string;
  category: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sanskrit, transliteration, translation, meaning, source, category }: ExplainRequest = await req.json();

    if (!sanskrit || !translation) {
      return new Response(
        JSON.stringify({ error: "Sanskrit text and translation are required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      console.error("LOVABLE_API_KEY not configured");
      return new Response(
        JSON.stringify({ error: "AI service not configured" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    console.log(`Generating explanation for: "${translation.substring(0, 50)}..."`);

    const systemPrompt = `You are a Sanskrit scholar and philosopher specializing in Indian wisdom traditions. 
You provide deep, insightful explanations of Subhashitas (Sanskrit epigrams/verses of wisdom).

Your explanations should:
1. Explore the philosophical depth and layers of meaning
2. Connect to relevant Hindu/Buddhist/Jain philosophical concepts when appropriate
3. Provide practical applications for modern life
4. Reference related wisdom from other traditions when illuminating
5. Be accessible yet profound, avoiding excessive jargon
6. Use a contemplative, wise tone befitting the sacred nature of these teachings

Format your response in clear sections:
- **Philosophical Context**: The deeper meaning and tradition
- **Practical Wisdom**: How to apply this in daily life
- **Related Teachings**: Connections to other wisdom traditions
- **Contemplation**: A reflective question for the seeker`;

    const userPrompt = `Please provide a deep philosophical explanation for this Subhashita:

**Sanskrit**: ${sanskrit}
**Transliteration**: ${transliteration}
**Translation**: "${translation}"
**Basic Meaning**: ${meaning}
**Source**: ${source || "Traditional Sanskrit wisdom"}
**Category**: ${category}

Provide an insightful explanation that reveals the deeper wisdom and practical applications of this verse.`;

    const response = await fetch("https://ai-gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash",
        messages: [
          { role: "system", content: systemPrompt },
          { role: "user", content: userPrompt }
        ],
        max_tokens: 1500,
        temperature: 0.7,
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", response.status, errorText);
      return new Response(
        JSON.stringify({ error: "Failed to generate explanation" }),
        { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const data = await response.json();
    const explanation = data.choices?.[0]?.message?.content;

    if (!explanation) {
      throw new Error("No explanation generated");
    }

    console.log("Explanation generated successfully");

    return new Response(
      JSON.stringify({ success: true, explanation }),
      { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  } catch (error) {
    console.error("Error in explain-subhashita function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { "Content-Type": "application/json", ...corsHeaders } }
    );
  }
};

serve(handler);

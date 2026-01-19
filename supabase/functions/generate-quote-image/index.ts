import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

interface QuoteRequest {
  sanskrit: string;
  translation: string;
  source?: string;
  category: string;
}

serve(async (req) => {
  // Handle CORS preflight
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { sanskrit, translation, source, category } = await req.json() as QuoteRequest;

    const LOVABLE_API_KEY = Deno.env.get("LOVABLE_API_KEY");
    if (!LOVABLE_API_KEY) {
      throw new Error("LOVABLE_API_KEY not configured");
    }

    // Create a beautiful prompt for the quote image
    const prompt = `Create a beautiful, Instagram-worthy quote card image with these specifications:
    
STYLE: Elegant, spiritual, warm amber and deep brown color palette with golden accents. Traditional Indian/Sanskrit aesthetic with subtle mandala or lotus patterns in the background. Sophisticated typography layout.

LAYOUT (1080x1080 square for Instagram):
- Dark rich background (deep brown/black gradient)
- Decorative golden border with subtle ornamental corners
- Sanskrit text "${sanskrit}" prominently displayed in elegant Devanagari-style font at the top
- Below that, the English translation: "${translation}" in a refined serif font
- At the bottom, source attribution: "— ${source || 'Ancient Sanskrit Wisdom'}"
- Small decorative divider element between Sanskrit and English
- Subtle category badge showing "${category}" 
- Small watermark "ṚTA · Daily Dharma" at very bottom

MOOD: Contemplative, wise, sacred, timeless. Think ancient wisdom meets modern minimalist design. The image should feel premium and shareable.

Make this a complete, finished design ready for social media sharing. High quality, crisp text, beautiful composition.`;

    console.log("Generating quote image...");

    const response = await fetch("https://ai.gateway.lovable.dev/v1/chat/completions", {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${LOVABLE_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        model: "google/gemini-2.5-flash-image-preview",
        messages: [
          {
            role: "user",
            content: prompt,
          },
        ],
        modalities: ["image", "text"],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("AI API error:", errorText);
      throw new Error(`AI API error: ${response.status}`);
    }

    const data = await response.json();
    console.log("AI response received");

    // Extract the base64 image from the response
    const imageData = data.choices?.[0]?.message?.images?.[0]?.image_url?.url;

    if (!imageData) {
      console.error("No image in response:", JSON.stringify(data));
      throw new Error("No image generated");
    }

    return new Response(
      JSON.stringify({
        success: true,
        imageUrl: imageData,
      }),
      {
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  } catch (error) {
    console.error("Error generating quote image:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error";
    return new Response(
      JSON.stringify({
        success: false,
        error: errorMessage,
      }),
      {
        status: 500,
        headers: {
          ...corsHeaders,
          "Content-Type": "application/json",
        },
      }
    );
  }
});

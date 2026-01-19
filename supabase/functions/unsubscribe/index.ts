import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.90.1";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const url = new URL(req.url);
    const token = url.searchParams.get("token");

    if (!token) {
      return new Response(
        generateHtmlPage("Error", "Invalid unsubscribe link. Please contact support."),
        { status: 400, headers: { "Content-Type": "text/html", ...corsHeaders } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Find and deactivate subscription
    const { data: subscription, error: findError } = await supabaseClient
      .from("email_subscriptions")
      .select("id, email")
      .eq("unsubscribe_token", token)
      .single();

    if (findError || !subscription) {
      console.error("Subscription not found:", findError);
      return new Response(
        generateHtmlPage("Not Found", "This subscription was not found or has already been removed."),
        { status: 404, headers: { "Content-Type": "text/html", ...corsHeaders } }
      );
    }

    // Deactivate the subscription
    const { error: updateError } = await supabaseClient
      .from("email_subscriptions")
      .update({ is_active: false })
      .eq("id", subscription.id);

    if (updateError) {
      console.error("Error updating subscription:", updateError);
      throw updateError;
    }

    console.log(`Successfully unsubscribed: ${subscription.email}`);

    return new Response(
      generateHtmlPage(
        "Unsubscribed",
        "You have been successfully unsubscribed from RTA Daily Dharma. We're sorry to see you go! You can always resubscribe on our website."
      ),
      { status: 200, headers: { "Content-Type": "text/html", ...corsHeaders } }
    );
  } catch (error) {
    console.error("Error in unsubscribe function:", error);
    return new Response(
      generateHtmlPage("Error", "Something went wrong. Please try again later."),
      { status: 500, headers: { "Content-Type": "text/html", ...corsHeaders } }
    );
  }
};

function generateHtmlPage(title: string, message: string): string {
  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
      <meta charset="utf-8">
      <meta name="viewport" content="width=device-width, initial-scale=1">
      <title>${title} - RTA Daily Dharma</title>
      <style>
        * { margin: 0; padding: 0; box-sizing: border-box; }
        body {
          font-family: Georgia, serif;
          background-color: #0c0a09;
          color: #f5f5f4;
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 20px;
        }
        .container {
          max-width: 500px;
          text-align: center;
        }
        .logo {
          font-size: 32px;
          letter-spacing: 0.3em;
          color: #d4a574;
          margin-bottom: 8px;
        }
        .subtitle {
          font-size: 12px;
          letter-spacing: 0.2em;
          color: #a8a29e;
          margin-bottom: 48px;
        }
        h1 {
          font-size: 28px;
          font-weight: normal;
          margin-bottom: 24px;
        }
        p {
          font-size: 16px;
          color: #a8a29e;
          line-height: 1.8;
          margin-bottom: 32px;
        }
        .btn {
          display: inline-block;
          background-color: #d4a574;
          color: #1c1917;
          padding: 12px 32px;
          text-decoration: none;
          font-size: 14px;
          letter-spacing: 0.1em;
          border-radius: 4px;
        }
        .btn:hover {
          background-color: #c49a64;
        }
      </style>
    </head>
    <body>
      <div class="container">
        <p class="logo">ṚTA</p>
        <p class="subtitle">DAILY DHARMA</p>
        <h1>${title}</h1>
        <p>${message}</p>
        <a href="https://rta-cosmic-order.lovable.app/daily-dharma" class="btn">VISIT RTA</a>
      </div>
    </body>
    </html>
  `;
}

serve(handler);

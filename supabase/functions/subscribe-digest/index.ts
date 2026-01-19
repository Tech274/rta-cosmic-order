import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.90.1";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

interface SubscribeRequest {
  email: string;
  preferredCategory?: string;
}

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { email, preferredCategory }: SubscribeRequest = await req.json();

    if (!email || !email.includes("@")) {
      return new Response(
        JSON.stringify({ error: "Valid email is required" }),
        { status: 400, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Check if already subscribed
    const { data: existing } = await supabaseClient
      .from("email_subscriptions")
      .select("id, is_active")
      .eq("email", email.toLowerCase())
      .single();

    if (existing) {
      if (existing.is_active) {
        return new Response(
          JSON.stringify({ success: true, message: "Already subscribed!" }),
          { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
        );
      } else {
        // Reactivate subscription
        await supabaseClient
          .from("email_subscriptions")
          .update({ is_active: true, preferred_category: preferredCategory })
          .eq("id", existing.id);

        console.log(`Reactivated subscription for ${email}`);
      }
    } else {
      // Create new subscription
      const { error: insertError } = await supabaseClient
        .from("email_subscriptions")
        .insert({
          email: email.toLowerCase(),
          preferred_category: preferredCategory,
        });

      if (insertError) {
        console.error("Error creating subscription:", insertError);
        throw insertError;
      }

      console.log(`New subscription created for ${email}`);
    }

    // Send welcome email
    try {
      await resend.emails.send({
        from: "RTA Daily Dharma <onboarding@resend.dev>",
        to: [email],
        subject: "🙏 Welcome to RTA Daily Dharma",
        html: `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1">
          </head>
          <body style="font-family: Georgia, serif; background-color: #0c0a09; color: #f5f5f4; margin: 0; padding: 0;">
            <div style="max-width: 600px; margin: 0 auto; padding: 40px 20px;">
              <!-- Header -->
              <div style="text-align: center; margin-bottom: 40px;">
                <p style="font-size: 28px; letter-spacing: 0.3em; color: #d4a574; margin: 0;">ṚTA</p>
                <p style="font-size: 12px; letter-spacing: 0.2em; color: #a8a29e; margin-top: 8px;">THE COSMIC ORDER</p>
              </div>
              
              <!-- Welcome Message -->
              <div style="text-align: center; padding: 32px 0;">
                <h1 style="font-size: 24px; color: #f5f5f4; font-weight: normal; margin: 0 0 24px 0;">
                  Welcome, Seeker of Wisdom
                </h1>
                
                <p style="font-size: 16px; color: #a8a29e; line-height: 1.8; margin: 0 0 24px 0;">
                  You've taken the first step on a journey through timeless Sanskrit wisdom. 
                  Each morning, we'll share a Subhashita — an ancient verse of wisdom — 
                  translated with care and meaning for modern seekers.
                </p>
                
                <div style="background: linear-gradient(135deg, #292524 0%, #1c1917 100%); border: 1px solid #d4a574; border-radius: 8px; padding: 32px 24px; margin: 32px 0; text-align: center;">
                  <p style="font-size: 18px; color: #d4a574; line-height: 1.8; margin: 0 0 16px 0;">
                    विद्या ददाति विनयं विनयाद्याति पात्रताम्।
                  </p>
                  <p style="font-size: 16px; color: #f5f5f4; font-style: italic; margin: 0;">
                    "Knowledge gives humility; from humility comes worthiness."
                  </p>
                </div>
                
                <p style="font-size: 14px; color: #78716c; margin: 0;">
                  Your first daily wisdom will arrive in your inbox soon.
                </p>
              </div>
              
              <!-- CTA -->
              <div style="text-align: center; margin-top: 32px;">
                <a href="https://rta-cosmic-order.lovable.app/daily-dharma" 
                   style="display: inline-block; background-color: #d4a574; color: #1c1917; padding: 12px 32px; text-decoration: none; font-size: 14px; letter-spacing: 0.1em; border-radius: 4px;">
                  EXPLORE SUBHASHITAS
                </a>
              </div>
              
              <!-- Footer -->
              <div style="text-align: center; margin-top: 48px; padding-top: 24px; border-top: 1px solid #292524;">
                <p style="font-size: 12px; color: #78716c; margin: 0;">
                  With wisdom and blessings,<br>
                  The RTA Team
                </p>
              </div>
            </div>
          </body>
          </html>
        `,
      });
      console.log(`Welcome email sent to ${email}`);
    } catch (emailError) {
      console.error("Error sending welcome email:", emailError);
      // Don't fail the subscription if welcome email fails
    }

    return new Response(
      JSON.stringify({ success: true, message: "Successfully subscribed!" }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error in subscribe-digest function:", error);
    const errorMessage = error instanceof Error ? error.message : "Unknown error occurred";
    return new Response(
      JSON.stringify({ error: errorMessage }),
      {
        status: 500,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  }
};

serve(handler);

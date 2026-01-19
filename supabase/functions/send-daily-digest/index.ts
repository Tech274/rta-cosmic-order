import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.90.1";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

// Sample subhashitas for the daily digest
const subhashitas = [
  {
    sanskrit: "विद्या ददाति विनयं विनयाद्याति पात्रताम्।",
    translation: "Knowledge gives humility; from humility comes worthiness.",
    source: "Hitopadesha",
  },
  {
    sanskrit: "सत्यमेव जयते नानृतम्।",
    translation: "Truth alone triumphs, not falsehood.",
    source: "Mundaka Upanishad",
  },
  {
    sanskrit: "उद्यमेन हि सिध्यन्ति कार्याणि न मनोरथैः।",
    translation: "Success comes through effort, not merely through wishes.",
    source: "Chanakya Niti",
  },
  {
    sanskrit: "अहिंसा परमो धर्मः।",
    translation: "Non-violence is the highest dharma.",
    source: "Mahabharata",
  },
  {
    sanskrit: "धर्मो रक्षति रक्षितः।",
    translation: "Dharma protects those who protect dharma.",
    source: "Manusmriti",
  },
];

const handler = async (req: Request): Promise<Response> => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get all active subscriptions
    const { data: subscriptions, error: fetchError } = await supabaseClient
      .from("email_subscriptions")
      .select("*")
      .eq("is_active", true);

    if (fetchError) {
      console.error("Error fetching subscriptions:", fetchError);
      throw fetchError;
    }

    if (!subscriptions || subscriptions.length === 0) {
      console.log("No active subscriptions found");
      return new Response(
        JSON.stringify({ success: true, message: "No active subscriptions" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    // Get today's subhashita based on day of year
    const dayOfYear = Math.floor(
      (Date.now() - new Date(new Date().getFullYear(), 0, 0).getTime()) / 86400000
    );
    const todaySubhashita = subhashitas[dayOfYear % subhashitas.length];

    console.log(`Sending daily digest to ${subscriptions.length} subscribers`);

    const results = await Promise.allSettled(
      subscriptions.map(async (sub) => {
        const unsubscribeUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/unsubscribe?token=${sub.unsubscribe_token}`;

        const emailResponse = await resend.emails.send({
          from: "RTA Daily Dharma <onboarding@resend.dev>",
          to: [sub.email],
          subject: `🙏 Today's Wisdom: ${todaySubhashita.translation.slice(0, 40)}...`,
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
                  <p style="font-size: 24px; letter-spacing: 0.3em; color: #d4a574; margin: 0;">ṚTA</p>
                  <p style="font-size: 12px; letter-spacing: 0.2em; color: #a8a29e; margin-top: 8px;">DAILY DHARMA</p>
                </div>
                
                <!-- Quote Card -->
                <div style="background: linear-gradient(135deg, #292524 0%, #1c1917 100%); border: 1px solid #d4a574; border-radius: 8px; padding: 40px 30px; text-align: center;">
                  <!-- Sanskrit -->
                  <p style="font-size: 22px; color: #d4a574; line-height: 1.8; margin: 0 0 24px 0;">
                    ${todaySubhashita.sanskrit}
                  </p>
                  
                  <!-- Divider -->
                  <div style="display: flex; align-items: center; justify-content: center; margin: 24px 0;">
                    <span style="color: #d4a574; opacity: 0.5;">✦</span>
                  </div>
                  
                  <!-- Translation -->
                  <p style="font-size: 18px; color: #f5f5f4; font-style: italic; margin: 0 0 16px 0;">
                    "${todaySubhashita.translation}"
                  </p>
                  
                  <!-- Source -->
                  <p style="font-size: 14px; color: #a8a29e; margin: 0;">
                    — ${todaySubhashita.source}
                  </p>
                </div>
                
                <!-- CTA -->
                <div style="text-align: center; margin-top: 32px;">
                  <a href="https://rta-cosmic-order.lovable.app/daily-dharma" 
                     style="display: inline-block; background-color: #d4a574; color: #1c1917; padding: 12px 32px; text-decoration: none; font-size: 14px; letter-spacing: 0.1em; border-radius: 4px;">
                    EXPLORE MORE WISDOM
                  </a>
                </div>
                
                <!-- Footer -->
                <div style="text-align: center; margin-top: 48px; padding-top: 24px; border-top: 1px solid #292524;">
                  <p style="font-size: 12px; color: #78716c; margin: 0 0 8px 0;">
                    You're receiving this because you subscribed to RTA Daily Dharma.
                  </p>
                  <a href="${unsubscribeUrl}" style="font-size: 12px; color: #a8a29e; text-decoration: underline;">
                    Unsubscribe
                  </a>
                </div>
              </div>
            </body>
            </html>
          `,
        });

        console.log(`Email sent to ${sub.email}:`, emailResponse);
        return emailResponse;
      })
    );

    const successful = results.filter((r) => r.status === "fulfilled").length;
    const failed = results.filter((r) => r.status === "rejected").length;

    console.log(`Digest complete: ${successful} sent, ${failed} failed`);

    return new Response(
      JSON.stringify({
        success: true,
        sent: successful,
        failed,
        total: subscriptions.length,
      }),
      {
        status: 200,
        headers: { "Content-Type": "application/json", ...corsHeaders },
      }
    );
  } catch (error) {
    console.error("Error in send-daily-digest function:", error);
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

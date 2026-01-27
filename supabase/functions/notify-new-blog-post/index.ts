import { serve } from "https://deno.land/std@0.190.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.90.1";
import { Resend } from "https://esm.sh/resend@2.0.0";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

const resend = new Resend(Deno.env.get("RESEND_API_KEY"));

interface BlogPost {
  id: string;
  title: string;
  slug: string;
  excerpt: string | null;
  featured_image: string | null;
  category: string;
}

const handler = async (req: Request): Promise<Response> => {
  if (req.method === "OPTIONS") {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { postId } = await req.json();

    if (!postId) {
      throw new Error("Post ID is required");
    }

    const supabaseClient = createClient(
      Deno.env.get("SUPABASE_URL") ?? "",
      Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") ?? ""
    );

    // Get the blog post details
    const { data: post, error: postError } = await supabaseClient
      .from("blog_posts")
      .select("id, title, slug, excerpt, featured_image, category")
      .eq("id", postId)
      .eq("status", "published")
      .single();

    if (postError || !post) {
      console.error("Error fetching post:", postError);
      throw new Error("Blog post not found or not published");
    }

    // Get all active email subscriptions
    const { data: subscriptions, error: subError } = await supabaseClient
      .from("email_subscriptions")
      .select("*")
      .eq("is_active", true);

    if (subError) {
      console.error("Error fetching subscriptions:", subError);
      throw subError;
    }

    if (!subscriptions || subscriptions.length === 0) {
      console.log("No active subscriptions found");
      return new Response(
        JSON.stringify({ success: true, message: "No active subscriptions" }),
        { status: 200, headers: { "Content-Type": "application/json", ...corsHeaders } }
      );
    }

    const baseUrl = "https://rta-cosmic-order.lovable.app";
    const postUrl = `${baseUrl}/blog/${post.slug}`;

    console.log(`Sending blog notification to ${subscriptions.length} subscribers`);

    const results = await Promise.allSettled(
      subscriptions.map(async (sub) => {
        const unsubscribeUrl = `${Deno.env.get("SUPABASE_URL")}/functions/v1/unsubscribe?token=${sub.unsubscribe_token}`;

        const emailResponse = await resend.emails.send({
          from: "RTA Blog <onboarding@resend.dev>",
          to: [sub.email],
          subject: `📖 New Article: ${post.title}`,
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
                  <p style="font-size: 12px; letter-spacing: 0.2em; color: #a8a29e; margin-top: 8px;">NEW ARTICLE</p>
                </div>
                
                <!-- Featured Image -->
                ${post.featured_image ? `
                <div style="margin-bottom: 24px; border-radius: 8px; overflow: hidden;">
                  <img src="${post.featured_image}" alt="${post.title}" style="width: 100%; height: auto; display: block;">
                </div>
                ` : ""}
                
                <!-- Content Card -->
                <div style="background: linear-gradient(135deg, #292524 0%, #1c1917 100%); border: 1px solid #d4a574; border-radius: 8px; padding: 32px;">
                  <!-- Category -->
                  <p style="font-size: 12px; letter-spacing: 0.1em; color: #d4a574; text-transform: uppercase; margin: 0 0 12px 0;">
                    ${post.category}
                  </p>
                  
                  <!-- Title -->
                  <h1 style="font-size: 24px; color: #f5f5f4; margin: 0 0 16px 0; line-height: 1.3;">
                    ${post.title}
                  </h1>
                  
                  <!-- Excerpt -->
                  ${post.excerpt ? `
                  <p style="font-size: 16px; color: #a8a29e; line-height: 1.6; margin: 0 0 24px 0;">
                    ${post.excerpt}
                  </p>
                  ` : ""}
                  
                  <!-- CTA Button -->
                  <a href="${postUrl}" 
                     style="display: inline-block; background-color: #d4a574; color: #1c1917; padding: 12px 32px; text-decoration: none; font-size: 14px; letter-spacing: 0.1em; border-radius: 4px; font-weight: 500;">
                    READ ARTICLE
                  </a>
                </div>
                
                <!-- Footer -->
                <div style="text-align: center; margin-top: 48px; padding-top: 24px; border-top: 1px solid #292524;">
                  <p style="font-size: 12px; color: #78716c; margin: 0 0 8px 0;">
                    You're receiving this because you subscribed to RTA updates.
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

    console.log(`Notification complete: ${successful} sent, ${failed} failed`);

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
    console.error("Error in notify-new-blog-post function:", error);
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

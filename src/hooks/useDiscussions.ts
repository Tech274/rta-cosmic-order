import { useState, useEffect, useCallback } from "react";
import { supabase } from "@/integrations/supabase/client";
import { useAuth } from "./useAuth";

export type HallType = "tattva" | "dharma" | "samvada";

export interface Discussion {
  id: string;
  user_id: string;
  hall: HallType;
  title: string;
  content: string;
  upvotes: number;
  views: number;
  created_at: string;
  author_name: string | null;
  author_level: string;
  reply_count: number;
  has_upvoted: boolean;
}

export interface DiscussionReply {
  id: string;
  discussion_id: string;
  user_id: string;
  content: string;
  upvotes: number;
  created_at: string;
  author_name: string | null;
  author_level: string;
  has_upvoted: boolean;
}

export const useDiscussions = (hall?: HallType) => {
  const [discussions, setDiscussions] = useState<Discussion[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchDiscussions = useCallback(async () => {
    setLoading(true);
    
    let query = supabase
      .from("discussions")
      .select("*")
      .order("created_at", { ascending: false });

    if (hall) {
      query = query.eq("hall", hall);
    }

    const { data: discussionsData, error } = await query;

    if (error || !discussionsData) {
      setLoading(false);
      return;
    }

    // Fetch profiles and reply counts for each discussion
    const enrichedDiscussions = await Promise.all(
      discussionsData.map(async (d) => {
        const [profileRes, repliesRes, upvoteRes] = await Promise.all([
          supabase.from("profiles").select("display_name, membership_level").eq("user_id", d.user_id).maybeSingle(),
          supabase.from("discussion_replies").select("id").eq("discussion_id", d.id),
          user ? supabase.from("upvotes").select("id").eq("user_id", user.id).eq("discussion_id", d.id).maybeSingle() : Promise.resolve({ data: null })
        ]);

        return {
          ...d,
          author_name: profileRes.data?.display_name || "Anonymous",
          author_level: profileRes.data?.membership_level || "seeker",
          reply_count: repliesRes.data?.length || 0,
          has_upvoted: !!upvoteRes.data
        } as Discussion;
      })
    );

    setDiscussions(enrichedDiscussions);
    setLoading(false);
  }, [hall, user]);

  useEffect(() => {
    fetchDiscussions();
  }, [fetchDiscussions]);

  const createDiscussion = async (title: string, content: string, selectedHall: HallType) => {
    if (!user) return { error: new Error("Not authenticated") };

    const { error } = await supabase.from("discussions").insert({
      user_id: user.id,
      hall: selectedHall,
      title,
      content
    });

    if (!error) {
      fetchDiscussions();
    }

    return { error };
  };

  const toggleUpvote = async (discussionId: string) => {
    if (!user) return;

    await supabase.rpc("toggle_upvote", {
      p_user_id: user.id,
      p_discussion_id: discussionId
    });

    fetchDiscussions();
  };

  return { discussions, loading, createDiscussion, toggleUpvote, refetch: fetchDiscussions };
};

export const useDiscussionDetail = (discussionId: string) => {
  const [discussion, setDiscussion] = useState<Discussion | null>(null);
  const [replies, setReplies] = useState<DiscussionReply[]>([]);
  const [loading, setLoading] = useState(true);
  const { user } = useAuth();

  const fetchDetail = useCallback(async () => {
    if (!discussionId) return;
    setLoading(true);

    // Increment view count
    await supabase.rpc("increment_discussion_views", { p_discussion_id: discussionId });

    const { data: d, error } = await supabase
      .from("discussions")
      .select("*")
      .eq("id", discussionId)
      .maybeSingle();

    if (error || !d) {
      setLoading(false);
      return;
    }

    const [profileRes, upvoteRes] = await Promise.all([
      supabase.from("profiles").select("display_name, membership_level").eq("user_id", d.user_id).maybeSingle(),
      user ? supabase.from("upvotes").select("id").eq("user_id", user.id).eq("discussion_id", d.id).maybeSingle() : Promise.resolve({ data: null })
    ]);

    setDiscussion({
      ...d,
      author_name: profileRes.data?.display_name || "Anonymous",
      author_level: profileRes.data?.membership_level || "seeker",
      reply_count: 0,
      has_upvoted: !!upvoteRes.data
    });

    // Fetch replies
    const { data: repliesData } = await supabase
      .from("discussion_replies")
      .select("*")
      .eq("discussion_id", discussionId)
      .order("created_at", { ascending: true });

    if (repliesData) {
      const enrichedReplies = await Promise.all(
        repliesData.map(async (r) => {
          const [profileRes, upvoteRes] = await Promise.all([
            supabase.from("profiles").select("display_name, membership_level").eq("user_id", r.user_id).maybeSingle(),
            user ? supabase.from("upvotes").select("id").eq("user_id", user.id).eq("reply_id", r.id).maybeSingle() : Promise.resolve({ data: null })
          ]);

          return {
            ...r,
            author_name: profileRes.data?.display_name || "Anonymous",
            author_level: profileRes.data?.membership_level || "seeker",
            has_upvoted: !!upvoteRes.data
          } as DiscussionReply;
        })
      );

      setReplies(enrichedReplies);
    }

    setLoading(false);
  }, [discussionId, user]);

  useEffect(() => {
    fetchDetail();
  }, [fetchDetail]);

  const addReply = async (content: string) => {
    if (!user) return { error: new Error("Not authenticated") };

    const { error } = await supabase.from("discussion_replies").insert({
      discussion_id: discussionId,
      user_id: user.id,
      content
    });

    if (!error) {
      fetchDetail();
    }

    return { error };
  };

  const toggleUpvoteDiscussion = async () => {
    if (!user || !discussion) return;

    await supabase.rpc("toggle_upvote", {
      p_user_id: user.id,
      p_discussion_id: discussion.id
    });

    fetchDetail();
  };

  const toggleUpvoteReply = async (replyId: string) => {
    if (!user) return;

    await supabase.rpc("toggle_upvote", {
      p_user_id: user.id,
      p_reply_id: replyId
    });

    fetchDetail();
  };

  return { discussion, replies, loading, addReply, toggleUpvoteDiscussion, toggleUpvoteReply, refetch: fetchDetail };
};

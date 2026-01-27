export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export type Database = {
  // Allows to automatically instantiate createClient with right options
  // instead of createClient<Database, { PostgrestVersion: 'XX' }>(URL, KEY)
  __InternalSupabase: {
    PostgrestVersion: "14.1"
  }
  public: {
    Tables: {
      achievements: {
        Row: {
          category: string
          created_at: string
          description: string
          icon: string
          id: string
          karma_reward: number
          name: string
          rarity: string
          requirement_type: string
          requirement_value: number
          slug: string
        }
        Insert: {
          category?: string
          created_at?: string
          description: string
          icon?: string
          id?: string
          karma_reward?: number
          name: string
          rarity?: string
          requirement_type: string
          requirement_value?: number
          slug: string
        }
        Update: {
          category?: string
          created_at?: string
          description?: string
          icon?: string
          id?: string
          karma_reward?: number
          name?: string
          rarity?: string
          requirement_type?: string
          requirement_value?: number
          slug?: string
        }
        Relationships: []
      }
      audiobook_progress: {
        Row: {
          audiobook_id: string
          created_at: string
          current_chapter: number
          current_position_seconds: number
          id: string
          is_completed: boolean
          last_played_at: string
          updated_at: string
          user_id: string
        }
        Insert: {
          audiobook_id: string
          created_at?: string
          current_chapter?: number
          current_position_seconds?: number
          id?: string
          is_completed?: boolean
          last_played_at?: string
          updated_at?: string
          user_id: string
        }
        Update: {
          audiobook_id?: string
          created_at?: string
          current_chapter?: number
          current_position_seconds?: number
          id?: string
          is_completed?: boolean
          last_played_at?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "audiobook_progress_audiobook_id_fkey"
            columns: ["audiobook_id"]
            isOneToOne: false
            referencedRelation: "audiobooks"
            referencedColumns: ["id"]
          },
        ]
      }
      audiobooks: {
        Row: {
          audio_url: string | null
          author: string
          category: string
          chapters: Json | null
          cover_image: string | null
          created_at: string
          description: string | null
          duration_seconds: number | null
          id: string
          narrator: string | null
          sanskrit_title: string | null
          status: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          audio_url?: string | null
          author: string
          category?: string
          chapters?: Json | null
          cover_image?: string | null
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          id?: string
          narrator?: string | null
          sanskrit_title?: string | null
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          audio_url?: string | null
          author?: string
          category?: string
          chapters?: Json | null
          cover_image?: string | null
          created_at?: string
          description?: string | null
          duration_seconds?: number | null
          id?: string
          narrator?: string | null
          sanskrit_title?: string | null
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      blog_posts: {
        Row: {
          author_id: string
          category: string
          content: string
          created_at: string
          excerpt: string | null
          featured_image: string | null
          id: string
          published_at: string | null
          slug: string
          status: string
          tags: string[] | null
          title: string
          updated_at: string
        }
        Insert: {
          author_id: string
          category?: string
          content: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published_at?: string | null
          slug: string
          status?: string
          tags?: string[] | null
          title: string
          updated_at?: string
        }
        Update: {
          author_id?: string
          category?: string
          content?: string
          created_at?: string
          excerpt?: string | null
          featured_image?: string | null
          id?: string
          published_at?: string | null
          slug?: string
          status?: string
          tags?: string[] | null
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      bookmarked_subhashitas: {
        Row: {
          created_at: string
          id: string
          subhashita_id: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          subhashita_id: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          subhashita_id?: string
          user_id?: string
        }
        Relationships: []
      }
      content_galleries: {
        Row: {
          content_id: string
          content_type: string
          created_at: string
          description: string | null
          id: string
          images: Json
          title: string
          updated_at: string
        }
        Insert: {
          content_id: string
          content_type: string
          created_at?: string
          description?: string | null
          id?: string
          images?: Json
          title: string
          updated_at?: string
        }
        Update: {
          content_id?: string
          content_type?: string
          created_at?: string
          description?: string | null
          id?: string
          images?: Json
          title?: string
          updated_at?: string
        }
        Relationships: []
      }
      daily_practice_logs: {
        Row: {
          created_at: string
          id: string
          practice_date: string
          practices_completed: string[]
          total_duration_seconds: number
          updated_at: string
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          practice_date?: string
          practices_completed?: string[]
          total_duration_seconds?: number
          updated_at?: string
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          practice_date?: string
          practices_completed?: string[]
          total_duration_seconds?: number
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      discussion_replies: {
        Row: {
          content: string
          created_at: string
          discussion_id: string
          id: string
          updated_at: string
          upvotes: number
          user_id: string
        }
        Insert: {
          content: string
          created_at?: string
          discussion_id: string
          id?: string
          updated_at?: string
          upvotes?: number
          user_id: string
        }
        Update: {
          content?: string
          created_at?: string
          discussion_id?: string
          id?: string
          updated_at?: string
          upvotes?: number
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "discussion_replies_discussion_id_fkey"
            columns: ["discussion_id"]
            isOneToOne: false
            referencedRelation: "discussions"
            referencedColumns: ["id"]
          },
        ]
      }
      discussions: {
        Row: {
          content: string
          created_at: string
          hall: Database["public"]["Enums"]["hall_type"]
          id: string
          title: string
          updated_at: string
          upvotes: number
          user_id: string
          views: number
        }
        Insert: {
          content: string
          created_at?: string
          hall: Database["public"]["Enums"]["hall_type"]
          id?: string
          title: string
          updated_at?: string
          upvotes?: number
          user_id: string
          views?: number
        }
        Update: {
          content?: string
          created_at?: string
          hall?: Database["public"]["Enums"]["hall_type"]
          id?: string
          title?: string
          updated_at?: string
          upvotes?: number
          user_id?: string
          views?: number
        }
        Relationships: []
      }
      email_subscriptions: {
        Row: {
          created_at: string
          email: string
          id: string
          is_active: boolean
          preferred_category: string | null
          unsubscribe_token: string
          updated_at: string
        }
        Insert: {
          created_at?: string
          email: string
          id?: string
          is_active?: boolean
          preferred_category?: string | null
          unsubscribe_token?: string
          updated_at?: string
        }
        Update: {
          created_at?: string
          email?: string
          id?: string
          is_active?: boolean
          preferred_category?: string | null
          unsubscribe_token?: string
          updated_at?: string
        }
        Relationships: []
      }
      karma_history: {
        Row: {
          amount: number
          created_at: string
          id: string
          reason: string
          user_id: string
        }
        Insert: {
          amount: number
          created_at?: string
          id?: string
          reason: string
          user_id: string
        }
        Update: {
          amount?: number
          created_at?: string
          id?: string
          reason?: string
          user_id?: string
        }
        Relationships: []
      }
      panchang_events: {
        Row: {
          created_at: string
          description: string | null
          event_date: string
          event_name: string
          event_type: string
          id: string
          is_fasting_day: boolean
          nakshatra: string | null
          tithi: string | null
        }
        Insert: {
          created_at?: string
          description?: string | null
          event_date: string
          event_name: string
          event_type: string
          id?: string
          is_fasting_day?: boolean
          nakshatra?: string | null
          tithi?: string | null
        }
        Update: {
          created_at?: string
          description?: string | null
          event_date?: string
          event_name?: string
          event_type?: string
          id?: string
          is_fasting_day?: boolean
          nakshatra?: string | null
          tithi?: string | null
        }
        Relationships: []
      }
      profiles: {
        Row: {
          bio: string | null
          display_name: string | null
          id: string
          ishta_devata: string | null
          joined_at: string
          karma: number
          membership_level: Database["public"]["Enums"]["membership_level"]
          spiritual_goals: string[] | null
          updated_at: string
          user_id: string
        }
        Insert: {
          bio?: string | null
          display_name?: string | null
          id?: string
          ishta_devata?: string | null
          joined_at?: string
          karma?: number
          membership_level?: Database["public"]["Enums"]["membership_level"]
          spiritual_goals?: string[] | null
          updated_at?: string
          user_id: string
        }
        Update: {
          bio?: string | null
          display_name?: string | null
          id?: string
          ishta_devata?: string | null
          joined_at?: string
          karma?: number
          membership_level?: Database["public"]["Enums"]["membership_level"]
          spiritual_goals?: string[] | null
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      sadhana_sessions: {
        Row: {
          completed_at: string
          count: number | null
          created_at: string
          duration_seconds: number
          id: string
          mantra: string | null
          notes: string | null
          session_type: string
          user_id: string
        }
        Insert: {
          completed_at?: string
          count?: number | null
          created_at?: string
          duration_seconds?: number
          id?: string
          mantra?: string | null
          notes?: string | null
          session_type: string
          user_id: string
        }
        Update: {
          completed_at?: string
          count?: number | null
          created_at?: string
          duration_seconds?: number
          id?: string
          mantra?: string | null
          notes?: string | null
          session_type?: string
          user_id?: string
        }
        Relationships: []
      }
      sankalpas: {
        Row: {
          category: string
          completed_at: string | null
          created_at: string
          description: string | null
          id: string
          is_completed: boolean
          progress: number
          target_date: string | null
          title: string
          updated_at: string
          user_id: string
        }
        Insert: {
          category?: string
          completed_at?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_completed?: boolean
          progress?: number
          target_date?: string | null
          title: string
          updated_at?: string
          user_id: string
        }
        Update: {
          category?: string
          completed_at?: string | null
          created_at?: string
          description?: string | null
          id?: string
          is_completed?: boolean
          progress?: number
          target_date?: string | null
          title?: string
          updated_at?: string
          user_id?: string
        }
        Relationships: []
      }
      scripture_reading_progress: {
        Row: {
          chapter_number: number
          completed: boolean | null
          created_at: string
          id: string
          last_read_at: string | null
          scripture_id: string
          user_id: string
          verse_number: number | null
        }
        Insert: {
          chapter_number: number
          completed?: boolean | null
          created_at?: string
          id?: string
          last_read_at?: string | null
          scripture_id: string
          user_id: string
          verse_number?: number | null
        }
        Update: {
          chapter_number?: number
          completed?: boolean | null
          created_at?: string
          id?: string
          last_read_at?: string | null
          scripture_id?: string
          user_id?: string
          verse_number?: number | null
        }
        Relationships: []
      }
      upvotes: {
        Row: {
          created_at: string
          discussion_id: string | null
          id: string
          reply_id: string | null
          user_id: string
        }
        Insert: {
          created_at?: string
          discussion_id?: string | null
          id?: string
          reply_id?: string | null
          user_id: string
        }
        Update: {
          created_at?: string
          discussion_id?: string | null
          id?: string
          reply_id?: string | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "upvotes_discussion_id_fkey"
            columns: ["discussion_id"]
            isOneToOne: false
            referencedRelation: "discussions"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "upvotes_reply_id_fkey"
            columns: ["reply_id"]
            isOneToOne: false
            referencedRelation: "discussion_replies"
            referencedColumns: ["id"]
          },
        ]
      }
      user_achievements: {
        Row: {
          achievement_id: string
          earned_at: string
          id: string
          user_id: string
        }
        Insert: {
          achievement_id: string
          earned_at?: string
          id?: string
          user_id: string
        }
        Update: {
          achievement_id?: string
          earned_at?: string
          id?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_achievements_achievement_id_fkey"
            columns: ["achievement_id"]
            isOneToOne: false
            referencedRelation: "achievements"
            referencedColumns: ["id"]
          },
        ]
      }
      user_event_reminders: {
        Row: {
          created_at: string
          event_id: string | null
          id: string
          is_notified: boolean
          reminder_time: string
          user_id: string
        }
        Insert: {
          created_at?: string
          event_id?: string | null
          id?: string
          is_notified?: boolean
          reminder_time: string
          user_id: string
        }
        Update: {
          created_at?: string
          event_id?: string | null
          id?: string
          is_notified?: boolean
          reminder_time?: string
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "user_event_reminders_event_id_fkey"
            columns: ["event_id"]
            isOneToOne: false
            referencedRelation: "panchang_events"
            referencedColumns: ["id"]
          },
        ]
      }
      user_roles: {
        Row: {
          created_at: string
          id: string
          role: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Insert: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id: string
        }
        Update: {
          created_at?: string
          id?: string
          role?: Database["public"]["Enums"]["app_role"]
          user_id?: string
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      add_karma: {
        Args: { p_amount: number; p_reason: string; p_user_id: string }
        Returns: undefined
      }
      check_and_award_achievements: {
        Args: { p_user_id: string }
        Returns: {
          achievement_id: string
          earned_at: string
          id: string
          user_id: string
        }[]
        SetofOptions: {
          from: "*"
          to: "user_achievements"
          isOneToOne: false
          isSetofReturn: true
        }
      }
      has_role: {
        Args: {
          _role: Database["public"]["Enums"]["app_role"]
          _user_id: string
        }
        Returns: boolean
      }
      increment_discussion_views: {
        Args: { p_discussion_id: string }
        Returns: undefined
      }
      toggle_upvote: {
        Args: {
          p_discussion_id?: string
          p_reply_id?: string
          p_user_id: string
        }
        Returns: boolean
      }
    }
    Enums: {
      app_role: "admin" | "moderator" | "user"
      hall_type: "tattva" | "dharma" | "samvada"
      membership_level:
        | "seeker"
        | "questioner"
        | "reader"
        | "debater"
        | "interpreter"
        | "scholar"
        | "guardian"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

type DatabaseWithoutInternals = Omit<Database, "__InternalSupabase">

type DefaultSchema = DatabaseWithoutInternals[Extract<keyof Database, "public">]

export type Tables<
  DefaultSchemaTableNameOrOptions extends
    | keyof (DefaultSchema["Tables"] & DefaultSchema["Views"])
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
        DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? (DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"] &
      DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Views"])[TableName] extends {
      Row: infer R
    }
    ? R
    : never
  : DefaultSchemaTableNameOrOptions extends keyof (DefaultSchema["Tables"] &
        DefaultSchema["Views"])
    ? (DefaultSchema["Tables"] &
        DefaultSchema["Views"])[DefaultSchemaTableNameOrOptions] extends {
        Row: infer R
      }
      ? R
      : never
    : never

export type TablesInsert<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Insert: infer I
    }
    ? I
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Insert: infer I
      }
      ? I
      : never
    : never

export type TablesUpdate<
  DefaultSchemaTableNameOrOptions extends
    | keyof DefaultSchema["Tables"]
    | { schema: keyof DatabaseWithoutInternals },
  TableName extends DefaultSchemaTableNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"]
    : never = never,
> = DefaultSchemaTableNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaTableNameOrOptions["schema"]]["Tables"][TableName] extends {
      Update: infer U
    }
    ? U
    : never
  : DefaultSchemaTableNameOrOptions extends keyof DefaultSchema["Tables"]
    ? DefaultSchema["Tables"][DefaultSchemaTableNameOrOptions] extends {
        Update: infer U
      }
      ? U
      : never
    : never

export type Enums<
  DefaultSchemaEnumNameOrOptions extends
    | keyof DefaultSchema["Enums"]
    | { schema: keyof DatabaseWithoutInternals },
  EnumName extends DefaultSchemaEnumNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"]
    : never = never,
> = DefaultSchemaEnumNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[DefaultSchemaEnumNameOrOptions["schema"]]["Enums"][EnumName]
  : DefaultSchemaEnumNameOrOptions extends keyof DefaultSchema["Enums"]
    ? DefaultSchema["Enums"][DefaultSchemaEnumNameOrOptions]
    : never

export type CompositeTypes<
  PublicCompositeTypeNameOrOptions extends
    | keyof DefaultSchema["CompositeTypes"]
    | { schema: keyof DatabaseWithoutInternals },
  CompositeTypeName extends PublicCompositeTypeNameOrOptions extends {
    schema: keyof DatabaseWithoutInternals
  }
    ? keyof DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"]
    : never = never,
> = PublicCompositeTypeNameOrOptions extends {
  schema: keyof DatabaseWithoutInternals
}
  ? DatabaseWithoutInternals[PublicCompositeTypeNameOrOptions["schema"]]["CompositeTypes"][CompositeTypeName]
  : PublicCompositeTypeNameOrOptions extends keyof DefaultSchema["CompositeTypes"]
    ? DefaultSchema["CompositeTypes"][PublicCompositeTypeNameOrOptions]
    : never

export const Constants = {
  public: {
    Enums: {
      app_role: ["admin", "moderator", "user"],
      hall_type: ["tattva", "dharma", "samvada"],
      membership_level: [
        "seeker",
        "questioner",
        "reader",
        "debater",
        "interpreter",
        "scholar",
        "guardian",
      ],
    },
  },
} as const

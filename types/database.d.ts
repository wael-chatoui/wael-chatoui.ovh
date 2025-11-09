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
    PostgrestVersion: "13.0.5"
  }
  public: {
    Tables: {
      experience_skills: {
        Row: {
          experience_id: number
          skill_id: number
        }
        Insert: {
          experience_id: number
          skill_id: number
        }
        Update: {
          experience_id?: number
          skill_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "experience_skills_experience_id_fkey"
            columns: ["experience_id"]
            isOneToOne: false
            referencedRelation: "professional_experiences"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "experience_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      hackathon_skills: {
        Row: {
          hackathon_id: number
          skill_id: number
        }
        Insert: {
          hackathon_id: number
          skill_id: number
        }
        Update: {
          hackathon_id?: number
          skill_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "hackathon_skills_hackathon_id_fkey"
            columns: ["hackathon_id"]
            isOneToOne: false
            referencedRelation: "hackathons"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "hackathon_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      hackathons: {
        Row: {
          created_at: string | null
          description: string | null
          end_date: string | null
          github_link: string | null
          id: number
          image_url: string | null
          location: string | null
          name: string
          organized_by: string | null
          project_link: string | null
          role: string | null
          start_date: string | null
          team_size: number | null
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          github_link?: string | null
          id?: number
          image_url?: string | null
          location?: string | null
          name: string
          organized_by?: string | null
          project_link?: string | null
          role?: string | null
          start_date?: string | null
          team_size?: number | null
        }
        Update: {
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          github_link?: string | null
          id?: number
          image_url?: string | null
          location?: string | null
          name?: string
          organized_by?: string | null
          project_link?: string | null
          role?: string | null
          start_date?: string | null
          team_size?: number | null
        }
        Relationships: []
      }
      professional_experiences: {
        Row: {
          company_name: string
          created_at: string | null
          description: string | null
          end_date: string | null
          github_link: string | null
          id: number
          image_url: string | null
          location: string | null
          project_name: string | null
          role: string
          start_date: string
          website: string | null
        }
        Insert: {
          company_name: string
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          github_link?: string | null
          id?: number
          image_url?: string | null
          location?: string | null
          project_name?: string | null
          role: string
          start_date: string
          website?: string | null
        }
        Update: {
          company_name?: string
          created_at?: string | null
          description?: string | null
          end_date?: string | null
          github_link?: string | null
          id?: number
          image_url?: string | null
          location?: string | null
          project_name?: string | null
          role?: string
          start_date?: string
          website?: string | null
        }
        Relationships: []
      }
      project_skills: {
        Row: {
          project_id: number
          skill_id: number
        }
        Insert: {
          project_id: number
          skill_id: number
        }
        Update: {
          project_id?: number
          skill_id?: number
        }
        Relationships: [
          {
            foreignKeyName: "project_skills_project_id_fkey"
            columns: ["project_id"]
            isOneToOne: false
            referencedRelation: "side_projects"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "project_skills_skill_id_fkey"
            columns: ["skill_id"]
            isOneToOne: false
            referencedRelation: "skills"
            referencedColumns: ["id"]
          },
        ]
      }
      side_projects: {
        Row: {
          created_at: string | null
          description: string | null
          featured: boolean | null
          github_link: string | null
          id: number
          image_url: string | null
          live_link: string | null
          name: string
        }
        Insert: {
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          github_link?: string | null
          id?: number
          image_url?: string | null
          live_link?: string | null
          name: string
        }
        Update: {
          created_at?: string | null
          description?: string | null
          featured?: boolean | null
          github_link?: string | null
          id?: number
          image_url?: string | null
          live_link?: string | null
          name?: string
        }
        Relationships: []
      }
      skills: {
        Row: {
          category: string | null
          created_at: string | null
          icon_url: string | null
          id: number
          level: string | null
          name: string
          skill_link: string | null
        }
        Insert: {
          category?: string | null
          created_at?: string | null
          icon_url?: string | null
          id?: number
          level?: string | null
          name: string
          skill_link?: string | null
        }
        Update: {
          category?: string | null
          created_at?: string | null
          icon_url?: string | null
          id?: number
          level?: string | null
          name?: string
          skill_link?: string | null
        }
        Relationships: []
      }
    }
    Views: {
      [_ in never]: never
    }
    Functions: {
      [_ in never]: never
    }
    Enums: {
      [_ in never]: never
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
    Enums: {},
  },
} as const

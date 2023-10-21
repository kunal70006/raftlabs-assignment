export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      comments: {
        Row: {
          author: string | null
          body: string | null
          created_at: string
          created_by: string | null
          id: number
          post_id: number | null
        }
        Insert: {
          author?: string | null
          body?: string | null
          created_at?: string
          created_by?: string | null
          id?: number
          post_id?: number | null
        }
        Update: {
          author?: string | null
          body?: string | null
          created_at?: string
          created_by?: string | null
          id?: number
          post_id?: number | null
        }
        Relationships: [
          {
            foreignKeyName: "comments_created_by_fkey"
            columns: ["created_by"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          },
          {
            foreignKeyName: "comments_post_id_fkey"
            columns: ["post_id"]
            referencedRelation: "posts"
            referencedColumns: ["id"]
          }
        ]
      }
      posts: {
        Row: {
          author: string | null
          created_at: string
          id: number
          media_path: string | null
          title: string | null
          user_id: string | null
        }
        Insert: {
          author?: string | null
          created_at?: string
          id?: number
          media_path?: string | null
          title?: string | null
          user_id?: string | null
        }
        Update: {
          author?: string | null
          created_at?: string
          id?: number
          media_path?: string | null
          title?: string | null
          user_id?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "posts_user_id_fkey"
            columns: ["user_id"]
            referencedRelation: "profiles"
            referencedColumns: ["id"]
          }
        ]
      }
      profiles: {
        Row: {
          followers: number | null
          full_name: string | null
          id: string
          updated_at: string | null
          username: string | null
        }
        Insert: {
          followers?: number | null
          full_name?: string | null
          id: string
          updated_at?: string | null
          username?: string | null
        }
        Update: {
          followers?: number | null
          full_name?: string | null
          id?: string
          updated_at?: string | null
          username?: string | null
        }
        Relationships: [
          {
            foreignKeyName: "profiles_id_fkey"
            columns: ["id"]
            referencedRelation: "users"
            referencedColumns: ["id"]
          }
        ]
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

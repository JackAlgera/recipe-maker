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
      ingredients: {
        Row: {
          created_at: string
          name: string
          uuid: string
        }
        Insert: {
          created_at?: string
          name: string
          uuid?: string
        }
        Update: {
          created_at?: string
          name?: string
          uuid?: string
        }
        Relationships: []
      }
      recipes: {
        Row: {
          created_at: string
          is_public: boolean
          name: string
          user_id: string
          uuid: string
        }
        Insert: {
          created_at?: string
          is_public?: boolean
          name: string
          user_id: string
          uuid?: string
        }
        Update: {
          created_at?: string
          is_public?: boolean
          name?: string
          user_id?: string
          uuid?: string
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

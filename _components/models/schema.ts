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
      recipe_ingredients: {
        Row: {
          ingredient_uuid: string
          quantity: number
          recipe_uuid: string
          unit: string
        }
        Insert: {
          ingredient_uuid: string
          quantity: number
          recipe_uuid: string
          unit: string
        }
        Update: {
          ingredient_uuid?: string
          quantity?: number
          recipe_uuid?: string
          unit?: string
        }
        Relationships: [
          {
            foreignKeyName: "recipe_ingredients_ingredient_uuid_fkey"
            columns: ["ingredient_uuid"]
            referencedRelation: "ingredients"
            referencedColumns: ["uuid"]
          },
          {
            foreignKeyName: "recipe_ingredients_recipe_uuid_fkey"
            columns: ["recipe_uuid"]
            referencedRelation: "recipes"
            referencedColumns: ["uuid"]
          }
        ]
      }
      recipes: {
        Row: {
          created_at: string
          description: string
          is_public: boolean
          name: string
          user_id: string
          uuid: string
        }
        Insert: {
          created_at?: string
          description: string
          is_public?: boolean
          name: string
          user_id: string
          uuid?: string
        }
        Update: {
          created_at?: string
          description?: string
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

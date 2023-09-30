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
          unit: Database["public"]["Enums"]["unit_type"]
          uuid: string
        }
        Insert: {
          created_at?: string
          name: string
          unit?: Database["public"]["Enums"]["unit_type"]
          uuid?: string
        }
        Update: {
          created_at?: string
          name?: string
          unit?: Database["public"]["Enums"]["unit_type"]
          uuid?: string
        }
        Relationships: []
      }
      planned_recipes: {
        Row: {
          created_on: string | null
          is_done: boolean | null
          recipe_uuid: string
          times: number | null
          user_id: string
        }
        Insert: {
          created_on?: string | null
          is_done?: boolean | null
          recipe_uuid: string
          times?: number | null
          user_id: string
        }
        Update: {
          created_on?: string | null
          is_done?: boolean | null
          recipe_uuid?: string
          times?: number | null
          user_id?: string
        }
        Relationships: [
          {
            foreignKeyName: "planned_recipes_recipe_uuid_fkey"
            columns: ["recipe_uuid"]
            referencedRelation: "recipes"
            referencedColumns: ["uuid"]
          }
        ]
      }
      recipe_ingredients: {
        Row: {
          ingredient_uuid: string
          quantity: number
          recipe_uuid: string
        }
        Insert: {
          ingredient_uuid: string
          quantity: number
          recipe_uuid: string
        }
        Update: {
          ingredient_uuid?: string
          quantity?: number
          recipe_uuid?: string
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
      unit_type: "mL" | "g" | "x"
    }
    CompositeTypes: {
      [_ in never]: never
    }
  }
}

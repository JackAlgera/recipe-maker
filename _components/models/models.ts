export interface Recipe {
  uuid: string;
  name: string;
  user_id: string;
  is_public: boolean;
  created_at: string;
}

export interface Ingredients {
  uuid: string;
  name: string;
  created_at: string;
}

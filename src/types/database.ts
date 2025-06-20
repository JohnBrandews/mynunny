export interface Database {
  public: {
    Tables: {
      profiles: {
        Row: {
          id: string;
          user_id: string;
          email: string;
          first_name: string;
          last_name: string;
          gender: 'male' | 'female' | 'other';
          phone_number?: string;
          region?: string;
          county?: string;
          id_number: string;
          user_type: 'nunny' | 'client';
          profile_picture_url?: string;
          id_image_url?: string;
          services?: string[];
          age_range?: string;
          service_description?: string;
          daily_rate?: number;
          rating?: number;
          review_count?: number;
          is_verified: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          user_id: string;
          email: string;
          first_name: string;
          last_name: string;
          gender: 'male' | 'female' | 'other';
          phone_number?: string;
          region?: string;
          county?: string;
          id_number: string;
          user_type: 'nunny' | 'client';
          profile_picture_url?: string;
          id_image_url?: string;
          services?: string[];
          age_range?: string;
          service_description?: string;
          daily_rate?: number;
          rating?: number;
          review_count?: number;
          is_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          user_id?: string;
          email?: string;
          first_name?: string;
          last_name?: string;
          gender?: 'male' | 'female' | 'other';
          phone_number?: string;
          region?: string;
          county?: string;
          id_number?: string;
          user_type?: 'nunny' | 'client';
          profile_picture_url?: string;
          id_image_url?: string;
          services?: string[];
          age_range?: string;
          service_description?: string;
          daily_rate?: number;
          rating?: number;
          review_count?: number;
          is_verified?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      clients: {
        Row: {
          id: string;
          profile_id: string;
          service_description: string;
          daily_rate: number;
          created_at: string;
          is_available: boolean;
        };
        Insert: {
          id?: string;
          profile_id: string;
          service_description: string;
          daily_rate: number;
          created_at?: string;
          is_available?: boolean;
        };
        Update: {
          id?: string;
          profile_id?: string;
          service_description?: string;
          daily_rate?: number;
          created_at?: string;
          is_available?: boolean;
        };
      };
      nunnies: {
        Row: {
          id: string;
          profile_id: string;
          age_range: string;
          services: string[];
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          age_range: string;
          services: string[];
          created_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          age_range?: string;
          services?: string[];
          created_at?: string;
        };
      };
      file_uploads: {
        Row: {
          id: string;
          profile_id: string;
          file_type: 'id_document' | 'profile_picture';
          file_url: string;
          file_name: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          profile_id: string;
          file_type: 'id_document' | 'profile_picture';
          file_url: string;
          file_name: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          profile_id?: string;
          file_type?: 'id_document' | 'profile_picture';
          file_url?: string;
          file_name?: string;
          created_at?: string;
        };
      };
      service_offers: {
        Row: {
          id: string;
          client_id: string;
          description: string;
          daily_rate: number;
          region: string;
          county: string;
          is_active: boolean;
          created_at: string;
          updated_at: string;
        };
        Insert: {
          id?: string;
          client_id: string;
          description: string;
          daily_rate: number;
          region: string;
          county: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
        Update: {
          id?: string;
          client_id?: string;
          description?: string;
          daily_rate?: number;
          region?: string;
          county?: string;
          is_active?: boolean;
          created_at?: string;
          updated_at?: string;
        };
      };
      reviews: {
        Row: {
          id: string;
          from_user_id: string;
          to_user_id: string;
          rating: number;
          comment?: string;
          created_at: string;
        };
        Insert: {
          id?: string;
          from_user_id: string;
          to_user_id: string;
          rating: number;
          comment?: string;
          created_at?: string;
        };
        Update: {
          id?: string;
          from_user_id?: string;
          to_user_id?: string;
          rating?: number;
          comment?: string;
          created_at?: string;
        };
      };
    };
    Views: {
      [_ in never]: never;
    };
    Functions: {
      [_ in never]: never;
    };
    Enums: {
      [_ in never]: never;
    };
  };
}
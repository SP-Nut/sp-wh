export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[];

export interface Database {
  public: {
    Tables: {
      products: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          name: string;
          slug: string;
          description: string | null;
          size_category: string;
          width: number;
          length: number;
          height: number;
          price: number;
          image_url: string | null;
          gallery: string[] | null;
          features: string[] | null;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name: string;
          slug: string;
          description?: string | null;
          size_category: string;
          width: number;
          length: number;
          height: number;
          price: number;
          image_url?: string | null;
          gallery?: string[] | null;
          features?: string[] | null;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          name?: string;
          slug?: string;
          description?: string | null;
          size_category?: string;
          width?: number;
          length?: number;
          height?: number;
          price?: number;
          image_url?: string | null;
          gallery?: string[] | null;
          features?: string[] | null;
          is_active?: boolean;
        };
      };
      works: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          title: string;
          slug: string;
          description: string | null;
          location: string | null;
          size: number | null;
          image_url: string;
          gallery: string[] | null;
          completed_at: string | null;
          is_featured: boolean;
          is_active: boolean;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title: string;
          slug: string;
          description?: string | null;
          location?: string | null;
          size?: number | null;
          image_url: string;
          gallery?: string[] | null;
          completed_at?: string | null;
          is_featured?: boolean;
          is_active?: boolean;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title?: string;
          slug?: string;
          description?: string | null;
          location?: string | null;
          size?: number | null;
          image_url?: string;
          gallery?: string[] | null;
          completed_at?: string | null;
          is_featured?: boolean;
          is_active?: boolean;
        };
      };
      articles: {
        Row: {
          id: string;
          created_at: string;
          updated_at: string;
          title: string;
          slug: string;
          excerpt: string | null;
          content: string;
          image_url: string | null;
          author: string | null;
          is_published: boolean;
          published_at: string | null;
        };
        Insert: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title: string;
          slug: string;
          excerpt?: string | null;
          content: string;
          image_url?: string | null;
          author?: string | null;
          is_published?: boolean;
          published_at?: string | null;
        };
        Update: {
          id?: string;
          created_at?: string;
          updated_at?: string;
          title?: string;
          slug?: string;
          excerpt?: string | null;
          content?: string;
          image_url?: string | null;
          author?: string | null;
          is_published?: boolean;
          published_at?: string | null;
        };
      };
      contacts: {
        Row: {
          id: string;
          created_at: string;
          first_name: string;
          last_name: string | null;
          phone: string;
          email: string | null;
          address: string | null;
          line_id: string | null;
          warehouse_size: string | null;
          message: string | null;
          status: string;
        };
        Insert: {
          id?: string;
          created_at?: string;
          first_name: string;
          last_name?: string | null;
          phone: string;
          email?: string | null;
          address?: string | null;
          line_id?: string | null;
          warehouse_size?: string | null;
          message?: string | null;
          status?: string;
        };
        Update: {
          id?: string;
          created_at?: string;
          first_name?: string;
          last_name?: string | null;
          phone?: string;
          email?: string | null;
          address?: string | null;
          line_id?: string | null;
          warehouse_size?: string | null;
          message?: string | null;
          status?: string;
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

export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
}

export interface CosmicImage {
  url: string;
  imgix_url: string;
}

export interface Service extends CosmicObject {
  type: 'services';
  metadata: {
    name?: string;
    short_description?: string;
    content?: string;
    scene_type?: string;
    accent_color?: string;
    featured_image?: CosmicImage;
    display_order?: number;
  };
}

export interface TeamMember extends CosmicObject {
  type: 'team-members';
  metadata: {
    full_name?: string;
    role?: string;
    credentials?: string;
    bio?: string;
    photo?: CosmicImage;
    years_experience?: number;
    email?: string;
    linkedin_url?: string;
    display_order?: number;
  };
}

export interface CaseStudy extends CosmicObject {
  type: 'case-studies';
  metadata: {
    title?: string;
    summary?: string;
    category?: string;
    challenge?: string;
    solution?: string;
    result?: string;
    key_metric?: string;
    featured_image?: CosmicImage;
    related_service?: Service;
  };
}

export interface Testimonial extends CosmicObject {
  type: 'testimonials';
  metadata: {
    client_name?: string;
    designation?: string;
    company?: string;
    quote?: string;
    rating?: number;
    photo?: CosmicImage;
    related_service?: Service;
  };
}

export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit: number;
  skip: number;
}
export interface Genre {
    id: number;
    name: string;
    slug: string;
    games_count: number;
    image_background: string;
    games?: Array<{
      id: number;
      slug: string;
      name: string;
      added: number;
    }>;
  }
  
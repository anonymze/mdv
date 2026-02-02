import type { Media } from "./media";
import type { RichTextField } from "./rich-text";

export interface Mediatheque {
  id: string;
  type: 'ludotheque';
  jeunePublic?: boolean | null;
  thumbnail?: Media | null;
  title: string;
  description: RichTextField;
  price: string;
  players: '1' | '1-2' | '1-4' | '1-8' | '4+';
  duration: '15' | '30' | '1h' | '1h+';
  public: '-3' | '3+' | '12+' | '16+' | '18+';
  informations_more?: RichTextField | null;
  other_images?:
    | {
        image?: Media | null;
        id?: string | null;
      }[]
    | null;
  availability_date?: string | null;
  genre?: string | null;
  materiel?: string | null;
  authors?: string | null;
  location?: string | null;
  updatedAt: string;
  createdAt: string;
}

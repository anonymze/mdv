import type { Media } from "./media";
import type { RichTextField } from "./rich-text";

export interface Cinema {
  id: string;
  type: 'seance' | 'scolaire' | 'rdv_cinema';
  archive?: boolean | null;
  thumbnail?: Media | null;
  title: string;
  synopsis: RichTextField;
  price: string;
  date_start: string;
  video: string;
  duration: string;
  genre: string;
  public?:
    | ('children' | 'all_public' | 'all_public_avertissment' | 'forbidden_12' | 'forbidden_16' | 'forbidden_18')
    | null;
  languages: string;
  informations_more?: RichTextField | null;
  other_images?:
    | {
        image?: Media | null;
        id?: string | null;
      }[]
    | null;
  actors?: string | null;
  directors?: string | null;
  location?: string | null;
  updatedAt: string;
  createdAt: string;
}

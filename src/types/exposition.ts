import type { Media } from "./media";
import type { RichTextField } from "./rich-text";

export interface Exposition {
  id: string;
  type: 'exposition' | 'evenement';
  archive?: boolean | null;
  images?:
    | {
        image?: Media | null;
        id?: string | null;
      }[]
    | null;
  title: string;
  description: RichTextField;
  date_start: string;
  date_end: string;
  location?: string | null;
  informations_more?: RichTextField | null;
  genre?: string | null;
  tags?: string | null;
  authors?: string | null;
  updatedAt: string;
  createdAt: string;
}

import type { Media } from "./media";

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
  description: {
    root: {
      type: string;
      children: {
        type: any;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  };
  date_start: string;
  date_end: string;
  location?: string | null;
  informations_more?: {
    root: {
      type: string;
      children: {
        type: any;
        version: number;
        [k: string]: unknown;
      }[];
      direction: ('ltr' | 'rtl') | null;
      format: 'left' | 'start' | 'center' | 'right' | 'end' | 'justify' | '';
      indent: number;
      version: number;
    };
    [k: string]: unknown;
  } | null;
  genre?: string | null;
  tags?: string | null;
  authors?: string | null;
  updatedAt: string;
  createdAt: string;
}

import type { Media } from "./media";
import type { RichTextField } from "./rich-text";

export interface Mediatheque {
  id: string;
  type: 'bibliotheque' | 'ludotheque';
  archive?: boolean | null;
  /**
   * Le fichier doit être une image.
   */
  thumbnail?: Media | null;
  title: string;
  description: RichTextField;
  /**
   * Séparer si plusieurs prix par un ";" Ex : 5€ adulte; Gratuit sur place; 2€ par jour...
   */
  price: string;
  players: '1' | '1-2' | '1-4' | '1-8' | '4+';
  duration: '15' | '30' | '1h' | '1h+';
  public: '-3' | '3+' | '12+' | '16+' | '18+';
  informations_more?: RichTextField | null;
  other_images?:
    | {
        /**
         * Le fichier doit être une image.
         */
        image?: Media | null;
        id?: string | null;
      }[]
    | null;
  /**
   * Ex : Du 1er janvier 2026 au 31 juillet 2026
   */
  availability_date?: string | null;
  /**
   * Ex : Logique, Déduction, Coopération
   */
  genre?: string | null;
  /**
   * Ex : 27 tuiles enquête, 10 petits punchs, 1 feuillet de règles
   */
  materiel?: string | null;
  authors?: string | null;
  /**
   * SI VOUS LAISSEZ CE CHAMP VIDE, LE LIEU PAR DÉFAULT SERA À LA MÉDIATHÈQUE DE LA MDV
   */
  location?: string | null;
  updatedAt: string;
  createdAt: string;
}

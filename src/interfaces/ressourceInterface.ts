type media = "post" | "video" | "book";
type lang = "fr" | "en";

interface Ressource {
  id?: string;
  media: media;
  title: string;
  lang: lang;
  image?: string;
  url: string;
  description: string;
  rating: number;
  isTop: boolean;
  isValid: boolean;
  date: string;
}

export default Ressource;

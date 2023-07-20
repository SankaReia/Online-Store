export interface PictureI {
  id: number;
  category: string;
  description: string;
  img: string;
  price: number;
  title: string;
  quantity: number;
}

export interface BasketI {
  id: number;
  person_id: number;
  picture_id: number;
  quantity: number;
}

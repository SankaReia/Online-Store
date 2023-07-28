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
  id?: number;
  person_id: number;
  picture_id: number;
  quantity: number;
}

export interface AddressI {
  [key: string]: any;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zip: string;
  country: string;
}

export interface PaymentI {
  [key: string]: any;
  cardName: string;
  cardNumber: string;
  expDate: string;
  cvv: string;
}

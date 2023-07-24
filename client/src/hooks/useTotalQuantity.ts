import { PictureI } from "../utils/models";

export const useTotalQuantity = (basket: PictureI[]) => {
  let totalQuantity = 0;
  let totalPrice = 0;

  for (let i = 0; i < basket.length; i++) {
    totalQuantity += basket[i].quantity;
    totalPrice += basket[i].price * basket[i].quantity;
  }

  return {
    totalQuantity,
    totalPrice,
  };
};

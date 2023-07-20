import { $host } from "./index";

export const addToCart = async (
  person_id: number,
  picture_id: string,
  quantity: number
) => {
  try {
    const { data } = await $host.post("basket", {
      person_id,
      picture_id,
      quantity,
    });
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const fetchBasket = async (person_id: number) => {
  try {
    const { data } = await $host.get(`basket/${person_id}`);
    return data;
  } catch (e) {
    console.log(e);
  }
};

export const deleteFromBasket = async (picture_id: number) => {
  try {
    const { data } = await $host.delete(`basket/${picture_id}`);
    return data;
  } catch (e) {
    console.log(e);
  }
};

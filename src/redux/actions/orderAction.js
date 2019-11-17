export const addToCart = food => {
  return { type: "ADD_TO_CART", food: food };
};
export const removeFromCart = food => {
  return { type: "REMOVE_FROM_CART", food: food };
};

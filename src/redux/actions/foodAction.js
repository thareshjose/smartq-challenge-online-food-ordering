import { apiFetch } from "./apiFetch";

export const getAvailableFoods = dispatch => {
  apiFetch().then(availableFoods => {
    dispatch(setLoading(false));
    dispatch(setAvailableFoods(availableFoods));
  });
};

export const setLoading = isLoading => {
  return { type: "SET_LOADING", isLoading: isLoading };
};

export const setAvailableFoods = availableFoods => {
  return { type: "SET_AVAILABLE_FOODS", availableFoods: availableFoods };
};

export const updateItemCount = (id, count) => {
  return { type: "UPDATE_ITEM_COUNT", id: id, count: count };
};

export const testCount = dispatch => {
  dispatch({ type: "COUNT", count: 2 });
};

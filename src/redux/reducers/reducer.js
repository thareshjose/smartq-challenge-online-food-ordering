/*Library Imports*/
import { combineReducers } from "redux";

/*Reducer imports*/
import foodReducer from "./foodReducer";
import orderReducer from "./orderReducer";

const appReducer = combineReducers({
  foodInfo: foodReducer,
  orderInfo: orderReducer
});

export const rootReducer = (state, action) => {
  if (action.type === "CLEAR_CART") {
    state = undefined;
  }
  return appReducer(state, action);
};

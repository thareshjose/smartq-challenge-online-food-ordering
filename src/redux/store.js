/*Library Imports*/
import { createStore, applyMiddleware } from "redux";
import thunk from "redux-thunk";

/*Reducer Import*/
import { rootReducer } from "./reducers/reducer";

export default function configureStore() {
  const store = createStore(rootReducer, applyMiddleware(thunk));
  return store;
}

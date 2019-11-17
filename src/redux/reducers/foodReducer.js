const initialState = {
  availableFoods: [],
  menu: [],
  isLoading: true,
  count: 0
};

const foodReducer = (state = initialState, action) => {
  switch (action.type) {
    case "SET_LOADING":
      return { ...state, isLoading: action.isLoading };
    case "SET_AVAILABLE_FOODS":
      let menu = [...action.availableFoods];
      menu.map((item, index) => {
        item.id = index + 1;
        item.count = 0;
      });
      return { ...state, menu: menu, availableFoods: action.availableFoods };
    case "UPDATE_ITEM_COUNT":
      let menuItems = [...state.menu];
      menuItems.map((item, index) => {
        return item.id === action.id
          ? (item.count = item.count + action.count)
          : "";
      });
      return { ...state, menu: menuItems };
    case "COUNT":
      return { ...state, count: state.count + action.count };
    default:
      return state;
  }
};

export default foodReducer;

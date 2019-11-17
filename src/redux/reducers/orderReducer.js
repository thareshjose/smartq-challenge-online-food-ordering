const initialState = {
  cartItems: [],
  cartItemsCount: 0
};

const orderReducer = (state = initialState, action) => {
  switch (action.type) {
    case "ADD_TO_CART":
      let cart =
        state.cartItems.length > 0
          ? [...state.cartItems, action.food]
          : action.food;
      let cartItems = cart.length > 1 ? [...new Set(cart)] : [cart];
      return {
        ...state,
        cartItemsCount: state.cartItemsCount + 1,
        cartItems
      };
    case "REMOVE_FROM_CART":
      let cartItemsList = [...state.cartItems];
      cartItemsList = cartItemsList.filter(item => item.count !== 0);
      return {
        ...state,
        cartItemsCount: state.cartItemsCount - 1,
        cartItems: cartItemsList
      };
    default:
      return state;
  }
};

export default orderReducer;

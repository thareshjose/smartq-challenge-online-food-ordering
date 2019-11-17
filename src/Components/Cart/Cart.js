import React from "react";
import { connect } from "react-redux";
import shortid from "shortid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";
import { Redirect } from "react-router-dom";

/*Action imports*/
import { addToCart } from "../../redux/actions/orderAction";
import { removeFromCart } from "../../redux/actions/orderAction";
import { updateItemCount } from "../../redux/actions/foodAction";

/*Style Import*/
import "./cart.css";

const Cart = props => {
  console.log("cart", props.cartItems);

  const addItem = food => {
    props.updateItemCount(food.id, 1);
    props.addToCart(food);
  };

  const removeItem = food => {
    if (food.count - 1 >= 0) {
      props.updateItemCount(food.id, -1);
      props.removeFromCart(food);
    }
  };

  const clearCart = () => {
    props.clearCart();
    props.history.push("/");
  };
  if (props.cartItems.length === 0) {
    return <Redirect to="/" />;
  }
  return (
    <div className="cart-container">
      <div className="offer-container"></div>
      <div className="order-title">Your Order Details</div>
      <div className="cart-items-container">
        <div className="cart-card-title">
          <label className="title-buffet">Buffet</label>
          <label className="title-date">
            Date
            <br />
            {getCurrentDate()}
          </label>
        </div>
        <ul>
          {props.cartItems.map((item, index) => {
            return (
              <li key={shortid.generate()} className="cart-item">
                <div className="cart-items-left">
                  <div className="cart-item-name">
                    {convertToUpperCase(item)}
                  </div>

                  <div className="cart-item-details">
                    <span>{`${item.count} x ₹${item.price}.00`}</span>
                  </div>
                </div>
                <div className="cart-items-right">
                  <div className="cart-item-updator">
                    <span className="add-remove-buttons">
                      <FontAwesomeIcon
                        icon={faMinus}
                        onClick={() => removeItem(item)}
                      />
                      <span className="food-item-count">{item.count}</span>
                      <FontAwesomeIcon
                        icon={faPlus}
                        onClick={() => addItem(item)}
                      />
                    </span>
                  </div>
                  <div className="cart-item-price">
                    <span>{`₹${item.price * item.count}.00`}</span>
                  </div>
                </div>
              </li>
            );
          })}
        </ul>
        <div className="cart-total">
          <span className="cart-total-text">Total</span>
          <span className="cart-total-amount">
            ₹{getTotal(props.cartItems)}
          </span>
        </div>
        <div className="checkout">
          <button className="clear-button" onClick={() => clearCart()}>
            CLEAR CART
          </button>
          <button className="confirm-button">CONFIRM ORDER</button>
        </div>
      </div>
    </div>
  );
};

/*Mapping the state to the props, for the component*/
const mapStateToProps = store => {
  return {
    cartItems: store.orderInfo.cartItems
  };
};

/*Mapping the dispatch to props, for actions*/
const mapDispatchToProps = dispatch => {
  return {
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
    updateItemCount: (id, count) => dispatch(updateItemCount(id, count)),
    addToCart: food => dispatch(addToCart(food)),
    removeFromCart: food => dispatch(removeFromCart(food))
  };
};

const convertToUpperCase = food => {
  return food.itemname.charAt(0).toUpperCase() + food.itemname.slice(1);
};

const getTotal = food => {
  let total = food.reduce((total, item) => {
    return total + item.count * item.price;
  }, 0);
  return total;
};

const getCurrentDate = (separator = "-") => {
  let newDate = new Date();
  let date = newDate.getDate();
  let month = newDate.getMonth() + 1;
  let year = newDate.getFullYear();

  return `${date}${separator}${
    month < 10 ? `0${month}` : `${month}`
  }${separator}${year}`;
};
//src={`./images/` + food.itemname + `.jpg`}
export default connect(mapStateToProps, mapDispatchToProps)(Cart);

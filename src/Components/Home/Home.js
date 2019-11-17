import React, { useEffect } from "react";
import { connect } from "react-redux";
import shortid from "shortid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

/*Action imports*/
import { getAvailableFoods } from "../../redux/actions/foodAction";
import { testCount } from "../../redux/actions/foodAction";
import { addToCart } from "../../redux/actions/orderAction";
import { removeFromCart } from "../../redux/actions/orderAction";
import { updateItemCount } from "../../redux/actions/foodAction";

/*Style Import*/
import "./home.css";

const Home = props => {
  useEffect(() => {
    props.clearCart();
    props.getAvailableFoods();
  }, []);

  const addItem = food => {
    props.updateItemCount(food.id, 1);
    props.addToCart(food);
  };

  const removeItem = food => {
    if (food.count - 1 >= 0) {
      props.removeFromCart(food);
      props.updateItemCount(food.id, -1);
    }
  };
  if (props.isLoading) {
    return (
      <div className="home-container">
        <h1>..</h1>
      </div>
    );
  } else {
    return (
      <div className="home-container">
        <div className="offer-container"></div>
        <ul className="food-container">
          {props.availableFoods.map((food, index) => {
            return (
              <ul
                key={shortid.generate()}
                className={`food-card ${food.count > 0 ? "food-selected" : ""}`}
              >
                <li>
                  <img
                    src={`./images/` + food.itemname + `.jpg`}
                    alt="food-img"
                    className="food-image"
                  />
                </li>
                <li className="food-name">{convertToUpperCase(food)}</li>
                <li className="food-price">{`₹` + food.price}</li>
                {food.count === 0 && (
                  <li className="add-buttons" onClick={() => addItem(food)}>
                    ADD
                  </li>
                )}
                {food.count !== 0 && (
                  <li className="add-remove-buttons">
                    <FontAwesomeIcon
                      icon={faMinus}
                      onClick={() => removeItem(food)}
                    />
                    <span className="food-item-count">{food.count}</span>
                    <FontAwesomeIcon
                      icon={faPlus}
                      onClick={() => addItem(food)}
                    />
                  </li>
                )}
              </ul>
            );
          })}
        </ul>
      </div>
    );
  }
};

/*Mapping the state to the props, for the component*/
const mapStateToProps = store => {
  return {
    availableFoods: store.foodInfo.menu,
    count: store.foodInfo.count
  };
};

/*Mapping the dispatch to props, for actions*/
const mapDispatchToProps = dispatch => {
  return {
    getAvailableFoods: () => dispatch(getAvailableFoods),
    testCount: () => dispatch(testCount),
    updateItemCount: (id, count) => dispatch(updateItemCount(id, count)),
    addToCart: food => dispatch(addToCart(food)),
    removeFromCart: food => dispatch(removeFromCart(food)),
    clearCart: () => dispatch({ type: "CLEAR_CART" })
  };
};

function convertToUpperCase(food) {
  return food.itemname.charAt(0).toUpperCase() + food.itemname.slice(1);
}
export default connect(mapStateToProps, mapDispatchToProps)(Home);

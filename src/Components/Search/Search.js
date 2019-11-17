import React, { useState, useEffect } from "react";
import { connect } from "react-redux";
import shortid from "shortid";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faPlus } from "@fortawesome/free-solid-svg-icons";
import { faMinus } from "@fortawesome/free-solid-svg-icons";

/*Action imports*/
import { getAvailableFoods } from "../../redux/actions/foodAction";
import { addToCart } from "../../redux/actions/orderAction";
import { removeFromCart } from "../../redux/actions/orderAction";
import { updateItemCount } from "../../redux/actions/foodAction";

/*Style Import*/
import "./search.css";

const Search = props => {
  const [startSearch, setStartSearch] = useState(false);
  const [searchResult, setSearchResult] = useState([]);
  const [count, setCount] = useState(0);
  useEffect(() => {
    props.getAvailableFoods();
  }, []);

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

  const getSearchResults = event => {
    let searchText = event.target.value;
    let result = props.availableFoods.filter(item =>
      item.itemname.includes(searchText)
    );

    if (searchText.length > 0) {
      setStartSearch(true);
    } else {
      setStartSearch(false);
    }
    setSearchResult(result);
  };

  const sortByPriceAscending = () => {
    searchResult.sort((first, second) => {
      return first.price - second.price;
    });
    setSearchResult(searchResult);
    setCount(count + 1);
  };

  const sortByPriceDescending = () => {
    searchResult.sort((first, second) => {
      return second.price - first.price;
    });
    setSearchResult(searchResult);
    setCount(count + 1);
  };

  return (
    <>
      <div className="offer-container"></div>
      <div className="search-container">
        <div className="search-bar">
          <input
            type="text"
            className="search-bar-input"
            onChange={event => getSearchResults(event)}
          />
        </div>
        <div className="search-filters">
          Sort by Price
          <input type="radio" name="sort" onChange={sortByPriceAscending} />
          Ascending
          <input type="radio" name="sort" onChange={sortByPriceDescending} />
          Descending
        </div>
        <div className="search-results">
          {startSearch === true && searchResult.length !== 0 && (
            <ul>
              {searchResult.map((food, index) => {
                return (
                  <li key={shortid.generate()} className="search-result-item">
                    <span className="search-result-food-name">
                      {convertToUpperCase(food)}
                    </span>

                    <div className="food-price">{`₹` + food.price}</div>
                    {food.count === 0 && (
                      <div
                        className="add-buttons"
                        onClick={() => addItem(food)}
                      >
                        ADD
                      </div>
                    )}
                    {food.count !== 0 && (
                      <div className="add-remove-buttons">
                        <FontAwesomeIcon
                          icon={faMinus}
                          onClick={() => removeItem(food)}
                        />
                        <span className="food-item-count">{food.count}</span>
                        <FontAwesomeIcon
                          icon={faPlus}
                          onClick={() => addItem(food)}
                        />
                      </div>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </div>
      </div>
    </>
  );
};

/*Mapping the state to the props, for the component*/
const mapStateToProps = store => {
  return {
    availableFoods: store.foodInfo.menu,
    cartItems: store.foodInfo.cartItems
  };
};

/*Mapping the dispatch to props, for actions*/
const mapDispatchToProps = dispatch => {
  return {
    getAvailableFoods: () => dispatch(getAvailableFoods),
    clearCart: () => dispatch({ type: "CLEAR_CART" }),
    updateItemCount: (id, count) => dispatch(updateItemCount(id, count)),
    addToCart: food => dispatch(addToCart(food)),
    removeFromCart: food => dispatch(removeFromCart(food))
  };
};

const convertToUpperCase = food => {
  return food.itemname.charAt(0).toUpperCase() + food.itemname.slice(1);
};

export default connect(mapStateToProps, mapDispatchToProps)(Search);

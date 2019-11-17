/*Library import*/
import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";

/*Style Imports*/
import "./header.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faShoppingCart } from "@fortawesome/free-solid-svg-icons";
import { faSearch } from "@fortawesome/free-solid-svg-icons";

const Header = props => {
  const navigateToSearch = props => {
    props.history.push("/search");
  };
  const navigateToCart = props => {
    props.history.push("/cart");
  };

  const naviageToHome = props => {
    props.history.push("/");
  };
  return (
    <div className="header-container">
      <img
        src={`./images/logo.jpg`}
        alt="logo"
        className="logo"
        onClick={() => naviageToHome(props)}
      />
      <div className="header-nav">
        <div className="search-icon" onClick={() => navigateToSearch(props)}>
          <FontAwesomeIcon icon={faSearch} />
          <span> Search</span>
        </div>
        <div className="cart-contain" onClick={() => navigateToCart(props)}>
          <FontAwesomeIcon icon={faShoppingCart} />
          <span className="cart-items-count">{props.cartItemsCount}</span>
          <span className="cart-text">Cart</span>
        </div>
      </div>
      {/* {props.count} */}
    </div>
  );
};

/*Mapping the state to the props, for the component*/
const mapStateToProps = store => {
  return {
    cartItemsCount: store.orderInfo.cartItemsCount
  };
};

/*Mapping the dispatch to props, for actions*/
const mapDispatchToProps = dispatch => {
  return {};
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Header));

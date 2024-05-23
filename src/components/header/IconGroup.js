import PropTypes from "prop-types";
import { Link, useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import clsx from "clsx";
import MenuCart from "./sub-components/MenuCart";
import { logout } from "../../store/slices/login-slice";

const IconGroup = ({ iconWhiteClass }) => {
  const handleClick = (e) => {
    e.currentTarget.nextSibling.classList.toggle("active");
  };

  const triggerMobileMenu = () => {
    const offcanvasMobileMenu = document.querySelector(
      "#offcanvas-mobile-menu"
    );
    offcanvasMobileMenu.classList.add("active");
  };
  const { compareItems } = useSelector((state) => state.compare);
  const { wishlistItems } = useSelector((state) => state.wishlist);
  const { cartItems } = useSelector((state) => state.cart);
  const { isLoggedIn, token, email, usertype } = useSelector(
    (state) => state.login
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = () => {
    // Dispatch the logout action
    dispatch(logout());
    // Redirect to the login page
    navigate(process.env.PUBLIC_URL + "/login-register");
  };

  return (
    <div className={clsx("header-right-wrap", iconWhiteClass)}>
      <div className="same-style header-search d-none d-lg-block">
        <button className="search-active" onClick={(e) => handleClick(e)}>
          <i className="pe-7s-search" />
        </button>
        <div className="search-content">
          <form action="#">
            <input type="text" placeholder="Search" />
            <button className="button-search">
              <i className="pe-7s-search" />
            </button>
          </form>
        </div>
      </div>
      <div className="same-style account-setting d-none d-lg-block">
        <button
          className="account-setting-active"
          onClick={(e) => handleClick(e)}
        >
          <i className="pe-7s-user-female" />
        </button>
        <div className="account-dropdown">
          {isLoggedIn ? (
            <ul>
              <li>
                <Link onClick={handleLogout} to="#">
                  Logout
                </Link>
              </li>
            </ul>
          ) : (
            <ul>
              <li>
                <Link to={process.env.PUBLIC_URL + "/login-register"}>
                  Login
                </Link>
              </li>
              <li>
                <Link to={process.env.PUBLIC_URL + "/login-register"}>
                  Register
                </Link>
              </li>
            </ul>
          )}
        </div>
      </div>

      {isLoggedIn && (
        <div className="same-style header-wishlist">
          <Link to={process.env.PUBLIC_URL + "/wishlist"}>
            <i className="pe-7s-like" />
            <span className="count-style">
              {wishlistItems && wishlistItems.length ? wishlistItems.length : 0}
            </span>
          </Link>
        </div>
      )}

      {isLoggedIn && (
        <div className="same-style cart-wrap d-none d-lg-block">
          <button className="icon-cart" onClick={(e) => handleClick(e)}>
            <i className="pe-7s-shopbag" />
            <span className="count-style">
              {cartItems && cartItems.length ? cartItems.length : 0}
            </span>
          </button>
          {/* menu cart */}
          <MenuCart />
        </div>
      )}

      {isLoggedIn && (
        <div className="same-style cart-wrap d-block d-lg-none">
          <Link className="icon-cart" to={process.env.PUBLIC_URL + "/cart"}>
            <i className="pe-7s-shopbag" />
            <span className="count-style">
              {cartItems && cartItems.length ? cartItems.length : 0}
            </span>
          </Link>
        </div>
      )}

      <div className="same-style mobile-off-canvas d-block d-lg-none">
        <button
          className="mobile-aside-button"
          onClick={() => triggerMobileMenu()}
        >
          <i className="pe-7s-menu" />
        </button>
      </div>
    </div>
  );
};

IconGroup.propTypes = {
  iconWhiteClass: PropTypes.string,
};

export default IconGroup;

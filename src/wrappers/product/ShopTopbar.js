import PropTypes from "prop-types";
import { ShopTopbar } from "./ShopTopbar.1";

ShopTopbar.propTypes = {
  getFilterSortParams: PropTypes.func,
  getLayout: PropTypes.func,
  productCount: PropTypes.number,
  sortedProductCount: PropTypes.number
};

export default ShopTopbar;

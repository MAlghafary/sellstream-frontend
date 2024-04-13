import React, { Fragment } from "react";
import ShopTopAction from "../../components/product/ShopTopAction";

export const ShopTopbar = ({
  getLayout, getFilterSortParams, productCount, sortedProductCount
}) => {
  return (
    <Fragment>
      {/* shop top action */}
      <ShopTopAction
        getLayout={getLayout}
        getFilterSortParams={getFilterSortParams}
        productCount={productCount}
        sortedProductCount={sortedProductCount} />
    </Fragment>
  );
};

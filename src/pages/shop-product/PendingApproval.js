import { Fragment, useCallback, useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import {
  removePendingProduct,
  setPendingProducts,
  setLoading,
  setError,
} from "../../store/slices/product-slice";
import handleApiResponse, { fetchDataWithToken, putDataWithToken } from "../../helpers/apiUtils";
import { logout } from "../../store/slices/login-slice";

const PendingApprovalProducts = () => {
  const dispatch = useDispatch();
  let { pathname } = useLocation();
  const pendingProducts = useSelector((state) => state.product.pendingProducts);
  const token = useSelector((state) => state.login.token);
  const logoutAction = useCallback(() => dispatch(logout()), [dispatch]);
  const loading = useSelector((state) => state.product.loading);
  const error = useSelector((state) => state.product.error);

  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage] = useState(5); // Changed the page size to 5

  useEffect(() => {
    const fetchPendingProducts = async () => {
      dispatch(setLoading(true));
      try {
        const data = await fetchDataWithToken(
          "http://localhost:6001/products/pending",
          token,
          logoutAction
        );
        dispatch(setPendingProducts(data));
      } catch (error) {
        dispatch(setError(error.message || "Failed to fetch pending products"));
      } finally {
        dispatch(setLoading(false));
      }
    };

    fetchPendingProducts();
  }, [dispatch, token, logoutAction]);

  const handleApprove = async (productId) => {
    try {
      const data = await putDataWithToken(
        'http://localhost:6001/products/approve/' + productId,
        token,
        logoutAction
      );
      handleApiResponse(data)
      dispatch(removePendingProduct(productId));
    } catch (error) {
      dispatch(setError(error.message || "Failed to fetch pending products"));
    } finally {
      dispatch(setLoading(false));
    }
    // Implement the logic for approving a product here
  };

  const handleReject = async (productId) => {
    try {
      const data = await putDataWithToken(
        'http://localhost:6001/products/reject/' + productId,
        token,
        logoutAction
      );
      handleApiResponse(data)
      dispatch(removePendingProduct(productId));
    } catch (error) {
      dispatch(setError(error.message || "Failed to fetch pending products"));
    } finally {
      dispatch(setLoading(false));
    }
  };

  // Logic for displaying products per page
  const indexOfLastProduct = currentPage * itemsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - itemsPerPage;
  const currentProducts = pendingProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Fragment>
      <SEO title="Pending Approval Products" />
      <LayoutOne headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            {
              label: "Pending Approval Products",
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />
        <div className="pending-products-main-area pt-90 pb-100">
          <div className="container">
            {loading ? (
              <div>Loading...</div>
            ) : error ? (
              <div>Error: {error}</div>
            ) : pendingProducts && pendingProducts.length >= 1 ? (
              <Fragment>
                <h3 className="page-title">Pending Approval Products</h3>
                <div className="row">
                  <div className="col-12">
                    <div className="table-content table-responsive">
                      <table className="table table-bordered">
                        <thead>
                          <tr>
                            <th>Image</th>
                            <th>Product Name</th>
                            <th>Category</th>
                            <th>Price</th>
                            <th>Stock</th>
                            <th>Action</th>
                          </tr>
                        </thead>
                        <tbody>
                          {currentProducts.map((product, key) => (
                            <tr key={key}>
                              <td className="product-thumbnail">
                                <Link
                                  to={
                                    process.env.PUBLIC_URL +
                                    "/product/" +
                                    product.id
                                  }
                                >
                                  <img
                                    className="img-fluid"
                                    src={product.image[0]}
                                    alt=""
                                    style={{ maxWidth: "300px" }} // Reduced image size
                                  />
                                </Link>
                              </td>
                              <td className="product-name">
                                <Link
                                  to={
                                    process.env.PUBLIC_URL +
                                    "/product/" +
                                    product.id
                                  }
                                >
                                  {product.name}
                                </Link>
                              </td>
                              <td className="product-category">
                                {product.categoryName}
                              </td>
                              <td className="product-price">{product.price}</td>
                              <td className="product-stock">{product.stock}</td>
                              <td className="product-action">
                                <button
                                  onClick={() => handleApprove(product.id)}
                                  className="btn btn-approve" // Changed button style to gray
                                >
                                  Approve
                                </button>
                                <button
                                  onClick={() => handleReject(product.id)}
                                  className="btn btn-reject" // Changed button style to gray
                                >
                                  Reject
                                </button>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  </div>
                </div>
                <div className="pro-pagination-style text-center mt-30">
                  <Pagination
                    itemsPerPage={itemsPerPage}
                    totalItems={pendingProducts.length}
                    paginate={paginate}
                    currentPage={currentPage}
                  />
                </div>
              </Fragment>
            ) : (
              <div className="row">
                <div className="col-lg-12">
                  <div className="item-empty-area text-center">
                    <div className="item-empty-area__icon mb-30">
                      <i className="pe-7s-box2"></i>
                    </div>
                    <div className="item-empty-area__text">
                      No products pending approval <br />
                      <Link to={process.env.PUBLIC_URL + "/shop-grid-standard"}>
                        Shop Now
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

const Pagination = ({ itemsPerPage, totalItems, paginate, currentPage }) => {
  const pageNumbers = [];

  for (let i = 1; i <= Math.ceil(totalItems / itemsPerPage); i++) {
    pageNumbers.push(i);
  }

  return (
    <nav>
      <ul className="pagination">
        {pageNumbers.map((number) => (
          <li
            key={number}
            className={`page-item ${
              number === currentPage ? "active" : ""
            }`}
          >
            <a
              onClick={() => paginate(number)}
              className="page-link"
              href="#"
            >
              {number}
            </a>
          </li>
        ))}
      </ul>
    </nav>
  );
};

export default PendingApprovalProducts;

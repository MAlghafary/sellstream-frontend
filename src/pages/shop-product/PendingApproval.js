import React, { Fragment, useCallback, useEffect, useState, useSyncExternalStore } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import { fetchDataWithToken } from "../../helpers/apiUtils";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/login-slice";
import Paginator from "react-hooks-paginator";

const PendingApproval = () => {
  const { pathname } = useLocation();
  const token = useSelector((state) => state.login.token);
  const dispatch = useDispatch();
  const logoutAction = useCallback(() => dispatch(logout()), [dispatch]);
  const [pendingProducts, setPendingProducts] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [productsPerPage] = useState(5); // Number of products per page


  useEffect(() => {
    const fetchPendingProducts = async () => {
      try {
        const result = await fetchDataWithToken(
          "http://localhost:6001/products/pending-approval",
          token,
          logoutAction
        );
        if (result) {
          setPendingProducts(result);
        }
      } catch (error) {
        console.error("Error fetching pending products:", error);
      }
    };

    fetchPendingProducts();
  }, [token, logoutAction]);

  // Function to handle product approval
  const handleApprove = (productId) => {
    // Implement your logic for approving the product here
    console.log("Product approved with ID:", productId);
  };

  // Function to handle product rejection
  const handleReject = (productId) => {
    // Implement your logic for rejecting the product here
    console.log("Product rejected with ID:", productId);
  };

  // Pagination logic
  const indexOfLastProduct = currentPage * productsPerPage;
  const indexOfFirstProduct = indexOfLastProduct - productsPerPage;
  const currentProducts = pendingProducts.slice(
    indexOfFirstProduct,
    indexOfLastProduct
  );

  // Change page
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <Fragment>
    <SEO titleTemplate="Pending Approval" description="List of products pending admin approval" />
    <LayoutOne headerTop="visible">
      <Breadcrumb
        pages={[
          { label: "Home", path: process.env.PUBLIC_URL + "/" },
          { label: "Pending Approval", path: process.env.PUBLIC_URL + pathname },
        ]}
      />
    </LayoutOne>
  </Fragment>
  );
};

export default PendingApproval;

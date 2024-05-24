import React, { useState, Fragment, useCallback } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import handleApiResponse, { postDataWithToken } from "../../helpers/apiUtils";
import { logout } from "../../store/slices/login-slice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const NewProduct = () => {
  let { pathname } = useLocation();
  const token = useSelector((state) => state.login.token);
  const dispatch = useDispatch();
  const logoutAction = useCallback(() => dispatch(logout()), [dispatch]);
  const navigate = useNavigate();

  const [product, setProduct] = useState({
    categoryId: "",
    description: "",
    image: [],
    name: "",
    price: "",
    stock: "",
  });

  const handleChange = (e) => {
    const { name, value, files } = e.target;
    if (name === "image") {
      setProduct({ ...product, [name]: files });
    } else {
      setProduct({ ...product, [name]: value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Upload each image to Cloudinary and get their URLs
    const imageUrls = await Promise.all(
      Array.from(product.image).map(async (file) => {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("upload_preset", "fjddysnq");

        const response = await fetch(
          "https://api.cloudinary.com/v1_1/dlimj0w77/image/upload",
          {
            method: "POST",
            body: formData,
          }
        );
        const data = await response.json();
        return data.secure_url;
      })
    );

    // Create the JSON payload
    const payload = {
      ...product,
      image: imageUrls,
    };

    try {
      const respone = postDataWithToken(
        "http://localhost:6001/products",
        JSON.stringify(payload),
        token,
        logoutAction
      );
      handleApiResponse(respone, (data) => {
        if (data && data.message) {
          setProduct({
            category: "",
            description: "",
            image: [],
            name: "",
            price: "",
            stock: "",
          });
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Fragment>
      <SEO titleTemplate="Add New Product" description="Add a new product" />
      <LayoutOne headerTop="visible">
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "New Product", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="col-md-8">
            <div className="blog-reply-wrapper mt-20">
              <h4 className="blog-dec-title">Add New Product</h4>
              <form className="blog-form" onSubmit={handleSubmit}>
                <div className="row">
                  <div className="col-md-12 mb-3">
                    <div className="leave-form">
                      <input
                        type="text"
                        placeholder="Product Name"
                        name="name"
                        value={product.name}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="leave-form">
                      <select
                        name="categoryId"
                        value={product.categoryId}
                        onChange={handleChange}
                        className="form-control"
                        required
                      >
                        <option value="">Select Category</option>
                        <option value="1">Fashion</option>
                        <option value="2">Men</option>
                        <option value="3">Women</option>
                        <option value="11"> Cars </option>
                      </select>
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="leave-form">
                      <input
                        type="text"
                        placeholder="Price"
                        name="price"
                        value={product.price}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-6 mb-3">
                    <div className="leave-form">
                      <input
                        type="number"
                        placeholder="Stock"
                        name="stock"
                        value={product.stock}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mb-3">
                    <div className="leave-form">
                      <textarea
                        placeholder="Description"
                        name="description"
                        value={product.description}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mb-3">
                    <div className="leave-form">
                      <label htmlFor="image">Upload Images</label>
                      <input
                        type="file"
                        multiple
                        name="image"
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-12">
                    <div className="text-leave">
                      <input
                        type="submit"
                        value="ADD PRODUCT"
                        className="btn btn-primary mt-3"
                      />
                    </div>
                  </div>
                </div>
              </form>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default NewProduct;

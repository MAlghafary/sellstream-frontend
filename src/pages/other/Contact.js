import { Fragment, useCallback, useState } from "react";
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import GoogleMap from "../../components/google-map";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../store/slices/login-slice";
import handleApiResponse, { postDataWithToken } from "../../helpers/apiUtils";

const Contact = () => {
  let { pathname } = useLocation();
  const token = useSelector((state) => state.login.token);
  const dispatch = useDispatch();
  const logoutAction = useCallback(() => dispatch(logout()), [dispatch]);
  
  const [data, setData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setData({ ...data, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const respone = postDataWithToken(
        "http://localhost:6001/contactus",
        JSON.stringify(data),
        token,
        logoutAction
      );
      handleApiResponse(respone, (data) => {
        if (data && data.message) {
          setData({
            name: "", 
            email: "",
            subject: "",
            message: "",
          });
        }
      });
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Fragment>
      <SEO titleTemplate="Contact" description="Contact page " />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            { label: "Contact", path: process.env.PUBLIC_URL + pathname },
          ]}
        />
        <div className="d-flex justify-content-center align-items-center vh-100">
          <div className="col-md-8">
            <div className="blog-reply-wrapper mt-20">
              <h4 className="blog-dec-title">Concat Us</h4>
              <form className="blog-form" onSubmit={handleSubmit}>
                <div className="row col-md-8">
                  <div className="col-md-12 mb-3">
                    <div className="leave-form col-md-12">
                      <input
                        type="text"
                        placeholder="Name"
                        name="name"
                        value={data.name}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mb-3">
                    <div className="leave-form">
                      <input
                        type="text"
                        placeholder="Email"
                        name="email"
                        value={data.email}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mb-3">
                    <div className="leave-form">
                      <input
                        type="text"
                        placeholder="Subject"
                        name="subject"
                        value={data.subject}
                        onChange={handleChange}
                        className="form-control"
                        required
                      />
                    </div>
                  </div>
                  <div className="col-md-12 mb-3">
                    <div className="leave-form">
                      <textarea
                        placeholder="message"
                        name="message"
                        value={data.message}
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
                        value="Send"
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

export default Contact;

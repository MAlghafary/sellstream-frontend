import React, { Fragment, useState } from "react";
import { Link, useLocation,useNavigate } from "react-router-dom";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import handleApiResponse from "../../helpers/apiUtils";
import { useDispatch } from "react-redux";
import { loginSuccess } from "../../store/slices/login-slice";

const LoginRegister = () => {
  let { pathname } = useLocation();
  const dispatch = useDispatch()


  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [userType, setUserType] = useState("seller");
  const navigate = useNavigate();


  const handleUserTypeChange = (event) => {
    setUserType(event.target.value);
  };

  const handleRegistation = async (event) => {
    event.preventDefault();

    const userData = {
      username,
      password,
      email,
      userType
    };

    try {
      // Send a POST request to the endpoint
      const response = await fetch("http://localhost:6001/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*"
        },
        body: JSON.stringify(userData),
      });

      handleApiResponse(response,() => {
        
      })
    } catch (error) {
      console.error("Error:", error);
    }
  };

  const handlelogin = async (event) => {
    event.preventDefault();

    const userData = {
      email,
      password
    };

    try {
      const response = await fetch("http://localhost:6001/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Accept": "*/*"
        },
        body: JSON.stringify(userData),
      });

      handleApiResponse(response,(data) => {
        if(data && data.message) {
          dispatch(loginSuccess({ data}))
          navigate('/');
        }
       
      })
    } catch (error) {
      console.error("Error:", error);
    }
  };

  return (
    <Fragment>
      <SEO titleTemplate="Login" description="Login page " />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb
          pages={[
            { label: "Home", path: process.env.PUBLIC_URL + "/" },
            {
              label: "Login Register",
              path: process.env.PUBLIC_URL + pathname,
            },
          ]}
        />
        <div className="login-register-area pt-100 pb-100">
          <div className="container">
            <div className="row">
              <div className="col-lg-7 col-md-12 ms-auto me-auto">
                <div className="login-register-wrapper">
                  <Tab.Container defaultActiveKey="login">
                    <Nav variant="pills" className="login-register-tab-list">
                      <Nav.Item>
                        <Nav.Link eventKey="login">
                          <h4>Login</h4>
                        </Nav.Link>
                      </Nav.Item>
                      <Nav.Item>
                        <Nav.Link eventKey="register">
                          <h4>Register</h4>
                        </Nav.Link>
                      </Nav.Item>
                    </Nav>
                    <Tab.Content>
                      <Tab.Pane eventKey="login">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handlelogin}>
                            <input
                                required
                                name="user-email"
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />
                              <input
                                required
                                type="password"
                                name="user-password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <div className="button-box">
                                <div className="login-toggle-btn">
                                  <input type="checkbox" />
                                  <label className="ml-10">Remember me</label>
                                  <Link to={process.env.PUBLIC_URL + "/"}>
                                    Forgot Password?
                                  </Link>
                                </div>
                                <button type="submit">
                                  <span>Login</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                      <Tab.Pane eventKey="register">
                        <div className="login-form-container">
                          <div className="login-register-form">
                            <form onSubmit={handleRegistation}>
                              <input
                                required
                                type="text"
                                name="user-name"
                                placeholder="Username"
                                value={username}
                                onChange={(e) => setUsername(e.target.value)}
                              />
                              <input
                                required
                                type="password"
                                name="user-password"
                                placeholder="Password"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                              />
                              <input
                                required
                                name="user-email"
                                placeholder="Email"
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                              />

                              <div className="shop-top-bar mb-35">
                                <div className="select-shoing-wrap">
                                  <div className="shop-select">
                                    <p>Select user type:</p>
                                    <select
                                      value={userType}
                                      onChange={handleUserTypeChange}
                                      name="userType"
                                    >
                                      <option value="seller" selected>Seller</option>
                                      <option value="buyer">Buyer</option>
                                      <option value="admin">Admin</option>
                                    </select>
                                  </div>
                                  <p></p>
                                </div>
                              </div>

                              <div className="button-box">
                                <button type="submit">
                                  <span>Register</span>
                                </button>
                              </div>
                            </form>
                          </div>
                        </div>
                      </Tab.Pane>
                    </Tab.Content>
                  </Tab.Container>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default LoginRegister;

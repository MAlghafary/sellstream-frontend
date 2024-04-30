import { Fragment } from "react";
import { Link, useLocation } from "react-router-dom"; 
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";

const NotFound = () => {
  let { pathname } = useLocation();

  return (
    <Fragment>
      <SEO
        titleTemplate="Not Found"
        description="404 of flone react minimalist eCommerce template."
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Announcements", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />
        <div className="error-area pt-40 pb-100">
          <div className="container">
            <div className="row justify-content-center">
              <div className="col-xl-7 col-lg-8 text-center">
                <div className="error">
                <h1> Add Your Ad !! </h1>
                <form id="advertisementForm">
               <div>
                  <label for="title">Ad title:</label>
                  <input type="text" id="title" name="title" required/>
                 </div>
               <div>
                 <label for="description">Ad description:</label>
                <textarea id="description" name="description" required></textarea>
           </div>
           <div>
                  <label for="title">Contact the Ad:</label>
                  <input type="text" id="number" name="number" required/>
                 </div>
               <div></div>




        <div>
                <label for="images">images:</label>
                <input type="file" id="images" name="images" accept="image/*" multiple required/>
             </div>
         <div>

            <label for="video"> video:</label>
            <input type="file" id="video" name="video" accept="video/*"/>
        </div>
      </form> 
            <button type="submit">Posting </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </LayoutOne>
    </Fragment>
  );
};

export default NotFound;

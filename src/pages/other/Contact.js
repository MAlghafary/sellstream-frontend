import { Fragment } from "react"; 
import { useLocation } from "react-router-dom";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import Breadcrumb from "../../wrappers/breadcrumb/Breadcrumb";
import GoogleMap from "../../components/google-map"

const Contact = () => {
  let { pathname } = useLocation();

  return (
    <Fragment>
      <SEO
        titleTemplate="Contact"
        description="Contact page "
      />
      <LayoutOne headerTop="visible">
        {/* breadcrumb */}
        <Breadcrumb 
          pages={[
            {label: "Home", path: process.env.PUBLIC_URL + "/" },
            {label: "Contact", path: process.env.PUBLIC_URL + pathname }
          ]} 
        />
        <div className="contact-area pt-100 pb-100">
          <div className="container">
              <h1> Get In Touch </h1>
                <form id="ContactForm">
              <p><div>
               <input name="name" placeholder="Name*" type="text" />
              </div></p> 

              <p><div>
               <input name="email" placeholder="Email*" type="email" />
               </div></p> 
              
              <p><div> 
                  <input
                  name="subject"placeholder="Subject*"type="text" />
               </div></p> 
            
               <div>
                 <textarea name="message" placeholder="Your Message*"defaultValue={""}/>
               </div>
              </form> 
                 <button className="submit" type="submit"> SEND </button>
              </div>
          </div>
      </LayoutOne>
    </Fragment>
  );
};

export default Contact;

import PropTypes from "prop-types";
import clsx from "clsx";

const SectionTitleWithText = ({ spaceTopClass, spaceBottomClass }) => {
  return (
    <div className={clsx("welcome-area", spaceTopClass, spaceBottomClass)}>
      <div className="container">
        <div className="welcome-content text-center">
          <h4>Who Are We</h4>
          <h1>Welcome To SellStream</h1>
          <p>
          Welcome to SellStream - your ultimate destination for a seamless and 
          rewarding online shopping experience. At SellStream, we're dedicated
           to providing you with a diverse range of products, unbeatable deals,
            and exceptional service. Whether you're searching for the latest 
            fashion trends, cutting-edge electronics, or everyday essentials, 
            we've got you covered. Shop with confidence and convenience,
             knowing that your satisfaction is our top priority. Join us 
             on this journey of discovery and convenience as we strive to
              make your shopping experience truly unforgettable. Welcome 
              to SellStream - where shopping meets satisfaction!
          </p>
        </div>
      </div>
    </div>
  );
};

SectionTitleWithText.propTypes = {
  spaceBottomClass: PropTypes.string,
  spaceTopClass: PropTypes.string
};

export default SectionTitleWithText;

import PropTypes from "prop-types";
import clsx from "clsx";
import Tab from "react-bootstrap/Tab";
import Nav from "react-bootstrap/Nav";
import SectionTitleThree from "../../components/section-title/SectionTitleThree";
import ProductGridTwo from "./ProductGridTwo";

const TabProductTwentyOne = ({
  spaceBottomClass,
  category,
  productTabClass,
  bgColorClass
}) => {
  return (
    <div className={clsx("product-area", spaceBottomClass, bgColorClass)}>
      <div className="container">
        <SectionTitleThree
          titleText="Featured Product"
          positionClass="text-center"
          colorClass="text-white"
        />
        <Tab.Container defaultActiveKey="bestSeller">
         
              
          
          <Tab.Content>
            <Tab.Pane eventKey="newArrival">
              <div className="row">
                <ProductGridTwo
                  category={category}
                  type="new"
                  limit={8}
                  spaceBottomClass="mb-25"
                  titlePriceClass="title-price-wrap-2-white"
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="bestSeller">
              <div className="row">
                <ProductGridTwo
                  category={category}
                  type="bestSeller"
                  limit={8}
                  spaceBottomClass="mb-25"
                  titlePriceClass="title-price-wrap-2-white"
                />
              </div>
            </Tab.Pane>
            <Tab.Pane eventKey="saleItems">
              <div className="row">
                <ProductGridTwo
                  category={category}
                  type="saleItems"
                  limit={8}
                  spaceBottomClass="mb-25"
                  titlePriceClass="title-price-wrap-2-white"
                />
              </div>
            </Tab.Pane>
          </Tab.Content>
        </Tab.Container>
      </div>
    </div>
  );
};

TabProductTwentyOne.propTypes = {
  category: PropTypes.string,
  spaceBottomClass: PropTypes.string
};

export default TabProductTwentyOne;

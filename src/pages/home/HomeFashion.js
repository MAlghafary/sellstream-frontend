import { Fragment,useEffect } from "react";
import SEO from "../../components/seo";
import LayoutOne from "../../layouts/LayoutOne";
import HeroSliderOne from "../../wrappers/hero-slider/HeroSliderOne";
import FeatureIcon from "../../wrappers/feature-icon/FeatureIcon";
import TabProduct from "../../wrappers/product/TabProduct";
import BlogFeatured from "../../wrappers/blog-featured/BlogFeatured";
import { useDispatch, useSelector } from "react-redux";
import { setProducts } from "../../store/slices/product-slice";


const HomeFashion = () => {

  const dispatch = useDispatch();
  const token = useSelector(state => state.login.token);

  useEffect(() => {
    // Function to fetch products
    const fetchProducts = async () => {
      try {
       

        const response = await fetch("http://localhost:6001/products", {
          headers: {
            Authorization: `${token}`, // Include the token in the Authorization header
          },
        });
        if (!response.ok) {
          throw new Error("Failed to fetch products");
        }
        const data = await response.json();
        dispatch(setProducts(data)); // Dispatch the action to update the Redux store with fetched data
      } catch (error) {
        console.error("Error fetching products:", error);
      }
    };

    // Call the fetchProducts function when the component mounts
    fetchProducts();
  }, [dispatch]); // Include dispatch in the dependency array

  return (
    <Fragment>
      <SEO
        titleTemplate=" Home"
        description=" home ."
      />
      <LayoutOne
        headerContainerClass="container-fluid"
        headerPaddingClass="header-padding-1"
      >
        {/* hero slider */}
        <HeroSliderOne />

        {/* featured icon */}
        <FeatureIcon spaceTopClass="pt-100" spaceBottomClass="pb-60" />

        {/* tab product */}
        <TabProduct spaceBottomClass="pb-60" category="fashion" />
        

        {/* blog featured */}
        <BlogFeatured spaceBottomClass="pb-55" />
      </LayoutOne>
    </Fragment>
  );
};

export default HomeFashion;

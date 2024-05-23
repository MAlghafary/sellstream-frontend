import { EffectFade } from 'swiper';
import Swiper, { SwiperSlide } from "../../components/swiper";
// import heroSliderData from "../../data/hero-sliders/hero-slider-one.json";
import HeroSliderOneSingle from "../../components/hero-slider/HeroSliderOneSingle.js";
import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';


const params = {
  effect: "fade",
  fadeEffect: {
    crossFade: true
  },
  modules: [EffectFade],
  loop: true,
  speed: 1000,
  navigation: true
};


const getSortedProducts = (products) => {
  return products.slice().sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
};

const HeroSliderOne = () => {

  const [heroSliderData, setHeroSliderData] = useState([]);
  const { products } = useSelector((state) => state.product);

  useEffect(() => {
    if (products && products.length > 0) {
      // Filter products where isNew is true
      let newProducts = products.filter(product => product.isNew);

      // Sort the filtered products by createdAt
      let sortedNewProducts = getSortedProducts(newProducts);

      // Get the first 2 products from the sorted list
      let topNewProducts = sortedNewProducts.slice(0, 2);

      // Map the products to the desired object structure
      let heroSliderItems = topNewProducts.map(product => ({
        id: product.id,
        title: product.name,
        subtitle: "New Arrivals",
        image: product.image ? product.image[0] : "/assets/img/slider/single-slide-1.png", // Assuming `product.images` is an array of image URLs
        url: "/shop-grid-standard"
      }));

      // Update the state
      setHeroSliderData(heroSliderItems);
    }
  }, [products]);


  return (
    <div className="slider-area">
      <div className="slider-active nav-style-1">
        {heroSliderData && (
          <Swiper options={params}>
            {heroSliderData.map((single, key) => (
              <SwiperSlide key={key}>
                <HeroSliderOneSingle
                  data={single}
                />
              </SwiperSlide>
            ))}
          </Swiper>
        )}
      </div>
    </div>
  );
};

export default HeroSliderOne;

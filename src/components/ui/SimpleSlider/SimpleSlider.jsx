import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import styles from './SimpleSlider.module.scss';
import './SimpleSlider.css';


export default function SimpleSlider(props) {

  let list_slides = props.list_slides;

  let baseUrl = props.baseUrl;


  let number_slide_random = Math.floor(Math.random() * (list_slides.length - 0 + 1) + 0);


  let settings = {
    dots: false,
    fade: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    initialSlide: number_slide_random,
    waitForAnimate: false,
  };


  return (
    <div className={styles.SimpleSlider}>
      <Slider
        {...settings}
      >
        {
          list_slides.map((slide) =>
            <div key={slide}>
              <img src={baseUrl + slide} alt="картинка 404 ошибки" />
            </div>
          )
        }
      </Slider>
    </div>
  );
}

import Slider from "react-slick";

import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";


export default function SimpleSlider(props) {

  let list_slides = props.list_slides;

  let settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
  };


  return (
    <Slider {...settings}>
      {
        list_slides.map((slide) =>
          <div key={slide}>
            <img src={slide} alt="картинка 404 ошибки" />
          </div>
        )
      }
    </Slider>
  );
}

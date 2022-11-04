import React from 'react';

import Carousel from 'react-bootstrap/Carousel';

function ImageCarousel() {
  return (
    <Carousel fade id='carousel'>
      <Carousel.Item rounded >
        <img
          className="d-block w-100"
          src="https://image.shutterstock.com/image-photo/different-delicious-cocktails-on-black-260nw-1890842638.jpg"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://images.unsplash.com/photo-1514362545857-3bc16c4c7d1b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxzZWFyY2h8Mnx8Y29ja3RhaWx8ZW58MHx8MHx8&w=1000&q=80"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://www.greatbritishfoodawards.com/assets/images/recipes/shutterstock_626483960.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://i.pinimg.com/originals/fa/82/2e/fa822e5adb1a8ffc33b64d4256903da9.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="https://media.istockphoto.com/photos/blue-mojito-cocktail-picture-id585779180?k=6&m=585779180&s=170667a&w=0&h=GFVNSiTIKuUl--TQOMrfGlrs7CD_uKf797FKizXy6a8="
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default ImageCarousel;
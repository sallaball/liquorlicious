import React from 'react';

import Carousel from 'react-bootstrap/Carousel';

function ImageCarousel() {
  return (
    <Carousel fade id='carousel'>
      <Carousel.Item rounded >
        <img
          className="d-block w-100"
          src="https://img.freepik.com/free-photo/selection-various-cocktails-table_140725-2909.jpg?w=2000"
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
          src="images/img.jpg"
          alt="Third slide"
        />
      </Carousel.Item>
    </Carousel>
  );
}

export default ImageCarousel;
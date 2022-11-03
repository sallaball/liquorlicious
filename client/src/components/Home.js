import React from 'react';

import Carousel from 'react-bootstrap/Carousel';

function ImageCarousel() {
  return (
    <Carousel fade>
      <Carousel.Item rounded >
        <img
          className="d-block w-100"
          src="../images/img1"
          alt="First slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="../images/img2"
          alt="Second slide"
        />
      </Carousel.Item>
      <Carousel.Item>
        <img
          className="d-block w-100"
          src="../images/img3"
          alt="Third slide"
        />
{/* 
        <Carousel.Caption>
          <h3>Third slide label</h3>
          <p>
            Praesent commodo cursus magna, vel scelerisque nisl consectetur.
          </p>
        </Carousel.Caption> */}
      </Carousel.Item>
    </Carousel>
  );
}

export default ImageCarousel;
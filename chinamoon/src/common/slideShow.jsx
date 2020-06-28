import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";


class SlideShow extends Component {
//uses image from id to render the images
    //see image styles in index.css
  render() {
    return (
      <div id="slide">
        
        <Carousel>
          
          <Carousel.Item>
            <img className="d-block w-100" alt="" id="img1" />
            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" alt="" id="img2" />

            <Carousel.Caption></Carousel.Caption>
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-block w-100" alt="" id="img3" />

            <Carousel.Caption>
              <h3>Dinner</h3>
              <p>China Moon Presents Hot Steaming Dinners</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default SlideShow;

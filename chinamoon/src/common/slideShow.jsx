import React, { Component } from "react";
import Carousel from "react-bootstrap/Carousel";
//import SlideDiv from "./slideDiv";

class SlideShow extends Component {
//   imageTags = [
//     { _id: "img1", title: "Dinner" },
//     { _id: "img2", title: "Lunch" },
//     { _id: "img3", title: "Breakfast" },
//     { _id: "img4", title: "Dinner" },
//   ];
  render() {
    return (
      <div>
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
              <p>China Moon Present Hot Steaming Dinners</p>
            </Carousel.Caption>
          </Carousel.Item>
        </Carousel>
      </div>
    );
  }
}

export default SlideShow;

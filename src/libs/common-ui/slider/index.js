import { Carousel } from "antd";
import React from "react";

import { Slider1, Slider2, Slider3, Slider4 } from "../../../media";
const Slider = () => {
  return (
    <Carousel>
      <div
        style={{
          position: "relative",
          fontFamily: "Arial",
        }}
      >
        <img
          src={Slider1}
          height="600px"
          width="100%"
          style={{ zIndex: "100" }}
        />
        <h1
          style={{
            position: "fixed",
            zIndex: "1000",
            bottom: "100px",
            color: "white",
          }}
        ></h1>
      </div>
      <div>
        <img src={Slider2} height="600px" width="100%" />
      </div>
      <div>
        <img src={Slider3} height="600px" width="100%" />
      </div>
      <div>
        <img src={Slider4} height="600px" width="100%" />
      </div>
    </Carousel>
    // <div
    //   id="carouselExampleIndicators"
    //   class="carousel slide"
    //   data-ride="carousel"
    // >
    //   <ol class="carousel-indicators">
    //     <li
    //       data-target="#carouselExampleIndicators"
    //       data-slide-to="0"
    //       class="active"
    //     ></li>
    //     <li data-target="#carouselExampleIndicators" data-slide-to="1"></li>
    //     <li data-target="#carouselExampleIndicators" data-slide-to="2"></li>
    //   </ol>
    //   <div class="carousel-inner">
    //     <div class="carousel-item active">
    //       <img class="d-block w-100" src={Slider1} alt="First slide" />
    //     </div>
    //     <div class="carousel-item">
    //       <img class="d-block w-100" src={Slider2} alt="Second slide" />
    //     </div>
    //     <div class="carousel-item">
    //       <img class="d-block w-100" src={Slider3} alt="Third slide" />
    //     </div>
    //   </div>
    //   <a
    //     class="carousel-control-prev"
    //     href="#carouselExampleIndicators"
    //     role="button"
    //     data-slide="prev"
    //   >
    //     <span class="carousel-control-prev-icon" aria-hidden="true"></span>
    //     <span class="sr-only"></span>
    //   </a>
    //   <a
    //     class="carousel-control-next"
    //     href="#carouselExampleIndicators"
    //     role="button"
    //     data-slide="next"
    //   >
    //     <span class="carousel-control-next-icon" aria-hidden="true"></span>
    //     <span class="sr-only"></span>
    //   </a>
    // </div>
  );
};

export { Slider };

import React from "react";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import styled from "styled-components";

import './style.css'

const StyledSliderWrapper = styled.div`
  .slick-prev, .slick-next {
    background-color: rgba(0, 0, 0, 0.5);
    border-radius: 50%;
    width: 30px;
    height: 30px;
    display: flex !important;
    justify-content: center;
    align-items: center;
  }

  .slick-prev:hover, .slick-next:hover {
    background-color: rgba(0, 0, 0, 0.8);
  }

  .slick-dots li button:before {
    color: blue;
  }

  .slick-dots li.slick-active button:before {
    color: red;
  }

  .slick-slide {
    text-align: center;
    background: #ddd;
    padding: 20px;
  }
`;

const StyledComponentsSlider = ({ children, size, title }) => {

  return (
    <StyledSliderWrapper className={`slider_wrapper_${size}`}>
      <h2>{title}</h2>
      {children}
    </StyledSliderWrapper>
  );
};

export default StyledComponentsSlider;

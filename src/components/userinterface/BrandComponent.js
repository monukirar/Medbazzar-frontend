import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../services/FetchNodeServices";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { createRef } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { useNavigate } from "react-router-dom";
export default function BrandComponent(props) {
  var navigate = useNavigate();
  var sld = createRef();

  const theme = useTheme();

  const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
  const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
  const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

  var settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: 6,
    slidesToScroll: 1,
    autoplay: false,
  };

  var brands = props?.data;

  const showBrandSlide = () => {
    return brands?.map((item) => {
      return (
        <div>
          <div
            style={{
              display: "flex",
              marginLeft: 12,
              marginRight: 12,
              boxShadow: "1px 1px 10px 0px #00000010",
            }}
          >
            <img
              onClick={() => navigate("/filter")}
              src={`${serverURL}/images/${item.picture}`}
              style={{
                width: "80%",
                padding: 3,
                borderRadius: 10,
                height: "auto",
                aspectRatio: 3 / 3,
                display: "block",
                marginLeft: "auto",
                cursor: "pointer",
                marginRight: "auto",
              }}
            />
          </div>
        </div>
      );
    });
  };

  const handleForward = () => {
    sld.current.slickNext();
  };
  const handleBackward = () => {
    sld.current.slickPrev();
  };
  return (
    <div style={{ width: "95%", position: "relative" }}>
      <div
        style={{
          margin: "10px 0px 15px 15px",
          fontWeight: "bold",
          fontSize: 16,
        }}
      >
        {props?.title}
      </div>
      {!matchesMd ? (
        <div
          style={{
            zIndex: 2,
            top: "50%",
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: 20,
            background: "#95a5a6",
            opacity: 0.6,
          }}
        >
          <ArrowBackIosIcon onClick={handleBackward} />
        </div>
      ) : (
        <div></div>
      )}
      <Slider {...settings} ref={sld}>
        {showBrandSlide()}
      </Slider>
      {!matchesMd ? (
        <div
          style={{
            zIndex: 2,
            top: "50%",
            right: "0.09%",
            position: "absolute",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            width: 40,
            height: 40,
            borderRadius: 20,
            background: "#95a5a6",
            opacity: 0.6,
          }}
        >
          <ArrowForwardIosIcon onClick={handleForward} />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
}

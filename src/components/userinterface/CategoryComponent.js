import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../services/FetchNodeServices";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import Box from "@mui/material/Box";
import Paper from "@mui/material/Paper";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createRef } from "react";
import { useNavigate } from "react-router-dom";
export default function CategoryComponent(props) {
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
    slidesToShow: matchesMd ? 5 : 6,
    slidesToScroll: 1,
    autoplay: false,
  };

  const handleGotoFilterPage = (item) => {
    navigate("/filterpage/null", { state: { categoryid: item.categoryid } });
  };

  var images = props?.data;
  const showCategorySlide = () => {
    return images?.map((item) => {
      return (
        <div onClick={() => handleGotoFilterPage(item)}>
          <div
            style={{
              marginLeft: 3,
              marginRight: 3,
              width: "90%",
              display: "block",
              borderRadius: 10,
            }}
          >
            <img
              src={`${serverURL}/images/${item.picture}`}
              style={{
                width: "80%",

                borderRadius: 10,
                height: "auto",
                aspectRatio: 3 / 3,
                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </div>
          <div
            style={{ textAlign: "center", width: "90%", fontWeight: "bold" }}
          >
            {item.categoryname}
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
            top: "45%",
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
        {showCategorySlide()}
      </Slider>
      {!matchesMd ? (
        <div
          style={{
            zIndex: 2,
            top: "45%",
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
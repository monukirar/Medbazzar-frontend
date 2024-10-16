import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../services/FetchNodeServices";
import ArrowForwardIosIcon from "@mui/icons-material/ArrowForwardIos";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { createRef } from "react";
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
export default function ConcernComponent(props) {
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

  var images = props?.data;
  const showCategorySlide = () => {
    return images?.map((item) => {
      return (
        <div>
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
                aspectRatio: 3 / 3,
                borderRadius: 10,
                height: "auto",

                display: "block",
                marginLeft: "auto",
                marginRight: "auto",
              }}
            />
          </div>
          <div
            style={{
              textAlign: "center",
              width: "90%",
              fontWeight: "bold",
              fontSize: matchesMd ? 8 : 14,
            }}
          >
            {item.concernname}
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
        {showCategorySlide()}
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

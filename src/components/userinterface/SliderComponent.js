import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { serverURL } from "../../services/FetchNodeServices";
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import { useTheme } from "@mui/material/styles";
import useMediaQuery from "@mui/material/useMediaQuery";
import { createRef } from "react";
export default function SliderComponent(props){
   
    var sld=createRef()

    const theme = useTheme();

    const matchesMd = useMediaQuery(theme.breakpoints.down("md"));
    const matchesSM = useMediaQuery(theme.breakpoints.down("sm"));
    const matchesXS = useMediaQuery(theme.breakpoints.down("xs"));

    var settings = {
        dots: false,
        infinite: true,
        speed: 500,
        slidesToShow: 3,
        slidesToScroll: 1,
        autoplay:true
      };
    var banners=[{bannerid:1,brandid:2,bannertype:'xx',picture:"1.webp,2.webp,3.webp,4.webp,5.webp,6.webp"}]
    var images=Object.values(banners)[0].picture.split(",")
    const showSlide=()=>{
        return images.map((item)=>{
            return<div><img src={`${serverURL}/images/${item}`} style={{width:'95%',height:"auto",display:"block",borderRadius:10,marginLeft:"auto",marginRight:"auto",cursor:'pointer'}} /></div>
        })
    }

    const handlebackward=()=>{
        sld.current.slickPrev()
      }
    
      const handleForward=()=>{
        sld.current.slickNext()
      }

    return(
        <div style={{width: '95%' ,position:'relative'}}>
             {!matchesMd? <div style={{zIndex:2,top:'40%',position:'absolute',display:'flex',alignItems:'center',justifyContent:'center',width:40,height:40,borderRadius:20,background:'#95a5a6',opacity:0.6}}>
                <ArrowBackIosIcon onClick={handlebackward} />
            </div>:<div></div>}
        <Slider ref={sld} {...settings}>
       {showSlide()}
      </Slider>
        {!matchesMd?<div style={{zIndex:2,top:'40%',right:'0.07%',position:'absolute',display:'flex',alignItems:'center',justifyContent:'center',width:40,height:40,borderRadius:20,background:'#95a5a6',opacity:0.6}}>
                <ArrowForwardIosIcon  onClick={handleForward} />
            </div>:<div></div>}
      </div>
    );
  }
    

